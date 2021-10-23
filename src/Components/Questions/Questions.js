import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { quitGame, submitGame } from "../../Reducers/gamesReducer";
import Question from "./Question";
import Players from "../Players/Players";

const Questions = ({ gameId, status }) => {
  const dispatch = useDispatch();
  const { title, players } = useSelector((state) => state.games.games[gameId]);
  const questions = useSelector((state) => state.games.questions);
  const [userScore, setUserScore] = useState(0);

  const updateScoreOnAnswer = (isCorrect) => {
    const points = isCorrect ? 10 : 0;
    setUserScore((prevScore) => {
      const updatedScore = prevScore + points;
      return updatedScore;
    });
  };

  const onClickQuitGame = (e) => {
    dispatch(quitGame());
  };

  const onSubmitAnswers = (e) => {
    dispatch(submitGame(gameId, userScore));
  };

  return (
    <div>
      <h3>{title}</h3>
      <button type="button" className="btn btn-dark" onClick={onClickQuitGame}>
        {status === "finished" ? "Back Home" : "Quit Game"}
      </button>
      {status === "finished" ? (
        <Players players={players} />
      ) : (
        <>
          {questions.map((question) => {
            return (
              <Question
                key={question.questionText}
                {...question}
                updateScoreOnAnswer={updateScoreOnAnswer}
              />
            );
          })}
          <button
            type="button"
            className="btn btn-primary"
            onClick={onSubmitAnswers}
          >
            Submit Answers
          </button>
        </>
      )}
    </div>
  );
};

export default Questions;
