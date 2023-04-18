// Objetos y Arrays. Métodos de Arrays.############
// Funciones y condicionales.############
// Generación del DOM de forma dinámica. Eventos.############
// Sintaxis avanzada.############
// Al menos una librería de uso relevante para el proyecto.############
// Manejo de promesas con fetch.############
// Carga de datos desde un JSON local o desde una API externa.############
// Recuerda agregar validaciones en el ingreso de los datos del usuario. No se debería poder ingresar valores vacíos.
// Podrías agregar botones para que el usuario pueda modificar los productos agregados en el carrito.
// Podrías agregar una funcionalidad para finalizar la compra, en donde el usuario tenga que ingresar sus datos y luego de validarlos, mostrar un mensaje de compra finalizada y limpiar el carrito de compras.
// Recuerda agregar un archivo README en el repositorio con la descripción de tu proyecto



const article1 = document.querySelector('#catalogo1')
const section1 = document.querySelector('#section1')
const carritobutton = document.querySelector('#ircarrito')
const formulario = document.querySelector('#iniciosesion')
const inputnickname = document.querySelector('#nickname')
const inputcorreo = document.querySelector('#correo')

function login() {
    formulario.onsubmit = (enviar) => {
        enviar.preventDefault()
        const infousuario = {
            nickname: inputnickname.value,
            correo: inputcorreo.value
        }
        localStorage.setItem('infousuario', JSON.stringify(infousuario))
        formulario.remove()
        alert('registro exitoso')
    }
    const infousuario = localStorage.getItem('infousuario')
    const infousuarioJS = JSON.parse(infousuario)
    console.log(infousuarioJS)
}



/* class Juego{
    constructor(id,nombre,precio,descuento,puntuacion,imagen){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.descuento = descuento
        this.puntuacion = puntuacion
        this.imagen = imagen
    }
} */

/* const Juegos = [
    new Juego(1,'dredge',300,.25,4,'./media/imageicon.png'),
    new Juego(2,'resident evil 4',1200,0,5,'./media/imageicon.png'),
    new Juego(3,'sons of the fores',350,.2,5,'./media/imageicon.png'),
    new Juego(4,'the forest',200,.3,5,'./media/imageicon.png'),
    new Juego(5,'the wild eight',300,.45,4,'./media/imageicon.png'),
    new Juego(6,'cs:go',0,0,4,'./media/imageicon.png'),
    new Juego(7,'dayz',600,.2,3,'./media/imageicon.png'),
    new Juego(8,'forza horizon 4',700,.2,4,'./media/imageicon.png'),
    new Juego(9,'the long dark',400,.75,3,'./media/imageicon.png'),
    new Juego(10,'stardew valley',250,.45,5,'./media/imageicon.png'),
    new Juego(11,'dont starve together',100,.5,4,'./media/imageicon.png'),
    new Juego(12,'the last of us 1',1000,0,5,'./media/imageicon.png'),
    new Juego(13,'the last of us 2',1400,0,1,'./media/imageicon.png'),
    new Juego(14,'elden ring',800,.3,5,'./media/imageicon.png'),
    new Juego(15,'cult of the lamb',250,.1,5,'./media/imageicon.png'),
    new Juego(16,'overwatch',0,0,3,'./media/imageicon.png'),
    new Juego(17,'haven',150,.4,5,'./media/imageicon.png'),
    new Juego(18,'celeste',100,.6,5,'./media/imageicon.png')
] */

let juegos_disponibles = []
const carrito = []

/////////////////////////////////////////////////
function notificacioncarrito(message) {
    Toastify({
        text: `${message}`,
        duration: 4000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
}


// Toastify().showToast();
/////////////////////////////////////////////////

function imprimirjuegos() {
    juegos_disponibles.forEach(game => {
        article1.innerHTML = article1.innerHTML + `<div class="card" style="width: 18rem;">
            <img src="${game.image}" class="card-img-top" alt="icono de prueba">
            <div class="card-body">
                <h5 class="card-title">${game.name}</h5>
                <p class="card-text">Precio: ${game.price} MNX <br>Descuento:${game.discount*100}% <br>Preio actual:${game.price-(game.price*game.discount)} MNX <br>Calificacion: ${game.rate}</p>
                <button id=${game.id} class="btn btn-primary">Agregar Al Carrito</button>
            </div>
        </div>`
    });
    return document.querySelectorAll('#catalogo1 .card .card-body button')
}

function cargarjuegos() {
    fetch("js/games.json")
        // .then((resp) => resp.json())
        .then((resp) => {

            if(!resp.ok){
                throw {
                    ok:false,
                    msg: "Error 404, no fue posible cargar el contenido"
                }
            }
            return resp.json()
        })
        .then((resp) => {
            console.log(resp)
            const juegos = resp.games
            console.log(juegos)
            // const juegos = resp.games
            juegos_disponibles = juegos.slice()
            // juegos_disponibles.push(juegos)
            console.log(juegos_disponibles)
        })
        .then((resp) => {
            console.log(imprimirjuegos())
            addcar = imprimirjuegos()
            /* juegos_disponibles.forEach(game => {
                article1.innerHTML = article1.innerHTML + `<div class="card" style="width: 18rem;">
                    <img src="${game.image}" class="card-img-top" alt="icono de prueba">
                    <div class="card-body">
                        <h5 class="card-title">${game.name}</h5>
                        <p class="card-text">Precio: ${game.price} MNX <br>Descuento:${game.discount*100}% <br>Preio actual:${game.price-(game.price*game.discount)} MNX <br>Calificacion: ${game.rate}</p>
                        <button id=${game.id} class="btn btn-primary">Agregar Al Carrito</button>
                    </div>
                </div>`
            }); */
            return addcar
        })
        .then((resp) => agregarAlCarrito(resp))
        .then((resp) => ircarrito(resp))
        .catch((err) => console.log(err))
}
let addcar
login()
cargarjuegos()

/* juegos_disponibles.forEach(game => {
    article1.innerHTML = article1.innerHTML + `<div class="card" style="width: 18rem;">
        <img src="${game.image}" class="card-img-top" alt="icono de prueba">
        <div class="card-body">
            <h5 class="card-title">${game.name}</h5>
            <p class="card-text">Precio: ${game.price} MNX <br>Descuento:${game.discount*100}% <br>Preio actual:${game.price-(game.price*game.discount)} MNX <br>Calificacion: ${game.rate}</p>
            <button id=${game.id} class="btn btn-primary">Agregar Al Carrito</button>
        </div>
    </div>`
}); */

/* function imprimirjuegos() {
    fetch('./games.json')
    .then((resp) => resp.json())
    .then((resp) => {
        const juegos = resp.games
        juegos.forEach((game) => {
            article1.innerHTML = article1.innerHTML + `<div class="card" style="width: 18rem;">
                <img src="${game.image}" class="card-img-top" alt="icono de prueba">
                <div class="card-body">
                <h5 class="card-title">${game.name}</h5>
                <p class="card-text">Precio: ${game.price} MNX <br>Descuento:${game.discount*100}% <br>Preio actual:${game.price-(game.price*game.discount)} MNX <br>Calificacion: ${game.rate}</p>
                <button id=${game.id} class="btn btn-primary">Agregar Al Carrito</button>
                </div>
            </div>`
        })
    })
} */

// imprimirjuegos()

/* Juegos.forEach(game => {
    article1.innerHTML = article1.innerHTML + `<div class="card" style="width: 18rem;">
    <img src="${game.imagen}" class="card-img-top" alt="icono de prueba">
    <div class="card-body">
      <h5 class="card-title">${game.nombre}</h5>
      <p class="card-text">Precio: ${game.precio} MNX <br>Descuento:${game.descuento*100}% <br>Preio actual:${game.precio-(game.precio*game.descuento)} MNX <br>Calificacion: ${game.puntuacion}</p>
      <button id=${game.id} class="btn btn-primary">Agregar Al Carrito</button>
    </div>
  </div>`
}); */
/* console.log(Juegos) */



/* const addcar = document.querySelectorAll('#catalogo1 .card .card-body button')
console.log(addcar) */

function agregarAlCarrito(){
    addcar.forEach(btn => {
        btn.onclick = () =>{
            const juego = juegos_disponibles.find((game) => game.id === parseInt(btn.id))
            console.log(juego)
            const Juegoelegido = {
                id: juego.id,
                nombre: juego.name,
                precio: juego.price,
                descuento: juego.discount,
                puntuacion: juego.rate,
                imagen: juego.image,
                cantidad : 1
            }
            console.log(Juegoelegido)
            const Juegoencarrito = carrito.find(g => g.id === Juegoelegido.id)
            if(Juegoencarrito){
                Juegoencarrito.cantidad++
                const message = `Articulo en biblioteca anadido al carrito`
                notificacioncarrito(message)
            }else{
                carrito.push(Juegoelegido)
                const message = `Articulo nuevo anadido al carrito`
                notificacioncarrito(message)
            }
            console.log(carrito)

            
        }
    });
}

/* addcar.forEach(btn => {
    btn.onclick = () =>{
        const juego = juegos_disponibles.find((game) => game.id === parseInt(btn.id))

        const Juegoelegido = {
            id: juego.id,
            nombre: juego.nombre,
            precio: juego.precio,
            descuento: juego.descuento,
            puntuacion: juego.puntuacion,
            imagen: juego.imagen,
            cantidad : 1
        }

        const Juegoencarrito = carrito.find(g => g.id === Juegoelegido.id)
        if(Juegoencarrito){
            Juegoencarrito.cantidad++
            const message = `Articulo en biblioteca anadido al carrito`
            notificacioncarrito(message)
        }else{
            carrito.push(Juegoelegido)
            const message = `Articulo nuevo anadido al carrito`
            notificacioncarrito(message)
        }
        console.log(carrito)
    }
}); */

function ircarrito(){
    carritobutton.onclick = () => {
        article1.remove()
        carritobutton.remove()
    
        const artcarrito = document.createElement('article')
        artcarrito.setAttribute('id', 'artcarrito')
        section1.append(artcarrito)
        const tbcarrito = document.createElement('table')
        tbcarrito.setAttribute('id', 'tbcarrito')
        tbcarrito.setAttribute('class', 'table')
        artcarrito.append(tbcarrito)
        const tbcarh = document.createElement('thead')
        tbcarrito.append(tbcarh)
        const tbcarb =document.createElement('tbody')
        tbcarrito.append(tbcarb)
    
        tbcarh.innerHTML = `<tr>
            <th>Juego</th>
            <th>Precio original</th>
            <th>Descuento</th>
            <th>Precio actual</th>
            <th>Cantidad</th>
            <th>Total</th>
        </tr>`
        carrito.forEach(game => {
            tbcarb.innerHTML += `<tr>
                <td>${game.nombre}</td>
                <td>${game.precio}</td>
                <td>${game.descuento*100}%</td>
                <td>${game.precio-(game.precio*game.descuento)}</td>
                <td>${game.cantidad}</td>
                <td>${game.cantidad*(game.precio-(game.precio*game.descuento))}</td>
            </tr>`
        })
    }
    
}
/* carritobutton.onclick = () => {
    article1.remove()
    carritobutton.remove()

    const artcarrito = document.createElement('article')
    artcarrito.setAttribute('id', 'artcarrito')
    section1.append(artcarrito)
    const tbcarrito = document.createElement('table')
    tbcarrito.setAttribute('id', 'tbcarrito')
    tbcarrito.setAttribute('class', 'table')
    artcarrito.append(tbcarrito)
    const tbcarh = document.createElement('thead')
    tbcarrito.append(tbcarh)
    const tbcarb =document.createElement('tbody')
    tbcarrito.append(tbcarb)

    tbcarh.innerHTML = `<tr>
        <th>Juego</th>
        <th>Precio original</th>
        <th>Descuento</th>
        <th>Precio actual</th>
        <th>Cantidad</th>
        <th>Total</th>
    </tr>`
    carrito.forEach(game => {
        tbcarb.innerHTML += `<tr>
            <td>${game.nombre}</td>
            <td>${game.precio}</td>
            <td>${game.descuento*100}%</td>
            <td>${game.precio-(game.precio*game.descuento)}</td>
            <td>${game.cantidad}</td>
            <td>${game.cantidad*(game.precio-(game.precio*game.descuento))}</td>
        </tr>`
    })
}
 */