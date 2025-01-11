// Lista de animes con sus datos básicos
const animes = [
    { 
        name: "Dandadan", 
        image: "imagenes/1.jpg",
        episodes: 12,
        genres: "Acción, Comedia, Shounen, Sobrenatural",
        nextEpisode: "Lunes",
        trailer: "https://www.youtube.com/watch?v=5_I0MuPfMb4",
        synopsis: "Cuando Momo, una estudiante de preparatoria de una familia de médiums espirituales, conoce a su compañero de clase Okarun, un friki del ocultismo, discuten: Momo cree en los fantasmas pero no en los extraterrestres, y Okarun cree en los extraterrestres pero no en los fantasmas. Cuando resulta que ambos fenómenos son reales, en Momo surge un poder oculto y en Okarun el poder de una maldición. Juntos, deberán desafiar a las fuerzas paranormales que amenazan su mundo."
    },  
    { 
        name: "Under Ninja", 
        image: "imagenes/2.jpg", 
        episodes: 12,
        genres: "Aventura, Seinen", 
        nextEpisode: "Martes", 
        trailer: "https://www.youtube.com/watch?v=Ya5JnFNwDMA",
        synopsis: "En las sombras de Japón se libra una batalla encubierta. Todavía existen unos 200 000 ninjas que llevan a cabo misiones mortales como organización secreta, la Inteligencia Nacional de NINJA, o NIN por sus siglas, hasta que surge un contrincante: UNDER NINJA. Conocidos bajo las siglas UN, estos ninjas se oponen a NIN a cada paso que dan. Uno de los integrantes de UN es Kuro, un adolescente solitario enviado al frente. ¿Cuál será su destino y qué facción prevalecerá?."
    },
    { 
        name: "Takt Op. Destiny",
        image: "imagenes/3.jpg",
        episodes: 12,
        genres: "Acción, Fantasía",
        nextEpisode: "Miércoles",
        trailer: "https://www.youtube.com/watch?v=5zQpunLiNrM",
        synopsis: "En la historia del anime, un día cayó un meteorito negro en el mundo, y éste cambió por completo. El meteorito produjo unos monstruos grotescos llamados D2, que empezaron a correr sin control. Los D2 prohibieron rápidamente toda la música, que era lo único capaz de vencerlos. Pero hubo algunas personas que se resistieron al D2. Son mujeres jóvenes que poseen el poder de la música, el “Musicart”. Estas jóvenes poseen “partituras” que son capaces de vencer a los monstruos. Y también hay personas que dirigen a estas mujeres, el Conductor. El anime se desarrolla en América en el año 2047, que ha caído en la ruina gracias al D2. Takt, un Conductor, se asocia con una Musicart llamada Unmei. Takt anhela que la música vuelva al mundo, y Unmei desea destruir el D2. Su objetivo es viajar a Nueva York.."
    },
    { 
        name: "Dr. Stone: Stone Wars",
        image: "imagenes/4.jpg",
        episodes: 12,
        genres: "Aventuras, Ciencia Ficción, Shounen",
        nextEpisode: "Sábado",
        trailer: "https://www.youtube.com/watch?v=DnGov2LG1os",
        synopsis: "n fatídico día, toda la humanidad quedó petrificada por un destello de luz cegadora. Después de varios milenios, el estudiante de instituto Taiju se despierta y se encuentra perdido en un mundo de estatuas. Sin embargo, no está solo; su amigo, amante de la ciencia, ha estado trabajando durante unos meses y tiene un gran plan en mente: ¡poner en marcha la civilización con el poder de la ciencia!."
    },
    { 
        name: "One Punch Man",
        image: "imagenes/5.jpg",
        episodes: 12,
        genres: "Acción, Ciencia Ficción, Comedia, Parodia, Seinen, Sobrenatural, Superpoderes",
        nextEpisode: "Sábado",
        trailer: "https://www.youtube.com/watch?v=gkpOGxJ1BUs",
        synopsis: "La serie está protagonizada por un héroe que ha entrenado tanto que se ha quedado calvo, y tiene tanta fuerza que puede acabar con cualquier enemigo de un solo puñetazo. Sin embargo, al ser tan fuerte, se aburre y se frustra porque no le cuesta nada vencer sus batallas."
    }
];

// Función para redirigir a la página de detalles
function goToDetails(animeName) {
    // Busca el anime en la lista usando su nombre
    const selectedAnime = animes.find(anime => anime.name === animeName);

    // Verifica si el anime existe
    if (selectedAnime) {
        // Guarda la información en LocalStorage
        localStorage.setItem("selectedAnime", JSON.stringify(selectedAnime));
        // Redirige a la página de detalles
        window.location.href = "details.html";
    } else {
        alert("Anime no encontrado.");
    }
}

// Seleccionar los animes mostrados en la página principal
const mainAnimeItems = document.querySelectorAll(".anime-item"); // Asegúrate de usar la clase correcta

// Asignar evento `click` a cada anime en la página principal
mainAnimeItems.forEach(item => {
    item.addEventListener("click", () => {
        const animeName = item.getAttribute("data-anime-name"); // Asegúrate de usar un atributo personalizado
        goToDetails(animeName);
    });
});

// Selecciona elementos del DOM para la búsqueda
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("search-results");
const resultsList = searchResults.querySelector(".anime-list");
const suggestedAnimes = document.querySelector(".suggested-animes");

// Función para buscar animes por nombre
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim().toLowerCase();

    // Oculta sugerencias al buscar
    suggestedAnimes.style.display = "none";

    // Si el campo de búsqueda está vacío, no hace nada
    if (!query) return;

    // Filtra los animes que coincidan con el texto ingresado
    const filteredAnimes = animes.filter(anime =>
        anime.name.toLowerCase().startsWith(query) // Busca coincidencias al inicio del nombre
    );

    // Limpia los resultados previos
    resultsList.innerHTML = "";

    if (filteredAnimes.length > 0) {
        filteredAnimes.forEach(anime => {
            // Crea un elemento de lista para cada anime encontrado
            const li = document.createElement("li");
            li.classList.add("anime-item"); // Clase para estilizar el elemento
            li.innerHTML = `
                <img src="${anime.image}" alt="${anime.name}">
                <div class="anime-details">
                    <h3>${anime.name}</h3>
                    <p>Cantidad de capítulos: ${anime.episodes}</p>
                </div>
            `;

            // Asigna un evento `click` para redirigir a los detalles del anime
            li.addEventListener("click", () => goToDetails(anime.name));
            resultsList.appendChild(li);
        });

        // Muestra los resultados
        searchResults.classList.remove("hidden");
    } else {
        // Si no hay resultados, muestra un mensaje
        resultsList.innerHTML = `<p style="color: white; text-align: center;">No se encontraron resultados.</p>`;
        searchResults.classList.remove("hidden");
        suggestedAnimes.style.display = "block"; // Muestra sugerencias nuevamente
    }
});

