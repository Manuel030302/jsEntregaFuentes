const article1 = document.querySelector('#catalogo1')
const section1 = document.querySelector('#section1')
const carritobutton = document.querySelector('#ircarrito')
const formulario = document.querySelector('#iniciosesion')
const inputnickname = document.querySelector('#nickname')
const inputcorreo = document.querySelector('#correo')

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

class Juego{
    constructor(id,nombre,precio,descuento,puntuacion,imagen){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.descuento = descuento
        this.puntuacion = puntuacion
        this.imagen = imagen
    }
}

const Juegos = [
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
]

const carrito = []

Juegos.forEach(game => {
    article1.innerHTML = article1.innerHTML + `<div class="card" style="width: 18rem;">
    <img src="${game.imagen}" class="card-img-top" alt="icono de prueba">
    <div class="card-body">
      <h5 class="card-title">${game.nombre}</h5>
      <p class="card-text">Precio: ${game.precio} MNX <br>Descuento:${game.descuento*100}% <br>Preio actual:${game.precio-(game.precio*game.descuento)} MNX <br>Calificacion: ${game.puntuacion}</p>
      <button id=${game.id} class="btn btn-primary">Agregar Al Carrito</button>
    </div>
  </div>`
});

console.log(Juegos)
const addcar = document.querySelectorAll('#catalogo1 .card .card-body button')
console.log(addcar)

addcar.forEach(btn => {
    btn.onclick = () =>{
        const juego = Juegos.find((game) => game.id === parseInt(btn.id))

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
        }else{
            carrito.push(Juegoelegido)
        }
        console.log(carrito)
    }
});

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
