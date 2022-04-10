const jwt = require('jsonwebtoken')

module.exports = (knex, app)=>{
// data is updating of customer table by customer_id
    app.put('/update-customer/:id',(req,res)=>{
        knex.update(
            req.body
        ).table('customer').where('customer.customer_id',req.params.id)
        .then((data)=>{
            res.send("data updated successfully")
        })
        .catch((err)=>{
            res.send(err)
        })
    })

// data posted in customer table
    app.post('/post-customer',(req,res) =>{
        knex("customer").insert({
            name: req.body.name,
            email: req.body.email,
            password: req.body. password,
            credit_card : req.body. credit_card ,
            address_1: req.body.address_1,
            address_2 : req.body.address_2 ,
            city: req.body.city,
            region : req.body.region ,
            postal_code: req.body.postal_code,
            country: req.body.country,
            shipping_region_id: req.body.shipping_region_id,
            day_phone: req.body.day_phone,
            eve_phone: req.body.eve_phone,
            mob_phone: req.body.mob_phone
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
// get all data from customer by custome_id
    app.get('/get-customer/:id',(req, res)=>{
        knex('customer').where('customer.customer_id', req.params.id)
        .then((data)=>{
            res.send(data)
        })
    
        .catch((err)=>{
            res.send(err)
        })
    })

// customer will register data
    app.post('/customer-register',(req,res)=>{
        knex('customer').insert(req.body)
        .then((data)=>{
            res.send(data)
            console.log("register sucess")
        })
        .catch((err)=>{
            res.send(err)
        })
    })
// login with jwt
app.post('/customer-login',async(req, res)=>{
    knex('customer').where('customer.email',req.body.email)
    .then(async(data)=>{
        console.log(data,"data ");
        if(!data.length == 0){
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",data[0].password == req.body.password);
            if(data[0].password == req.body.password){
                const user_data = {
                    "customer_id":data[0].customer_id,
                    "name": data[0].name,
                    "email": data[0].email,
                    "password":data[0].password
                }
                // console.log(user_data)
                const token = await jwt.sign({user_data},"secretkey")
                res.cookie("token",token )
                .send({
                    message:"login sucessfully",
                    data: user_data,
                    token: token
                })
            }
            else{
                console.log('password is wrong')
                return res.status(404).send({
                    message: "passord or email invalid"
                })
            }
        }else{
            console.log("wrong email");
        }
    })
    .catch((err)=>{
        return res.status(500).send({
            message: "internal server error"
        })
    })

})

// update customer address
app.put('/update-address/:id',(req,res)=>{
    knex.update(
        req.body
    ).table('customer').where('customer.customer_id',req.params.id)
    .then((data)=>{
        res.send("data updated successfully")
    })
    .catch((err)=>{
        res.send(err)
    })
})


}