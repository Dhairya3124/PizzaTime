import React, { useState } from 'react';

interface BuyPizzaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (numPizzas: number) => void;
}

const BuyPizzaModal: React.FC<BuyPizzaModalProps> = ({ isOpen, onClose, onSave }) => {
  const [numPizzas, setNumPizzas] = useState<number>(0);

  const handleSave = () => {
    onSave(numPizzas);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed -inset-10 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 text-black">Order Pizzas</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <label className="block mb-2">
            Number of Pizzas:
            <input
              type="number"
              value={numPizzas}
              onChange={(e) => setNumPizzas(parseInt(e.target.value))}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-black"
              min="0"
            />
          </label>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyPizzaModal;