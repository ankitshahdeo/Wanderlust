const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wonderlust";

main()
   .then(()=>{
        console.log("connected to DB");
   })
   .catch((err)=>{
        console.log(err);
   });

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=> ({ 
        ...obj, 
        owner: "68e0ec13ec78c0d2f19dfb32", //this map thing added the owner to my database later on but in a new array
    }))
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}
initDB();