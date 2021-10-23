import React from "react";
import { useSelector } from "react-redux";

const Player = ({ id, score, rank }) => {
  const { userName } = useSelector(
    (state) => state.games.players.filter((player) => player.userId === id)[0]
  );

  return (
    <div key={id}>
      <h3>{`#${rank} ${userName} - score ${score}`}</h3>
    </div>
  );
};

export default Player;
