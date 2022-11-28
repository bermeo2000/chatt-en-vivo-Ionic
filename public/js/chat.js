var socket = io();
let message = document.getElementById("message");
let send = document.getElementById("enviar")
let contenedor = document.getElementById("contenedor")
let ContainerMessage = document.getElementById("containerMessage")
let Typing = document.getElementById("typing")

var foto;
var nombre;
var texto;

send.addEventListener('click', function() {
    texto = message.value
    socket.emit('chat:msg', { texto, nombre, foto })
})

//para que salga escribiendo
message.addEventListener('keypress', function() {
    texto = message.value

    socket.emit('typing', { texto, nombre, foto })
})



socket.on('chat:msgback', function(data) {


    //console.log("mensaje de retorno", data);


    typing.innerHTML = ''

    contenedor.innerHTML += ` <div style="flex-direction:column ;">
     <img src="${data.foto}" alt="avatar" class="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60">
    <div class="card">
        <div class="card-header d-flex justify-content-between p-3">
            <p class="fw-bold mb-0">${data.nombre}</p>
            <p class="text-muted small mb-0"><i class="far fa-clock"></i> 10 mins ago</p>
        </div>
        <div class="card-body">
            <p class="mb-0">
            ${data.texto} 
              </p>
        </div>
    </div>
    </div>`

    // que salga escribiendo 



})

socket.on('typing', function(data) {
    console.log("hola");
    typing.innerHTML = `<p> ${data.nombre} escribiendo</p>`
})




function getData(event) {

    foto = event.children[0].children[0].children[0].currentSrc;
    nombre = event.children[0].children[0].children[1].children[0].innerHTML;

}