import React, { useEffect, useState } from 'react';
import HandleSubmitForm from '../lib/user';
import { useForm } from 'react-hook-form';
import { PlayerData } from '../lib/types';
import Alert from './Alert';
const NewUser: React.FC = () => {
  const [alert, setAlert] = useState<{ show: boolean; success: boolean }>({
    show: false,
    success: false
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<PlayerData>();
  const onSubmit = handleSubmit(async data => {
    try {
      await HandleSubmitForm(data);
      reset();
      setAlert({ show: true, success: true });
    } catch (error) {
      console.error('Error submitting form:', error);
      setAlert({ show: true, success: false });
    }
  });
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert({ show: false, success: false });
      }, 3000); // Hide alert after 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [alert]);

  return (
    <div>
      <div className="items-center justify-center text-center w-[120px] mx-auto">
        {alert.show && <Alert success={alert.success} />}
      </div>
      <div className="flex justify-center items-center py-20">
        <form className="w-full max-w-sm" method="post" onSubmit={onSubmit}>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                placeholder="Jane Doe"
                {...register('Name', {
                  required: true,
                  minLength: {
                    value: 3,
                    message: 'Min Length should be equal or greater than 3'
                  }
                })}
              />
              {errors.Name && (
                <p className="text-red-600">{errors.Name?.message}</p>
              )}
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-age"
              >
                Age
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-age"
                type="number"
                placeholder="Enter your age"
                {...register('Age', {
                  required: true,
                  min: { value: 10, message: 'Min age is 10' }
                })}
              />
              {errors.Age && (
                <p className="text-red-600">{errors.Age?.message}</p>
              )}
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-gender"
              >
                Gender
              </label>
            </div>
            <div className="md:w-2/3 relative">
              <div className="inline-block relative w-64">
                <select
                  className="block appearance-none w-full text-black bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  {...register('Gender', {
                    required: true
                  })}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Prefer not to disclose</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting' : 'Submit'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewUser;
