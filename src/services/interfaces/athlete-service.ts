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
}