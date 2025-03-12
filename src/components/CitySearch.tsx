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

const ITEMS_PER_PAGE = 10;

const CitySearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
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
        setTotalCount(0);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await searchCities(searchTerm, currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE);
        setCities(response.data);
        setTotalCount(response.metadata.totalCount);
      } catch (err) {
        setError('Failed to fetch cities. Please try again.');
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchCities, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, currentPage]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

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

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0 || loading}
            className={styles.pageButton}
          >
            Previous
          </button>
          <span className={styles.pageInfo}>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage >= totalPages - 1 || loading}
            className={styles.pageButton}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CitySearch; 