import { Route, Routes, Navigate } from "react-router-dom"
import './App.css'

import StoreNavbar from "./components/StoreNavbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails"
import ProductList from "./pages/ProductList"
import AddProduct from "./pages/AddProduct"
import EditProduct from "./pages/EditProduct"

// import { useState } from "react";

export default function App() {
  return (
    <>
      <StoreNavbar />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}
