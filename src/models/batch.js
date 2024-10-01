class Batch {
    constructor(batch_id, batch_status, planting_date, batch_price = null) {
        this.batch_id = batch_id;
        this.batch_status = batch_status;
        this.planting_date = planting_date;
        this.batch_price = batch_price;  
    }

    // Check if the batch is sold
    isSold() {
        return this.batch_status === 'sold';
    }

    // Get the price of the batch if sold
    getPrice() {
        if (this.isSold() && this.batch_price) {
            return this.batch_price;
        }
        throw new Error('Batch not sold or no price available.');
    }
}
module.exports = Batch;