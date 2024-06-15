import { App } from 'obsidian';
import { createContext } from 'react';

/**
 * Context for the Obsidian app.
 * @remarks
 * This context provides access to the Obsidian `App` object.
 */
export const AppContext = createContext<App | undefined>(undefined);