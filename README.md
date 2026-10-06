# 🍔 Food Delivery Platform

A modern, full-stack **Food Delivery Platform** built with **Next.js, Node.js, Supabase, and Redux**. The application provides a complete food ordering experience with customer, restaurant, and order management features.

## 🚀 Features

- 🍕 Browse food items and restaurant menus
- 🔎 Search and filter food items
- 🛒 Shopping cart management
- 📦 Place and manage food orders
- 👤 User authentication and authorization
- 🏪 Restaurant and menu management
- 📊 Admin dashboard
- 🔐 Role-based access control
- ⚡ Real-time application updates
- 📱 Responsive design for desktop, tablet, and mobile
- 💳 Order and checkout workflow
- 📍 Order status management
- 🗄️ Supabase database integration

## 🛠️ Tech Stack

### Frontend

- **Next.js**
- **React.js**
- **Tailwind CSS**
- **Redux Toolkit**
- **React Icons**
- **Axios**

### Backend

- **Node.js**
- **Express.js**
- **REST APIs**
- **JWT Authentication**
- **Role-Based Authorization**

### Database & Services

- **Supabase**
- PostgreSQL
- Supabase Authentication / Database services

### State Management

- **Redux Toolkit**
- Redux slices for authentication, cart, products, orders, and application state

## 👥 User Roles

### Customer

- Register and login
- Browse restaurants and food
- View food details
- Add items to cart
- Update cart quantities
- Place orders
- View order history
- Track order status

### Restaurant / Vendor

- Manage restaurant information
- Add, update, and remove food items
- Manage menu categories
- View incoming orders
- Update order status

### Admin

- Manage users
- Manage restaurants
- Manage food categories and products
- Manage orders
- Monitor the overall platform

## 📁 Project Structure

```text
food-delivery/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── redux/
│   │   ├── store.js
│   │   └── slices/
│   ├── services/
│   ├── hooks/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 🔄 Application Flow

```text
Customer
   │
   ▼
Next.js Frontend
   │
   ▼
Redux State Management
   │
   ▼
Node.js + Express API
   │
   ▼
Supabase / PostgreSQL
   │
   ▼
Orders / Users / Restaurants / Food
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/food-delivery.git

cd food-delivery
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

## 🔐 Environment Variables

### Frontend

Create a `.env.local` file inside the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend

Create a `.env` file inside the backend directory:

```env
PORT=5000

SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

JWT_SECRET=your_jwt_secret
```

> Never commit your `.env` or `.env.local` files to GitHub.

## 🗄️ Supabase Database

The application uses **Supabase PostgreSQL** for persistent data storage.

Typical database entities include:

```text
Users
Restaurants
Categories
Food Items
Orders
Order Items
Cart
Reviews
```

Supabase provides the database infrastructure while the Node.js backend handles business logic and API requests.

## 🧠 Redux State Management

Redux Toolkit is used to manage global application state.

Example state modules:

```text
Redux Store
│
├── authSlice
├── cartSlice
├── productSlice
├── restaurantSlice
├── orderSlice
└── userSlice
```

This keeps authentication, cart data, products, restaurants, and orders synchronized across the application.

## 🔌 API Structure

Example backend API endpoints:

```text
/api/auth
/api/users
/api/restaurants
/api/categories
/api/products
/api/orders
/api/cart
```

Example requests:

```http
POST   /api/auth/register
POST   /api/auth/login

GET    /api/restaurants
GET    /api/products

POST   /api/orders
GET    /api/orders
GET    /api/orders/:id

POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

## ▶️ Running the Project

### Start Backend

```bash
cd backend
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Frontend will run on:

```text
http://localhost:3000
```

## 🔒 Security

The application includes:

- JWT-based authentication
- Protected API routes
- Role-based authorization
- Secure environment variables
- Server-side validation
- Protected admin and restaurant routes

## 📱 Responsive Design

The platform is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile devices

## 📌 Future Improvements

- 💳 Online payment integration
- 📍 Live delivery tracking
- 🔔 Push notifications
- ⭐ Restaurant and food reviews
- 🤖 AI-powered food recommendations
- 📈 Advanced analytics dashboard
- 🗺️ Google Maps integration
- 💬 Customer and restaurant chat

## 👨‍💻 Developer

**Abdul Wahab**

Full-Stack Web Developer specializing in:

- Next.js
- React.js
- Node.js
- Express.js
- MERN Stack
- React Native
- Supabase
- PostgreSQL

---

⭐ If you find this project useful, consider giving it a star!
