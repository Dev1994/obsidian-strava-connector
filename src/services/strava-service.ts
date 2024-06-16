import axios from "axios";
import { AthleteService } from "./interfaces/athlete-service";
import { AthleteData } from "src/entities/interfaces/iathlete-data";
import { AthleteStats } from "src/entities/interfaces/iathlete-stats";
import { SummaryActivity } from "./interfaces/isummary-activity";
import { DateTime } from "luxon";
import { access } from "fs";

/**
 * Service class for interacting with the Strava API.
 */
class StravaService implements AthleteService {

    /**
     * @inheritdoc
     */
    public async authoriseAthlete(): Promise<void> {
        const response = await axios.get<AthleteData>('https://www.strava.com/oauth/authorize');
    }

    /**
     * @inheritdoc
     */
    public async getAthleteData(token: string): Promise<AthleteData> {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get<AthleteData>('https://www.strava.com/api/v3/athlete', config);
        return response.data;
    }

    /**
     * @inheritdoc
     */
    public async getAthleteStats(token: string, id: number): Promise<AthleteStats> {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get<AthleteStats>(`https://www.strava.com/api/v3/athletes/${id}/stats`, config);
        return response.data;
    }

    /**
     * @inheritdoc
     */
    public async getAthleteActivities(token: string): Promise<SummaryActivity[]> {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                before: DateTime.utc().startOf('week').toSeconds(),
                after: DateTime.utc().endOf('week').toSeconds(),
                page: 1,
                perPage: 5
            }
        };
        const response = await axios.get<SummaryActivity[]>(`https://www.strava.com/api/v3/athlete/activities`, config);
        return response.data;
    }

}

export const stravaService = new StravaService();