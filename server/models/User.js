import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: []
    },
    joinedon: {
        type: Date,
        default: Date.now
    }
});

const UserModel = mongoose.model('users', UserSchema);
export default UserModel;
