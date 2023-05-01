const config = require('config');
const winston = require('winston');
const mongoose= require('mongoose');
module.exports = function (){
    mongoose.connect(process.env.vidly_db)
    //mongoose.connect(config.get("db"))
    //mongoose.connect('mongodb+srv://waqaskazmi2006:$ensation5@cluster0.kgbdso7.mongodb.net/?retryWrites=true&w=majority')
    
.then(() => winston.info("connected to mongodb database vidly") );
}