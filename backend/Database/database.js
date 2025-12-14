const mongoose = require('mongoose');

const dbConnect = ()=>{
    try {
        const connectionDetails = mongoose.connect(`${process.env.MongoDBConnectionString}/voterDB`)
        console.log(`Database Connected Successfully`)
    } catch (error) {
        console.log(`error Something went Wrong: ${error}`)
    }
}

module.exports = dbConnect;