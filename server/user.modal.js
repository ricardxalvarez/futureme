import mongoose from 'mongoose'
const UserSchema = mongoose.Schema({
    email: String,
    password: String,
    fullname: String,
    // it'll be name and last name concat
    address: Object,
    // address includes number phone
    questions: Array,
    // array of objects
    images: Array,
    gradient: String,
    postDate: Object
});

export default mongoose.model("users", UserSchema);