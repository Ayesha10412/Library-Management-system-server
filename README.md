# Library Management System API

This is a **Node.js + Express + MongoDB** based Library Management System. It supports **CRUD operations** for books and a **borrowing system** with due dates and real-time stock updates. It uses **Mongoose** for schema modeling and includes input validation, error handling, and aggregation pipelines.

## Technology Stack

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose

## Installation & Setup Instructions

## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/library-management.git
   cd library-management

   ```

2. Install dependencies:

npm install

3. Add .env file:

MONGODB_URI=mongodb://localhost:27017/libraryDB
PORT=5000

4. Run the server:

npm run dev

Server runs on http://localhost:5000

## API Documentation

| Method   | Endpoint                   | Description           |
| :------- | :------------------------- | :-------------------- |
| `POST`   | `routes/api/books`         | Create a new book     |
| `GET`    | `routes/api/books`         | Get all books         |
| `GET`    | `routes/api/books/:bookId` | Get a book by it's id |
| `PATCH`  | `routes/api/books/:bookId` | Update book           |
| `DELETE` | `routes/api/books/:bookId` | Delete a book         |

#### Filters and sorting

You can filter by genre sort the book list:

```http
GET /api/books?filter=FICTION&sortBy=title&sort=asc&limit=5
```

**Borrow Routes:**
| Method | Endpoint | Description |
| :-------- | :------- | :-------------------------------- |
| `POST` | `route/api/borrow` | Borrow a book(reduces copy count)|
| `GET` | `route/api/borrow` | Get borrow summary with total quantity per book|

#### Borrow logic:

Reduces copies from the Book document

Sets available = false when no copies are left

**Validates:**

Book exists

Quantity is positive integer

Due date is in the future

## Features

- Inventory control — borrowBook() method auto-updates stock
- Due date validation — cannot borrow with past dates
- Real-time availability — toggles available status
- Aggregate summary — total borrow per book with title & ISBN

## Future Improvements

- User authentication & roles (Admin, Member)

- Borrow history by user

- Notification system for due dates

- Unit & Integration testing

- Swagger/OpenAPI documentation
