import { Plugin, WorkspaceLeaf } from 'obsidian';
import { RootView, VIEW_TYPE_ROOT } from './src/RootView';

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
		// Register the root view
		this.registerView(
			VIEW_TYPE_ROOT,
			(leaf) => new RootView(leaf)
		);

		// Add a ribbon icon to activate the view
		this.addRibbonIcon("activity", "Strava Data", () => {
			this.activateView();
		});
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
