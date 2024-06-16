import { useQuery } from '@tanstack/react-query';
import { stravaService } from 'src/services/strava-service';
import { AthleteProfile } from './AthleteProfile/AthleteProfile';
import { AthleteContext } from 'src/contexts/athlete-context';

/**
 * React component that displays the Strava dashboard.
 */
export const StravaDashboard = () => {

    const { data: athlete, isLoading, isError } = useQuery({
        queryKey: ['athlete'],
        queryFn: () => stravaService.getAthleteData("GET_YOUR_OWN_TOKEN")
    });

    const { data: stats, isLoading: statsIsLoading, isError: statsIsError } = useQuery({
        queryKey: ['stats', athlete?.id],
        queryFn: () => stravaService.getAthleteStats("GET_YOUR_OWN_TOKEN", athlete!.id),
        enabled: !!athlete,
    });

    if (isLoading) return <h1>Loading....</h1>;
    if (isError) return <h1>Error loading data!!!</h1>;
    if (!athlete) return <h1>No athlete returned for the athlete!!!</h1>;

    return (
        <AthleteContext.Provider value={athlete}>
            <AthleteProfile data={athlete} />
        </AthleteContext.Provider>
        
    );
};
