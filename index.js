const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt")
const session = require("express-session")
const PORT = process.env.PORT || 5100;
const token = "4A5N2Tj0a4y5a2sChOrVeEeN0s1p2u3n"
app.use(require("cookie-parser")());

app.use(cors({
  origin:"https://covassfront.netlify.app", credentials:true,
}))
app.use(express.json())

app.use(session({
  secret: "mySecretKey123", 
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly:true,
    sameSite: "None",
    secure:false,
    maxAge: 1000 * 60 * 30
  }
}));

app.get("/api", async (req, res) => {
  try {
    
    const response = await fetch("https://api.covenanttecs.com/api/CRUD_WebAPIs/GetAllUsers", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
  }
})

app.post("/api/register", async (req, res) => {
  // check the user already exits 
  const userData = req.body
  
  try {
  
    // proceed to register user
    console.log(userData) // i am getting correct format
    const hashedPassword = await bcrypt.hash(userData.PasswordHash, 10)
    const payload = {...userData, PasswordHash: hashedPassword}
    const response = await fetch("https://api.covenanttecs.com/api/CRUD_WebAPIs/SaveUser", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    res.status(200).json(data)
   
  } catch (err) {
    res.status(500).json({message : "Server error during registration"})
  }
    
  })
  
app.post("/api/register/edit", async (req, res) => {
  try {
     const userData = req.body
    const response = await fetch("https://api.covenanttecs.com/api/CRUD_WebAPIs/SaveUser", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    });
    const data = await response.json();
    res.status(200).json(data)
    console.log("success")
  } catch (err) {
    console.log(err)
  }
})

//Delete User
app.post("/api/register/delete", async (req, res) => {
  try {    
    const { Email } = req.body
    console.log(Email)
    const response = await fetch("https://api.covenanttecs.com/api/CRUD_WebAPIs/DeleteUserByEmail", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({Email})
    });
    const data = await response.json();
    res.status(200).json(data)
    console.log(data.message)
  } catch (err) {
    console.log(err)
  }
})


app.post("/api/login", async (req, res) => {
  try {
    
    const { email, password } = req.body;
    //getUserDetails
    const response = await fetch("https://api.covenanttecs.com/api/CRUD_WebAPIs/GetAllUsers", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    //match Useremail
    const user = data.users.find(u => u.Email === email)
    if(!user) return res.status(401).json({error:"User not found"})
    
    //match password
    const isMatch = await bcrypt.compare(password, user.PasswordHash)
    if(!isMatch) return res.status(401).json({error:"Wrong Password"})
    
    req.session.user = { Email: user.Email };
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "None", 
    });
    
    res.json({ message: "Login successful" });

  } catch (err) {
    console.log(err)
  }

})

app.get("/api/check-auth", (req, res) => {
 
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
    console.log(req.session)
  } else {
    res.json({ loggedIn: false });
  }
});

app.post("/api/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("connect.sid"); 
    res.json({ message: "Logout successful" });
  });
});


app.listen(PORT);