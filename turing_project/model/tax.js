

module.exports = (knex, app)=>{
// getting all data from tax table
    app.get('/get-tex',(req, res)=>{
        knex('tax').select('tax.tax_id', 'tax.tax_type','tax.tax_type')
    .then((data)=>{
        res.send(data)
        console.log(data)
    })
    .catch((err)=>{
        res.send(err)
    })
    })
// getting tex data by id
    app.get('/get-tex/:id',(req, res)=>{
        knex('tax').select('tax.tax_id', 'tax.tax_type','tax.tax_type').where('tax.tax_id',req.params.id)
    .then((data)=>{
        res.send(data)
        console.log(data)
    })
    .catch((err)=>{
        res.send(err)
    })
    })
}
