import React, { useState, useEffect, useMemo } from 'react';
import { searchCities } from '../services/api';
import { City } from '../types/city';
import styles from './CitySearch.module.scss';
import CityMap from './CityMap';

interface Filters {
  minPopulation: number;
  maxPopulation: number;
  country: string;
}

const CitySearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    minPopulation: 0,
    maxPopulation: Infinity,
    country: '',
  });
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const filteredCities = useMemo(() => {
    return cities.filter((city) => {
      const matchesPopulation =
        city.population >= filters.minPopulation &&
        (filters.maxPopulation === Infinity || city.population <= filters.maxPopulation);
      const matchesCountry = !filters.country || city.country.toLowerCase().includes(filters.country.toLowerCase());
      return matchesPopulation && matchesCountry;
    });
  }, [cities, filters]);

  useEffect(() => {
    const fetchCities = async () => {
      if (searchTerm.length < 2) {
        setCities([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await searchCities(searchTerm);
        setCities(response.data);
      } catch (err) {
        setError('Failed to fetch cities. Please try again.');
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchCities, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.filters}>
        <input
          type="number"
          placeholder="Min Population"
          className={styles.filterInput}
          value={filters.minPopulation || ''}
          onChange={(e) => setFilters({ ...filters, minPopulation: Number(e.target.value) || 0 })}
        />
        <input
          type="number"
          placeholder="Max Population"
          className={styles.filterInput}
          value={filters.maxPopulation === Infinity ? '' : filters.maxPopulation}
          onChange={(e) => setFilters({ ...filters, maxPopulation: Number(e.target.value) || Infinity })}
        />
        <input
          type="text"
          placeholder="Filter by Country"
          className={styles.filterInput}
          value={filters.country}
          onChange={(e) => setFilters({ ...filters, country: e.target.value })}
        />
      </div>

      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search for a city..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <CityMap cities={filteredCities} selectedCity={selectedCity} />

      <ul className={styles.cityList}>
        {filteredCities.map((city) => (
          <li 
            key={city.id} 
            className={styles.cityCard}
            onClick={() => setSelectedCity(city)}
          >
            <h3>{city.name}</h3>
            <p>{city.country}</p>
            <p>Population: {city.population.toLocaleString()}</p>
            <p>
              Location: {city.latitude.toFixed(2)}, {city.longitude.toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CitySearch; 