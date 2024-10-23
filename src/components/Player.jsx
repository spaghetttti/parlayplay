export function Player({ player }) {
  return (
    <li className="flex flex-col text-white border rounded p-2 m-2 bg-teal-700">
      <p>full name: {player.fullName}</p>
      <p>team: {player.teamName}</p>
    </li>
  );
}
