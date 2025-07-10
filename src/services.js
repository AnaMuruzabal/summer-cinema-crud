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
// definir la variable de mi caché local para darle más ''eficiencia'' no tantas llamadas al servidor digamos
let filmsDatabase = {
    myFilms: [],
    friendFilms: []
};

//____________________________CREATE- MÉTODO POST_________________________________________________________________________________
//Si quiero crear una nueva película (añadirla)
async function createFilm(filmData, listType) { //"Oye función, cuando alguien te diga 'crea una película', tú vas a necesitar dos cosas: los datos de la película y si es para mi lista o la de mi amiga"
    //Esto es el manejo de errores, Celia recomienda hacerlo, abre un bloque try/catch que se usa para intentar ejecutar un código y atrapar errores si algo falla.
    try { //Vamos a intentar hacer esto, pero si algo sale mal no rompas todo
        // Aquí vamos a decidir dónde guardar, es decir: Si es mi película la guardas en '/myFilms'. Si es de mi amiga la guardas en 'friendFilms' 
        const endpoint = listType === 'my' ? '/myFilms' : '/friendFilms';
        /*SI listType es 'my' el endpoint será '/myFilms'
        SI lisType es 'friend' el endpoint será 'friendFilms'
        Esta sintaxis en verdad es una forma corta de escribir un if/else que se llama operador ternario.
        La forma normal que conozco es defino la función:
        let endpoint;
        if (listType === 'my') {
            endpoint = 'myFilms';
        } else {
            endpoint = '/friendFilms'};
        } con el operador ternario es: const endpoint = listType === 'my' ? 'myFilms' : '/friendFilms'; 
// Paso a paso:
// 1. ¿'my' === 'my'? → SÍ (true)
// 2. Como es SÍ, toma el primer valor: '/myFilms'
// 3. endpoint = '/myFilms'
javascriptconst listType = 'friend';
const endpoint = listType === 'my' ? '/myFilms' : '/friendFilms';
// Paso a paso:
// 1. ¿'friend' === 'my'? → NO (false)  
// 2. Como es NO, toma el segundo valor: '/friendFilms'
// 3. endpoint = '/friendFilms'
//Envío una película al servidor*/
        const response = await fetch(`${API_URL}${endpoint}`, {
        // le digo que construya la dirección completa donde vpy a enviar la película, es decir al localhost + /myFilms por ejemplo
            method: 'POST', //le digo al servidor que quiero CREAR algo nuevo, no leerlo ni borrarlo
            headers: { 
                'Content-Type': 'application/json', //dile al servidor que le voy a enviar datos en formato JSON
            },
            body: JSON.stringify({ //conviérteme los datos de la película en un formato que el servidor entienda
                title: filmData.title,
                director: filmData.director,
                description: filmData.description, 
            })
        });

        if (!response.ok) {//si el servidor me dice que algo salió mal, qeue me diga que hay un error. El signo de exclamación es un DISTINTO DE, "se cubre las espaldas con la lógica negativa, me dice Ignacio que este tipo de lógica negativa es bastante habitual en programación"
            throw new Error(`Error HTTP: ${response.status}`);
        }
        console.log('Se ejecuta, todo bien');
        const newFilm = await response.json();
        console.log('CREATE listo: Film created in API: ', newFilm);

        // Actualizar caché local, mi copia local para dar eficiencia: ahora que ya está guardada en el servidor, también la appunto en mi cuaderno personal para no tener que preguntar al servidor cada vez
        if (listType === 'my') { //si list type tiene el valor my entonces:
            filmsDatabase.myFilms.push(newFilm); //me metes también el new film en mi variable local (caché) que es filmsDatabase pero en la de myfilms que es la mía coon el método push que es un method de array y si no...
        } else {
            filmsDatabase.friendFilms.push(newFilm); //lo metes en el de mi amiga
        }
        return newFilm;  //y me devuelves el newFilm
    //Finalizo el try-catch con el catch para atrapar errores
    } catch (error) { 
        console.error('Error CREATE film:', error);
        showNotification('Error al crear la película', 'error');
        return null;
    }
}
//___________________________________________READ- MÉTODO GET__________________________________________________________________
async function readMovie(lisType){
    try{
        const endpoint = listType === 'my' ? 'myFilms' : '/friendFilms';

        const response = await fetch(`${API_URL}${endpoint}`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
    const films = await response.json();
    console.log('READ: Películas obtenidas de API', films);

    // Actualizar caché local
    if (listType === 'my') {
        filmsDatabase.myFilms = films;
    } else 
    }
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
/*function printFilms(films) {
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