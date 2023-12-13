import express from 'express';
import __dirname from './utils.js';
import cartsRouter from './public/routes/carts.routes.js';
import productsRouter from './public/routes/products.routes.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);



app.listen(port, () => {
    console.log(`servidor express escuchando en el puerto http://localhost:${port}`);
});

