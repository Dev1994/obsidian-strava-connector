import StravaConnectorPlugin from "main";
import { PluginSettingTab, App, Setting } from "obsidian";
import { StravaApplicationDetailsModal } from "../modals/strava-application-details-modal";
import auth from "../services/auth-service";

export class StravaActivitiesSettingTab extends PluginSettingTab {
    plugin: StravaConnectorPlugin;

    constructor(app: App, plugin: StravaConnectorPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        new Setting(containerEl)
            .setName("Enter Strava Credentials")
            .setDesc("Set Strava Credentials")
            .addButton((button) =>
                button
                    .setButtonText("Enter Strava Credentials")
                    // TODO: set button class
                    .onClick((me) =>
                        new StravaApplicationDetailsModal(
                            this.app,
                            this.plugin
                        ).open()
                    )
            );
        new Setting(containerEl)
            .setName("Authenticate")
            .setDesc("Authenticate your Strava account")
            .addButton((button) =>
                button
                    .setButtonText("Authenticate")
                    .onClick(() => {
                        auth.authenticate(this.plugin.settings.authSettings);
                    }
                    )
            );
    }
}