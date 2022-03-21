const express = require('express')
const port = 7000;
const app = express();
app.use(express.json())

const router = require('./router/routes')
app.use(router)

app.listen(port,()=>{
    console.log(`server is working with port ${port}`)
});