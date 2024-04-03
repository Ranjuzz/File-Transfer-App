import { Schema, model } from "mongoose";

const fileSchema = new Schema({
    path: {
        type: String,
        required: true
    },
    originalname: {
        type: String,
        required: true
    },
    downloadCount: {
        type: Number,
        required: true,
        default: 0
    }
});

export default model("File", fileSchema);
