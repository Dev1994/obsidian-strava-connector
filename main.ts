import { Notice, Plugin, WorkspaceLeaf } from "obsidian";
import { RootView, VIEW_TYPE_ROOT } from "./src/RootView";
import { DateTime } from "luxon";
import { AuthenticationConfig } from "strava-v3";
import { StravaActivitiesSettingTab } from "./src/tabs/strava-activities-setting-tab";
import auth from "./src/services/auth-service";
import { SummaryActivity } from "strava-types";
import athleteService from "./src/services/athlete-servince";

interface SyncSettings {
	lastSyncedAt: string
	activityDetailsRetrievedUntil: string
}

interface StravaActivitiesSettings {
	authSettings: AuthenticationConfig
	syncSettings: SyncSettings
}

const DEFAULT_SETTINGS: StravaActivitiesSettings = {
	authSettings: {
		access_token: "",
		client_id: "",
		client_secret: "",
		redirect_uri: "obsidian://obsidian-strava-connector/callback",
	},
	syncSettings: {
		lastSyncedAt: "", // e.g., '2023-09-14T14:44:56.106Z'
		activityDetailsRetrievedUntil: "", // e.g., '2023-01-01T14:44:56.106Z'
	},
};

/**
 * Represents a plugin that connects to Strava.
 */
export default class StravaConnectorPlugin extends Plugin {
	settings = DEFAULT_SETTINGS;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new StravaActivitiesSettingTab(this.app, this));

		// Register the root view
		this.registerView(
			VIEW_TYPE_ROOT,
			(leaf) => new RootView(leaf, this.settings)
		);

		this.registerObsidianProtocolHandler(
			"obsidian-strava-connector/callback",
			async (args) => {
				await auth.OAuthCallback(args);
			}
		);

		// Add a ribbon icon to activate the view
		this.addRibbonIcon("activity", "Strava Dashboard", () => {
			this.activateView();
		});

		this.addCommand({
			id: "authenticate",
			name: "Authenticate with Strava",
			callback: () => auth.authenticate(this.settings.authSettings),
		});

		const ribbonIconEl = this.addRibbonIcon(
			"refresh-ccw",
			"Synchronize Current Week Activities",
			async (evt: MouseEvent) => {
				new Notice("Synchronizing current week Strava activities...");
				try {
					const currentWeekActivities: SummaryActivity[] = await athleteService.getActivities(
						{
							after: DateTime.utc().startOf("week").toSeconds()
						});

					if (currentWeekActivities.length === 0) {
						new Notice("You've not logged any activities this week.");
						return;
					}

					await this.createOrUpdateAthleteActivitiesFiles(currentWeekActivities);
					this.settings.syncSettings.lastSyncedAt = DateTime.utc().toISO();
					this.saveSettings();
					new Notice("Successfully synchronized current week Strava activities");
				} catch (error) {
					new Notice("Failed to synchronize Strava activities.");
					console.error(error);
				}
			}
		);
		ribbonIconEl.addClass("my-plugin-ribbon-class");
	}

	private async ensureFolderStructureExists(activityDate: string) {
		// Ensure the "Strava" folder exists
		if (!this.app.vault.getFolderByPath("Strava")) {
			await this.app.vault.createFolder("Strava");
		}

		// Ensure the "Strava/Activities" folder exists
		if (!this.app.vault.getFolderByPath("Strava/Activities")) {
			await this.app.vault.createFolder("Strava/Activities");
		}

		// Ensure the "Strava/Activities/DayOfActivity" folder exists
		if (!this.app.vault.getFolderByPath(`Strava/Activities/${activityDate}`)) {
			await this.app.vault.createFolder(`Strava/Activities/${activityDate}`);
		}
	}

	private async createOrUpdateAthleteActivitiesFiles(currentWeekActivities: SummaryActivity[]) {
		try {
			for (const currentActivity of currentWeekActivities) {
				const activityDate = DateTime.fromISO(currentActivity.start_date).toFormat("dd-MM-yyyy").toString();
				const filePath = `Strava/Activities/${activityDate}/Summary.md`;

				await this.ensureFolderStructureExists(activityDate);

				// Convert cycling data to YAML format for frontmatter
				const yamlFrontmatter = `---
title: ${currentActivity.name}
distance: ${Math.fround(currentActivity.distance / 1000).toFixed(2)}
date: ${activityDate}
sport: ${currentActivity.sport_type}
kudos: ${currentActivity.kudos_count}
---
`;
				// Combine frontmatter and original JSON data
				const mdContent = `${yamlFrontmatter}\n\`\`\`json\n${JSON.stringify(currentActivity, null, 4)}\n\`\`\``;
				const file = this.app.vault.getFileByPath(filePath);
				if (!file) {
					await this.app.vault.create(filePath, mdContent);
				} else {
					await this.app.vault.modify(file, mdContent);
				}
			}
		} catch (error) {
			new Notice("Failed to create or update markdown file: ");
		}
	}

	/**
	 * Activates the Strava view.
	 */
	async activateView() {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE_ROOT);

		if (leaves.length > 0) {
			// A leaf with our view already exists, use that
			leaf = leaves[0];
		} else {
			// Our view could not be found in the workspace, create a new leaf
			// in the right sidebar for it
			leaf = workspace.getLeaf(false);
			await leaf!.setViewState({ type: VIEW_TYPE_ROOT, active: true });
		}

		// "Reveal" the leaf in case it is in a collapsed sidebar
		workspace.revealLeaf(leaf!);
	}

	onunload() {
		// this.settings = DEFAULT_SETTINGS
		// this.saveSettings()
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
