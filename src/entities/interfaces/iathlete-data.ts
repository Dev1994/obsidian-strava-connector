interface AthleteData {
    id: number;
    username: string | null; // Updated to allow null
    resource_state: number;
    firstname: string;
    lastname: string;
    bio: string; // Added
    city: string;
    state: string;
    country: string;
    sex: string;
    premium: boolean;
    summit: boolean; // Added
    created_at: string;
    updated_at: string;
    badge_type_id: number;
    weight: number; // Kept as it's present in the JSON
    profile_medium: string;
    profile: string;
    friend: null;
    follower: null;
}