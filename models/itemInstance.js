const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const ItemInstanceSchema = new Schema({
    item:{type:Schema.Types.ObjectId,ref:"Item",required:true},
    imprint:{type:String,required:true},
    status:{
        type:String,
        required:true,
        enum:["Available","Maintenance","Loaned","Reserved"],
        default:"Maintenance",
    },
    due_back:{type:Date,default:Date.now},
});

// Virtual for bookinstance's URL
ItemInstanceSchema.virtual("url").get(function(){
    return `/inventory/iteminstance/${this._id}`;
});
ItemInstanceSchema.virtual("due_back_formatted").get(function () {
    return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
  });
  
// Export model
module.exports = mongoose.model("ItemInstance", ItemInstanceSchema);
