# Cities Explorer

A web application that allows users to explore cities worldwide using the GeoDB Cities API.

## Features

- Search for cities by name
- View city details including population and location
- Responsive design
- Real-time search with debouncing

## Tech Stack

- React
- TypeScript
- Sass (CSS Modules)
- Axios for API calls

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cities-explorer.git
   cd cities-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your RapidAPI key:
   ```
   VITE_RAPID_API_KEY=your_rapidapi_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run preview` - Preview the production build locally
- `npm run test` - Run tests with Vitest
- `npm run lint` - Run ESLint

## API Reference

This project uses the [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities/) via RapidAPI.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 