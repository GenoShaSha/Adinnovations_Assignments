const Plant = require("../models/plants.js");
const Batch = require("../models/batch.js");
const Sales = require("../models/sales.js")
const { getPlants, getBatches, getSales } = require("../database/controller.js"); 


class PlantRepository {
    constructor() {
        this.plants = getPlants().map(p => new Plant(p.plant_id, p.height, p.batch_id));
        this.batches = getBatches().map(b => new Batch(b.batch_id, b.status, b.planting_date));
        this.sales = getSales().map(s => new Sales(s.batch_id,s.batch_price))
    }


    // Fetch all plants
    getAllPlants() {
        return this.plants;
    }
    // Fetched Plant by ID
    getPlantById(plant_id) {
        return this.plants.find(plant => plant.plant_id === plant_id);
    }
    // Fethe all bathches 
    getAllBatches(){
        return this.batches;
    }
    // Fetch batch by ID
    getBatchById(batch_id) {
        return this.batches.find(batch => batch.batch_id === batch_id);
    }
    // Fetched all Sales
    getAllSales(){
        return this.sales;
    }
    //Fetched Sale by BatchID
    getSaleByBatchId(batch_id){
        return this.sales.find(sale => sale.batch_id === batch_id);
    }
}

module.exports = PlantRepository;