import "./App.css";
import Questions from "./Components/Questions/Questions";
import Games from "./Components/Games/Games";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

function App() {
  const gameId = useSelector((state) => state.games.currentGame.gameId);
  const gameStatus = useSelector((state) => state.games.currentGame.status);
  const { loading } = useSelector((state) => state.async);

  return (
    <div className="App">
      <ToastContainer position='bottom-right' />
      <header className="App-header">
          <h2>Game Manager</h2>
      </header>
      {!loading ? <section>
      {gameId === null ? (
          <Games />
        ) : (
          <Questions gameId={gameId} status={gameStatus} />
        )}
      </section> : <h3>Game is Loading please wait...</h3>}
    </div>
  );
}

export default App;
