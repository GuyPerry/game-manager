import React from "react";
import { useSelector } from "react-redux";
import Game from "./Game";

const Games = () => {
  const games = useSelector((state) => state.games.games);

  return (
    <div>
      {Object.values(games).map((game) => {
        return <Game key={game.id} {...game} />;
      })}
    </div>
  );
};

export default Games;
