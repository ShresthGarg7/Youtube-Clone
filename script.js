require("dotenv").config();
const API_KEY = process.env.APIKEY;
const videoContainer = document.getElementById("video-container");
const modal = document.getElementById("video-modal");
const iframe = document.getElementById("video-frame");
const closeBtn = document.getElementById("close-btn");

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  iframe.src = "";
});

async function loadChannel(channelId) {
  videoContainer.innerHTML = "<p style='color:white'>🔄 Loading...</p>";

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=12`
  );

  const data = await res.json();
  videoContainer.innerHTML = "";

  data.items.forEach((item) => {
    if (!item.id.videoId) return;

    const video = document.createElement("div");
    video.classList.add("video");

    video.innerHTML = `
      <img src="${item.snippet.thumbnails.high.url}" alt="Thumbnail" />
      <div class="info">
        <h3>${item.snippet.title}</h3>
        <p>📺 ${item.snippet.channelTitle}</p>
      </div>
    `;

    video.addEventListener("click", () => {
      iframe.src = `https://www.youtube.com/embed/${item.id.videoId}?autoplay=1`;
      modal.style.display = "flex";
    });

    videoContainer.appendChild(video);
  });
}

async function loadTopic(query) {
  videoContainer.innerHTML = `<p style='color:white'>🔍 Loading ${query} videos...</p>`;

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&order=relevance&maxResults=12&q=${encodeURIComponent(
      query
    )}`
  );

  const data = await res.json();
  videoContainer.innerHTML = "";

  data.items.forEach((item) => {
    if (!item.id.videoId) return;

    const video = document.createElement("div");
    video.classList.add("video");

    video.innerHTML = `
      <img src="${item.snippet.thumbnails.high.url}" alt="Thumbnail" />
      <div class="info">
        <h3>${item.snippet.title}</h3>
        <p>📺 ${item.snippet.channelTitle}</p>
      </div>
    `;

    video.addEventListener("click", () => {
      iframe.src = `https://www.youtube.com/embed/${item.id.videoId}?autoplay=1`;
      modal.style.display = "flex";
    });

    videoContainer.appendChild(video);
  });
}
