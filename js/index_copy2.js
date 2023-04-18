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

let enviado = false

function login() {

    // if()

    formulario.onsubmit = (enviar) => {
        enviar.preventDefault()
        const infousuario = {
            nickname: inputnickname.value,
            correo: inputcorreo.value
        }
        localStorage.setItem('infousuario', JSON.stringify(infousuario))
        formulario.remove()
        // formulario.detach()
        mostrarcatalogo()
        console.log('registro exitoso') ///////////////////////////////////////modificar Alert
        enviado = true
    }

    const infousuario = localStorage.getItem('infousuario')
    const infousuarioJS = JSON.parse(infousuario)
    console.log(infousuarioJS)


    /* if (enviado == true) {
        ocultarlogin()
        mostrarcatalogo()
        cargarjuegos()
        console.log(enviado)
    } */
}

function ocultarlogin() {
    formulario.style.display = 'none'
}

function ocultarcatalogo() {
    article1.style.display = 'none'
}

function mostrarcatalogo() {
    article1.style.display = 'flex'
    // article1.style.gap = '10px'
}

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
    // article1.style.gap = '10px'
    return document.querySelectorAll('#catalogo1 .card .card-body button')
}

function agregarAlCarrito(){

    if(localStorage.getItem('carrito')){
        if((JSON.parse(localStorage.getItem('carrito'))) != []){
            carrito = (JSON.parse(localStorage.getItem('carrito'))).slice()
        }
    }

    addcar.forEach(btn => {
        btn.onclick = () =>{

            // carrito = (JSON.parse(localStorage.getItem('carrito'))).slice()

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

            localStorage.setItem('carrito', JSON.stringify(carrito))
            // carritostorage.push()



            localStorage.setItem('carrito', JSON.stringify(carrito))
        }
    });

    // resolver con if ////////////////////
}

function ircarrito(){

    // let carritostorage = JSON.parse(localStorage.getItem('carrito'))

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

        const divbuttons = document.createElement('div')
        section1.append(divbuttons)
        const comprarbtn = document.createElement('button')
        divbuttons.append(comprarbtn)


        tbcarh.innerHTML = `<tr>
            <th>Juego</th>
            <th>Precio original</th>
            <th>Descuento</th>
            <th>Precio actual</th>
            <th>Cantidad</th>
            <th>Total</th>
        </tr>`
        // carrito. ...
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

let juegos_disponibles = []
let carrito = []
let carritostorage = []

let addcar

// login()
cargarjuegos()
function cargarjuegos(){
    fetch("js/games.json")
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
        juegos_disponibles = juegos.slice()
        console.log(juegos_disponibles)
    })
    .then ((resp) => {
        /* const infousuario = localStorage.getItem('infousuario')
        const infousuarioJS = JSON.parse(infousuario)
        console.log(infousuarioJS) */

        if(localStorage.getItem('infousuario')){
            formulario.remove()
            // formulario.detach()
            mostrarcatalogo()

            console.log(JSON.parse(localStorage.getItem('infousuario')))
        }else{

            login()
        }

        // login()
    })
    .then((resp) => {
        console.log(imprimirjuegos())
        // article1.style.gap = '10px'
        addcar = imprimirjuegos()

        return addcar
    })
    .then((resp) => {

        /* if(!localStorage.getItem('carrito')){
            localStorage.setItem('carrito', '[]')
            // localStorage.setItem('carrito', JSON.stringify(carrito))
        }else if(JSON.parse(localStorage.getItem('carrito')) == []){
            agregarAlCarrito(resp)
        }else if(JSON.parse(localStorage.getItem('carrito')) != []){

        } */

        agregarAlCarrito(resp)

        /* agregarAlCarrito(resp)
        console.log(JSON.parse(localStorage.getItem('carrito'))) */
        // let carritostorage = JSON.parse(localStorage.getItem('carrito'))
    })
    .then((resp) => {
        // localStorage.setItem('carrito', JSON.stringify(carrito))
        ircarrito(resp)
    })
    /* .then((resp) => {
        if (enviado == true) {
            ocultarlogin()
            mostrarcatalogo()
            cargarjuegos()
            console.log(enviado)
        }
    }) */
    .catch((err) => console.log(err))
}



