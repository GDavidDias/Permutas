const pool = require('../../database/connection.js');

module.exports = async(req, res)=>{
    //TRAE TODOS LOS INSCRIPTOS
    let armaquery = `SELECT u.id_usuario, u.dni, u.apellido, u.nombre, u.cargo, u.escuela, u.modalidad, u.zona, u.email, u.telefono
        FROM usuarios AS u
        ORDER BY u.id_usuario ASC `;

    try{
        const [result] = await pool.query(`${armaquery} `);
        console.log('que trae inscriptos: ', result);

        res.status(200).json(result);
    }catch(error){
        res.status(400).send(error.message);
    }
};