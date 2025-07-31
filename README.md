# 👤 User Registration with External API Check

This project demonstrates a full-stack implementation of user registration where the backend checks an external API before registering the user. It also supports fetching and displaying users from an API.

## 🌍 Live Demo

#### Published Frontend URL:
🔗 **Frontend (Netlify):** https://covassfront.netlify.app/

#### Server:
🔗 **Backend (Render):** https://conassserver.onrender.com/api

## 📦 Tech Stack

- ⚛️ React (Frontend)
- 🧠 Express.js + Node.js (Backend)
- 🗄️ JSON or SQL Database (optional)

---

## 🚀 Features

- ✅ Register users via form
- 📥 Fetches and displays registered users
- 📝 Edit/Delete functionality
- ✅ Success toast on update

---

## 📁 Project Structure
```
project/
│
├── crudass/
│ ├── public/
│ └── src/
│ ├── components/
│ │ ├── RegisterForm.jsx # Form to add users (with external API check)
│ │ └── UserDetailsCard.jsx # List users + Edit/Delete
│ ├── App.jsx # Main app component
│ └── index.css
│
├── server/
│ ├── index.js
└── README.md
```

## screenshots 
|User Registration|

<img src ="https://res.cloudinary.com/diejm0elz/image/upload/v1753868517/Bildschirmfoto_2025-07-30_um_12.10.19_c1zocb.png" width=200/>

|User Registration Validation|

<img src ="https://res.cloudinary.com/diejm0elz/image/upload/v1753868517/Bildschirmfoto_2025-07-30_um_12.10.45_wuyaaz.png" width=200/>

|Fetched User Data|

<img src ="https://res.cloudinary.com/diejm0elz/image/upload/v1753868517/Bildschirmfoto_2025-07-30_um_12.11.35_nugb53.png" width=200/>

|Edited Fetched Data|

<img src ="https://res.cloudinary.com/diejm0elz/image/upload/v1753868517/Bildschirmfoto_2025-07-30_um_12.11.16_ezm6cg.png" width=200/>


## 🔧 Setup Instructions

### 1. Clone the repository

    git clone https://github.com/your-username/your-repo-name.git
    cd covAss

###  2. Backend Setup

   
    You must update it to your Render backend URL. You must update as per your server
     In your Express backend (index.js):
       // Example
    const cors = require('cors');
    app.use(cors({
      origin: 'https://your-frontend.netlify.app',
    }));
    
    cd backend
    npm install
    node index.js
    
###  3. Frontend Setup

     Your React frontend is likely still calling the published URL. You must update as per your server in all api calls
      // Example
    const API_URL = "https://localhost:3000/api/users";
    
    cd crudass
    npm install
    npm run dev
