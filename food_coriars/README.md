# 🍔 Food Couriers

A modern full-stack **food ordering and delivery platform** built with **Next.js, Express.js, PostgreSQL, Redux Toolkit, and JWT authentication**.

Food Couriers provides separate experiences for **customers and administrators**, allowing users to browse food, manage favorites and cart items, place orders, and manage their profiles. Administrators can manage foods, categories, users, and orders through a dedicated dashboard.

---

## 🚀 Features

### 👤 User Features

- User registration and login
- JWT-based authentication
- Protected user routes
- Browse available foods
- Food categories
- Add foods to cart
- Increase/decrease cart quantities
- Remove items from cart
- Clear cart
- Add/remove favorite foods
- Favorites page
- Place food orders
- View previous orders
- View order details
- Manage profile
- Responsive user dashboard
- Logout functionality

### 🛠️ Admin Features

- Admin authentication
- Protected admin dashboard
- Dashboard statistics
- Food management
- Add foods
- View foods
- Delete foods
- Category management
- Add categories
- Delete categories
- View all users
- View user information
- Delete users
- View all customer orders
- View order details
- Admin profile management
- Logout functionality

---

# 🧑‍💻 Tech Stack

## Frontend

| Technology     | Purpose                 |
| -------------- | ----------------------- |
| Next.js        | React framework         |
| React          | UI development          |
| Tailwind CSS   | Styling                 |
| Redux Toolkit  | Global state management |
| Redux Persist  | Persist Redux state     |
| Axios          | API requests            |
| React Icons    | Icons                   |
| React Toastify | Notifications           |
| JavaScript     | Programming language    |

## Backend

| Technology | Purpose               |
| ---------- | --------------------- |
| Node.js    | Backend runtime       |
| Express.js | REST API              |
| PostgreSQL | Relational database   |
| `pg`       | PostgreSQL connection |
| JWT        | Authentication        |
| bcryptjs   | Password hashing      |
| dotenv     | Environment variables |
| CORS       | Cross-origin requests |

## Database

The project uses **PostgreSQL**.

The database can be hosted locally or using **Supabase PostgreSQL**.

---

# 🏗️ Project Architecture

The application follows a full-stack architecture:

```text
                ┌─────────────────────┐
                │      Next.js        │
                │      Frontend       │
                └──────────┬──────────┘
                           │
                           │ Axios / REST API
                           ▼
                ┌─────────────────────┐
                │      Express.js     │
                │       Backend       │
                └──────────┬──────────┘
                           │
                           │ PostgreSQL
                           ▼
                ┌─────────────────────┐
                │     PostgreSQL      │
                │      Database       │
                └─────────────────────┘
```

---

# 📁 Project Structure

## Frontend

```text
frontend/
│
├── app/
│   │
│   ├── admin/
│   │   ├── dashboard/
│   │   ├── foods/
│   │   ├── orders/
│   │   ├── users/
│   │   ├── categories/
│   │   ├── profile/
│   │   ├── Sidebar.jsx
│   │   └── layout.jsx
│   │
│   ├── user/
│   │   ├── dashboard/
│   │   ├── foods/
│   │   ├── orders/
│   │   ├── profile/
│   │   ├── Sidebar.jsx
│   │   └── layout.jsx
│   │
│   ├── login/
│   ├── register/
│   ├── favorites/
│   ├── cart/
│   └── page.jsx
│
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ProtectedRoute.jsx
│   └── ...
│
├── redux/
│   ├── user/
│   │   └── userSlice.js
│   │
│   ├── cart/
│   │   └── cartSlice.js
│   │
│   ├── like/
│   │   └── likeSlice.js
│   │
│   └── store.js
│
├── config/
│   └── server.js
│
├── public/
│
├── package.json
└── ...
```

---

# 🔄 Redux Toolkit

Redux Toolkit is used for managing global application state.

The application currently uses Redux for:

- Authentication
- Cart
- Favorites

---

## 👤 User Slice

The user slice manages authentication-related state.

Example state:

```js
{
  currentUser: null,
  isAuth: false,
  error: null
}
```

The user slice provides actions such as:

```js
signInSuccess();
signOutSuccess();
updateUser();
```

### Login Flow

```text
User enters credentials
        ↓
Next.js Login Page
        ↓
POST /api/users/login
        ↓
Express Backend
        ↓
Validate credentials
        ↓
Generate JWT
        ↓
Return user + token
        ↓
Redux signInSuccess()
        ↓
Save token in localStorage
        ↓
Redirect to dashboard
```

---

# 🛒 Cart Redux

The cart slice manages shopping cart items.

Example:

```js
{
  cartItems: [];
}
```

Main actions include:

```js
addToCart();
decreaseQuantity();
removeFromCart();
clearCart();
```

### Add to Cart Flow

```text
Food Card
   ↓
addToCart(food)
   ↓
Redux Cart Slice
   ↓
cartItems updated
   ↓
Cart UI automatically updates
```

---

# ❤️ Favorites Redux

The favorites/likes slice manages foods that users like.

Example:

```js
{
  likeProducts: [];
}
```

Actions include:

```js
addLike();
removeLike();
```

Users can:

- Like a food
- Unlike a food
- View favorite foods
- Add favorite foods to cart

---

# 💾 Redux Persist

Redux Persist can be used to keep Redux state after refreshing the browser.

This is particularly useful for:

- Cart items
- Favorites
- Authentication state

Example configuration:

```js
persistReducer(config, reducer);
```

The persisted state is stored in browser storage.

---

# 🔐 Authentication

The application uses **JWT authentication**.

## Authentication Flow

```text
Register
   ↓
Password hashed using bcrypt
   ↓
User stored in PostgreSQL
   ↓
Login
   ↓
Credentials verified
   ↓
JWT generated
   ↓
Token returned to frontend
   ↓
Token stored in localStorage
   ↓
Token sent with protected API requests
```

Protected requests use:

```http
Authorization: Bearer <token>
```

Example:

```js
const token = localStorage.getItem("token");

axios.get(`${serverUrl}/api/orders`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

---

# 🛡️ Role-Based Access

The application supports different user roles.

### User

```text
/user/dashboard
/user/foods
/user/orders
/user/profile
```

### Admin

```text
/admin/dashboard
/admin/foods
/admin/orders
/admin/users
/admin/categories
/admin/profile
```

Protected routes verify the user's role before allowing access.

---

# 🍔 Food Management

Administrators can manage food items.

Food information includes:

```text
ID
Name
Category
Description
Price
Image
```

Admin functionality:

- Add food
- View foods
- Delete food
- Organize foods by category

Users can:

- Browse foods
- Add foods to cart
- Like foods
- Place orders

---

# 🏷️ Category Management

Categories are stored separately in PostgreSQL.

Example categories:

```text
Pizza
Burgers
Fast Food
Drinks
Desserts
Chicken
```

Admin can:

- Create categories
- View categories
- Delete categories

---

# 🛒 Order System

Users can place an order from their cart.

Order request:

```http
POST /api/orders
```

Example payload:

```json
{
  "items": [
    {
      "item_id": 1,
      "quantity": 2
    },
    {
      "item_id": 4,
      "quantity": 1
    }
  ]
}
```

The backend creates the order and associated order items.

---

# 📦 Order Data

Orders contain information such as:

```text
Order ID
User
Items
Quantity
Total
Created Date
```

Example response structure:

```js
{
  id: 1,
  order_id: "ORD-1001",
  items: [
    {
      item_name: "Chicken Burger"
    }
  ],
  total: 25,
  created_at: "2026-10-04T15:30:00"
}
```

---

# 🗄️ Database

PostgreSQL is used as the main relational database.

Current database tables:

```text
category
items
order_items
orders
users
```

---

## 👤 users

Stores registered users.

Typical information:

```text
id
name
email
password
role
created_at
```

---

## 🍔 items

Stores food products.

Typical information:

```text
id
name
category
description
price
image
```

---

## 🏷️ category

Stores food categories.

Typical information:

```text
id
name
```

---

## 📦 orders

Stores customer orders.

Typical information:

```text
id
order_id
user_id
total
created_at
```

---

## 🛒 order_items

Stores individual items belonging to orders.

Typical information:

```text
id
order_id
item_id
quantity
price
```

---

# 🔗 Database Relationships

The basic relationship is:

```text
users
  │
  │ 1
  │
  │ many
  ▼
orders
  │
  │ 1
  │
  │ many
  ▼
order_items
  │
  │ many
  │
  │ 1
  ▼
items
  │
  │ many
  │
  │ 1
  ▼
category
```

---

# 🌐 API Structure

The backend exposes REST APIs.

## Authentication

```http
POST /api/users/register
POST /api/users/login
```

---

## Users

```http
GET    /api/users
GET    /api/users/:id
DELETE /api/users/:id
PUT    /api/users/profile
```

---

## Foods

```http
GET    /api/foods
POST   /api/foods
DELETE /api/foods/:id
```

---

## Categories

```http
GET    /api/category
POST   /api/category
DELETE /api/category/:id
```

---

## Orders

### Create Order

```http
POST /api/orders
```

### Get User Orders

```http
GET /api/orders/
```

### Get All Orders

```http
GET /api/orders/all
```

---

# 🔑 Environment Variables

Create a `.env` file in the backend:

```env
PORT=5000

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_jwt_secret
```

For the Next.js frontend, create:

```text
.env.local
```

Example:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```

The frontend server configuration can then use:

```js
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default serverUrl;
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

Move into the project:

```bash
cd Food-Couriers
```

---

# 🎨 Frontend Setup

Go to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
.env.local
```

Add:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

Frontend will normally run on:

```text
http://localhost:3000
```

---

# ⚙️ Backend Setup

Open another terminal.

Move into backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create:

```text
.env
```

Configure:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
```

Start backend:

```bash
npm run dev
```

or:

```bash
npm start
```

Backend:

```text
http://localhost:5000
```

---

# 🐘 PostgreSQL Setup

Make sure PostgreSQL is installed and running.

Create a database:

```sql
CREATE DATABASE mtdb;
```

Connect to it:

```bash
psql -U your_username -d mtdb
```

Create the required tables using the project's database SQL/schema.

Verify tables:

```sql
\dt
```

Expected tables:

```text
category
items
order_items
orders
users
```

---

# ☁️ Supabase PostgreSQL

The project can also use **Supabase PostgreSQL** instead of a local PostgreSQL database.

The backend only needs a valid PostgreSQL connection string:

```env
DATABASE_URL=your_supabase_connection_string
```

This allows the same Express API to communicate with the Supabase PostgreSQL database.

---

# 🔌 Axios Configuration

Frontend API requests use Axios.

Example:

```js
import axios from "axios";
import serverUrl from "@/config/server";

const response = await axios.get(`${serverUrl}/api/foods`);
```

Protected requests include the JWT:

```js
const token = localStorage.getItem("token");

const response = await axios.get(`${serverUrl}/api/orders`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

---

# 🔔 Notifications

The project uses React Toastify for user feedback.

Examples:

```js
toast.success("Order placed successfully!");
```

```js
toast.error("Something went wrong");
```

Notifications are used for:

- Login
- Registration
- Profile updates
- Food management
- Category management
- Orders
- Errors
- Logout

---

# 🎨 UI & Design

The application uses a modern food-delivery design based around:

- Yellow
- Black
- White
- Gray

Main UI characteristics:

- Rounded cards
- Responsive layouts
- Modern dashboard
- Hover animations
- Soft shadows
- Mobile-friendly layouts
- Clean typography
- Responsive tables
- Modern buttons
- Status badges

---

# 📱 Responsive Design

The application is designed to work across:

```text
📱 Mobile
📱 Tablet
💻 Laptop
🖥️ Desktop
```

Tailwind CSS responsive utilities are used extensively.

Example:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

---

# 🧭 User Dashboard

The user dashboard provides:

```text
Welcome message
       ↓
Statistics
       ↓
Cart / Favorites
       ↓
Quick Actions
       ↓
Recent Orders
```

Users can quickly navigate to:

- Foods
- Cart
- Favorites
- Orders
- Profile

---

# 🛠️ Admin Dashboard

The admin dashboard provides an overview of the platform.

Example statistics:

```text
Total Orders
Total Foods
Total Users
Revenue
```

The admin can quickly access:

```text
Dashboard
Foods
Orders
Users
Categories
Profile
```

---

# 🔒 Security

The project implements several security practices:

### Password Hashing

Passwords are hashed using:

```text
bcryptjs
```

Passwords should never be stored as plain text.

### JWT Authentication

Protected APIs require a valid JWT.

### Role Authorization

Admin-only APIs/pages should verify the user's role.

### Environment Variables

Sensitive information such as:

```text
Database credentials
JWT secrets
API keys
```

should be stored in environment variables rather than committed to Git.

---

# 🧪 Testing API

You can test backend APIs using:

- Postman
- Insomnia
- Thunder Client

Example:

```http
POST http://localhost:5000/api/users/login
```

Body:

```json
{
  "email": "user@gmail.com",
  "password": "user"
}
```

---

# 🔄 Complete Order Flow

The complete order process is:

```text
User Login
    ↓
Browse Foods
    ↓
Select Food
    ↓
Add To Cart
    ↓
Modify Quantity
    ↓
View Cart
    ↓
Place Order
    ↓
JWT Authentication
    ↓
Express API
    ↓
PostgreSQL
    ↓
Create Order
    ↓
Create Order Items
    ↓
Clear Redux Cart
    ↓
Success Notification
    ↓
View Order History
```

---

# 🔄 Complete Authentication Flow

```text
Register
   ↓
Backend validates data
   ↓
Password hashed
   ↓
User saved in PostgreSQL
   ↓
Login
   ↓
Password verified
   ↓
JWT generated
   ↓
Frontend receives token
   ↓
Token stored locally
   ↓
Redux authentication state updated
   ↓
Protected dashboard
```

---

# 📊 State Management

The main global states are:

```text
Redux Store
│
├── auth
│   ├── currentUser
│   ├── isAuth
│   └── error
│
├── cart
│   └── cartItems
│
└── like
    └── likeProducts
```

This keeps important application state available across different pages.

---

# 🚪 Logout Flow

When the user logs out:

```text
Logout Button
     ↓
signOutSuccess()
     ↓
Remove JWT from localStorage
     ↓
Clear authentication state
     ↓
Redirect to home/login
```

Example:

```js
const handleLogout = () => {
  dispatch(signOutSuccess());
  localStorage.removeItem("token");
  router.push("/");
};
```

---

# 📌 Main Pages

## Public

```text
/
 /login
 /register
```

## User

```text
/user/dashboard
/user/foods
/user/orders
/user/profile
```

## Admin

```text
/admin/dashboard
/admin/foods
/admin/orders
/admin/users
/admin/categories
/admin/profile
```

---

# 🚧 Future Improvements

Possible future improvements include:

- Online payment integration
- Stripe integration
- Order status tracking
- Restaurant management
- Delivery driver management
- Real-time order tracking
- Email notifications
- Push notifications
- Food search
- Advanced filtering
- Food ratings and reviews
- Customer reviews
- Discount coupons
- Delivery address management
- Order cancellation
- Admin analytics
- Revenue charts
- Pagination
- Image upload with Cloudinary
- Server-side validation
- Automated testing
- Docker deployment
- CI/CD
- Production deployment

---

# 🚀 Production Deployment

The application can be deployed using services such as:

### Frontend

```text
Vercel
```

### Backend

```text
Render
Railway
AWS
DigitalOcean
```

### Database

```text
Supabase
Neon
AWS RDS
```

Before deployment, update:

```env
NEXT_PUBLIC_SERVER_URL
DATABASE_URL
JWT_SECRET
```

Never use development credentials in production.

---

# 📸 Screenshots

Add project screenshots here:

```text
screenshots/
├── home.png
├── login.png
├── register.png
├── foods.png
├── cart.png
├── favorites.png
├── user-dashboard.png
├── orders.png
├── admin-dashboard.png
├── admin-foods.png
├── admin-users.png
└── admin-categories.png
```

Example:

```md
![Home Page](./screenshots/home.png)
```

---

# 👨‍💻 Developer

**Abdul Wahab**

Full Stack Developer specializing in:

- MERN Stack
- Next.js
- React
- React Native
- Node.js
- Express.js
- PostgreSQL
- MongoDB
- REST APIs

---

# 📄 License

This project is created for educational, portfolio, and development purposes.

---

# ⭐ Support

If you found this project useful, consider giving the repository a ⭐.

---

## ❤️ Food Couriers

**Order your favorite food. Manage your orders. Enjoy your meal.**

Built with ❤️ using **Next.js + Express.js + PostgreSQL + Redux Toolkit**.
