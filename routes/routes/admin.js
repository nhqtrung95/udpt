var router = require('express').Router();
var db = require('../../models')
var Product = db.model('product');

module.exports = router;

router.get('/products', function(req, res) {
    Product.findAll()
    .then(function(products) {
        res.render('admin/products/list', {
            products
        });
    })
})

router.get('/products/create', function(req, res) {
    res.render('admin/products/create');
})

router.put('/products/:productId', function(req, res) {
    Product.findByPk(req.params.productId)
    .then(function(product) {
        if (product) {
            product.update(req.body)
            .then(function(productUpdated) {
                res.redirect('/admin/products/' + req.params.productId + '/edit');
            })
        }
    })
})

router.get('/products/:productId/edit', function(req, res) {
    Product.findByPk(req.params.productId)
    .then(function(product) {
        if (product) {
            res.render('admin/products/edit', {
                product
            })
        } else {
            res.send('Sản phẩm không tồn tại');
        }
    })
})

router.post('/products', function(req, res) {
    Product.create(req.body)
    .then(function(product) {
        res.send(product)
    });
})

router.get('/', function(req, res) {
    res.render('admin/index');
});

