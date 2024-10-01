class Batch {
    constructor(batch_id, status, planting_date, sales = null) {
        this.batch_id = batch_id;
        this.status = status;
        this.planting_date = planting_date;
        this.sales = sales;  // Store the Sales instance here
    }

    // Check if the batch is sold
    isSold() {
        return this.status === 'sold';
    }

    // Get the price of the batch from the Sales class if sold
    getPrice() {
        if (this.isSold() && this.sales && this.sales.batch_id === this.batch_id) {
            return this.sales.batch_price;
        }
        throw new Error('Batch not sold or no price available.');
    }
}

module.exports = Batch;