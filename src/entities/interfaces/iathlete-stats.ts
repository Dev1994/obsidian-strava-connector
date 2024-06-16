export interface ActivityTotals {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
    achievement_count?: number;
  }
  
  export interface AthleteStats {
    biggest_ride_distance: number;
    biggest_climb_elevation_gain: number;
    recent_ride_totals: ActivityTotals;
    all_ride_totals: ActivityTotals;
    recent_run_totals: ActivityTotals;
    all_run_totals: ActivityTotals;
    recent_swim_totals: ActivityTotals;
    all_swim_totals: ActivityTotals;
    ytd_ride_totals: ActivityTotals;
    ytd_run_totals: ActivityTotals;
    ytd_swim_totals: ActivityTotals;
  }