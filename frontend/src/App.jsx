import Cards from "./Components/Cards"
import Navbar from "./Components/Navbar"
import HomePage from "./Pages/HomePage"
import ProductPage from "./Pages/ProductPage"
import { Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"


function App() {
  return (
   <div className="min-h-screen bg-base-200">
     <Toaster />
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/products/:id" element={<ProductPage />} />
    </Routes>
   </div>
  )
}

export default App
