'use strict';
var db = require('./_db');
require('./user')(db);
require('./product')(db);
require('./tag')(db);
require('./review')(db);
require('./address')(db);
require('./billing')(db);
require('./product.orders.js')(db);
require('./order')(db);

var Product = db.model('product');
var Tag = db.model('tag');
var Order = db.model('order');
var User = db.model('user');
var Review = db.model('review');
var Address = db.model('address');
var Billing = db.model('billing');
var ProductOrders = db.model('productOrders');

Product.belongsToMany(Tag, {through: 'TagProducts'});
Tag.belongsToMany(Product, {through: 'TagProducts'});
Order.belongsToMany(Product, {through: ProductOrders});
Product.belongsToMany(Order, {through: ProductOrders});
User.hasMany(Order);
User.hasMany(Address);
User.hasMany(Billing);
Product.hasMany(Review);
User.hasMany(Review);
Review.belongsTo(User);
Review.belongsTo(Product);
Order.belongsTo(Address);
Order.belongsTo(Billing);
Order.hasMany(ProductOrders);


module.exports = db;
