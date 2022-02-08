const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const MoviesSchema = new Schema(
    {
        title:String,
        genre: String,
        plot: String,
        cast: [{type: Schema.Types.ObjectId, ref: 'Celebrity'}]
    }
)

module.exports = model('Movies', MoviesSchema)