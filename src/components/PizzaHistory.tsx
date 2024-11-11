import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PlayerResponse } from '../lib/types';


const PizzaHistory: React.FC<{ player: PlayerResponse }> = ({ player }) => {
  const [pizza, setPizza] = useState<PlayerResponse[]>([]);
  const fetchPlayers = async (player: PlayerResponse) => {
    const res = await axios.get(`http://localhost:5000/api/v1/logged-pizza/${player.id}`);
    console.log(res.data);
    setPizza(res.data);
  };
  useEffect(() => {
    fetchPlayers(player);
  }, [player]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-black dark:bg-black">
        <thead className="">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Number of Pizza Slices logged in
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Logged In at
            </th>
            
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-black">
          {pizza.map(p => (
            <tr key={p.id}>
              <td className="whitespace-nowrap items-center px-4 py-2 font-medium text-gray-900 dark:text-white">
                {p.logged_pizza}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                {p.date_created}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PizzaHistory;
