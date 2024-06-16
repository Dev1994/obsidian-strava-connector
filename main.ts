import { addIcon, Notice, Plugin, TFolder, WorkspaceLeaf } from 'obsidian';
import { RootView, VIEW_TYPE_ROOT } from './src/RootView';
import { stravaService } from 'src/services/strava-service';
import { DateTime } from "luxon";

interface StravaConnectorSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: StravaConnectorSettings = {
	mySetting: 'default'
}

/**
 * Represents a plugin that connects to Strava.
 */
export default class StravaConnectorPlugin extends Plugin {
	settings: StravaConnectorSettings;

	async onload() {
		addIcon(
			'stravaIcon',
			`<path
				d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"
				transform="scale(4)"  />`
		)

		// Register the root view
		this.registerView(
			VIEW_TYPE_ROOT,
			(leaf) => new RootView(leaf)
		);

		// Add a ribbon icon to activate the view
		this.addRibbonIcon("activity", "Strava Data", () => {
			this.activateView();
		});

		const ribbonIconEl = this.addRibbonIcon(
			'stravaIcon',
			'Synchronize Strava activities',
			async (evt: MouseEvent) => {
				new Notice('Started synchronizing Strava activities');
				try {
					const athleteStats = await stravaService.getAthleteStats("GET_YOUR_OWN_TOKEN", 11111111);
					if (!this.app.vault.getFolderByPath("Strava")) {
						await this.app.vault.createFolder("Strava");

						if (!this.app.vault.getFolderByPath("Strava/Athlete-Statistics")) {
							await this.app.vault.createFolder("Strava/Athlete-Statistics");

							const currentWeek = DateTime.utc().toFormat("yyyy-'W'WW");
							if (!this.app.vault.getFileByPath(`Strava/Athlete-Statistics/${currentWeek}`)) {
								try {
									// Convert cycling data to YAML format for frontmatter
									const yamlFrontmatter = `---
title: Cycling
4_weeks_ride_total: ${Math.round(athleteStats.recent_ride_totals.distance / 1000)}
---
									`;

									// Combine frontmatter and original JSON data
									const mdContent = `${yamlFrontmatter}\n\`\`\`json\n${JSON.stringify(athleteStats, null, 4)}\n\`\`\``;
									await this.app.vault.create(`Strava/Athlete-Statistics/${currentWeek}.md`, mdContent);
								} catch (error) {
									new Notice("Failed to create markdown file: ");
								}
							}
						}
					}
					new Notice("Finished synchronizing Strava activities");
				} catch (error) {
					new Notice("Failed to synchronize Strava stats");
				}
			}
		);
		ribbonIconEl.addClass('my-plugin-ribbon-class');
	}

	onunload() {
		// Perform any necessary cleanup when the plugin is unloaded
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
			leaf = workspace.getRightLeaf(false);
			await leaf!.setViewState({ type: VIEW_TYPE_ROOT, active: true });
		}

		// "Reveal" the leaf in case it is in a collapsed sidebar
		workspace.revealLeaf(leaf!);
	}

	/**
	 * Loads the plugin settings.
	 */
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	/**
	 * Saves the plugin settings.
	 */
	async saveSettings() {
		await this.saveData(this.settings);
	}
}
