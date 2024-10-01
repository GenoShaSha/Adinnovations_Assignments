class BatchService {
    constructor(plantRepository) {
        this.plantRepository = plantRepository;
    }

    // Get all batches
    getAllBatches() {
        return this.plantRepository.getAllBatches();
    }
    getBatchById(batch_id) {
        const batch = this.plantRepository.getBatchById(batch_id);
        if (!batch) {
            throw new Error('Batch not found.');
        }
        return batch;
    }
}
module.exports = BatchService;