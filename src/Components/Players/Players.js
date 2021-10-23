import React from 'react';
import Player from './Player';

const Players = ({ players }) => {

    const sortedPlayers = players.sort((a,b) => b.score - a.score);
    return (
        <div>
            <h2>Leaderboard</h2>
            <section>
            {sortedPlayers.map((player, i) => {
                return <Player key={player.id} {...player} rank={i+1} />
            })}
            </section>
        </div>
    )
}

export default Players;