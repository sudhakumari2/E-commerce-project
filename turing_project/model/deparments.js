const express = require('express');
module.exports = (knex,app) =>{

app.get('/getdata-department',(req, res) =>{
    knex('department')
    .then((result)=>{
        console.log(result)
        res.send(result);
    })
    .catch((err)=>{
        console.log("err")
        res.send(err)
    })
})

app.get('/getdata_department/:id',(req, res) =>{
    knex('department').where('department_id', req.params.id)
    .then((result)=>{
        console.log(result)
        res.send(result);
    })
    .catch((err)=>{
        console.log("err")
        res.send(err)
    })
})
}

