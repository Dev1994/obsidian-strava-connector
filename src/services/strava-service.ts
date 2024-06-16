import axios from "axios";
import { AthleteService } from "./interfaces/athlete-service";
import { AthleteData } from "src/entities/interfaces/iathlete-data";
import { AthleteStats } from "src/entities/interfaces/iathlete-stats";

/**
 * Service class for interacting with the Strava API.
 */
class StravaService implements AthleteService {

    /**
     * Retrieves athlete data from the Strava API.
     * @param token - The access token for authenticating the request.
     * @returns A promise that resolves to the athlete data.
     */
    public async getAthleteData(token: string): Promise<AthleteData> {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get<AthleteData>('https://www.strava.com/api/v3/athlete', config);
        return response.data;
    }

    /**
     * Retrieves the statistics of an athlete from the Strava API.
     * @param token - The access token for authentication.
     * @param id - The ID of the athlete.
     * @returns A Promise that resolves to the activity stats of an athlete. Only includes data from activities set to Everyone visibility.
     */
    public async getAthleteStats(token: string, id: number): Promise<AthleteStats> {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get<AthleteStats>(`https://www.strava.com/api/v3/athletes/${id}/stats`, config);
        return response.data;
    }

}

export const stravaService = new StravaService();