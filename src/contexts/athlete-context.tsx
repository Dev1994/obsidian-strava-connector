import { createContext } from 'react';
import { AthleteData } from '../entities/interfaces/iathlete-data';

export const AthleteContext = createContext<AthleteData | undefined>(undefined);