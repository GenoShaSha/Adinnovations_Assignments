const Plant = require("../models/plants.js");
const Batch = require("../models/batch.js");
const { getPlants, getBatches } = require('./database/controller.js'); 


class PlantRepository {
    constructor() {
        this.plants = getPlants().map(p => new Plant(p.plant_id, p.height, p.batch_id));
        this.batches = getBatches().map(b => new Batch(b.batch_id, b.batch_status, b.planting_date, b.batch_price));
    }


    // Fetch all plants from the database
    getAllPlants() {
        return this.plants;
    }
    getPlantById(plant_id) {
        return this.plants.find(plant => plant.plant_id === plant_id);
    }
    getAllBatches(){
        return this.batches;
    }
    // Fetch batch by ID
    getBatchById(batch_id) {
        return this.batches.find(batch => batch.batch_id === batch_id);
    }
}

module.exports = PlantRepository;