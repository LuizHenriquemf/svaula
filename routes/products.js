const express = require("express");
const { saveProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require("../database/products");
const auth = require("../middleware/auth");
const router = express.Router();


router.get("/products", auth, async (req, res) => {
    const moreThan = req.query.more_than ? Number(req.query.more_than) : 0;
    const products = await getAllProducts()
    res.json({
        products
    })
})

router.get("/products/:id", auth, async (req, res) => {
    const id = Number(req.params.id);
    const product = await getProductById(id)
    res.json({
        product
    })
})

router.post("/products", auth, async (req, res) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    }
    const savedProduct = await saveProduct(newProduct)
    res.json({
        product: saveProduct
    })
})

router.put("/products/:id", auth, async (req, res) => {
    const id = Number(req.params.id);
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    const updateProduct = await updateProduct(id, product);
    res.json({
        product: updateProduct
    })
})

router.delete("/products/:id", auth, async (req, res) => {
    const id = Number(req.params.id);
    await deleteProduct(id);
    res.status(204).send();
})

module.exports = {
    router
}