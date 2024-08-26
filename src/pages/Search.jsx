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

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl = "https://api.igdb.com/v4/games";
  const url = `${proxyUrl}${apiUrl}`;

  const urlApi = import.meta.env.MODE === "development" ? "/api" : url;

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${urlApi}/games`, {
          method: "POST",
          headers: {
            "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
            Authorization: `Bearer ${import.meta.env.VITE_TWITCH_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: `fields *, cover.url,videos;where name ~ "${queryTerm}"*;sort rating desc;limit 20;`,
        });
        const data = await response.json();
        setSearchedGames(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, [apiUrl,queryTerm]);

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
