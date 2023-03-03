import axios from 'axios';
import axiosRetry from 'axios-retry'

export const axiosClient = axios.create({
  baseURL: `https://shopeeeee.herokuapp.com`,
  // headers: {
  //   'content-type': 'application/json',
  // },
});

const retryDelay = (retryNumber = 0) => {
  const seconds = Math.pow(2, retryNumber) * 1000;
  const randomMs = 1000 * Math.random();
  return seconds + randomMs;
};

axiosRetry(axiosClient, {
  retries: 2,
  retryDelay,
  // retry on Network Error & 5xx responses
  retryCondition: axiosRetry.isRetryableError,
});

