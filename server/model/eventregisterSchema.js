const mongoose = require('mongoose');

const EventRegisterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    rollno:{
        type: String,
        require: true
      },
    transactionId:{
        type: String,
        require: true
      },
    bookingHallId:{
        type: String,
        require: true
    },
    status:{
      type:String,
      require:true
    },
    Participationstatus:{
      type:String,
      require:true
    },
    eventName:{
      type:String,
      require:true
    },
    regamt:{
      type:String,
      require:true
    },
    createdAt:{
      type:String,
      require:true
    }
    });
    
    

      
    const EventRegister = mongoose.model('EventRegister', EventRegisterSchema);

    module.exports = EventRegister;