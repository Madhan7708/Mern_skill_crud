const express=require('express');
const axios=require('axios');
const app=express();
app.get('/',(req,res)=>{
    res.send("response to clients");
})
app.get('/submit',(req,res)=>{
    res.send({message:"hello world"});
})
// app.get('/products', (req,res)=>{
//     axios.get('https://fakestoreapi.com/products')
//     .then((r)=>{
//         res.send(r.data);
//     })
//     .catch((err)=>{
//         console.log(err);
//         res.status(500).send("Error fetching products");
//     })
// })

async function getProducts(id){
    const uri=`https://fakestoreapi.com/products/${id}`;
    const resp=await axios.get(uri);
    return resp.data;
}
app.get('/products',async(req,res)=>{
    const products=await getProducts();
    res.send(products);
})

app.get('/products/:id',async(req,res)=>{
    console.log(req.params.id);
    const products=await getProducts(req.params.id);
    res.send(products);
})
app.listen(3000,()=>{
    console.log("port is listening to 3000");
})