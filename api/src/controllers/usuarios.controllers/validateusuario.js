const pool = require('../../database/connection.js');

module.exports = async(req,res)=>{
    const{dni, password} = req.body;
    console.log('que viene en dni: ', dni);
    console.log('que viene en password: ', password);

    try{
        const [result] = await pool.query(`SELECT u.id_usuario, u.dni, u.apellido, u.nombre, u.cargo, u.escuela, u.modalidad, u.zona, u.email, u.permiso
            FROM usuarios AS u 
            WHERE u.dni='${dni}' AND u.password='${password}';`);

        console.log('que trae result validateusuario: ', result);

        res.status(200).json(result);
        
    }catch(error){
        res.status(400).send(error.message);
    }
    
};