// Recupera el anime seleccionado desde localStorage
const animeData = JSON.parse(localStorage.getItem("selectedAnime"));

// Verifica si hay datos del anime
if (!animeData) {
    alert("No se encontró información del anime. Serás redirigido.");
    window.location.href = "index.html";
}

// Actualiza el título de la página con el nombre del anime
document.getElementById("anime-title").textContent = animeData.name;

// Selecciona el contenedor de la lista de capítulos
const episodeList = document.getElementById("episode-list");

// Genera la lista de capítulos (10 capítulos como ejemplo)
const episodes = Array.from({ length: 12 }, (_, i) => ({
    number: i + 1,
    duration: "20 m",
    seen: false, // Estado inicial
}));

// Carga los capítulos vistos desde localStorage (si existen)
const seenEpisodesKey = `seenEpisodes_${animeData.name}`;
const seenEpisodes = JSON.parse(localStorage.getItem(seenEpisodesKey)) || [];

// Genera la lista de capítulos en el DOM
episodes.forEach(episode => {
    const isSeen = seenEpisodes.includes(episode.number);

    const episodeItem = document.createElement("li");
    episodeItem.classList.add("anime-item");
    episodeItem.innerHTML = `
        <img src="${animeData.image}" alt="Episodio ${episode.number}">
        <div class="anime-details">
            <h3>Episodio ${episode.number}</h3>
            <p>Duración: ${episode.duration}</p>
        </div>
        <input type="checkbox" class="seen-checkbox" ${
            isSeen ? "checked" : ""
        } data-episode="${episode.number}">
    `;

    episodeList.appendChild(episodeItem);
});

// Maneja el evento de marcar capítulos como vistos
episodeList.addEventListener("change", e => {
    if (e.target.classList.contains("seen-checkbox")) {
        const episodeNumber = parseInt(e.target.dataset.episode);

        // Actualiza la lista de capítulos vistos
        if (e.target.checked) {
            if (!seenEpisodes.includes(episodeNumber)) {
                seenEpisodes.push(episodeNumber);
            }
        } else {
            const index = seenEpisodes.indexOf(episodeNumber);
            if (index > -1) {
                seenEpisodes.splice(index, 1);
            }
        }

        // Guarda el estado actualizado en localStorage
        localStorage.setItem(seenEpisodesKey, JSON.stringify(seenEpisodes));
    }
});
