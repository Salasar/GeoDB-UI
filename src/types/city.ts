export interface City {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  population: number;
  latitude: number;
  longitude: number;
}

export interface CitySearchResponse {
  data: City[];
  metadata: {
    currentOffset: number;
    totalCount: number;
  };
} 