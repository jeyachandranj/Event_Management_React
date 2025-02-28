# 📅 Event Management System

## 🚀 Overview
The **Event Management System** is a multi-role platform designed for seamless event organization. It includes four types of users:
- 👨‍🎓 **Student**: Can register for events and make payments.
- 🛠️ **Admin**: Verifies event details before final approval.
- 👥 **Club Member**: Creates events and submits them for approval.
- 🎩 **Club Head**: Approves or rejects events before forwarding them to the admin.

💳 **Razorpay Integration**: Secure payment processing for event registrations.
📆 **Calendar View**: Users can click on dates to see scheduled events.

---

## 🏗️ Tech Stack

### 🌐 Frontend
- ⚛️ **React.js** – Dynamic and interactive UI components
- 🎨 **Tailwind CSS** – Responsive and modern styling

### 🖥️ Backend
- 🚀 **Express.js** – Fast and lightweight backend framework
- 🔒 **JWT Authentication** – Secure user authentication and role management

### 🗄️ Database
- 🍃 **MongoDB** – NoSQL database for scalable event storage
- 🔄 **Mongoose** – Elegant MongoDB object modeling for Node.js

### 🛠️ Additional Tools
- 💳 **Razorpay** – Payment gateway for seamless transactions
- 📡 **Socket.io** – Real-time updates and notifications

---

## 📌 Features
- 🏷️ **Multi-role login system** (Student, Admin, Club Member, Club Head)
- 📅 **Interactive event calendar**
- ✅ **Event approval workflow**
- 💳 **Secure online payments**
- 📢 **Real-time notifications**
- 📬 **Email updates for event approvals**

---

## 🚀 Getting Started

### 📦 Installation
```bash
# Clone the repository
git clone https://github.com/jeyachandranj/Event_Management_React.git
cd event-management

# Install dependencies
npm install
```

### 🔧 Backend Setup
```bash
cd server
npm install

# Start the server
npm start
```

### 🌍 Frontend Setup
```bash
cd client
npm install

# Start the frontend
npm start
```

---

## 🔑 Environment Variables
Create a `.env` file in the backend directory and add the following:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY=your_razorpay_key
```

---


