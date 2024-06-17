import { createContext } from 'react';

/**
 * Context for the Obsidian settings.
 * @remarks
 * This context provides access to the Obsidian settings.
 */
export const SettingsContext = createContext<any | undefined>(undefined);