import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PlayerResponse } from '../lib/types';
import BuyPizzaModal from './BuyPizzaModal';
import LogPizzaModal from './LogPizzaModal';
import PizzaHistory from './PizzaHistory';

const PlayersInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [player, setPlayer] = useState<PlayerResponse | null>(null);
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [openLogModal, setOpenLogModal] = useState(false);

  const submitBuyPizza = async (player: PlayerResponse) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/pizza/${player.id}`,
        player
      );
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  };
  const submitLogPizza = async (player: PlayerResponse) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/logged-pizza/${player.id}`,
        player
      );
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  };
  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/player/${id}`
        );
        console.log(res.data);
        setPlayer(res.data);
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    fetchPlayer();
  }, [id]);

  if (!player) {
    return <div>Loading...</div>;
  }
  console.log(player);

  return (
    <div>
      <div className="flow-root">
        <dl className="-my-3 divide-y divide-gray-100 text-sm dark:divide-gray-700">
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900 dark:text-white">Name</dt>
            <dd className="text-gray-700 sm:col-span-2 dark:text-white">
              {player.name}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900 dark:text-white">Age</dt>
            <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
              {player.age}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900 dark:text-white">
              Gender
            </dt>
            <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
              {player.gender}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900 dark:text-white">Coins</dt>
            <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
              {player.coins}
            </dd>
          </div>
        </dl>
      </div>
      <div className="flex text-white items-center justify-center space-x-10 py-10">
        <button className="bg-sky-500 hover:bg-sky-700 p-2 rounded-lg">
          Edit ✏️
        </button>
        <button className="bg-red-600 hover:bg-red-700 p-2 rounded-lg">
          Delete ❌
        </button>
        <button
          className="bg-orange-500 hover:bg-orange-700 p-2 rounded-lg"
          onClick={() => setOpenBuyModal(true)}
        >
          {' '}
          Buy Pizza 🍕
        </button>
        {openBuyModal && (
          <BuyPizzaModal
            isOpen={openBuyModal}
            onClose={() => setOpenBuyModal(false)}
            onSave={data => {
              console.log(data);
              player.logged_pizza = data;
              player.coins = player.coins - 100;
              submitBuyPizza(player);
              setOpenBuyModal(false);
            }}
          />
        )}

        <button
          className="bg-green-500 hover:bg-green-700 p-2 rounded-lg"
          onClick={() => setOpenLogModal(true)}
        >
          Log Pizza ✍
        </button>
        {openLogModal && (
          <LogPizzaModal
            isOpen={openLogModal}
            onClose={() => setOpenLogModal(false)}
            onSave={data => {
              console.log(data);
              player.logged_pizza = data;
              submitLogPizza(player);
              setOpenLogModal(false);
            }}
          />
        )}
      </div>
      <div className='items-center justify-center text-center'>
      <h1 className='text-4xl font-bold p-10 items-center justify-center mx-auto text-center'>Pizza History</h1>
      <PizzaHistory player={player} />
    </div>
    </div>
  );
};

export default PlayersInfo;
