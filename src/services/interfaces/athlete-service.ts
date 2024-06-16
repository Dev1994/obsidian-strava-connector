import { AthleteData } from "src/entities/interfaces/iathlete-data";
import { AthleteStats } from "src/entities/interfaces/iathlete-stats";

/**
 * Represents a service for retrieving athlete data.
 */
/**
 * Represents a service for retrieving athlete data.
 */
export interface AthleteService {
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
}