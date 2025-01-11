// Días de la semana en orden
const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

// Selecciona el contenedor principal
const scheduleContainer = document.getElementById("schedule");

// Genera la programación organizada por días de la semana
daysOfWeek.forEach(day => {
    const daySection = document.createElement("section");
    daySection.classList.add("day-section");

    // Título del día
    const dayTitle = document.createElement("h2");
    dayTitle.textContent = day;
    dayTitle.style.color = "white";
    daySection.appendChild(dayTitle);

    // Filtra los animes que salen este día
    const animesForDay = animes.filter(anime => anime.nextEpisode === day);

    if (animesForDay.length > 0) {
        const animeList = document.createElement("ul");
        animeList.classList.add("anime-list");

        animesForDay.forEach(anime => {
            const animeItem = document.createElement("li");
            animeItem.classList.add("anime-item");
            animeItem.innerHTML = `
                <img src="${anime.image}" alt="${anime.name}">
                <div class="anime-details">
                    <h3>${anime.name}</h3>
                    <p>Género: ${anime.genres}</p>
                </div>
            `;
            animeList.appendChild(animeItem);
        });

        daySection.appendChild(animeList);
    } else {
        const noAnimeMessage = document.createElement("p");
        noAnimeMessage.textContent = "No hay animes para este día.";
        noAnimeMessage.style.color = "#b0b0b0";
        daySection.appendChild(noAnimeMessage);
    }

    scheduleContainer.appendChild(daySection);
});
