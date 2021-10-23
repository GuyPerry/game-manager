import { delay } from "../util/util";
import games from "../MOCK_DATA/Mock_Games";
import questions from "../MOCK_DATA/Mock_Questions";
import users from "../MOCK_DATA/Mock_Users";

export function fetchGamesData() {
  return delay(1000).then(() => {
    return Promise.resolve(games);
  });
}

export function fetchUsersData() {
  return delay(1000).then(() => {
    return Promise.resolve(users);
  });
}

export function fetchQuestionsById(gameId) {
  return delay(1000).then(() => {
    return Promise.resolve(questions[gameId]);
  });
}
