var router = require("express").Router;
var jwt = require("../middlewares/jwt");
const UserDB = require("../models/users");
const util = require("../util/util");

module.exports = {
  create: router().get("/", function (req, res, next) {
    console.log(req.query.months)
    UserDB.saveID(req.query.months,(err,data)=>{
      if(err){
        res.send(util.Failure("something went wrong"));
      }
      else{
        res.send(util.Success(data, "added code successfully"));
      }
    })
  }),
  validate: router().post("/", function (req, res, next) {
    UserDB.connect(req.body,(err,data)=>{
      if(err){
        res.send(util.Failure('could not connect'));
      }else{
        res.send(util.Success(data,'connected succesfully'));
      }
    })
  }),

  disconnect: router().post("/", function (req, res, next) {}),


  verifyUserEmail: router().get("/:id", (req, res, next) => {
    console.log(" i am here", req.params.id);
  }),
};
