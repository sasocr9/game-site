import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useTitle from "../hooks/useTitle";

const Search = () => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q") || "";
  const [searchedGames, setSearchedGames] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(queryTerm);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${
            import.meta.env.VITE_RAWG_API_KEY
          }&search=${queryTerm}`
        );
        const data = await response.json();
        setSearchedGames(data.results.filter(({ ratings_count }) => ratings_count > 10));
        console.log(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, [queryTerm]);

  useTitle(`Search result for ${queryTerm}`);

  return (
    <main>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <section>
            <p className="text-3xl text-gray-700 dark:text-white my-4 p-2 text-center sm:text-left">
              {searchedGames.length === 0
                ? `No results found for '${queryTerm}'`
                : `Results for '${queryTerm}'`}
            </p>
          </section>
          <section className="max-w-7xl mx-auto pt-0">
            <div
              className={`flex justify-center flex-wrap gap-2 sm:justify-between sm:flex-wrap `}
            >
              {searchedGames.map((game) => (
                <Card key={game.id} game={game} />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default Search;
