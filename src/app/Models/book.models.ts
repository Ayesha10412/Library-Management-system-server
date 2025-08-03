import { Error, Model, Schema } from "mongoose";
import { BookDocument, IBook, IBookMethods } from "../Interface/book.interface";
import mongoose from "mongoose";
const bookSchema = new Schema<IBook, Model<BookDocument>, IBookMethods>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies can not negative!"],
      validate: {
        validator: Number.isInteger,
        message: "Copies must be an integer.",
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
  },

  { versionKey: false, timestamps: true }
);
bookSchema.methods.borrowBook = async function (
  quantity: number
): Promise<void> {
  if (this.copies < quantity) {
    throw new Error("Not enough copies available!");
  }
  this.copies -= quantity;
  if (this.copies === 0) {
    this.available = false;
  }
  await this.save();
};
bookSchema.pre("save", function (next) {
  this.available = this.copies > 0;
  next();
});
bookSchema.post("save", function (doc) {
  console.log(`"${doc.title}" has been updated and ${doc.copies} are left`);
});
export const Book = mongoose.model("Book", bookSchema);
