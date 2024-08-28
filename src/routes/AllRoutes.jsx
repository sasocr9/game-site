import { Routes, Route } from "react-router-dom";
import { GameDetail, GamesList, PageNotFound, Search } from "../pages";

export const AllRoutes = () => {
  const today = (function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  })();

  const latest = "dates=2024-01-01," + today + "&exclude_collection=123";
  const popular = `metacritic=85,100&ordering=-metacritic&dates=2020-01-01,2024-12-31`;
  const top =
    "metacritic=90,97&ordering=-metacritic&dates=2000-06-01,2024-12-31";
  const upcoming = `dates=${today},2025-12-30`;

  return (
    <div className="dark:bg-darkbg">
      <Routes>
        <Route
          path="/"
          element={
            <GamesList
              heading="Latest Releases"
              api={latest}
              title="GameFiesta || Home"
              ratings={15}
              latest={"true"}
            />
          }
        />
        <Route path="title/:id" element={<GameDetail />} />
        <Route
          path="games/popular"
          element={
            <GamesList
              heading="Popular Games"
              api={popular}
              title="GameFiesta || Popular"
              ratings={15}
            />
          }
        />
        <Route
          path="games/top"
          element={
            <GamesList
              heading="Top Rated"
              api={top}
              title="GameFiesta || Top Rated"
              ratings={15}
            />
          }
        />
        <Route path="search" element={<Search />} />
        <Route
          path="games/upcoming"
          element={
            <GamesList
              heading="Upcoming"
              api={upcoming}
              title="GameFiesta || Upcoming"
              ratings={2}
            />
          }
        />
        <Route path="*" element={<PageNotFound title="Page Not Found" />} />
      </Routes>
    </div>
  );
};
