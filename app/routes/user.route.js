const controller = require('../controllers/user.controller');

module.exports = (app) => {
    app.get('/', controller.findAllProduct);
    app.post('/create-product', controller.createProduct);
    app.get('/product/:id', controller.findProductById);
    app.put('/update-product/:id', controller.updateProductById);
    app.delete('/delete-product/:id', controller.deleteProductById);
};