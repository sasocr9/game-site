import { useEffect, useState } from "react";

function useFetch(api, ratings, latest) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}&${api}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`API Error: ${errorData.message}`);
        }

        const result = await response.json();
        let games = result.results.filter(({ ratings_count }) => ratings_count > ratings);

        if (latest) {
          games = games.sort((a, b) => new Date(b.released) - new Date(a.released));
        }

        setData(games);
        console.log(games);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [api, ratings, latest]);

  return { data, loading, error };
}

export default useFetch;
