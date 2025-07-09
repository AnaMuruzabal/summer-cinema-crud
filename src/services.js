/*Paso a paso para este proyecto:
1.Instalar nodejs.org, descargar la versión estable, incluye npm también, reiniciar VScode o GitBash si estaban abiertos. Para ver si tenemos instalado node ponemos node -v
2.npm: Node Package Manager: es un administrador de paquetes para JavaScript, específicamente para proyectos Node.js. Es una herramienta esencial que facilita la gestión  de dependencias, permitiendo a los desarrolladores instalar, actualizar, configurar y eliminar paquetes o librerías de JavaScript de manera sencilla.
3. En la terminal ponemos npm init -y --> esto carga un archivo nuevo que se llama node_modules
4. npm install json-server: que nos guarde nuestros registros
5. Existe un archivo que evita que se suba toda esta nueva carpeta muy pesada a GitHub: .gitignore y dentro se escribe node_modules/ Este es el entorno de trabajo que tenemos que crear siempre. 
6.Ahora vamos a crear a nuestro servidor con una carpeta server: dentro un archivo que va a ser nuestra base de datos de películas. Con esto simulamos nuestro servidor. Cada libro va a ser como una lista. Creamos objetos en formato json. 
7. Estamos usando una API fake. No es Sql, sino que json simula que lo es, para practicar y ensayar.
8.Ahora quiero levantar la URL, usar mi lista de simulación de base datos. Para eso usamos json-server. Desde la terminal, escribimos: npx json-server --watch server/db.json y nos crea una URL.

//PROYECTO CRUD para aprender autónomamente desde book-API-vanilla. Sofia y yo vamos a hacer lo mismo from scratch
//npm run api-fake --> para coger el recurso del script que hemos puesto en package.json--> Si pegamos la URL en Postman, con GET, me enseña los registros 3 registros
que he guardado, o el que ponga (1, 2 ó 3 detrás del slash “/”)

//URL de mi API, asegurarse siempre de que está levantada con npm run API http://localhost:3001/films
const API_URL = 'http: //localhost:3000/films';
/*const: define una constante, es decir, un valor que no cambia durante la ejecución del programa.
*API_URL: es el nombre de la constante. Representa la URL base donde se encuentran los datos de la API (en este caso, de películas)
*'http://localhost:3000/movies': es una URL local, lo que significa que estás accediendo a un servidor que corre en tu propio ordenador, en el puerto 3000, y en el endpoint /films
*¿Por qué localhost:3000?
*localhost: es una dirección especial que apunta a tu propia máquina.
*3000: es el puerto que probablemente esté usando un servidor como JSON Server, Express o similar.
* /films: es el recurso o "ruta" de la API donde se guardan o gestionan las películas.*/
//Un endpoint es una "dirección" o "ruta" dentro de una API (normalmente REST) que sirve para acceder o manipular un  tipo concreto de recurso. Es la parte final de la URL que indica a qué recurso estás accediendo. Se usa junto con un método HTTP como GET, POST, PUT, DELETE.
// 📚 ¿Qué puedes hacer con el endpoint /films?
/*Método HTTP	Acción	Explicación CRUD
GET	Leer	Obtener todas las películas o una en concreto
POST	Crear	Añadir una nueva película
PUT o PATCH	Actualizar	Modificar una película existente
DELETE	Eliminar	Borrar una película
*/
// CONFIGURACIÓN DE LA API
const API_URL = 'http://localhost:3000/films'

//____________________________CREATE- MÉTODO POST________________________________________________________
//Si quiero crear una nueva película (añadirla?)
async function createFilm(filmData, listType) { 
    //Esto es el manejo de errores, Celia recomienda hacerlo, abre un bloque try/catch que se usa para intentar ejecutar un código y atrapar errores si algo falla.
    try {
        // Determinar el endpoint según el tipo de lista
        const endpoint = listType === 'my' ? '/mymovies' : '/friendmovies';

        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...filmData,
                createdAt: new Date().toISOString()
            })
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const newFilm = await response.json();
        console.log('Film created: ', newFilm);
        return newFilm;
    } catch (error) {
        console.error('Error create film:', error);
        throw error; //Re-lanzar para que la UI pueda manejarlo
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