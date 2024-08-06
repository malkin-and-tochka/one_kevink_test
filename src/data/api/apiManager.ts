import axios from 'axios';
import {BASE_URL} from '../../constants/baseUrl';

export const axiosManager = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
});
