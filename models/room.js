var mongoose = require('mongoose')
const hotelModel = require('./hotel')

var roomSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    furnitures: {
        type: Array,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
})

roomSchema.pre('save', async function(next){
    let hotel = await hotelModel.findOne({hotel: this.hotel})
    if(hotel) next(Error('User already exist'))
    else next()
})

var roomModel = mongoose.model('room', roomSchema)

module.exports = roomModel
