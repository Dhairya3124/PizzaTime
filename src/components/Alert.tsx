import React from 'react';

interface AlertProps {
  success: boolean;
}

const Alert: React.FC<AlertProps> = ({ success }) => {
  return (
    <div
      className={`p-4 mb-4 text-sm rounded-lg ${
        success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}
      role="alert"
    >
      {success ? 'Successful🍕' : 'Unsuccessful🍕'}
    </div>
  );
};

export default Alert;