import "./index.css";
import { useEffect, useState } from "react";
import { Players } from "./components/Players";
import { Search } from "./components/Search";

function App() {
  const [players, setPlayers] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function fetchPlayers(searchTerm) {
    setLoading(true);
    try {
      const result = await fetch(
        `https://staging.parlayplay.io/api/v1/crossgame/search/?sport=All&league=&includeAlt=true&${new URLSearchParams(
          { search: searchTerm || "" }
        )}`,
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "X-Parlay-Request": 1,
          },
        }
      );
      const data = await result.json();
      const playersInfo = data.players.map((data) => {
        const res = {};
        res.imageUrl = data.player.image;
        res.fullName = data.player.fullName;
        res.teamName = data.player?.team?.teamname || "";
        return res;
      });
      setPlayers(playersInfo);
    } catch (error) {
      console.log(error); //better error handling
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPlayers();
  }, []);

  const debounce = (fn, time = 300) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, time);
    };
  };

  const handleSearchTermChange = debounce((event) => {
    const searchTerm = event.target.value.trim();
    if (searchTerm.length > 3) {
      setSearchTerm(searchTerm);
      fetchPlayers(searchTerm);
    }
  });

  return (
    <div className="p-4">
      <Search
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
      />
      {isLoading ? <>loading...</> : <Players players={players} />}
    </div>
  );
}

export default App;
