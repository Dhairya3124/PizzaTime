import axios from 'axios';
import { PlayerData } from '../lib/types';
const HandleSubmitForm = async (data: PlayerData) => {
  try {
    console.log(data);
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/player`, data);
    console.log(res.data);
  } catch (error) {
    console.error('Error submitting form', error);
  }
};
export default HandleSubmitForm;
