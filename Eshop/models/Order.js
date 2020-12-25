const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({  
  addition: {
    type: String,
    required: [true, 'Please add a addition'],
    maxlength: [300, 'addition can not be more than 300 characters']
  },
  cost:{ 
    type: Number,
    default:0
  },
  status: {
    type: String,
    enum: ['pending', 'contacted','performing','done'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      item:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item"
      },
      count:{
       type:Number
      }
    },
    ],    
});
OrderSchema.pre('save', async function(next) {
  var suma=await this.items.reduce(async function(sum, current) {  
     await mongoose.model('Item').findByIdAndUpdate(current.item, {"$inc":{amount:-current.count} });  
      
    
     sum= sum + ((await mongoose.model('Item').findById(current.item))["cost"]*current.count);
          console.log(sum);
          return sum;
         },1);
         
  
         

  
    //     let sum1=0;
    //     console.log("before")
        
    //    async function iterate(value, index, array) {
    //      mongoose.model('Item').findByIdAndUpdate(value.item, {"$inc":{amount:-value.count} });  
       
    //       console.log("sum in the begining",sum1);

    //      await (mongoose.model('Item').findById(value.item)).then((result)=>{
    //       add=result["cost"]*value.count
    //       console.log(add);    
    //       sum1= sum1 + add;
    //            console.log("suma after add"+sum1);                          
    //            }     
    //            )     
    //       }
    //      async function call(items)
    //       {
            
    //        await items.forEach(iterate);

    //       }
    //    //   call(this.items)
    //          call(this.items).then(()=>{             
    //   console.log("suma after all"+sum1);
    //    this.cost=sum1;
    //   console.log(this.cost);
    //  if (this.cost>=5000) {
    //   this.cost=this.cost*0.98;   
    //     }
    //   })
    next();
});


module.exports = mongoose.model('Order', OrderSchema);
