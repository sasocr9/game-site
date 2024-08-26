import { useEffect, useState } from "react";

function useFetch(api) {
  const [data, setData] = useState([]);
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
          body: `fields *, cover.url,videos; 
                ${api}
                limit 20;`,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`API Error: ${errorData.message}`);
        }

        const json = await response.json();
        setLoading(false);
        setData(json);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGames();
  }, [api, apiUrl]);

  return { data, loading };
}

export default useFetch;
