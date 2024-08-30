import { model, Schema } from 'mongoose';

const cellSchema = new Schema({
    cell: {
        type: Number,
        unique: true,
        required: true
    },

    status: {
        type: String,
        required: true,
        num: ['Available', 'Not available'],
        default: "Available"
    },

    plate: {
        type: String,
        required: false,
        unique: false,
        maxlength: [6, 'Max 6 characters']
    },

    entry_date: {
        type: Date,
    },

    departure_date: {
        type: Date,
    },

    pin: {
        type: String,
    }
});

cellSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastCell = await this.constructor.findOne().sort('cell');
        this.cell = lastCell ? lastCell.cell +1:1;
        if (this.cell > 10) {
            throw new Error('Record limit reached');
        }
    }
    next();
});

export default model("Cells", cellSchema, "cells");