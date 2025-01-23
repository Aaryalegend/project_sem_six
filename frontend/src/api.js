import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const getClipboardData = async () => {
  const response = await axios.get(`${API_URL}/clipboard`);
  return response.data;
};

export const addClipboardData = async (data) => {
  await axios.post(`${API_URL}/clipboard`, { data });
};

export const syncClipboardData = (callback) => {
  const socket = new WebSocket('ws://localhost:4000');
  socket.onmessage = (event) => {
    const newData = JSON.parse(event.data);
    callback(newData);
  };
  return {
    unsubscribe: () => socket.close(),
  };
};