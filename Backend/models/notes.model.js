import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,

    },

    content: {
        type: String,
        required: true,

    },

    color: {
        type: String,
        required: true,

    },

    createdBy:{
        red: 'user',
        type: mongoose.Schema.Types.ObjectId,
        required:true

    }


},{timestamps:true})


export const Notes = mongoose.model('notes',noteSchema)