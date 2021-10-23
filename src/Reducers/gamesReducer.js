import { toast } from "react-toastify";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "./ayncReducer";
import {
  fetchGamesData,
  fetchQuestionsById,
  fetchUsersData,
} from "../api/mockApi";

const FETCH_GAMES = "FETCH_GAMES";
const START_NEW_GAME = "START_NEW_GAME";
const SUBMIT_GAME = "SUBMIT_GAME";
const QUIT_GAME = "QUIT_GAME";
const ADD_USER_TO_GAME = "ADD_USER_TO_GAME";
const UPDATE_USER_SCORE = "UPDATE_USER_SCORE";

export function fetchGames() {
  return async (dispatch) => {
    dispatch(asyncActionStart());
    try {
      const games = await fetchGamesData();
      const users = await fetchUsersData();
      dispatch({ type: FETCH_GAMES, payload: { games, users } });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export const startNewGame = (id) => {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const questions = await fetchQuestionsById(id);
      dispatch({ type: START_NEW_GAME, payload: { id, questions } });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
      toast.error(error);
    }
  };
};

export const addUserToGame = (id, score) => {
  return {
    type: ADD_USER_TO_GAME,
    payload: { id, score },
  };
};

export const submitGame = (gameId, userScore) => {
  return {
    type: SUBMIT_GAME,
    payload: { gameId, userScore },
  };
};

export const quitGame = () => {
  return {
    type: QUIT_GAME,
    payload: {},
  };
};

const initialState = {
  games: {},
  currentGame: { gameId: null, status: "" },
  questions: [],
  players: [],
};

const gamesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_GAMES: {
      return {
        ...state,
        games: payload.games,
        players: payload.users,
      };
    }
    case START_NEW_GAME: {
      const newGame = state.games[payload.id];
      const players = [...newGame.players];
      if (players.some((player) => player.id === 42)) {
        players.find((player) => player.id === 42).score = 0;
      } else {
        players.push({ id: 42, score: 0 });
      }

      return {
        ...state,
        currentGame: {
          gameId: payload.id,
          status: "new",
        },
        questions: payload.questions,
        games: {
          ...state.games,
          [payload.id]: {
            ...newGame,
            players: players,
          },
        },
      };
    }
    case SUBMIT_GAME: {
      const gameFinished = state.games[payload.gameId];
      const players = [...gameFinished.players];
      players.find((player) => player.id === 42).score = payload.userScore; //for demo current user is always num #42
      return {
        ...state,
        currentGame: {
          gameId: payload.gameId,
          status: "finished",
        },
        games: {
          ...state.games,
          [payload.gameId]: {
            ...gameFinished,
            players: [...players],
          },
        },
      };
    }
    case QUIT_GAME: {
      return {
        ...state,
        currentGame: {
          gameId: null,
          status: "",
        },
        questions: [],
      };
    }
    case ADD_USER_TO_GAME: {
      const updatedGames = state.games.filter((game) => game.id === payload.id);
      updatedGames.players.push({ id: payload.newUserId, score: 0 });
      return {
        ...state,
        games: updatedGames,
      };
    }
    case UPDATE_USER_SCORE: {
      const updatedGames = state.games.filter((game) => game.id === payload.id);
      updatedGames.players.find(
        (player) => player.id === payload.playerId
      ).score += payload.score;
      return {
        ...state,
        games: updatedGames,
      };
    }
    default: {
      return state;
    }
  }
};

export default gamesReducer;
