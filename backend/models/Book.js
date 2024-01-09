import mongoose from "mongoose";

const { Schema } = mongoose; // Destructuring 'Schema' from 'mongoose'

const bookSchema = new Schema(
  {
    author: { type: String, required: true },
    coverImage: { type: String, required: true },
    publicationYear: { type: String, required: true },
    isbn: { type: String, unique: true, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    In_Stock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const BookModel = mongoose.model("Book", bookSchema);

export default BookModel;
