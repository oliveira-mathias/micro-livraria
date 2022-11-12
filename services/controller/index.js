const express = require('express');
const shipping = require('./shipping');
const inventory = require('./inventory');
const cors = require('cors');

const app = express();
app.use(cors());

/**
 * Retorna a lista de produtos da loja via InventoryService
 */
app.get('/products', (req, res, next) => {
    inventory.SearchAllProducts(null, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'something failed :(' });
        } else {
            res.json(data.products);
        }
    });
});

/**
 * Consulta o frete de envio no ShippingService
 */
app.get('/shipping/:cep', (req, res, next) => {
    shipping.GetShippingRate(
        {
            cep: req.params.cep,
        },
        (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send({ error: 'something failed :(' });
            } else {
                res.json({
                    cep: req.params.cep,
                    value: data.value,
                });
            }
        }
    );
});

/* 
 * Busca produto por id
*/
app.get('/product/:id', (req, res, next) => {
    // Chamamos o método do microsserviço Inventory
    inventory.searchProductById({ id : req.params.id }, (err, product) => {
        // Tratamento de possível erro
        if(err) {
            console.error(err);
            res.status(500).send({ error : 'Something failed'})
        } else {
            // Aqui não houve erros
            // Portanto, enviamos o produto encontrado como resposta
            res.json(product)
        }
    })
})

/**
 * Inicia o router
 */
app.listen(3000, () => {
    console.log('Controller Service running on http://127.0.0.1:3000');
});
