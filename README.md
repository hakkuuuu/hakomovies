# 🎬 Hakomovies - Movie App

Welcome to Hakomovies, a sleek and modern movie browsing platform powered by TMDB API. Discover trending movies, search for your favorites, and explore top-rated films with an intuitive UI. 🍿



## 🚀 Features

- ✅ Browse trending movies 
- ✅ Search for movies by title
- ✅ View movie details, ratings, and release dates
- ✅ Responsive design for seamless experience on any device

## 🛠️ Tech Stack

Frontend: React.js (Vite), Tailwind CSS

Backend: TMDB API

Deployment: Vercel

# 📦 Installation & Setup

1️⃣ Clone the repository

```bash
git clone https://github.com/hakkuuuu/hakomovies.git
cd hakomovies
```

2️⃣ Install dependencies

```bash
npm install
```

3️⃣ Set up environment variables
Create a .env file and add your TMDB API key:

VITE_TMDB_API_KEY=your_api_key_here

4️⃣ Start the development server

```bash
npm run dev
```

🌍 Open http://localhost:5173 in your browser.

## 📡 API Usage

This project fetches movie data from TMDB API. Learn more at The Movie Database API.

Example API Request:

```bash
fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc`, {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
  }
})
  .then(response => response.json())
  .then(data => console.log(data));
  ```

## 📜 License

This project is licensed under the MIT License.

## 🌟 Show Your Support

If you like this project, consider giving it a ⭐ on GitHub!

Made with ❤️ by Raul Barquilla Jr.

