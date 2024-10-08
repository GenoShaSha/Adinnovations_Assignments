const BatchService = require("./BatchService");

class PlantService {
    constructor(plantRepository) {
        this.plantRepository = plantRepository;
        this.batchService = new BatchService(plantRepository);
    }

    // Get plants with optional filters
    getPlants({ min_height, sold }) {
        let plants = this.plantRepository.getAllPlants();
            if (min_height < 0) {
                throw new Error("Invalid min_height parameter. Must be equal or bigger than 0.");
            }
            plants = plants.filter(plant => plant.height >= min_height);

        if (sold !== undefined) {
            plants = plants.filter(plant => {
                const batch = this.plantRepository.getBatchById(plant.batch_id);
                return batch && batch.isSold() === sold;
            });
        }
        return plants;
    }

    // Get the price of a plant if it is sold
    getPlantPrice(plant_id) {
        const plant = this.plantRepository.getPlantById(plant_id);
        if (!plant) {
            throw new Error("Plant not found.");
        }
        try {
            const batchPrice = this.batchService.getBatchPrice(plant.batch_id);
            return batchPrice;
        } catch (error) {
            throw new Error(`Unable to get plant price: ${error.message}`);
        }
    }
}

module.exports = PlantService;
