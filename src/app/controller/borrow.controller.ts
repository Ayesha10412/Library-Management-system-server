import express, { Request, Response } from "express";
import { Book } from "../Models/book.models";
import { Borrow } from "../Models/borrow.model";
export const route = express.Router();

route.post("/", (req: Request, res: Response): void => {
  (async () => {
    try {
      const { book, quantity, dueDate } = req.body;
      const foundBook = await Book.findById(book);
      if (!foundBook) {
        res.status(404).json({
          success: false,
          message: "Book not found!",
        });
        return;
      }
      await foundBook.borrowBook(quantity);
      const data = await Borrow.create({ book, quantity, dueDate });
      res.status(201).json({
        success: true,
        message: "Book borrowed successfully!",
        data,
      });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ success: false, message: error.message, error });
    }
  })();
});

route.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          totalQuantity: 1,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
        },
      },
    ]);
    res.status(201).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message, error });
  }
});
