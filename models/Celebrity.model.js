const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CelebrityModel = new Schema({
    name: {
        type: String
    },
    occupation: {
        type: String
    },
    catchPhrase: {
        type: String
    }
})

module.exports = CelebrityModel