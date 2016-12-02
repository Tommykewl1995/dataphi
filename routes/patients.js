var express = require('express');
var router = express.Router();
var models = require('../models/Patient');

router.use('/', function(req,res,next){
  res.obj = {"Status" : {
    "ResponseCode" : 200,
    "ResponseMessege" : "OK"
  }};
  next();
});

router.get('/',function(request, response) {
  var obj = response.obj;
  models.Patient.find(function (err, result) {
    if (err){
      obj.Error = err;
      response.json(obj);
    }else{
      obj.Data = result;
      response.json(obj);
    }
  });
});

router.post('/',function(req,res){
  var obj = res.obj;
  var bd = req.body;
  if(bd){
    var patient1 = new models.Patient({
      FirstName : bd.FName,
      LastName : bd.LName,
      Age : bd.Age,
      DOB : bd.DOB,
      Phone : bd.Phone,
      Gender : bd.Gender,
      Details : bd.Details
    });
    patient1.save(function (err) {
      if(err){
        let temp = Object.keys(err.errors)[0];
        obj.Error = err.errors[temp].message
        res.json(obj);
      }else{
        obj.Data = "Success";
        res.json(obj);
      }
    });
  }else{
    res.json({"Error" : "no body sent"});
  }
});

module.exports = router;
