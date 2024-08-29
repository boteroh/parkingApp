import { model, Schema } from 'mongoose';

const cellSchema = new Schema({
    cell: {
        type: Number,
        unique: true,
    },

    status: {
        type: String,
        required: true,
        default: "Disponible"
    },

    plate: {
        type: String,
        required: false,
        unique: true,
        maxlength: [6, 'Max 6 characters']
    },

    entry_date: {
        type: Date,
        default: Date.now,
        required: false
    },

    departure_date: {
        type: Date,
        required: false
    },

    // pin: {
    //     type: String,
    //     required: false,
    // }
});

export default model("Cells", cellSchema, "cells");