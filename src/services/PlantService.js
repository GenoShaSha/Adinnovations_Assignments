class PlantService {
    constructor(plantRepository) {
        this.plantRepository = plantRepository;
    }
    // Get all plants with optional filters
    getPlants({ min_height, sold }) {
        let plants = this.plantRepository.getAllPlants();

        // Apply min_height filter if provided
        if (min_height !== undefined) {
            if (isNaN(min_height) || min_height <= 0) {
                
                throw new Error("Invalid min_height parameter. Must be equal or bigger than 0.");
            }
            plants = plants.filter(plant => plant.height >= min_height);
        }
        // Apply 'sold' filter if provided
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

        const batch = this.plantRepository.getBatchById(plant.batch_id);
        if (!batch.isSold()) {
            throw new Error("Plant not sold.");
        }

        return batch.getPrice();
    }
}
module.exports = PlantService;

