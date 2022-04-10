module.exports = (knex,app) =>{
// getting data from product table
    app.get('/get-product',(req, res)=>{
        knex('product').select('product.product_id','product.name','product.description','product.price',
        'product.discounted_price','product.thumbnail')
        .then((data)=>{
            var count = 0
            for(i in data){
                count+=1
                // console.log(data[i])
            }
            res.send({"Count":count,"Rows":data})
            console.log({"Count":count,"Rows":data})
        })
        .catch((err)=>{
            res.send(err)
            console.log(err);
        })
    })

// getting data from product table by product_id
    app.get('/get-product/:id',(req, res)=>{
        knex('product').select('product.product_id','product.name','product.description','product.price',
        'product.discounted_price','product.thumbnail')
        .where('product_id', req.params.id)
        .then((data)=>{
            var count = 0
            for(i in data){
                count+=1
            }
            res.send({"Count":count,"Rows":data})
            console.log({"Count":count,"Rows":data})
        })
        .catch((err)=>{
            res.send(err)
            console.log(err);
        })
    })
// getting data from product table and product category table by categor
    app.get('/getcategoryId/:id',(req,res)=>{
        knex
        .select('product.product_id','product.name','product.description','product.price',
        'product.discounted_price','product.thumbnail').from('product')
        .join('product_category', function () {
            this.on('product.product_id ', 'product_category.category_id ')
        })
        .where('category_id',req.params.id)
        .then((result)=>{
            var count = 0
            for(i in result){
                count+=1
            }
            res.send({"Count":count,"Rows":result})
            console.log({"Count":count,"Rows":result})
            
        })
        .catch((err)=>{
            res.send({
                    massage: 'internal server Error',
                    status: 500,
                    data: err
            })
        })
    })

// getting data by category id
    app.get('/getcategoryId/:id',(req,res)=>{
        knex
        .select('product.product_id','product.name','product.description','product.price',
        'product.discounted_price','product.thumbnail').from('product')
        .join('product_category', function () {
            this.on('product.product_id ', 'product_category.category_id ')
        })
        .where('category_id',req.params.id)
        .then((result)=>{
            var count = 0
            for(i in result){
                count+=1
            }
            res.send({"Count":count,"Rows":result})
            console.log({"Count":count,"Rows":result})
            
        })
        .catch((err)=>{
            res.send({
                    massage: 'internal server Error',
                    status: 500,
                    data: err
            })
        })
    })

// getting data by department id

app.get('/getdepartmentId/:id',(req,res)=>{
    knex
    .select('product.product_id','product.name','product.description','product.price',
    'product.discounted_price','product.thumbnail').from('product')
    .join('department', function () {
        this.on('product.product_id ', 'department.department_id')
    })
    .where('department_id',req.params.id)
    .then((result)=>{
        var count = 0
        for(i in result){
            count+=1
        }
        res.send({"Count":count,"Rows":result})
        console.log({"Count":count,"Rows":result})
        
    })
    .catch((err)=>{
        res.send({
                massage: 'internal server Error',
                status: 500,
                data: err
        })
    })
})
// getting data by product id
    app.get('/get-productId/:id',(req, res)=>{
        knex('product').select('product_id','name','description','price',
        'discounted_price','image', 'image_2 ')
        .where('product_id', req.params.id)
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)
            console.log(err);
        })
    })


// getting location by product id
    app.get('/getlocation/:id',(req,res)=>{
        knex
        .select('product.product_id','category.name AS category_name',' department_id','product.name AS product_name').from('product')
        .join('category', function () {
            this.on('product.product_id ', 'category.category_id ')
        })
        .where('product_id',req.params.id)
        .then((result)=>{  
            res.send(result)
        })
        .catch((err)=>{
            res.send({
                    massage: 'internal server Error',
                    status: 500,
                    data: err
            })
        })
    })

// getting data from review table by product id

    app.get('/get-review/:id',(req, res)=>{
        knex('review').select('name','review.review','rating','created_on').from('product')
        .join('review', function () {
            this.on('product.product_id ', 'review.product_id')
        })
        .where('product.product_id', req.params.id)
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)
            console.log(err);
        })
    })

// post data in review table
    app.post('/review',(req,res) =>{
        knex("review").insert({
            customer_id: req.body.customer_id,
            product_id: req.body.product_id,
            review: req.body.review,
            rating : req.body.rating ,
            created_on: req.body.created_on
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
}

