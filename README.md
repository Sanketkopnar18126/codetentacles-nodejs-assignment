================= Codetentacles Technologies — Node.js Backend Assignment =================

Overview

This project is a Node.js + TypeScript backend built for the Codetentacles interview assignment.
It uses Express, TypeORM, SQLite, Multer, JWT, and includes complete authentication + product management with images.

Tech stack

Node.js + TypeScript

Express.js

SQLite (TypeORM)

Multer (file upload)

JWT (Auth)

Bcrypt (password hashing)

How to run the project
1️⃣ Install dependencies
npm install

2️⃣ Create default admin (seed)

npm run seed

Default admin:
Email: admin@example.com
Password admin123

4️⃣ Start the server

Development:

npm run dev

Build & run:

npm run build
npm start

Server URL:

http://localhost:3001

API Documentation

Base URL:

http://localhost:3001/api

Admin APIs:

✔ Admin Login

POST /api/admin/login
Body:

{ "email": "admin@example.com", "password": "admin123" }

✔ Create Seller

POST /api/admin/create-seller
Headers:

Authorization: Bearer <admin_token>

✔ List Sellers

GET /api/admin/sellers?page=1&limit=10

\*\*\* Seller APIs

- Seller Login

POST /api/seller/login

- Add Product

POST /api/seller/add-product
Headers:

Authorization: Bearer <seller_token>
Content-Type: multipart/form-data

\*\* Form-data fields:

productName: Mouse
productDescription: Test
brands: [{"brandName":"Dell","detail":"Test","price":1000},{"brandName":"HP","detail":"Test","price":2000}]
brandImage0: <file>
brandImage1: <file>

_✔_ List Seller Products

GET /api/seller/products?page=1&limit=10

_✔_ Delete Product

DELETE /api/seller/product/:id

** Postman Collection **

Import the Postman JSON provided in the repo to test all APIs.

Seed Script

Creates default admin if not present:

npm run seed

src/
├── controllers/
├── routes/
├── middleware/
├── config/
├── entities/
├── seed/
├── utils/
└── server.ts
├── postman/
│ └── codetentacles-task.postman_collection.json
uploads/
database.sqlite
README.md

Notes

✔ Passwords are hashed
✔ JWT-based auth
✔ Role-protected routes
✔ Brand images stored via Multer
✔ Clean error handling
✔ Proper status codes
