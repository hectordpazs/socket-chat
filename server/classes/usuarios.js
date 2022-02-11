/*{
    id: 'aalskdjasldkd-asdad',
    nombre: 'hector',
    sala: 'Video Juegos
}*/

class Usuarios {
    constructor(){
        this.personas = [];
    }

    agregarPersona(id, nombre, sala){

        let persona = {
            id, nombre, sala
        };

        this.personas.push(persona);

        return this.personas;
    }

    getPersonaById(id){
        const personaID = this.personas.filter(p=> p.id === id)[0];

        return personaID;
    }

    getPersonas(){
        return this.personas;
    }

    getPersonasPorSala(sala){
        const personasPorSala = this.personas.filter(p=>p.sala===sala);
        return personasPorSala;
    }

    borrarPersona(id){
        const personaBorrada = this.getPersonaById(id);

        this.personas = this.personas.filter(p=>p.id!==id);

        return personaBorrada;
    }
}





module.exports={
    Usuarios,
}