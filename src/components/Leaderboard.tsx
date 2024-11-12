import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PlayerResponse } from '../lib/types';

const Leaderboard: React.FC = () => {
  const [players, setPlayers] = useState<PlayerResponse[]>([]);
  const fetchPlayers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/leaderboard`
      );
      setPlayers(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchPlayers();
  }, []);
  if (!players) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-5xl text-bold text-center font-medium p-5">
        {' '}
        Leaderboard🚀
      </h1>
      <div className="flex items-center justify-center text-center">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-xl dark:divide-black dark:bg-black">
            <thead className="">
              <tr>
                <th className="whitespace-nowrap px-8 py-4 font-medium text-gray-900 dark:text-white text-xl">
                  Name📛
                </th>
                <th className="whitespace-nowrap px-8 py-4 font-medium text-gray-900 dark:text-white text-xl">
                  Score🔥
                </th>

                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-black">
              {players.map(p => (
                <tr key={p.id}>
                  <td className="whitespace-nowrap items-center px-8 py-4 font-medium text-gray-900 dark:text-white">
                    {p.name}
                  </td>
                  <td className="whitespace-nowrap px-8 py-4 text-gray-700 dark:text-gray-200">
                    {p.total_pizza}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Leaderboard;
