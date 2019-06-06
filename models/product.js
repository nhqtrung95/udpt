'use strict';

var Sequelize = require('sequelize');

module.exports = function (db) { 
	let Product = db.define('product', {
		name: {
			type: Sequelize.STRING,
			allowNull: false,
            unique: true
		},
		imageUrls: {
			type: Sequelize.STRING,
			defaultValue: '/defaultproduct.jpg'
		},
		price: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				min: 1
			}
		},
		rebate: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},
		brand: {
			type: Sequelize.STRING,
			allowNull: true
		},
		description: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		isAvailable: {
			type: Sequelize.BOOLEAN,
			defaultValue: true
		}
	});

	return Product;
}