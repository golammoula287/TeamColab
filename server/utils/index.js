// import jwt from "jsonwebtoken"
// import mongoose from "mongoose"

// export const dbConnection = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI)

//         console.log("DB connection established")
//     } catch (error) {
//         console.log("DB Error: " + error)
//     }
// }

// export const createJWT = (res, userId) => {
//     const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//         expiresIn: "1d",
//     })

//     // Change sameSite from strict to none when you deploy your app
//     res.cookie("token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV !== "development",
//         sameSite: "strict", //prevent CSRF attack
//         maxAge: 1 * 24 * 60 * 60 * 1000, //1 day
//     })
// }


// import jwt from "jsonwebtoken"
// import mongoose from "mongoose"

// export const dbConnection = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 10000,
//     })

//     console.log("✅ MongoDB connected")
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error.message)
//     process.exit(1)
//   }
// }

// export const createJWT = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "1d",
//   })

//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//     maxAge: 24 * 60 * 60 * 1000, // 1 day
//   })
// }

import jwt from "jsonwebtoken"
import mongoose from "mongoose"

// MongoDB Connection
export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000, // Wait max 10s for DB server
    })

    console.log("✅ MongoDB connected")
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message)
    process.exit(1)
  }
}

// JWT Creator + Cookie Setter
export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  })

  // Determine if in production (for secure/sameSite config)
  const isProd = process.env.NODE_ENV === "production"

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd, // HTTPS only in production
    sameSite: isProd ? "none" : "lax", // Use 'none' only for cross-origin
    maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
  })
}

