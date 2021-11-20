const express = require('express');
const router =  express.Router();

const pool = require('../database.js');

router.get('/', async (req, res)=>{
    let listAutos = await pool.query('SELECT * FROM autos');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listAutos: listAutos
    });
});

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    let auto = await pool.query('SELECT * FROM autos WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado el auto",
        auto: auto
    });
});

router.post('/create', async (req, res)=> {
    const { nombre, matricula, verificacion, fechaRegistro, marca } = req.body;
    var dateCreated = new Date().toISOString();
    //var dateCreated2 = new Date().toLocaleString();
    const auto ={
        nombre, matricula, verificacion, fechaRegistro: dateCreated , estado:1, marca
    };

    await pool.query('INSERT INTO autos set ?', [auto]);
    res.json({
        status: 200,
        message: "Se ha registrado exitosamente!",
        auto: auto
    });
});
router.post('/update/:id', async (req, res)=>{
    const { id } = req.params;
    var dateUpdate = new Date().toISOString();
    const { nombre, matricula, verificacion, fechaActualizacion , marca } = req.body;

    const auto = { nombre, matricula, verificacion, fechaActualizacion: dateUpdate, marca };

     await pool.query('UPDATE autos SET ? WHERE id = ?', [auto, id]);
        res.json({
            status: 200,
            message: "Se ha actualizado correctamente",
            auto: auto
        });
});

router.post ('/delete/:id', async (req, res) =>{
    const { id } = req.params;

    await pool.query('UPDATE autos SET estado = 0 WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente"
    });
});

module.exports = router;