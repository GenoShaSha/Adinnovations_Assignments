const SaleService = require("./SaleService");

class BatchService {
    constructor(plantRepository) {
        this.plantRepository = plantRepository;
        this.salesService = new SaleService(plantRepository);
    }

    // Get all batches
    getAllBatches() {
        return this.plantRepository.getAllBatches();
    }
    // Get specific batch by Batch ID
    getBatchById(batch_id) {
        const batch = this.plantRepository.getBatchById(batch_id);
        if (!batch) {
            throw new Error('Batch not found.');
        }
        return batch;
    }

    // Get the price of a batch by batch ID
    getBatchPrice(batch_id) {       
        const batch = this.getBatchById(batch_id);
        if (batch.status !== 'sold') {
            throw new Error('Batch is not sold.');
        }
        const sale = this.salesService.getSaleByBatchId(batch_id);
        return sale.batch_price;
    }
}

module.exports = BatchService;
