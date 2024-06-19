import strava from "strava-v3";
import auth from "./auth-service";
import { SummaryActivity } from "strava-types";

class AthleteService {

    public async getActivities(args: { after: number; }): Promise<SummaryActivity[]> {
        try {
            await auth.validateToken();
            return await strava.athlete.listActivities(args);
        } catch (error) {
            throw error;
        }
    }
}

const athleteService = new AthleteService();
export default athleteService;