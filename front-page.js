// Movies Data
const movies = [
  {
    id: 2,
    title: "Dangal",
    genre: "Drama",
    year: 2016,
    rating: 4.7,
    img: "https://upload.wikimedia.org/wikipedia/en/9/99/Dangal_Poster.jpg"
  },
  {
    id: 3,
    title: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
    rating: 4.6,
    img: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg"
  },
  {
    id: 5,
    title: "3 Idiots",
    genre: "Comedy/Drama",
    year: 2009,
    rating: 4.9,
    img: "https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg"
  },
  {
    id: 6,
    title: "KGF",
    genre: "Action",
    year: 2018,
    rating: 4.4,
    img: "https://upload.wikimedia.org/wikipedia/en/c/cc/K.G.F_Chapter_1_poster.jpg"
  }
];

// Users Data
const users = [
  {
    id: 1,
    name: "Michael",
    email: "michael@example.com",
    subscription: "Premium",
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Astha",
    email: "astha@example.com",
    subscription: "VIP",
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Sagar",
    email: "sagar@example.com",
    subscription: "Free",
    img: "https://randomuser.me/api/portraits/men/12.jpg"
  },
  {
    id: 4,
    name: "Dipika",
    email: "dipika@example.com",
    subscription: "Premium",
    img: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: 5,
    name: "Arjun",
    email: "arjun@example.com",
    subscription: "VIP",
    img: "https://randomuser.me/api/portraits/men/77.jpg"
  }
];

// Reviews Data
const reviews = [
  { user: "Astha", movie: "Dangal", rating: 4, comment: "Inspirational and emotional." },
  { user: "Dipika", movie: "3 Idiots", rating: 5, comment: "Funny and meaningful." }
];

// Safe Favorites Load
let favorites = [];

try {
  const savedFavorites = localStorage.getItem("favorites");
  favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
  if (!Array.isArray(favorites)) favorites = [];
} catch (error) {
  favorites = [];
}

// DOM Elements
let movieList;
let favoriteList;
let userList;
let reviewList;
let searchInput;
let genreFilter;

// Load Genres
function loadGenres() {
  if (!genreFilter) return;

  const uniqueGenres = [...new Set(movies.map(movie => movie.genre))];
  const genres = ["All", ...uniqueGenres];

  genreFilter.innerHTML = "";

  genres.forEach(genre => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });
}

// Create Movie Card
function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";

  const isFavorite = favorites.some(fav => fav.id === movie.id);

  card.innerHTML = `
    <img src="${movie.img}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <p>${movie.genre} | ${movie.year}</p>
    <p>⭐ ${movie.rating}</p>
    <div class="movie-btns">
      <button class="watch-btn">Watch</button>
      <button class="fav-btn">${isFavorite ? "💔 Remove" : "❤️ Favorite"}</button>
    </div>
  `;

  const img = card.querySelector("img");
  img.onerror = function () {
    this.src = "https://via.placeholder.com/300x450?text=Movie+Poster";
  };

  const watchBtn = card.querySelector(".watch-btn");
  const favBtn = card.querySelector(".fav-btn");

  watchBtn.addEventListener("click", () => {
    watchMovie(movie.title);
  });

  favBtn.addEventListener("click", () => {
    toggleFavorite(movie.id);
  });

  return card;
}

// Show Movies
function showMovies(filteredMovies = movies) {
  if (!movieList) return;

  movieList.innerHTML = "";

  if (!filteredMovies.length) {
    movieList.innerHTML = `<p style="text-align:center; grid-column:1/-1;">No movies found.</p>`;
    return;
  }

  filteredMovies.forEach(movie => {
    movieList.appendChild(createMovieCard(movie));
  });
}

// Show Favorites
function showFavorites() {
  if (!favoriteList) return;

  favoriteList.innerHTML = "";

  if (!favorites.length) {
    favoriteList.innerHTML = `<p style="text-align:center; grid-column:1/-1;">No favorite movies yet.</p>`;
    return;
  }

  favorites.forEach(movie => {
    favoriteList.appendChild(createMovieCard(movie));
  });
}

// Toggle Favorite
function toggleFavorite(movieId) {
  const movie = movies.find(m => m.id === movieId);
  if (!movie) return;

  const exists = favorites.some(fav => fav.id === movieId);

  if (exists) {
    favorites = favorites.filter(fav => fav.id !== movieId);
  } else {
    favorites.push(movie);
  }

  try {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  } catch (error) {
    console.log("LocalStorage not available");
  }

  applyFilters();
  showFavorites();
}

// Apply Search + Filter
function applyFilters() {
  const searchText = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const selectedGenre = genreFilter ? genreFilter.value : "All";

  const filteredMovies = movies.filter(movie => {
    const matchTitle = movie.title.toLowerCase().includes(searchText);
    const matchGenre = selectedGenre === "All" || movie.genre === selectedGenre;
    return matchTitle && matchGenre;
  });

  showMovies(filteredMovies);
}

// Show Users
function showUsers() {
  if (!userList) return;

  userList.innerHTML = "";

  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
      <img src="${user.img}" alt="${user.name}">
      <h3>${user.name}</h3>
      <p>Email: ${user.email}</p>
      <p>Subscription: ${user.subscription}</p>
    `;

    const img = card.querySelector("img");
    img.onerror = function () {
      this.src = "https://via.placeholder.com/300x300?text=User";
    };

    userList.appendChild(card);
  });
}

// Show Reviews
function showReviews() {
  if (!reviewList) return;

  reviewList.innerHTML = "";

  reviews.forEach(review => {
    const card = document.createElement("div");
    card.className = "review-card";

    card.innerHTML = `
      <h3>${review.user} on ${review.movie}</h3>
      <p>Rating: ⭐ ${review.rating}</p>
      <p>"${review.comment}"</p>
    `;

    reviewList.appendChild(card);
  });
}

// Watch Movie
function watchMovie(title) {
  alert(`Transaction started...\nNow streaming: ${title}\nTransaction committed!`);
}

// Init App
function initApp() {
  movieList = document.getElementById("movie-list");
  favoriteList = document.getElementById("favorite-list");
  userList = document.getElementById("user-list");
  reviewList = document.getElementById("review-list");
  searchInput = document.getElementById("searchInput");
  genreFilter = document.getElementById("genreFilter");

  const browseBtn = document.getElementById("browse-btn");
  const usersBtn = document.getElementById("users-btn");

  loadGenres();
  showMovies();
  showFavorites();
  showUsers();
  showReviews();

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  if (genreFilter) {
    genreFilter.addEventListener("change", applyFilters);
  }

  if (browseBtn) {
    browseBtn.addEventListener("click", () => {
      showMovies();
      document.getElementById("movies")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (usersBtn) {
    usersBtn.addEventListener("click", () => {
      showUsers();
      document.getElementById("users")?.scrollIntoView({ behavior: "smooth" });
    });
  }
}

// Start App
document.addEventListener("DOMContentLoaded", initApp);

const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}

function initApp() {
  movieList = document.getElementById("movie-list");
  favoriteList = document.getElementById("favorite-list");
  userList = document.getElementById("user-list");
  reviewList = document.getElementById("review-list");
  searchInput = document.getElementById("searchInput");
  genreFilter = document.getElementById("genreFilter");

  const browseBtn = document.getElementById("browse-btn");
  const usersBtn = document.getElementById("users-btn");
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  loadGenres();
  showMovies();
  showFavorites();
  showUsers();
  showReviews();

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  if (genreFilter) {
    genreFilter.addEventListener("change", applyFilters);
  }

  if (browseBtn) {
    browseBtn.addEventListener("click", () => {
      showMovies();
      document.getElementById("movies")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (usersBtn) {
    usersBtn.addEventListener("click", () => {
      showUsers();
      document.getElementById("users")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      navbar.classList.toggle("active");
    });
  }
}
