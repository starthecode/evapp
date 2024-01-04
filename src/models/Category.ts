import { Document, Schema, model, models } from 'mongoose';

export interface ICat extends Document {
  _id: string;
  name: string;
}

const CategorySchema = new Schema({
  name: { type: String, unique: true },
});

const Category = models.Category || model('Category', CategorySchema);

export default Category;
