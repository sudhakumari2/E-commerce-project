const res = require("express/lib/response")

module.exports = (knex, app)=>{
    app.get('/get-shopingcart',(req, res)=>{
        knex('shopping_cart').select('shopping_cart.cart_id')
        .then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.send(err)
        })
    })

    app.post('/post-shopingcart',(req,res) =>{
        knex().from('shopping_cart').insert(req.body)
        .then((data)=>{
            console.log(data,'data inserted successfully')
            res.send(data)
        })
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
    })
    
}