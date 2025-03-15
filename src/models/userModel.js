const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return validator.isLength(v, {min: 5, max: 20}) && validator.isAlphanumeric(v);
            },
            message: '{VALUE} should be from 5 to 20 chars'
        },
        index: true,
    },
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
        validate: {
            validator: function(v){
                return validator.isLength(v, {min: 2, max: 30})
            },
            message: '{VALUE} should be from 2 to 30 chars'
        }
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        trim: true,
        validate: {
            validator: function(v){
                return validator.isLength(v, {min: 4, max: 30})
            },
            message: '{VALUE} should be from 4 to 30 chars'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        validate: {
            validator: function(v){
                return validator.isLength(v, {min: 8})
            }
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
        }
    },
    location: {
        type: { 
            latitude: {
                type: Number,
                min: -90,
                max: 90,
                validate: {
                    validator: Number.isFinite,
                    message: '{VALUE} not a valid latitude value'
                }
            }, 
            longitude: {
                type: Number,
                min: -180,
                max: 180,
                validate: {
                    validator: Number.isFinite,
                    message: '{VALUE} not a valid longitude value'
                }
            }, 
            accuracy: {
                type: Number,
                min: 0,
                validate: {
                    validator: Number.isFinite,
                    message: '{VALUE} not a valid accuracy value'
                }
            }, 
            timestamp: {
                type: Number,
                default: Date.now
            }
        },
        _id: false,
        index: '2dsphere'
    },
    isOnline: {
        type: Boolean,
        default: false,
        index: true,
    }, 
    language: {
        type: String,
        default: 'RU-ru',
        enum: {
            values: ['RU-ru', 'EN-us', 'EST-est', 'DE-de', 'FR-fr', 'ES-es'],
            message: '{VALUE} is not a valid language'
        },
        trim: true
    },
    image: {
        type: String,
        default: 'http://localhost:9090/cache/images/default.logo.svg',
        validate: {
            validator: function(v) {
                return validator.isURL(v, {
                    protocols: ['http', 'https'],
                    require_protocol: true
                })
            },
            message: '{VALUE} is not a valid url with http or https protocols'
        }
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
