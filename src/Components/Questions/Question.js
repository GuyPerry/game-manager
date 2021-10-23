import React, { useState } from "react";

const Question = ({
  id: answerId,
  questionText,
  answers,
  answerIndex,
  updateScoreOnAnswer,
}) => {
  const [checkedAnswer, setCheckedAnswer] = useState(null);
  const [didAnswer, setDidAnswer] = useState(false);

  const onCheckboxChecked = (e, index) => {
    setCheckedAnswer(e.target.id);
    setDidAnswer(true);
    const isCorretAnswer = answerIndex === index;
    updateScoreOnAnswer(isCorretAnswer);
  };

  return (
    <div>
      <h4>{questionText}</h4>
      <ul>
        {answers.map((answer, index) => {
          return (
            <li key={answer}>
              <input
                onChange={(e) => onCheckboxChecked(e, index)}
                checked={checkedAnswer === answer}
                type="checkbox"
                disabled={didAnswer}
                id={answer}
              />
              <label htmlFor={answerId}> {answer} </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Question;
