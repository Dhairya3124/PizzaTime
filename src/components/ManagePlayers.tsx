import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PlayerResponse } from '../lib/types';
const ManagePlayers: React.FC = () => {
  const [players, setPlayers] = useState<PlayerResponse[]>([]);
  const fetchPlayers = async () => {
    const res = await axios.get('http://localhost:5000/api/v1/player');
    console.log(res.data);
    setPlayers(res.data);
  };
  useEffect(() => {
    fetchPlayers();
  }, []);

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
              <td className="whitespace-nowrap items-center px-4 py-2 font-medium text-gray-900 dark:text-white">
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
                <a
                  href="#"
                  className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ManagePlayers;
