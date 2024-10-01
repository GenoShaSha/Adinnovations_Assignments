const express = require('express');
const app = express();

// Repositories
const PlantRepository = require("./repositories/PlantRepository");
const plantRepository = new PlantRepository();

// Services
const PlantService = require("./services/PlantService");
const BatchService = require("./services/BatchService");
const SaleService = require("./services/SaleService");
const plantService = new PlantService(plantRepository);
const batchService = new BatchService(plantRepository);
const saleService = new SaleService(plantRepository);


// Endpoint #1
app.get('/plants', (req, res) => {
  try {
        const min_height = req.query.min_height !== undefined ? parseFloat(req.query.min_height): undefined;
        const sold = req.query.sold === 'true' ? true : (req.query.sold === 'false' ? false : undefined);
  
        const plants = plantService.getPlants({ min_height, sold });

    res.status(200).json(plants);

  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

// Endpoint #2
app.get('/plants/:plant_id/price', (req, res) => {
  try {
      const { plant_id } = req.params;
      const price = plantService.getPlantPrice(plant_id);

      res.status(200).json({ price });
  } catch (error) {
      if (error.message === "Plant not found.") {
          res.status(404).json({ error: error.message });
      } else if (error.message === "Plant not sold.") {
          res.status(400).json({ error: error.message });
      } else {
          res.status(500).json({ error: "Internal server error." });
      }
  }
});

// Bonus Endpoint
app.get('/batches', (req, res) => {
  try {
      const batches = batchService.getAllBatches();
      res.status(200).json(batches);
  } catch (error) {
      res.status(500).json({ error: "Internal server error." });
  }
});

//BatchByID
app.get('/batches/:batch_id', (req, res) => {
  try {
      const { batch_id } = req.params;
      const batch = batchService.getBatchById(batch_id);

      res.status(200).json(batch);
  } catch (error) {
      if (error.message === 'Batch not found.') {
          res.status(404).json({ error: error.message });
      } else {
          res.status(500).json({ error: 'Internal server error.' });
      }
  }
});

//getSales
app.get('/sales', (req, res) => {
    try {
        const sales = saleService.getAllSales();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
  });

  //getSaleByBatchID
app.get('/sales/:batch_id', (req, res) => {
    try {
        const { batch_id } = req.params;
        const sale = saleService.getSaleByBatchId(batch_id);
  
        res.status(200).json(sale);
    } catch (error) {
        if (error.message === 'sale not found.') {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal server error.' });
        }
    }
  });

module.exports = app;