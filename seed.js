require('babel-core/register');
var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');
const { database } = require('./config.js');
var productsArray = require('./data/products.json');

MongoClient.connect(database.url, function(err, db) {
  assert.equal(null, err);
  createProducts(db, function() {
    db.collection('products').find().toArray().then(col => {
      // console.log(col.length);
      db.collection('products').remove({});
      productsArray.forEach((product, i) => {
        db.collection('products').insert({
          name: product.name,
          description: product.description,
          cost: product.cost,
          quantity: product.quantity,
          image: product.image,
          createdAt: new Date(),
          updatedAt: new Date(),
        }, function(err, col) {
          if (i == productsArray.length - 1) {
            db.close();
          }
        });
      })
    });
  });

});

var createProducts = function(db, callback) {
  db.createCollection("products", { strict: true },
    function(err, results) {
      console.log("Products Collection created.");
      callback();
    }
  );
};