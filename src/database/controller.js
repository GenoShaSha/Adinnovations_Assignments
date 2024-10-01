const { readFileSync } = require('fs');

function getPlants(){
  const collection = JSON.parse(readFileSync('src/database/collections/plants.json', 'utf8'));
  return collection['plants'];
}

function getSales(){
  const collection = JSON.parse(readFileSync('src/database/collections/sales.json', 'utf8'));
  return collection['sales'];
}

function getBatches(){
  const collection = JSON.parse(readFileSync('src/database/collections/batches.json', 'utf8'));
  return collection['batches'];
}

module.exports = { getPlants, getSales, getBatches };