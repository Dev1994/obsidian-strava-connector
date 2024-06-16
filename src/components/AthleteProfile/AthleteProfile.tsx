import { AthleteData } from "src/entities/interfaces/iathlete-data";

interface AthleteProfileProps {
    data: AthleteData;
}

export const AthleteProfile = ({ data: athlete }: AthleteProfileProps) => {
    return (
        <table className={"athlete-table"}>
            <tbody>
                <tr className={"athlete-table-cell"}><th>Attribute</th><th>Value</th></tr>
                {Object.entries(athlete).map(([key, value]) => (
                  <tr key={key} className={"athlete-table-cell"}>
                    <td>{key}</td>
                    <td>{typeof value === 'boolean' ? value ? 'Yes' : 'No' : value}</td>
                  </tr>
                ))}
            </tbody>
        </table>
    );
};