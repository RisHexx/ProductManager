import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./routes/productRoutes.js";
import sql from "./config/db.js";
import { aj }  from "./lib/arcjet.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Appliying rate limiting to all routes

// app.use(async (req,res,next)=>{
//   try{
//     const decision = await aj.protect(req , {
//       requested : 1 //each req consumes 1 token
//     });
//     if(decision.isDenied()){
//       if(decision.reason.isRateLimit()){
//         res.status(429).json({
//           error: "Rate limit exceeded"
//         });
//       }
//       else if(decision.reason.isBot()){
//         res.status(403).json({
//           error: "Bots are not allowed"
//         });
//       }
//       else{
//         res.status(403).json({
//           error: "Access denied"
//         });
//       }
//       return;
//     }
//     next();
//   }catch(error){
//     console.log(error);
//     res.status(500).json({
//       error: "Internal server error"
//     });
//   }
// })




app.use("/api/products", productRouter);

async function initDB(){
  try {
    await sql`CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
