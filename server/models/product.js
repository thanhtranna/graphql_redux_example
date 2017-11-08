import mongoose from 'mongoose';
mongoose.Promise = Promise;

const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  cost: {
    type: Number
  },
  quantity: {
    type: Number
  },
  image: {
    type: String,
    required: true
  }
}, {
  collection: 'products',
  timestamps: true
});

export default mongoose.model('products', productSchema);