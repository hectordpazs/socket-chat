const {io} = require('../server');
const {Usuarios} = require('../classes/usuarios');
const {crearMensaje} = require('../utils/utils');

const usuarios = new Usuarios();

io.on('connection', (client)=>{

    client.on('entrarChat' , (usuario, callback)=>{
        
        if(!usuario.nombre||!usuario.sala){
            return callback('El nombre y la sala son necesarias')
        }

        client.join(usuario.sala);

        usuarios.agregarPersona(client.id , usuario.nombre, usuario.sala);

        client.broadcast.to(usuario.sala).emit('listaPersona', usuarios.getPersonasPorSala(usuario.sala));

        callback(usuarios.getPersonasPorSala(usuario.sala));
    })

    client.on('crearMensaje', (data)=>{
        let persona = usuarios.getPersonaById(client.id)
        let mensaje = crearMensaje(persona.nombre, data.mensaje)
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)
    })

    client.on('disconnect', ()=>{
        const usuarioBorrado = usuarios.borrarPersona(client.id);

        client.broadcast.to(usuarioBorrado.sala).emit('crearMensaje' , crearMensaje('Administrador', `${usuarioBorrado.nombre}, Salio`))
        client.broadcast.to(usuarioBorrado.sala).emit('listaPersona', usuarios.getPersonasPorSala(usuarioBorrado.sala));
    })

    //mensajes privados

    client.on('mensajePrivado' , data =>{
        const persona = usuarios.getPersonaById(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))
    })

    

})