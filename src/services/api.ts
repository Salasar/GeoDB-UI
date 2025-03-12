import axios from 'axios';
import { CitySearchResponse } from '../types/city';

const API_HOST = 'wft-geo-db.p.rapidapi.com';
const API_KEY = import.meta.env.VITE_RAPID_API_KEY;

const api = axios.create({
  baseURL: 'https://wft-geo-db.p.rapidapi.com/v1/geo',
  headers: {
    'X-RapidAPI-Host': API_HOST,
    'X-RapidAPI-Key': API_KEY,
  },
});

export const searchCities = async (
  namePrefix: string,
  offset: number = 0,
  limit: number = 10,
  minPopulation?: number,
  maxPopulation?: number,
): Promise<CitySearchResponse> => {
  const response = await api.get('/cities', {
    params: {
      namePrefix,
      offset,
      limit,
      sort: '-population',
      ...(minPopulation ? { minPopulation } : {}),
      ...(maxPopulation && maxPopulation !== Infinity ? { maxPopulation } : {}),
    },
  });
  return response.data;
}; 