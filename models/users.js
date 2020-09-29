const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const uniqid = require('uniqid');
const e = require("express");

const userSchema = mongoose.Schema({
  //user schema
  id:{
    type:String,
    required:true
  },
  subscriptionEnd: {
    type: Date
  },
  subscriptionStartDate : {
      type : Date
  },
  connected:{
    type:Number,
    default:0
  }
});

var users = mongoose.model("users", userSchema, "users");

const saveID = async(user,cb)=>{
  const uniq = uniqid().slice(8);
  let DATE = new Date();
  let endDate = new Date();
  const mon=endDate.getMonth();
  console.log(mon+user)
  console.log(endDate.getFullYear())
  endDate.setMonth(mon+user)
  console.log(endDate.getFullYear())
  console.log(endDate);
  let newCode = new users({
    id:uniq,
    subscriptionStartDate:DATE,
    subscriptionEnd:endDate
  })

  newCode.save(function(err,data){
    cb(err,data)
  })
}

const connect = async(user,cb)=>{
 let lol = await users.findOne({id:user.id})
 if(lol){
   if(lol.connected==0){
     lol.connected=1
     lol.save(function(err,data){cb(err,data)})
   }
   else{cb(true,null)}
 }
 else{cb(true,null)}
}

const disconnect = async()=>{

}

module.exports = {
  saveID:saveID,
  connect:connect,
  disconnect:disconnect
};
