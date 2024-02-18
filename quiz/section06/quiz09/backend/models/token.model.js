import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    token: {
        type: String,
        required: true
    },
    isAuth: {
        type: Boolean,
        default: false
    }
});
// }, {timestamps: true});

const Token = mongoose.model('Token', tokenSchema);
export default Token;