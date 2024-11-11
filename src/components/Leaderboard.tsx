import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PlayerResponse } from '../lib/types';


const Leaderboard: React.FC = () => {
  const [players, setPlayers] = useState<PlayerResponse[]>([]);
  const fetchPlayers = async () => {
    const res = await axios.get('http://localhost:5000/api/v1/leaderboard');
    console.log(res.data);
    setPlayers(res.data);
  };
  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <div className='items-center justify-center text-center'>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-black dark:bg-black">
        <thead className="">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Number of Pizza Slices logged in
            </th>
            
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-black">
          {players.map(p => (
            <tr key={p.id}>
              <td className="whitespace-nowrap items-center px-4 py-2 font-medium text-gray-900 dark:text-white">
                {p.name}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                {p.total_pizza}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};
export default Leaderboard;
