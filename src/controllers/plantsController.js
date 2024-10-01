const express = require('express');
const app = express();

const plantRepository = new PlantRepository();
const plantService = new PlantService(plantRepository);

// Endpoint to get plants
app.get('/plants', (req, res) => {
    try {
        const min_height = parseFloat(req.query.min_height);
        const sold = req.query.sold === 'true' ? true : (req.query.sold === 'false' ? false : undefined);

        const plants = plantService.getPlants({ min_height, sold });

        res.status(200).json(plants);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

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

