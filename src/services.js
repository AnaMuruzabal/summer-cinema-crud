//PROYECTO CRUD para aprender autónomamente desde book-API-vanilla. Sofia y yo vamos a hacer lo mismo from scratch

//URL de mi API, asegurarse siempre de que está levantada con npm run API http://localhost:3001/films
const API_URL = 'http: //localhost:3000/films';
/*const: define una constante, es decir, un valor que no cambia durante la ejecución del programa.
*API_URL: es el nombre de la constante. Representa la URL base donde se encuentran los datos de la API (en este caso, de películas)
*'http://localhost:3000/movies': es una URL local, lo que significa que estás accediendo a un servidor que corre en tu propio ordenador, en el puerto 3000, y en el endpoint /films
*¿Por qué localhost:3000?
*localhost: es una dirección especial que apunta a tu propia máquina.
*3000: es el puerto que probablemente esté usando un servidor como JSON Server, Express o similar.
* /movies: es el recurso o "ruta" de la API donde se guardan o gestionan las películas.*/





//____________________________CREATE- MÉTODO POST________________________________________________________
//Si quiero crear una nueva película (añadirla?)
async function createFilm(filmData) { 
    //Esto es el manejo de errores, Celia recomienda hacerlo, abre un bloque try/catch que se usa para intentar ejecutar un código y atrapar errores si algo falla.
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(filmData)
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
    }
/*explicación: _async_ es necesario porque JavaScript es asíncrono: esta función va a hacer cosas que tardan un tiempo
                _function_ es la palabra que usamos para crear una "caja de instrucciones" que podemos usar luego, para no tener que escribir el mismo código una y otra vez (la receta de cocina)
                _createFilm_ es el nombre que le damos a nuestra función, le ponemos este nombre porque esta función va a crear una película nueva. 
                _(filmdata)_ es un parámetro, es la información que le pasamos a cada función, contiene  todos los datos de la película: título, director, año etc. es como si le decimos a alguien guárdame este número y le das el nombre y el teléfono*/
/*Imagina que tienes una caja de instrucciones para "crear película"
async function createFilm(filmData) {
    // Aquí van las instrucciones:
    // 1. Tomar los datos de la película
    // 2. Enviarlos al servidor
    // 3. Esperar respuesta
    // 4. Mostrar la película nueva en la pantalla
    ¿Por qué usar async? sin async:
    function crearPelicula() {
        enviarAlServidor(); Esto tarda dos segundos
        mostrarEnPantalla(); Esto pasa antes de que termine
    con async:
        async function crearPelicula(){
            await enviarAlServidor(); Espera 2 segundos
            mostrarEnPantalla();
        }
}*/
}
/* READ MÉTODO GET
async function getAllFilms() {
    const response = await fetch("http://localhost:3001/films")
    const filmData = await response.json()
    return filmData
}
 */
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