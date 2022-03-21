module.exports = (knex,app) =>{

// getting data from attributes table
app.get('/getdata-atributes',(req,res)=>{
    knex('attribute')
    .then((result)=>{
        res.send(result)
        console.log(result)
    })
    .catch((err)=>{
        res.send(err)
        console.log(err)
    })
})

// getting data by attribute_id from attribute table
app.get('/getdata-atributes/:id',(req,res)=>{
    knex('attribute').where('attribute_id', req.params.id)
    .then((result)=>{
        res.send(result)
        console.log(result)
    })
    .catch((err)=>{
        res.send(err)
        console.log(err)
    })
})

// getting data by attribute id from attribute_value table
app.get('/getdata-atributes_value/:id',(req,res)=>{
    knex('attribute_value').select('attribute_value.attribute_value_id','attribute_value.value')
    .where('attribute_id', req.params.id)
    .then((result)=>{
        res.send(result)
        console.log(result)
    })
    .catch((err)=>{
        res.send(err)
        console.log(err)
    })
})

// getting data by product id and join the table
app.get('/getdata-productid/:id',(req, res)=>{
    knex
    .select("attribute.name","attribute_value.attribute_value_id","attribute_value.value").from('attribute_value')
    .join('attribute', function () {
        this.on('attribute.attribute_id ', 'attribute_value.attribute_id')
    })
    .join('product_attribute', function () {
        this.on('product_attribute.attribute_value_id', 'attribute_value.attribute_value_id')
    })
    .where('product_id',req.params.id)
    .then((result)=>{
        res.send(result)
        console.log(result)
    })
    .catch((err)=>{
        res.send(err)
        console.log(err)
    })
})
}
