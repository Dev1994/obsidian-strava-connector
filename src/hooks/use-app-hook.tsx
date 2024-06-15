import { useContext } from "react";
import { AppContext } from "../contexts/app-context";
import { App } from "obsidian";

/**
 * Custom hook that returns the current instance of the App context.
 * @returns The current instance of the App context.
 */
export const useApp = (): App | undefined => {
    return useContext(AppContext);
};