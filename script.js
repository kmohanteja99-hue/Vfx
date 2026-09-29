
// Add or edit your YouTube movies here
const movies = [
  {
    title: "Movie 1",
    category: "Action",
    id: "pU9nu6LN1fg"
  },
  {
    title: "Movie 2",
    category: "Entertainment",
    id: "V_pGNyKNrJw"
  },
  {
    title: "Movie 3",
    category: "Drama",
    id: "pjfXpRPHeVY"
  },
  {
    title: "Movie 4",
    category: "Featured",
    id: "CHWwf9nEXbI"
  }
];

const gallery = document.getElementById("movieGallery");
const search = document.getElementById("search");
const count = document.getElementById("movieCount");
const noResults = document.getElementById("noResults");
const modal = document.getElementById("videoModal");
const modalTitle = document.getElementById("modalTitle");
const videoContainer = document.getElementById("videoContainer");
const closeButton = document.getElementById("closeModal");

// Build the gallery
function displayMovies(movieList) {
  gallery.innerHTML = "";

  count.textContent =
    `${movieList.length} ${movieList.length === 1 ? "movie" : "movies"}`;

  noResults.hidden = movieList.length !== 0;

  movieList.forEach((movie) => {
    const card = document.createElement("article");
    card.className = "movie-card";

    const poster = document.createElement("div");
    poster.className = "poster";

    const image = document.createElement("img");
    image.src = `https://i.ytimg.com/vi/${encodeURIComponent(movie.id)}/hqdefault.jpg`;
    image.alt = `${movie.title} thumbnail`;
    image.loading = "lazy";

    image.onerror = () => {
      image.removeAttribute("src");
      image.alt = "Thumbnail unavailable";
      poster.style.background =
        "linear-gradient(135deg, #30354a, #171922)";
    };

    const overlay = document.createElement("div");
    overlay.className = "play-overlay";

    const playButton = document.createElement("button");
    playButton.className = "play-button";
    playButton.type = "button";
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", `Play ${movie.title}`);

    playButton.addEventListener("click", () => {
      openMovie(movie);
    });

    poster.addEventListener("click", () => {
      openMovie(movie);
    });

    overlay.appendChild(playButton);
    poster.append(image, overlay);

    const info = document.createElement("div");
    info.className = "movie-info";

    const title = document.createElement("h3");
    title.textContent = movie.title;

    const category = document.createElement("p");
    category.textContent = `🎬 ${movie.category}`;

    info.append(title, category);
    card.append(poster, info);
    gallery.appendChild(card);
  });
}

// Open YouTube video in popup player
function openMovie(movie) {
  modalTitle.textContent = movie.title;
  videoContainer.innerHTML = "";

  const iframe = document.createElement("iframe");
  iframe.src =
    `https://www.youtube.com/embed/${encodeURIComponent(movie.id)}?autoplay=1`;

  iframe.title = movie.title;
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";

  videoContainer.appendChild(iframe);
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

// Close player and stop playback
function closeMovie() {
  modal.hidden = true;
  videoContainer.innerHTML = "";
  document.body.style.overflow = "";
}

closeButton.addEventListener("click", closeMovie);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeMovie();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeMovie();
  }
});

// Search movies by title or category
search.addEventListener("input", () => {
  const query = search.value.trim().toLowerCase();

  const filtered = movies.filter((movie) =>
    `${movie.title} ${movie.category}`.toLowerCase().includes(query)
  );

  displayMovies(filtered);
});

// Show all movies on page load
displayMovies(movies);
