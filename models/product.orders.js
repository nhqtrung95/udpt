'use strict';

var Sequelize = require('sequelize');
var db = require('./_db.js');

module.exports = function (db) {
	let ProductOrders = db.define('productOrders', {
			quantity: {
				type: Sequelize.INTEGER,
			},
			itemPrice: {
				type: Sequelize.FLOAT,
			}
		});

	return ProductOrders;
};
