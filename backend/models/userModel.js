const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
    },

    email: {
        type:String,
        required: true,
        trim: true,
        unique: true,
        minlength: [11 , 'Email must be atleast 11 characters']
    },
    password: {
        type:String,
        required: true,
        trim: true,
        minlength: [6, 'Password must be atleast 6 characters']
    },
    phoneNo: {
        type:String,
        required: true,
        trim: true,
        unique: true,
        minlength: [10 , 'PhoneNo must be atleast 10 characters'],
        match: [/^\d+$/, 'Phone can only be  digits.'],
    },
    location:{
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },

        coordinates: {
            type: [Number],
            required: true
        },
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    }, 
    district: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    fcmToken: {
        type:String,
    }
})

// Create a geospatial index on location field

userSchema.index({ location: '2dsphere' });

const user = mongoose.model('User', userSchema);
module.exports = user;