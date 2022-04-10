
module.exports = (knex, app)=>{
//  post data in orders table
app.post('/post-orders',(req,res) =>{
    knex("orders").insert({
        total_amount: req.body.total_amount,
        created_on: req.body.created_on,
        shipped_on : req.body.shipped_on ,
        status: req.body.status,
        comments: req.body.comments,
        customer_id : req.body.customer_id ,
        auth_code: req.body.auth_code,
        reference : req.body.reference ,
        shipping_id: req.body.shipping_id,
        tax_id: req.body.tax_id
    })
    .then((data)=>{
        console.log(data,'data inserted successfully')
        res.send(data)
    })
    .catch((err)=>{
        console.log("err")
        res.send(err)
    })
})
// post data in order_details table
    app.post('/post-order_details',(req,res) =>{
        knex("order_detail").insert({
            order_id: req.body. order_id,
            product_id: req.body.product_id,
            attributes : req.body. attributes ,
            product_name: req.body.product_name,
            quantity: req.body.quantity,
            unit_cost : req.body.unit_cost ,

        })
        .then((data)=>{
            console.log(data,'data inserted successfully')
            res.send(data)
        })
        .catch((err)=>{
            console.log("err")
            res.send(err)
        })
    })
// getting data from orders_details table
    app.get('/get-orders/:id',(req, res)=>{
        knex('orders').select('orders.order_id ','orders.total_amount','orders.created_on',
        'orders.shipped_on','orders.status','orders.').from()
        .where('order_detail.order_id ', req.params.id)
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)
            console.log(err);
        })
    })

// geting data from orders by customer
app.get('/get-ordersDetails/:id',(req, res)=>{
    knex('order_detail').select('order_detail.order_id ','order_detail.product_id','order_detail.attributes',
    'order_detail.product_name','order_detail.quantity','order_detail.unit_cost').from('orders')
    .join('order_detail', function () {
        this.on('orders.order_id ', 'order_detail.order_id')
    })
    .where('order_detail.order_id ', req.params.id)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send(err)
        console.log(err);
    })
})

}