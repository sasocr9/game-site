import { useEffect, useState } from "react";

function useFetch(api, ratings) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading to true
  const [error, setError] = useState(null); // Add an error state

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${
            import.meta.env.VITE_RAWG_API_KEY
          }&${api}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`API Error: ${errorData.message}`);
        }

        const result = await response.json();
        setData(
          result.results.filter(({ ratings_count }) => ratings_count > ratings)
        ); // Update state with the fetched data
        console.log(result.results);
      } catch (error) {
        setError(error.message); // Set error message if an error occurs
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchGames();
  }, [api, ratings]); // Add year to dependency array if needed

  return { data, loading, error }; // Return error state along with data and loading
}

export default useFetch;
