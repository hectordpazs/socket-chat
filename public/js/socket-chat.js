const socket = io();

const params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala')){
    window.location='index.html';
    throw new Error ('El nombre y sala son necesarios')
}

const usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};


//escuchar
socket.on('connect' , function(){
    console.log('Conectado al servidor');

    socket.emit('entrarChat' , usuario, (resp)=>{
        console.log('Usuarios conectados' , resp);
    });

});

//escuchar
socket.on('disconnect', function(){
    console.log('Perdimos conexion con el servidor');
});

//Enviar informacion:
/*socket.emit('crearMensaje', {
    usuario: 'Hector',
    mensaje: 'Hola mundo'
}, function(resp){
    console.log("Respuesta del servidor: " + resp);
});*/

//Escuchar informacion
socket.on('crearMensaje', function(mensaje){
    console.log('Servidor: ' , mensaje);
})

//escuchar cambios de usuarios
//cuando entran o salen del chat

socket.on('listaPersona', (personas)=>{
    console.log(personas)
})

//mensajes privados
socket.on('mensajePrivado' , (mensaje)=>{
    console.log('Mensaje Privado: ' , mensaje);
})