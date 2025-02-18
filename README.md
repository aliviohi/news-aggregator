# News Aggregator

## Description

The **News Aggregator** is a React + TypeScript application built with Vite. It allows users to search for news articles from multiple sources, including:

- News API
- The Guardian API
- The New York Times API

The application sends requests to all three APIs, processes and normalizes the responses into a unified format, and displays the results to the user. Users can also apply filters to refine their search results.

## Features

- **Search Bar**: Users can search for news articles.
- **Multiple Sources**: Fetches news from News API, The Guardian, and The New York Times.
- **Data Normalization**: Transforms responses into a unique format.
- **Filters**: Users can apply filters to refine search results.
- **Fast & Efficient**: Built with Vite for optimal performance.
- **Docker Support**: Easily containerized for deployment.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/aliviohi/news-aggregator
   cd news-aggregator
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## Docker Support

The project is Docker-friendly. You can build and run a Docker container using:

### Build the Docker Image

```sh
docker build -t news-aggregator .
```

### Run the Container

```sh
docker run -p 3000:3000 news-aggregator
```

The application will be accessible at `http://localhost:3000`.

## Live Demo

[Live Demo](#) (Replace `#` with the actual live demo link)

---

### Contributions

Contributions are welcome! Feel free to fork the repository and submit a pull request.

### License

This project is licensed under the MIT License.
