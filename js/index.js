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


}

function ocultarelemento(elemento) {
    elemento.style.display = 'none'
}
function mostrarelemento(elemento,formato){
    elemento.style.display = formato
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



            //localStorage.setItem('carrito', JSON.stringify(carrito))
        }
    });

}

function ircarrito(){

    // let carritostorage = JSON.parse(localStorage.getItem('carrito'))

    carritobutton.onclick = () => {
        // article1.remove() //////////////////////////////////////////////////////////////////
        // carritobutton.remove()//////////////////////////////////////////////////////////////
        ocultarelemento(article1)
        ocultarelemento(carritobutton)

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
        divbuttons.setAttribute('id', 'divcarritobtn')
        section1.append(divbuttons)
        /* const comprarbtn = document.createElement('button')
        comprarbtn.setAttribute()
        divbuttons.append(comprarbtn) */


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
        divbuttons.innerHTML = 
        `<button id="carritoclean" class="btn btn-success">Vaciar carrito</button>
        <button id="carritobuy" class="btn btn-success">Comprar carrito</button>`
        /* const vaciarCBtn = document.querySelector('#carritoclean')

        vaciarCBtn.onclick = () => {
            localStorage.removeItem("carrito")

        } */

        vaciarCarrito()

        comprarCarrito()

        
    }

}

/////////////////////////////////////produccion//////////////////////////////
function comprarCarrito() {
    const comprarCBtn = document.querySelector('#carritobuy')
    comprarCBtn.onclick = () => {
        const divcarritobtn = document.querySelector('#divcarritobtn')
        // localStorage.removeItem("carrito")
        artcarrito.remove()
        divcarritobtn.remove()
        // carrito = []
        console.log(carrito)

        const formArticle = document.createElement('article')
        formArticle.setAttribute('id', 'formArticle')
        section1.append(formArticle)

        formArticle.innerHTML = 
        `<form id="formbuycar">
            <fieldset>
                <div>
                    <label for="namecard">Nombre:</label>
                    <input type="text" name="" id="namecard" placeholder="Inserta tu nombre completo" required>
                </div>
                <div>
                    <label for="numcard">Numero de tarjeta:</label>
                    <input type="number" max="9999999999999999" min="1000000000000000" name="" id="numcard" placeholder="xxxx-xxxx-xxxx-xxxx" required>
                </div>
                <div>
                    <label for="expirecard">Vigencia:</label>
                    <input type="month" name="" id="expirecard" required>
                </div>
                <div>
                    <label for="cvvcard">Cvv:</label>
                    <input type="number" max="999" min="100" name="" id="cvvcard" placeholder="xxx" required>
                </div>
                
                <input type="submit" name="comprarjuegos">
            </fieldset>
        </form>`

        pagarcarrito()
    }

    
}
////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////produccion//////////////////////////////
function pagarcarrito() {

    const formbuycar = document.querySelector('#formbuycar')
    const namecard = document.querySelector('#namecard')
    const numcard = document.querySelector('#numcard')
    const expirecard = document.querySelector('#expirecard')
    const cvvcard = document.querySelector('#cvvcard')

    // biblioteca = JSON.parse(localStorage.getItem('carrito'))

    /* if(localStorage.getItem('biblioteca')){
        if((JSON.parse(localStorage.getItem('biblioteca'))) != []){
            biblioteca = (JSON.parse(localStorage.getItem('biblioteca'))).slice()
        }
    } */

    formbuycar.onsubmit = (enviar) => {
        enviar.preventDefault()
        const infousuariocard = {
            namecard: namecard.value,
            numcard: numcard.value,
            expirecard: expirecard.value,
            cvvcard: cvvcard.value
        }
        console.log(infousuariocard) 
        localStorage.setItem('infousuariocard', JSON.stringify(infousuariocard))
        formbuycar.remove()
        // formulario.detach()
        console.log("//////////////////////////////////////////")
        console.log(JSON.parse(localStorage.getItem('carrito')))
        console.log("//////////////////////////////////////////")

        //console.log(biblioteca)
        // localStorage.setItem('biblioteca', (localStorage.getItem('carrito')))

        // biblioteca.find((game) => game.id == )
        

        if(localStorage.getItem('biblioteca')){
            if((JSON.parse(localStorage.getItem('biblioteca'))) != []){
                // biblioteca = (JSON.parse(localStroage.getItem('biblioteca'))).slice()

                console.log("/////////////////////antes de asignar a var biblioteca/////////////////////")
                console.log(JSON.parse(localStorage.getItem('biblioteca')))
                console.log(biblioteca)
                console.log("//////////////////////////////////////////")

                biblioteca = JSON.parse(localStorage.getItem('biblioteca'))

                let carritotemp = JSON.parse(localStorage.getItem('carrito'))

                console.log("//////////////////////////////////////////")
                console.log(JSON.parse(localStorage.getItem('biblioteca')))
                console.log(biblioteca)
                console.log("//////////////////////////////////////////")

                // localStorage.setItem('biblioteca', (localStorage.getItem('carrito')))
                // biblioteca = (JSON.parse(localStorage.getItem('carrito'))).slice()

                console.log("//////////////////////////////////////////")
                console.log(JSON.parse(localStorage.getItem('carrito')))
                console.log(carritotemp)
                console.log("//////////////////////////////////////////")

                // console.log(`La biblioteca es: ${JSON.parse(localStorage.getItem('biblioteca'))}`)
                /* let juegorepet = []
                let juegonew = []
                juegorepet = (JSON.parse(localStorage.getItem('carrito'))).filter((game) => game.id == biblioteca.id)
                juegonew = (JSON.parse(localStorage.getItem('carrito'))).filter((game) => game.id != biblioteca.id)

                console.log(`Juegos repetidos: ${juegorepet}`)
                console.log(`Juegos nuevos: ${juegonew}`) */

                
                
                // console.log(`El carrito temporal es: ${JSON.parse(localStorage.getItem('carrito'))}`)

                carritotemp.forEach((gameselec) => {
                    // if(biblioteca.includes((game) => game.id == (JSON.parse(localStorage.getItem('carrito'))).id)){}

                    console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\')
                    console.log(biblioteca)

                    if(biblioteca.find((game) => game.id == gameselec.id)){

                        console.log('******************************************')
                        let juegorepetido = biblioteca.find((game) => game.id == gameselec.id)
                        console.log(juegorepetido)

                        let indexjuegorepetido = biblioteca.indexOf(juegorepetido)
                        let juegorepcarrito = carritotemp[indexjuegorepetido]

                        let cantidadjuegos = juegorepetido.cantidad + juegorepcarrito.cantidad
                        



                        // game.cantidad += gameselec.cantidad

                        console.log(game.cantidad)

                        // let juegorepetido = biblioteca.find((gameb) => gameb.id == gameselec.id)

                        // let juegorepetido = (JSON.parse(localStorage.getItem('carrito'))).find((gamerep) => gamerep.id == gameselec.id)
                    }else{
                        biblioteca.push(gameselec)
                    }
                    console.log('-----------------------------------------------')
                    console.log(gameselec)
                    console.log(biblioteca)
                })

                localStorage.setItem('biblioteca', JSON.stringify(biblioteca))

                console.log(biblioteca)

                biblioteca = []

                console.log('################################################')
                console.log(biblioteca)

                /* biblioteca = biblioteca.concat(JSON.parse(localStorage.getItem('carrito')))

                localStorage.setItem('biblioteca', JSON.stringify(biblioteca))

                console.log('Se agregaron nuevos productos a la biblioteca') */ ///////////////////////////////////////modificar Alert
                console.log('Se agregaron nuevos productos a la biblioteca') ///////////////////////////////////////modificar Alert
            }
        }else{
            localStorage.setItem('biblioteca', (localStorage.getItem('carrito')))

            console.log('Se agregaron nuevos productos a la biblioteca vacia') ///////////////////////////////////////modificar Alert
        }
        // localStorage.setItem('biblioteca', JSON.stringify(biblioteca))
        // carrito = []
        localStorage.removeItem("carrito")
        

        mostrarcatalogo()
        mostrarelemento(carritobutton, 'flex')
        
    }
}
////////////////////////////////////////////////////////////////////////////

function vaciarCarrito() {
    const vaciarCBtn = document.querySelector('#carritoclean')
    vaciarCBtn.onclick = () => {
        const divcarritobtn = document.querySelector('#divcarritobtn')
        /* localStorage.removeItem("carrito")
        imprimirjuegos()
        console.log(carrito) */
        mostrarelemento(article1, 'flex')
        mostrarelemento(carritobutton, 'flex')
        localStorage.removeItem("carrito")
        artcarrito.remove()
        divcarritobtn.remove()
        // divbuttons.remove()
        carrito = []
        console.log(carrito)
    }
}

let juegos_disponibles = []
let carrito = []
let biblioteca = []
let carritostorage = []

let addcar


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


        if(localStorage.getItem('infousuario')){
            formulario.remove()
            // formulario.detach()
            mostrarcatalogo()

            console.log(JSON.parse(localStorage.getItem('infousuario')))
        }else{

            login()
        }

    })
    .then((resp) => {
        console.log(imprimirjuegos())

        addcar = imprimirjuegos()

        return addcar
    })
    .then((resp) => {


        agregarAlCarrito(resp)


    })
    .then((resp) => {

        ircarrito(resp)

        
    })
    /* .then((resp) => {
        vaciarCarrito()
    }) */
    .catch((err) => console.log(err))
}



