import axios from "axios";

export const sendMessage = async (message) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/chat`,
    { message }
  );
  return res.data.reply;
};