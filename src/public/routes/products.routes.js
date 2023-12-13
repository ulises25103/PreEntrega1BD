import { Router } from "express";
import fs from 'fs';
const productsRouter = Router();
import crypto from 'crypto';


const PRODUCTS_FILE = './src/public/productos.json';


productsRouter.get('/', (req, res) => {
    try {
        const productsData = fs.readFileSync(PRODUCTS_FILE, 'utf8');
        const products = JSON.parse(productsData);
        res.json(products);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

productsRouter.get('/:pid', (req, res) => {
    const productId = req.params.pid;
    try {
        const productsData = fs.readFileSync(PRODUCTS_FILE, 'utf8');
        const products = JSON.parse(productsData);
        const product = products.find((p) => p.id === productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
});

productsRouter.post('/', (req, res) => {
    const {
        title,
        description,
        code,
        price,
        status = true, 
        stock,
        category,
        thumbnails = [], 
      } = req.body;
    
      if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Faltan Campos Obligatorios' });
      }
    
      try {
        const productsData = fs.readFileSync(PRODUCTS_FILE, 'utf8');
        const products = JSON.parse(productsData);
    
        // Generar ID único
        const newProduct = {
          id: crypto.randomUUID(),
          title,
          description,
          code,
          price,
          status,
          stock,
          category,
          thumbnails,
        };
    

        products.push(newProduct);
    
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    
        res.status(201).json(newProduct);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});



productsRouter.put('/:pid', (req, res) => {
    const productId = req.params.pid;
    const updatedProduct = req.body;
    try {
      const productsData = fs.readFileSync(PRODUCTS_FILE, 'utf8');
      let products = JSON.parse(productsData);
      const index = products.findIndex((p) => p.id === productId);
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct, id: productId };
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
        res.json(products[index]);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  

productsRouter.delete('/:pid', (req, res) => {
    const productId = req.params.pid;
    try {
      const productsData = fs.readFileSync(PRODUCTS_FILE, 'utf8');
      let products = JSON.parse(productsData);
      const filteredProducts = products.filter((p) => p.id !== productId);
      if (filteredProducts.length < products.length) {
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(filteredProducts, null, 2));
        res.json({ message: 'Product deleted successfully' });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


export default productsRouter;