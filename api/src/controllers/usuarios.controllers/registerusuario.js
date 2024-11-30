const pool = require('../../database/connection.js');

module.exports = async(req,res)=>{
    const{dni, password, apellido, nombre, cargo, escuela, modalidad, zona, region_actual, region_solicitada, email, telefono, permiso} = req.body;
    console.log('que viene en dni: ', dni);
    console.log('que viene en password: ', password);
    console.log('que viene en apellido: ', apellido);
    console.log('que viene en nombre: ', nombre);
    console.log('que viene en cargo: ', cargo);
    console.log('que viene en escuela: ', escuela);
    console.log('que viene en modalidad: ', modalidad);
    console.log('que viene en zona: ', zona);
    console.log('que viene en region_actual: ', region_actual);
    console.log('que viene en region_solicitada: ', region_solicitada);
    console.log('que viene en email: ', email);
    console.log('que viene en telefono: ', telefono);
    console.log('que viene en permiso: ', permiso);

    try{
        const [result] = await pool.query(`INSERT INTO usuarios(dni, password, apellido, nombre, cargo, escuela, modalidad, zona, region_actual, region_solicitada, email, telefono, permiso) VALUES(${dni}, '${password}', '${apellido}', '${nombre}', '${cargo}', '${escuela}', '${modalidad}', '${zona}', '${region_actual}', '${region_solicitada}', '${email}', '${telefono}', '${permiso}'); `);

        const[rows] = await pool.query('SELECT LAST_INSERT_ID() AS id_usuario');
        const id_usuario = rows[0].id_usuario;

        console.log('que trae result registerusuario: ', result);

        res.status(200).json({
            message:'Usuario Registrado',
            id_usuario:id_usuario,
            dni:dni,
            password:password,
            apellido:apellido, 
            nombre:nombre,
            cargo:cargo,
            modalidad: modalidad,
            zona:zona,
            email:email, 
            permiso:permiso
        });
        
    }catch(error){
        res.status(400).send(error.message);
    }
    
};