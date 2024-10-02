const BatchService = require('../src/services/BatchService');
const SaleService = require('../src/services/SaleService'); // Mock this later
const plantRepository = {
  getAllBatches: jest.fn(),
  getBatchById: jest.fn(),
};

// Mock SaleService module
jest.mock('../src/services/SaleService');

describe('BatchService', () => {
    let batchService;
    let mockSaleService;

    beforeEach(() => {
        // Set up SaleService and mock functions
        mockSaleService = {
            getSaleByBatchId: jest.fn(),
        };

        // Mock SaleService instantiation
        SaleService.mockImplementation(() => mockSaleService);

        // Create BatchService instance with the mocked plantRepository
        batchService = new BatchService(plantRepository);
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear all mocks after each test
    });

    it('should return all batches', () => {
        const mockBatches = [
            { batch_id: 'b1', status: 'available' },
            { batch_id: 'b2', status: 'sold' },
        ];
        plantRepository.getAllBatches.mockReturnValue(mockBatches);

        const batches = batchService.getAllBatches();
        expect(batches).toEqual(mockBatches);
        expect(plantRepository.getAllBatches).toHaveBeenCalledTimes(1);
    });

    it('should return a batch by ID', () => {
        const mockBatch = { batch_id: 'b1', status: 'available' };
        plantRepository.getBatchById.mockReturnValue(mockBatch);

        const batch = batchService.getBatchById('b1');
        expect(batch).toEqual(mockBatch);
        expect(plantRepository.getBatchById).toHaveBeenCalledWith('b1');
    });

    it('should throw an error if the batch is not found', () => {
        plantRepository.getBatchById.mockReturnValue(null);

        expect(() => {
            batchService.getBatchById('invalid_id');
        }).toThrow('Batch not found.');
        expect(plantRepository.getBatchById).toHaveBeenCalledWith('invalid_id');
    });

    it('should return the batch price for a sold batch', () => {
        const mockBatch = { batch_id: 'b1', status: 'sold' };
        const mockSale = { batch_id: 'b1', batch_price: 1000 };

        plantRepository.getBatchById.mockReturnValue(mockBatch);
        mockSaleService.getSaleByBatchId.mockReturnValue(mockSale);

        const price = batchService.getBatchPrice('b1');
        expect(price).toBe(1000);
        expect(plantRepository.getBatchById).toHaveBeenCalledWith('b1');
        expect(mockSaleService.getSaleByBatchId).toHaveBeenCalledWith('b1');
    });

    it('should throw an error if the batch is not sold', () => {
        const mockBatch = { batch_id: 'b1', status: 'available' };

        plantRepository.getBatchById.mockReturnValue(mockBatch);

        expect(() => {
            batchService.getBatchPrice('b1');
        }).toThrow('Batch is not sold.');
        expect(plantRepository.getBatchById).toHaveBeenCalledWith('b1');
        expect(mockSaleService.getSaleByBatchId).not.toHaveBeenCalled(); // SaleService shouldn't be called
    });
});
