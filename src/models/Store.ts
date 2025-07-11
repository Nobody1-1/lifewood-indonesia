import { Schema, Document, models, model } from 'mongoose';

export interface IStore extends Document {
  name: string;
  address: string;
  city: string;
  phone: string;
  location: {
    lat: number;
    lng: number;
  };
  image: string; // Added image field
  createdAt: Date;
}

const StoreSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  image: { type: String }, // <--- tambahkan ini!
  createdAt: { type: Date, default: Date.now },
});

export default models.Store || model<IStore>('Store', StoreSchema); 