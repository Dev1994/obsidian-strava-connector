import axios from "axios";
import { AthleteService } from "./interfaces/athlete-service";

/**
 * Service class for interacting with the Strava API.
 */
class StravaService implements AthleteService {

    /**
     * Retrieves athlete data from the Strava API.
     * @param token - The access token for authenticating the request.
     * @returns A promise that resolves to the athlete data.
     */
    async getAthleteData(token: string): Promise<AthleteData> {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get<AthleteData>('https://www.strava.com/api/v3/athlete', config);
        return response.data;
    }
}

export const stravaService = new StravaService();