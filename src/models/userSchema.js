const mongoose = require("mongoose");


    const userSchema = mongoose.Schema({
        "username": {
            type: String,
            // unique: true,
            required: true
        },
        "password": {
            type: String,
            // unique: true,
            required: true
        },
        "firstname": {
            type: String,
            required: true
        },
        "lastname": {
            type: String,
            required: true
        }
        
    });
    
    const user = mongoose.model("users", userSchema);

module.exports= {
   user
}

