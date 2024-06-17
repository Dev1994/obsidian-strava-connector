import StravaConnectorPlugin from "main"
import { Modal, App } from "obsidian"

export class StravaApplicationDetailsModal extends Modal {
	plugin: StravaConnectorPlugin
	constructor(app: App, plugin: StravaConnectorPlugin) {
		super(app)
		this.plugin = plugin
	}

	onOpen() {
		const { contentEl } = this
		const form = contentEl.createEl('div')
		form.createEl('label', { text: 'Client ID: ' })
		const clientIdElement = form.createEl('input', {
			type: 'number',
			attr: { id: 'clientId', name: 'clientId' },
			value: this.plugin.settings.authSettings.client_id,
		})
		form.createEl('br')
		form.createEl('br')
		form.createEl('label', { text: 'Client Secret: ' })
		const clientSecretElement = form.createEl('input', {
			type: 'password',
			attr: { id: 'clientSecret', name: 'clientSecret' },
			value: this.plugin.settings.authSettings.client_secret,
		})
		form.createEl('br')
		form.createEl('br')
		const saveInputElement = form.createEl('input', {
			type: 'button',
			value: 'Save',
		})
		saveInputElement.onClickEvent(() => {
			this.plugin.settings.authSettings.client_id = clientIdElement.value
			this.plugin.settings.authSettings.client_secret =
				clientSecretElement.value
			this.plugin.saveSettings()
			this.close()
		})
	}

	onClose() {
		this.contentEl.empty()
	}
}