module.exports = (knex, app)=>{
// getting all shipping data
    app.get('/getshipping',(req, res)=>{
        knex
        .select('shipping.shipping_region_id','shipping_region.shipping_region').from('shipping')
        .join('shipping_region', function () {
            this.on('shipping.shipping_region_id', 'shipping_region.shipping_region_id')
        })
        // .where('shipping.shipping_region_id',req.params.id)
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)
            console.log(err)
        })
    })
// getting shipping_regin data by shipping_region_id
    app.get('/getshipping/:id',(req, res)=>{
        knex
        .select('shipping.shipping_id','shipping.shipping_region_id','shipping_region.shipping_region').from('shipping')
        .join('shipping_region', function () {
            this.on('shipping.shipping_region_id', 'shipping_region.shipping_region_id')
        })
        .where('shipping_region.shipping_region_id',req.params.id)
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)
            console.log(err)
        })
    })
}