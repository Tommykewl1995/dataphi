var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var patientSchema = new Schema({
  FirstName : {type : String,
    required : [true,"First Name is required"]
  },
  LastName : { type : String,
    required : [true,"Last Name is required"]
  },
  Age : {type : Number,
    min : [0,"Age cannot be negative"],
    max : [100, "Age cannot be greater than 100"]
  },
  DOB : {type : Number,
    validate : {
      validator : function(v){
        var now = new Date();
        var data = new Date(Date.parse(v));
        return true;
      }
    }
  },
  Phone : {type : String,
    match : [/^[0-9]{10}$/,"({VALUE}) is Not a valid Phone Number"],
    required : [true,"Phone Number Required"]
  },
  Gender : Number,
  Details : String
});

var Patient = mongoose.model('Patient', patientSchema);
exports.Patient = Patient;
