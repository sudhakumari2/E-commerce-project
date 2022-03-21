const express = require('express');
module.exports = (knex,app) =>{

// getting data from categories table
app.get('/getdata-category',(req, res) =>{
    knex('category')
    .then((result)=>{
        console.log(result)
        res.send(result);
    })
    .catch((err)=>{
        console.log("err")
        res.send(err)
    })
})
// getting data from categories table by id
app.get('/getdata-category/:id',(req, res) =>{
    knex('category').where('category_id',req.params.id)
    .then((result)=>{
        console.log(result)
        res.send(result);
    })
    .catch((err)=>{
        console.log("err")
        res.send(err)
    })
})
// getting data by product id from category table and joining the three table
app.get('/getdata/:id',(req,res)=>{
    knex
    .select("category.category_id","category.name","category.description",).from('category')
    .join('department', function () {
        this.on('category.category_id', 'department.department_id')
    
    })
    .join('product', function () {
        this.on('category.description', 'product.description')
    })
    .where('product_id',req.params.id)
    .then((result)=>{
        res.send(result)
        console.log(result)
        
    })
    .catch((err)=>{
        res.send(err)
        console.log('err')
    })
})

}

