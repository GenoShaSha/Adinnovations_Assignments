const PlantRepository = require("../repositories/PlantRepository");

class SalesService {
    constructor(plantRepository) {
        this.plantRepository = plantRepository; 
    }

    // Get all sales
    getAllSales() {
        return this.plantRepository.getAllSales();
    }

    getSaleByBatchId(batch_id) {
        const sale = this.plantRepository.getSaleByBatchId(batch_id);
        if (!sale) {
            throw new Error('Batch not found.');
        }
        return sale;
    }
}

module.exports = SalesService;
