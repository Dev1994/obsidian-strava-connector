import { AthleteData } from "src/entities/interfaces/iathlete-data";
import { AthleteStats } from "src/entities/interfaces/iathlete-stats";
import { SummaryActivity } from "./isummary-activity";

/**
 * Represents a service for retrieving athlete data.
 */
export interface AthleteService {
    /**
     * Authorises the athlete to access the Strava API.
     */
    authoriseAthlete(): void;

    /**
     * Retrieves athlete data using the provided token.
     * @param token - The access token for authentication.
     * @returns A promise that resolves to the athlete data.
     */
    getAthleteData(token: string): Promise<AthleteData>;

    /**
     * Retrieves athlete statistics using the provided token and athlete ID.
     * @param token - The access token for authentication.
     * @param id - The ID of the athlete.
     * @returns A promise that resolves to the athlete statistics.
     */
    getAthleteStats(token: string, id: number): Promise<AthleteStats>;

    /**
     * Retrieves the activities of the authenticated athlete using the provided token.
     * @param token - The access token for authentication.
     * @returns A promise that resolves to the summary of the athlete's activities.
     */
    getAthleteActivities(token: string): Promise<SummaryActivity[]>;
}