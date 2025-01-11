// Cargar la información del anime seleccionado desde LocalStorage
const animeData = JSON.parse(localStorage.getItem("selectedAnime"));

// Validar que exista información del anime
if (!animeData) {
    alert("No se encontró información del anime.");
    window.history.back(); // Regresa a la página anterior si no hay datos
}

// Actualiza el contenido de la página con los datos del anime
document.getElementById("anime-image").src = animeData.image; // Imagen del anime
document.getElementById("anime-title").textContent = animeData.name; // Título del anime
document.getElementById("anime-description").textContent = `SINOPSIS`;
document.getElementById("anime-episodes").textContent = `${animeData.episodes} episodios`;
document.getElementById("anime-genres").textContent = animeData.genres;
document.getElementById("anime-next-episode").textContent = ` ${animeData.nextEpisode}`;
document.getElementById("anime-trailer").href = animeData.trailer;

// Manejo de la sinopsis y el botón "Ver más"
const synopsisElement = document.getElementById("anime-synopsis");
const viewMoreButton = document.getElementById("view-more-button");

let isExpanded = false; // Estado inicial para controlar la sinopsis
const maxLength = 150; // Número máximo de caracteres para la versión abreviada

if (animeData.synopsis && animeData.synopsis.length > maxLength) {
    // Mostrar la versión abreviada
    synopsisElement.textContent = animeData.synopsis.slice(0, maxLength) + "...";
    viewMoreButton.style.display = "inline"; // Mostrar el botón "Ver más"
} else {
    // Mostrar la sinopsis completa si es corta
    synopsisElement.textContent = animeData.synopsis || "Sinopsis no disponible.";
    viewMoreButton.style.display = "none"; // Ocultar el botón
}

// Alternar entre "Ver más" y "Ver menos"
viewMoreButton.addEventListener("click", () => {
    if (isExpanded) {
        synopsisElement.textContent = animeData.synopsis.slice(0, maxLength) + "...";
        viewMoreButton.textContent = "Ver más";
    } else {
        synopsisElement.textContent = animeData.synopsis;
        viewMoreButton.textContent = "Ver menos";
    }
    isExpanded = !isExpanded; // Cambiar el estado
});

// Manejo del botón de favoritos
const favoriteButton = document.getElementById("favorite-button");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

if (favorites.some(fav => fav.name === animeData.name)) {
    favoriteButton.textContent = "Quitar de Favoritos 💔";
} else {
    favoriteButton.textContent = "Agregar a Favoritos 💖";
}

favoriteButton.addEventListener("click", () => {
    if (favorites.some(fav => fav.name === animeData.name)) {
        favorites = favorites.filter(fav => fav.name !== animeData.name);
        favoriteButton.textContent = "Agregar a Favoritos 💖";
        alert(`${animeData.name} ha sido eliminado de tus favoritos.`);
    } else {
        favorites.push(animeData);
        favoriteButton.textContent = "Quitar de Favoritos 💔";
        alert(`${animeData.name} ha sido agregado a tus favoritos.`);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
});

// Manejo del botón de notificaciones
const notificationButton = document.getElementById("notification-button");
let notificationsEnabled = localStorage.getItem(`notifications_${animeData.name}`) === "true";

if (notificationsEnabled) {
    notificationButton.textContent = "Desactivar Notificaciones 🔔";
} else {
    notificationButton.textContent = "Activar Notificaciones 🔔";
}

notificationButton.addEventListener("click", () => {
    notificationsEnabled = !notificationsEnabled;
    notificationButton.textContent = notificationsEnabled ? "Desactivar Notificaciones🔔" : "Activar Notificaciones🔔";
    localStorage.setItem(`notifications_${animeData.name}`, notificationsEnabled);

    if (notificationsEnabled) {
        alert("Te notificaremos cada vez que salga un nuevo capítulo.");
    } else {
        alert("Las notificaciones están desactivadas.");
    }
});

// Redirección al ver capítulos
document.getElementById("watch-button").addEventListener("click", () => {
    window.location.href = "capitulos.html"; // Cambiar a la página de capítulos
});
