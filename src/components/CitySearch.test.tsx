import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CitySearch from './CitySearch';
import { searchCities } from '../services/api';
import { vi } from 'vitest';

// Mock the entire module
vi.mock('../services/api', () => ({
  searchCities: vi.fn()
}));

const mockCities = [
  {
    id: 1,
    name: 'New York',
    country: 'United States',
    population: 8400000,
    latitude: 40.7128,
    longitude: -74.0060,
    wikiDataId: 'Q60',
    type: 'CITY',
    city: 'New York',
    countryCode: 'US',
    region: 'New York'
  }
];

describe('CitySearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input', () => {
    render(<CitySearch />);
    expect(screen.getByPlaceholderText('Search for a city...')).toBeInTheDocument();
  });

  it('shows loading state while fetching', async () => {
    vi.mocked(searchCities).mockImplementationOnce(() => new Promise(() => {}));
    
    render(<CitySearch />);
    
    fireEvent.change(screen.getByPlaceholderText('Search for a city...'), {
      target: { value: 'New' },
    });

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('displays cities after successful search', async () => {
    vi.mocked(searchCities).mockResolvedValueOnce({
      data: mockCities,
      metadata: { currentOffset: 0, totalCount: 1 }
    });

    render(<CitySearch />);
    
    fireEvent.change(screen.getByPlaceholderText('Search for a city...'), {
      target: { value: 'New' },
    });

    await waitFor(() => {
      expect(screen.getByText('New York')).toBeInTheDocument();
      expect(screen.getByText('United States')).toBeInTheDocument();
    });
  });

  it('filters cities by population', async () => {
    vi.mocked(searchCities).mockResolvedValueOnce({
      data: mockCities,
      metadata: { currentOffset: 0, totalCount: 1 }
    });

    render(<CitySearch />);
    
    fireEvent.change(screen.getByPlaceholderText('Min Population'), {
      target: { value: '9000000' },
    });

    await waitFor(() => {
      expect(screen.queryByText('New York')).not.toBeInTheDocument();
    });
  });
}); 