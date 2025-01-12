const { config } = require("dotenv");
const connectDB = require("../lib/db")
const User = require('../models/user.model');

config();

const seedUsers = [
    {
      "email": "john.doe@example.com",
      "fullName": "John Doe",
      "password": "password123",
      "profilePic": "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      "email": "jane.smith@example.com",
      "fullName": "Jane Smith",
      "password": "password123",
      "profilePic": "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      "email": "michael.jones@example.com",
      "fullName": "Michael Jones",
      "password": "password123",
      "profilePic": "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      "email": "emily.davis@example.com",
      "fullName": "Emily Davis",
      "password": "password123",
      "profilePic": "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      "email": "william.brown@example.com",
      "fullName": "William Brown",
      "password": "password123",
      "profilePic": "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      "email": "sophia.wilson@example.com",
      "fullName": "Sophia Wilson",
      "password": "password123",
      "profilePic": "https://randomuser.me/api/portraits/women/6.jpg"
    },
    {
      "email": "james.taylor@example.com",
      "fullName": "James Taylor",
      "password": "password123",
      "profilePic": "https://randomuser.me/api/portraits/men/7.jpg"
    },
    {
      "email": "olivia.moore@example.com",
      "fullName": "Olivia Moore",
      "password": "password123",
      "profilePic": "https://randomuser.me/api/portraits/women/8.jpg"
    }
  ]
  

const seedDatabse = async () => {
    try {
        await connectDB();
        await User.insertMany(seedUsers);
        console.log("Database seeded successfully");
        
    } catch (error) {
        console.log("Error seeding database", error);
        
    }
};

seedDatabse();