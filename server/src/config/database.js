const mongoose = require('mongoose');

async function connectToDB(){
    // Connection of Clusters 
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.uegcnsp.mongodb.net/Database`)
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }

}

module.exports = {
    connectToDB
}