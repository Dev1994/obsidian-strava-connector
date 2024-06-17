import { useQuery } from '@tanstack/react-query';
import { AthleteProfile } from './AthleteProfile/AthleteProfile';
import { AthleteContext } from 'src/contexts/athlete-context';
import { useContext } from 'react';
import { SettingsContext } from 'src/contexts/settings-context';
import strava from 'strava-v3';

/**
 * React component that displays the Strava dashboard.
 */
export const StravaDashboard = () => {
    const settings = useContext(SettingsContext);

    const { data: athlete, isLoading, isError } = useQuery({
        queryKey: ['athlete'],
        queryFn: () => strava.athlete.get({ access_token: settings.authSettings.access_token }),
    });

    const { data: stats, isLoading: statsIsLoading, isError: statsIsError } = useQuery({
        queryKey: ['stats', athlete?.id],
        queryFn: () => strava.athletes.stats({ id: athlete.id, access_token: settings.authSettings.access_token }),
        enabled: !!athlete,
    });

    if (isLoading || statsIsLoading) return <h1>Loading....</h1>;
    if (isError || statsIsError) return <h1>Error loading data!!!</h1>;
    if (!athlete) return <h1>No athlete returned!!!</h1>;
    if (!stats) return <h1>No stats returned for the athlete!!!</h1>;

    return (
        <AthleteContext.Provider value={athlete}>
            <AthleteProfile data={athlete} />
        </AthleteContext.Provider>
        
    );
};
