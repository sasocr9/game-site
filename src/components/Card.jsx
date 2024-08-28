import { Link } from "react-router-dom";
import PlatformList from "./PlatformList";

const Card = ({ game }) => {
  const {
    id,
    name,
    background_image,
    released,
    metacritic,
    ratings_count,
    platforms,
    rating,
  } = game;

  const backupImage = "https://via.placeholder.com/300x300?text=No+Image"; // Placeholder image URL

  return (
    <div className="max-w-[370px] sm:max-w-[400px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
      <Link to={`/title/${id}`}>
        <img
          className="h-[350px] w-[100%] object-cover rounded-t-lg"
          src={background_image}
          alt={name || "Game cover image"}
          onError={(e) => {
            e.target.src = backupImage; // Set the backup image on error
          }}
        />
      </Link>
      <div className="p-5">
        <Link to={`/title/${id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name || "No name"}
          </h5>
        </Link>

        <div className="flex justify-between mb-2">
          <p className="mb-3 font-normal text-lg text-gray-700 dark:text-gray-400">
            {released}
          </p>

          <div className="flex flex-col gap-4 justify-center items-center">
            <p className="bg-blue-100 text-blue-800 text-xl font-semibold inline-flex items-center text-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800 max-w-12">
              {metacritic || rating}
            </p>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
              {ratings_count} reviews
            </p>
          </div>
        </div>

        <PlatformList platforms={platforms} />

        <Link
          to={`/title/${id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Card;
