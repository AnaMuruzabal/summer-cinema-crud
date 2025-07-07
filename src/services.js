//URL http://localhost:3001/films
//READ MÉTODO GET
async function getAllFilms() {
    const response = await fetch("http://localhost:3001/films")
    const filmData = await response.json()
    return filmData
}

//console.log (getAllFilms()) esto se convierte en promesa porque no lo hemos metido dentro??
//HE BUSCADO EN CLAUDE AI:
/*Para llamar a la función correctamente:
getAllFilms().then(films => {
    console.log(films)
})
// O usando async/await:
async function testGetFilms() {
    const films = await getAllFilms()
    console.log(films)
}
*/
 //Perfecto, el método PRINT se refiere a una función que tome los datos obtenidos de la API y los muestre/renderice en el HTML.
//Función PRINT para mostrar las películas:
//javascript// PRINT - Mostrar películas en el DOM
function printFilms(films) {
    const movieList = document.getElementById('movie-list')
    
    // Limpiar contenido previo
    movieList.innerHTML = ''
    
    // Crear una tarjeta para cada película
    films.forEach(film => {
        const movieCard = document.createElement('div')
        movieCard.className = 'movie-card'
        movieCard.innerHTML = `
            <h3>${film.title}</h3>
            <p><strong>Director:</strong> ${film.director}</p>
            <p><strong>Descripción:</strong> ${film.film_description}</p>
            <div class="card-actions">
                <button onclick="editFilm(${film.id})">Editar</button>
                <button onclick="deleteFilm(${film.id})">Eliminar</button>
            </div>
        `
        movieList.appendChild(movieCard)
    })
}

/* Función para cargar y mostrar todas las películas
async function loadAndPrintFilms() {
    try {
        const films = await getAllFilms()
        printFilms(films)
    } catch (error) {
        console.error('Error al cargar películas:', error)
    }
}
    */