// ================================
// MOVIE SEARCH
// ================================

function searchMovie() {
  const input = document
    .getElementById("search")
    .value
    .toLowerCase()
    .trim();

  const movies = document.getElementsByClassName("movie");

  for (let i = 0; i < movies.length; i++) {
    const title = movies[i]
      .innerText
      .toLowerCase();

    if (title.includes(input)) {
      movies[i].style.display = "block";
    } else {
      movies[i].style.display = "none";
    }
  }
}


// ================================
// VIDEO ERROR MESSAGE
// ================================

document.addEventListener("DOMContentLoaded", function () {

  const videos = document.querySelectorAll("video");

  videos.forEach(function (video) {

    video.addEventListener("error", function () {

      const movieCard = video.closest(".movie");

      if (movieCard) {

        let message = movieCard.querySelector(".video-error");

        if (!message) {

          message = document.createElement("p");

          message.className = "video-error";

          message.textContent =
            "❌ Movie could not be loaded. Check the movie file.";

          message.style.color = "#ff5555";

          movieCard.appendChild(message);
        }
      }

    });

  });

});


// ================================
// VIDEO PLAY / PAUSE
// ================================

document.addEventListener("DOMContentLoaded", function () {

  const videos = document.querySelectorAll("video");

  videos.forEach(function (video) {

    video.addEventListener("play", function () {

      // Pause other movies when one starts
      videos.forEach(function (otherVideo) {

        if (otherVideo !== video) {
          otherVideo.pause();
        }

      });

    });

  });

});
