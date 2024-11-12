import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PlayerResponse } from '../lib/types';
import { Link } from 'react-router-dom';
const ManagePlayers: React.FC = () => {
  const [players, setPlayers] = useState<PlayerResponse[]>([]);
  const fetchPlayers = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/player`);
    console.log(res)
    console.log(res.data);
    //The data is in 0th index and 1st index consists status code
    setPlayers(res.data[0]);
  };
  useEffect(() => {
    fetchPlayers();
  }, []);
  if (!players) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-black dark:bg-black">
        <thead className="">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-left">
              Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-left">
              Age
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-left">
              Gender
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-left">
              Coins
            </th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-black">
          {players.map(player => (
            <tr key={player.id}>
              <td className="whitespace-nowrap items-center px-4 py-2 font-mediumtext-white">
                {player.name}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                {player.age}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                {player.gender}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                {player.coins}
              </td>
              <td className="whitespace-nowrap px-4 py-2">
                <Link
                  to={`/player/${player.id}`}
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ManagePlayers;
