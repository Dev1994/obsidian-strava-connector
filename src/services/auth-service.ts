import { default as stravaApi, RateLimiting, AuthenticationConfig } from "strava-v3";
import { Notice, ObsidianProtocolData } from "obsidian";
import { DateTime } from "luxon";

export interface Token {
    token_type: string
    expires_at: number
    expires_in: number
    refresh_token: string
    access_token: string
    athlete: any
}

class AuthService {
    private token: Token | null;
    private code: string;
    private authConfig: AuthenticationConfig;

    constructor() { }

    public async authenticate(authConfig: AuthenticationConfig) {
        try {
            this.authConfig = authConfig;
            stravaApi.config(authConfig);
            const url = await stravaApi.oauth.getRequestAccessURL({
                scope: "activity:read_all",
            });
            await open(url, undefined);
        } catch (error) {
            console.log("Error while authenticating", error);
            new Notice(
                "Error authenticating. Please make sure to set Client ID and Client Secret in plugin settings first."
            );
        }
    }

    public async OAuthCallback(args: ObsidianProtocolData) {
        if (args.scope != "read,activity:read_all") {
            new Notice("Please authorize required permissions.");
            return;
        }
        try {
            this.code = args.code;
            const token = await stravaApi.oauth.getToken(args.code);
            this.onTokenUpdated(token);
            new Notice("Authenticated with Strava");
        } catch (err) {
            new Notice("Could not authenticate user");
        }
    }

    public async validateToken() {
        if (!this.token || !this.token.access_token) {
            throw Error("Please login first");
        }
        const tokenExpiresIn = DateTime.fromSeconds(this.token.expires_at, {
            zone: "utc",
        }).diffNow("seconds");
        if (tokenExpiresIn.seconds < 10) {
            const refreshResponse = await stravaApi.oauth.refreshToken(
                this.token.refresh_token
            );
            this.token = Object.assign(this.token, refreshResponse, this.token);
            this.onTokenUpdated(this.token);
        }
    }

    private validateUtilization(rateLimiting: RateLimiting) {
        const usageFraction = rateLimiting.fractionReached();
        console.log(`Strava API usage fraction reached: ${usageFraction}`);

        // happens when no usage data is available
        if (isNaN(usageFraction)) return true;

        if (usageFraction < 0.8) {
            return true;
        }

        return false;
    }

    private isSignedIn() {
        return (
            this.token && this.token.access_token && this.token.expires_in > 0
        );
    }

    private onTokenUpdated(token: Token | null) {
        this.token = token;
        this.authConfig.access_token = token?.access_token ?? "";
        stravaApi.config(this.authConfig);
        stravaApi.client(this.authConfig.access_token);
    }
}

const authInstance = new AuthService();

export default authInstance;