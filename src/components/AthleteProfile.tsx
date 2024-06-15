import { useQuery } from "@tanstack/react-query";
import { stravaService } from "../services/strava-service";

export const AthleteProfile = () => {

    const { data: athlete, isLoading, isError } = useQuery({
        queryKey: ['athlete'],
        queryFn: () => stravaService.getAthleteData("GET_YOUR_OWN_ACCESS_TOKEN")
    });

    if (isLoading) return <h1>Loading....</h1>;
    if (isError) return <h1>Error loading data!!!</h1>;
    if (!athlete) return <h1>No athlete returned for the athlete!!!</h1>;

    return (
        <div>
            <h1>{athlete.firstname}'s Profile</h1>
            <p>ID: {athlete.id}</p>
            <p>Username: {athlete.username ?? 'N/A'}</p>
            <p>Resource State: {athlete.resource_state}</p>
            <p>Last Name: {athlete.lastname}</p>
            <p>Bio: {athlete.bio}</p>
            <p>City: {athlete.city}</p>
            <p>State: {athlete.state}</p>
            <p>Country: {athlete.country}</p>
            <p>Sex: {athlete.sex}</p>
            <p>Premium: {athlete.premium ? 'Yes' : 'No'}</p>
            <p>Summit: {athlete.summit ? 'Yes' : 'No'}</p>
            <p>Badge Type ID: {athlete.badge_type_id}</p>
            <p>Weight: {athlete.weight}</p>
            <p>
                Profile Medium: <img src={athlete.profile_medium} alt="Profile Medium" style={{ borderRadius: '8px' }} />
            </p>
            <p>
                Profile: <img src={athlete.profile} alt="Profile" style={{ borderRadius: '8px' }} />
            </p>
            <p>Friend: {athlete.friend}</p>
            <p>Follower: {athlete.follower}</p>
        </div>
    );
};
