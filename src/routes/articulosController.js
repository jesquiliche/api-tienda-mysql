const e = require('express');
const express=require('express');
const router=express.Router();
mysqlconnet=require('../db');


const multer = require('multer')
const path = require('path')
const fs = require('fs')



const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../../../../public/assets/img'),
    filename: (req, file, cb) => {
        cb(null,file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('image')



router.post('/articulos/foto', fileUpload,(req, res) => {
    console.log(req.file)

    
})

router.get('/articulos',async (req,res)=>
{
    let num_row=parseInt(req.query.num_row);
    if (isNaN(num_row)) num_row=0;
    let pag=parseInt(req.query.pag);
    if (isNaN(pag)) pag=20;

    const sql='SELECT * FROM vfarticulos LIMIT ?,?';
    await mysqlconnet.query(sql,[num_row,pag],
    (err,rows,fields)=>
    {
        
        console.log(rows);
        if(err) console.log(err);
        else res.status(200).json(rows);
    })
  
});

router.get('/articulosPorCategoria/:id',async (req,res)=>
{
    const {id} = req.params;
    await mysqlconnet.query('SELECT * FROM vfarticulos WHERE CATEGORIA=?',[id],
    (err,rows,fields)=>
    {
    
        if(rows)
        if(err) console.log(err);
        else res.status(200).json(rows);
    })
});


router.get('/articulos/:id',async (req,res)=>
{
    const {id} = req.params;
    await mysqlconnet.query('SELECT * FROM vfarticulos WHERE idArticulo=?',[id],
    (err,rows,fields)=>
    {
    
        if(rows)
        if(err) console.log(err);
        else res.status(200).json(rows[0]);
    })
  
});

router.delete('/articulos/:id',async (req,res)=>
{
    const {id} = req.params;
    await mysqlconnet.query('DELETE FROM articulos WHERE idArticulo=?',[id],
    (err,rows,fields)=>
    {
        try {
        
            if(err) console.log(err);
           // else res.status(200).json("Registro borrado sadisfactoriamente");
           // res.status(204).json("Registro borrado sadisfactoriamente"); 
            
        } catch (error) {
            res.status(500).send(error)
        }
       
        
    })
  
});


router.post('/articulos/',(req,res)=>
{
    let sql='INSERT INTO articulos(';
    sql+="NOMBRE,"
    sql+="DESCRIPCION,";
    sql+="CATEGORIA,";
    sql+="TIPOIVA,";
    sql+="PRECIO,";
    sql+="SUBCATEGORIA,";
    sql+="IDMARCA,";
    sql+="FOTO) VALUES(";
    sql+="?,?,?,?,?,?,?,?)";

    console.log(req.body.NOMBRE)
    const {NOMBRE,DESCRIPCION,CATEGORIA,TIPOIVA,PRECIO,SUBCATEGORIA,IDMARCA,FOTO}=req.body;
    mysqlconnet.query(sql, 
        [NOMBRE,DESCRIPCION,CATEGORIA,TIPOIVA,PRECIO,SUBCATEGORIA,IDMARCA,FOTO],
        (error, result) => {
        if (error) 
        {
            console.log(error)
            res.send("error");
          //  throw  error;
        }
        else {
            res.status(201).send("Articulos añadido con sadisfactoriamente");

        }
        
        
 
        
    });

});

router.put('/articulos/:idARTICULO',async (req,res)=>
{
    let sql='UPDATE articulos SET ';
    sql+="NOMBRE =?,"
    sql+="DESCRIPCION=?,";
    sql+="CATEGORIA=?,";
    sql+="TIPOIVA=?,";
    sql+="PRECIO=?,";
    sql+="SUBCATEGORIA=?,";
    sql+="IDMARCA=?,";
    sql+="FOTO=? WHERE idARTICULO=?";
    

    const {NOMBRE,DESCRIPCION,CATEGORIA,TIPOIVA,PRECIO,SUBCATEGORIA,IDMARCA,FOTO,idARTICULO}=req.body;
    await mysqlconnet.query(sql, 
        [NOMBRE,
        DESCRIPCION,
        CATEGORIA,
        TIPOIVA,
        PRECIO,
        SUBCATEGORIA,
        IDMARCA,
        FOTO,
        idARTICULO],
        (error, result) => {
        if (error) 
        {
            res.status(500).send(error);
        }
        else{
            res.status(200).send(`Articulos actualizado con ID: ${idARTICULO}`)
        }
        
    });

});



module.exports=router;

