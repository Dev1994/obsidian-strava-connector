export interface MetaAthlete {
    id: number;
    resource_state: number;
}

export interface PolylineMap {
    id: string;
    summary_polyline: null | string;
    resource_state: number;
}

export interface SummaryActivity {
    resource_state: number;
    athlete: MetaAthlete;
    name: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    total_elevation_gain: number;
    type: string;
    sport_type: string;
    workout_type: null | string;
    id: number;
    external_id: string;
    upload_id: number;
    start_date: string;
    start_date_local: string;
    timezone: string;
    utc_offset: number;
    start_latlng: null | [number, number];
    end_latlng: null | [number, number];
    location_city: null | string;
    location_state: null | string;
    location_country: string;
    achievement_count: number;
    kudos_count: number;
    comment_count: number;
    athlete_count: number;
    photo_count: number;
    map: PolylineMap;
    trainer: boolean;
    commute: boolean;
    manual: boolean;
    private: boolean;
    flagged: boolean;
    gear_id: string;
    from_accepted_tag: boolean;
    average_speed: number;
    max_speed: number;
    average_cadence: number;
    average_watts: number;
    weighted_average_watts: number;
    kilojoules: number;
    device_watts: boolean;
    has_heartrate: boolean;
    average_heartrate: number;
    max_heartrate: number;
    max_watts: number;
    pr_count: number;
    total_photo_count: number;
    has_kudoed: boolean;
    suffer_score: number;
}