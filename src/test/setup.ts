import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock leaflet since it requires DOM elements not available in jsdom
vi.mock('react-leaflet', () => ({
  MapContainer: vi.fn(() => null),
  TileLayer: vi.fn(() => null),
  Marker: vi.fn(() => null),
  Popup: vi.fn(() => null),
})); 