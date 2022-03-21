module.exports = (knex, app)=>{
// getting data from product table
    app.get('/get-product',(req, res)=>{
        knex('product').select('product.product_id','product.name','product.description','product.price',
        'product.discounted_price','product.thumbnail')
        .then((data)=>{
            var count = 0
            // let dict = {}
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
            res.send(data)
            var count = 0
            for(i in data){
                count+=1
                console.log(data[i])
            }
            console.log(count)

            // console.log(data)
        })
        .catch((err)=>{
            res.send(err)
            console.log(err);
        })
    })

    app.get('/getproduct/:id',(req,res)=>{
        knex
        .select('product.product_id','product.name','product.description','product.price',
        'product.discounted_price','product.thumbnail').from('product')
        .join('category', function () {
            this.on('product.description', 'category.description')
        })
        .where('category_id',req.params.id)
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