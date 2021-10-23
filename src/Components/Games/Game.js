import React from "react";
import { useDispatch } from "react-redux";
import { startNewGame } from '../../Reducers/gamesReducer';

const Game = ({ title, id, players }) => {

  const dispatch = useDispatch();

  const OnJoinGameClick = e => {
    dispatch(startNewGame(id));
  }

  return (
    <div key={id}>
      <h3>
        {`Game Name: ${title} - ${players.length} players already played!`}
        <button type="button" className="btn btn-primary" onClick={OnJoinGameClick}>Join Game</button>
      </h3>
    </div>
  );
};

export default Game;
