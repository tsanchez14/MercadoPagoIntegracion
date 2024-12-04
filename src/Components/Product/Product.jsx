import React from 'react'
import { useState } from 'react'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from "axios"
import img from "../../assets/joystick.jpg"
import "./Product.css"

const Product = () => {

  const [preferenceId, setPreferenceId] = useState(null)
  initMercadoPago('APP_USR-dc170916-bf1b-4832-8c50-f75daf964450');

  const createPreference = async () => {
    try {
      const response = await axios.post("http://localhost:8080/create_preference", {
        description: "Joystick PS5",
        price: 57000,
        quantity: 1,
      });
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error)
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <div className='card-product-container'>
      <div className='card-product'>
        <div className='card'>
            <img src={img} alt="Product Image" />
            <h3>Joystick PS5</h3>
            <p className='price'>57000 $</p>
            <button onClick={handleBuy}>Comprar</button>
            {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </div>
      </div>
    </div>
  )
}

export default Product
