import { createContext } from 'react';
import { DetailedAthlete } from 'strava-types';

export const AthleteContext = createContext<DetailedAthlete | undefined>(undefined);