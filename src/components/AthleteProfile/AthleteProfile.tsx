import { DetailedAthlete } from "strava-types";

interface AthleteProfileProps {
    data: DetailedAthlete;
}

export const AthleteProfile = ({ data: athlete }: AthleteProfileProps) => {
    return (
        <table className={"athlete-table"}>
            <tbody>
                <tr className={"athlete-table-cell"}><th>Attribute</th><th>Value</th></tr>
                {Object.entries(athlete).map(([key, value]) => (
                    <tr key={key} className={"athlete-table-cell"}>
                        <td>{key}</td>
                        <td>{typeof value === "boolean" ? value ? "Yes" : "No" : value}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};