const pool = require('../../database/connection.js');

module.exports = async(req, res)=>{
    console.log('ingresa a getAllUsuarios ');
    const{filtroEspecialidad} = req.body;
    console.log('Que tiene filtroEspecialidad en getAllUsuarios: ', filtroEspecialidad);

    //TRAE TODOS LOS INSCRIPTOS
    let armaquery = `SELECT u.id_usuario, u.dni, u.apellido, u.nombre, u.cargo, u.escuela, u.modalidad, u.zona, u.region_actual, u.region_solicitada, u.email, u.telefono
        FROM usuarios AS u `;

        if(filtroEspecialidad && filtroEspecialidad!=''){
            armaquery += ` WHERE u.especialidad = ${filtroEspecialidad} `
        }

        armaquery += ` ORDER BY u.id_usuario ASC `;

    try{
        const [result] = await pool.query(`${armaquery} `);
        // console.log('que trae inscriptos: ', result);

        res.status(200).json(result);
    }catch(error){
        res.status(400).send(error.message);
    }
};