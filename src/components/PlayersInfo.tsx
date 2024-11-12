import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { PlayerResponse } from '../lib/types';
import BuyPizzaModal from './BuyPizzaModal';
import LogPizzaModal from './LogPizzaModal';
import PizzaHistory from './PizzaHistory';
import NewUser from './NewUser';
import Alert from './Alert';

const PlayersInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<PlayerResponse | null>(null);
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [openLogModal, setOpenLogModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [alert, setAlert] = useState<{ show: boolean; success: boolean }>({
    show: false,
    success: false
  });

  const submitBuyPizza = async (player: PlayerResponse) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/v1/pizza/${player.id}`,
        player
      );
      console.log(res.data);
      navigate(0);
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
      navigate(0);
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  };
  const handleSubmitPizza = (player: PlayerResponse) => {
    if (player.coins <= 0) {
      return false;
    } else {
      return true;
    }
  };
  const handleLogPizza = (player: PlayerResponse) => {
    if (player.total_pizza - player.logged_pizza < 0) {
      return false;
    } else {
      return true;
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
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ show: false, success: false });
      }, 3000); // Hide alert after 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [alert]);

  if (!player) {
    return <div>Loading...</div>;
  }
  console.log(player);
  const handleEditSuccess = () => {
    setEditMode(false);
    navigate(0);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/player/${id}`);
      navigate('/manage-players');
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  return (
    <div>
      <div className="flow-root">
        <div className="items-center justify-center text-center w-[150px] mx-auto">
          {alert.show && <Alert success={alert.success} />}
        </div>
        {editMode ? (
          <NewUser
            initialData={player}
            onSubmitSuccess={handleEditSuccess}
            isEditMode={editMode}
          />
        ) : (
          <dl className="-my-3 divide-y divide-gray-100 text-sm dark:divide-gray-700">
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900 dark:text-white">
                Name
              </dt>
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
              <dt className="font-medium text-gray-900 dark:text-white">
                Coins
              </dt>
              <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                {player.coins}
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900 dark:text-white">
                Pizza Bought
              </dt>
              <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
                {player.total_pizza}
              </dd>
            </div>
          </dl>
        )}
      </div>
      {editMode ? (
        <div></div>
      ) : (
        <div className="flex text-white items-center justify-center space-x-10 py-10">
          <button
            className="bg-sky-500 hover:bg-sky-700 p-2 rounded-lg"
            onClick={() => setEditMode(true)}
          >
            Edit ✏️
          </button>

          <button
            className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
            onClick={() => handleDelete()}
          >
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
                const shouldSubmit = handleSubmitPizza(player);

                if (!shouldSubmit) {
                  setAlert({ show: true, success: false });
                } else {
                  player.logged_pizza = data;
                  player.coins = player.coins - player.logged_pizza * 100;
                  submitBuyPizza(player);
                  setOpenBuyModal(false);
                  setAlert({ show: true, success: true });
                }
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
                player.logged_pizza = data;
                const shouldSubmitLoggedPizza = handleLogPizza(player);
                if (!shouldSubmitLoggedPizza) {
                  setAlert({ show: true, success: false });
                } else {
                  console.log(data);
                  player.logged_pizza = data;
                  submitLogPizza(player);
                  setOpenLogModal(false);
                  setAlert({ show: true, success: true });
                }
              }}
            />
          )}
        </div>
      )}
      {editMode ? (
        <div></div>
      ) : (
        <div className="items-center justify-center text-center">
          <h1 className="text-4xl font-bold p-10 items-center justify-center mx-auto text-center">
            Pizza History
          </h1>
          <PizzaHistory player={player} />
        </div>
      )}
    </div>
  );
};

export default PlayersInfo;
