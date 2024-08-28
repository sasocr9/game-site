import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import useTitle from "../hooks/useTitle";

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/${id}?key=${
            import.meta.env.VITE_RAWG_API_KEY
          }`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        setGame(json);
        console.log(json);
      } catch (error) {
        console.error("Error fetching game:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [id]);

  const renderStars = (rating) => {
    const maxStars = 5;
    const stars = ((rating ));
    return (
      <div className="flex">
        {[...Array(maxStars)].map((_, index) => (
          <svg
            key={index}
            className={`w-6 h-6 ${
              index < stars ? "text-yellow-500" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 17.27l6.18 3.73-1.64-7.03 5.46-4.73-7.19-.61L12 2.5 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
          </svg>
        ))}
      </div>
    );
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert from Unix timestamp
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  useTitle(`${game.name}/ GameFiesta`);

  const {
    background_image,
    rating,
    slug,
    description_raw,
    name,
    genres,
    publishers,
    ratings_count,
  } = game;
  console.log(publishers);
  return (
    <main>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <section className="flex justify-around flex-wrap py-1 gap-1">
          <div className="max-w-lg flex items-start">
            <img
              src={background_image}
              alt={name}
              className="rounded h-[50vh] sm:h-[80vh] p-3 pt-6  object-cover"
            />
          </div>
          <div className="max-w-2xl text-gray-700 text-lg dark:text-white text-center sm:text-start">
            <h1 className="text-4xl font-bold my-5 text-center lg:text-left">
              {game.name}
            </h1>
            {rating && (
              <div className="flex items-center my-4 justify-center sm:justify-start">
                {renderStars(rating)}
                <span className="ml-2 text-gray-600 dark:text-gray-400 ">
                  ({(rating) }) {ratings_count} Reviews
                </span>
              </div>
            )}
            {game.first_release_date && (
              <p className="my-4">
                <strong>Release Date:</strong>{" "}
                {formatDate(game.first_release_date)}
              </p>
            )}
            {publishers.length > 0 && (
              <span key={id} className="font-bold text-orange-500 text-xl">
                Developers:
              </span>
            )}

            {publishers.length > 0 &&
              publishers.map(({ name }) => (
                <>
                  <span className="mr-2 border border-gray-200 rounded bg-slate-700 text-white dark:border-gray-600 p-2 mx-2 text-center">
                    {name}
                  </span>
                </>
              ))}
            {genres.length > 0 && (
              <p className="my-7 flex flex-wrap gap-2 justify-center sm:justify-start">
                {genres.map(({ id, name }) => (
                  <span
                    key={id}
                    className="mr-2 border border-gray-200 rounded bg-slate-700 text-white dark:border-gray-600 p-2"
                  >
                    {name}
                  </span>
                ))}
              </p>
            )}
            <p className="my-4 line-clamp-[10]">{description_raw}</p>

            {slug && (
              <p className="my-4">
                <a
                  href={`https://www.igdb.com/games/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-20"
                >
                  View on IGDB
                </a>
              </p>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default GameDetail;
