import { useEffect, useState } from "react";

function useFetch(api, ratings) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API}&${api}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`API Error: ${errorData.message}`);
        }

        const result = await response.json();
        setData(
          result.results.filter(({ ratings_count }) => ratings_count > ratings)
        );
        console.log(result.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [api, ratings]);

  return { data, loading, error };
}

export default useFetch;
