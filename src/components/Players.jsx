import { Player } from "./Player";

export function Players({ players }) {
  return (
    <ul className="">
      {players &&
        players.map((player) => (
          <Player key={player.fullName} player={player} />
        ))}
    </ul>
  );
}
