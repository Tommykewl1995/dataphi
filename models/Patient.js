var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function getAge(millis) {
    var today = new Date();
    var birthDate = new Date(millis);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

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
        if(this.Age == getAge(v)){
          return true;
        }else{
          return false;
        }
      },
      msg : 'Age and Date of Birth not in sync'
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
