import { StrictMode } from "react";
import { ItemView, WorkspaceLeaf } from "obsidian";
import { Root, createRoot } from "react-dom/client";
import { StravaDashboard } from "./components/StravaDashboard/StravaDashboard";
import { AppContext } from "./contexts/app-context";
import { SettingsContext } from "./contexts/settings-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
export const VIEW_TYPE_ROOT = "root-view";

/**
 * Represents the root view of the plugin.
 */
export class RootView extends ItemView {
	root: Root | null = null;
	settings: any;

	constructor(leaf: WorkspaceLeaf, settings: any) {
		super(leaf);
		this.settings = settings;
	}

	getViewType() {
		return VIEW_TYPE_ROOT;
	}

	getDisplayText() {
		return "Strava Dashboard";
	}

	async onOpen() {
		this.root = createRoot(this.containerEl.children[1]);
		this.root.render(
			<StrictMode>
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools initialIsOpen={false} />
					<AppContext.Provider value={this.app}>
						<SettingsContext.Provider value={this.settings} >
							<StravaDashboard />
						</SettingsContext.Provider>
					</AppContext.Provider>
				</QueryClientProvider>
			</StrictMode>
		);
	}

	async onClose() {
		this.root?.unmount();
	}
}