import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Represents a React component that displays a random joke fetched from an API.
 */
export const ReactView = () => {

    /**
     * Represents a query for fetching a random joke.
     *
     * @remarks
     * This query fetches a random joke from the official joke API.
     */
    const randomJokeQuery = useQuery({
        queryKey: ['jokes', 'random-joke'],
        queryFn: async () => {
            const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
            const data = await response.data;
            return data;
        }
    });
    
    if (randomJokeQuery.isLoading) return <h1>Loading....</h1>;
    if (randomJokeQuery.isError) return <h1>Error loading data!!!</h1>;
    
    return (
        <div>
            <h1>Type of joke: {randomJokeQuery.data.type}</h1>
            <h2>{randomJokeQuery.data.setup}</h2>
            <br />
            <h2>{randomJokeQuery.data.punchline}</h2>
        </div>
    );
};
