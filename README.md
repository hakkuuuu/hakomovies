# 🎬 Hakomovies

A modern, responsive movie browsing application built with React, TypeScript, and Tailwind CSS. Browse trending movies, search for your favorites, and explore different genres with a beautiful user interface.

## ✨ Features

- 🎯 **Modern UI/UX**: Clean and responsive design with smooth animations
- 🔍 **Search Functionality**: Find movies easily with real-time search
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎭 **Genre Filtering**: Browse movies by different genres
- 📄 **Pagination**: Navigate through large collections of movies effortlessly
- 🔝 **Top 10 Section**: Quick access to trending movies
- 🎬 **Movie Details**: Detailed information about each movie
- 🌙 **Clean UI**: Beautiful, minimalist interface with attention to detail

## 🛠️ Technologies Used

- **React**: Frontend library for building user interfaces
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Zustand**: State management
- **TMDB API**: Movie data source
- **Heroicons**: Beautiful icons
- **Vite**: Next-generation frontend tooling

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API Key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hakomovies.git
cd hakomovies
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your TMDB API key:
```env
VITE_TMDB_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
hakomovies/
├── src/
│   ├── components/      # Reusable UI components
│   ├── features/        # Feature-specific components
│   ├── pages/          # Page components
│   ├── store/          # State management
│   ├── utils/          # Utility functions
│   ├── types.ts        # TypeScript types
│   └── App.tsx         # Main application component
├── public/             # Static assets
└── ...config files
```

## 🎨 Features in Detail

### Home Page
- Trending movies showcase
- Search functionality
- Top 10 movies sidebar

### Movies Page
- Paginated movie grid
- Genre filtering
- Responsive layout
- Loading states
- Error handling

### Movie Details
- Comprehensive movie information
- Beautiful backdrop images
- Rating and release date
- Movie overview

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📝 License

All rights reserved © 2024 Raul Barquilla Jr.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie data API
- [Heroicons](https://heroicons.com/) for the beautiful icons
- All the amazing developers who created the tools used in this project

---

Made with ❤️ by Raul Barquilla Jr.

