// Obtiene el contenedor de la lista de favoritos y el mensaje por defecto
const favoritesList = document.getElementById("favorites-list");
const noFavoritesMessage = document.getElementById("no-favorites-message");

// Carga los favoritos desde localStorage
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Si no hay favoritos, muestra el mensaje
if (favorites.length === 0) {
    noFavoritesMessage.style.display = "block";
} else {
    noFavoritesMessage.style.display = "none";

    // Genera la lista de animes favoritos
    favorites.forEach(anime => {
        const animeItem = document.createElement("div");
        animeItem.classList.add("favorite-item");
        animeItem.innerHTML = `
            <img src="${anime.image}" alt="${anime.name}">
            <div>
                <h3>${anime.name}</h3>
                <p>Episodios: ${anime.episodes}</p>
            </div>
        `;

        favoritesList.appendChild(animeItem);
    });
}
