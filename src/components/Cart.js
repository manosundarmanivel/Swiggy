import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import axios from "axios";

const Cart = () => {
  const navigator = useNavigate();
  const [cart, setCart] = useState([]);
  
  email = "Yunus@gmail.com";
  // Getting the cart data from the db
  useEffect(() => {
    axios.post("http://localhost:8000/getItems", { email }).then((res) => {
     
      setCart(res.data);
      
    });
  }, [cart]);
 // adding the price of each item
  const totalPrice = cart.reduce((total,item)=> total + item.price,0)

  // removing the cart items in db

  const Remove = (id) => {
    
    axios
      .post("http://localhost:8000/removeItems", { id, email })
      .then((res) => {
        console.log("Item removed successfully");
        setCart(cart.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };


  

  

  return(totalPrice == 0)?(<div className="text-center">
  
  <div className="empty-cart">
    <img  style={{marginTop:"50px" , marginBottom:"100px"}} src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" width={300} alt="Empty Cart" className="empty-cart-image" />
    <h4>No items found in your cart</h4>
    <p>Explore our menu and add delicious items to your cart!</p>
    <a  className="btn " style={{backgroundColor:"orange" , color:"white"}} onClick={()=>{
      
     
    }}>Explore Menu</a>
  </div>
</div>):(
   <MDBContainer>
   <MDBRow className="justify-content-center">
     <MDBCol md="8">
       <MDBCardBody>
         <div className="mb-4">
           {cart.map((item, index) => (
             <div key={index} className="d-flex align-items-center my-3">
               <div>
                 <h5>{item.name}</h5>
                 <p>{item.price}</p>
               </div>
               <MDBBtn
                 color="white"
                 className="ml-auto"
                 style={{ border: 'none', boxShadow: 'none' }}
                 onClick={() => {
                   Remove(item.id);
                 }}
               >
                 <img width={25} src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/sign-delete-icon.png" alt="Remove Item" className="remove-icon" />
               </MDBBtn>
             </div>
           ))}
         </div>
         <div className="d-flex justify-content-between mb-4">
           <h4>Total Price:</h4>
           <h4>Rs: {totalPrice}</h4>
         </div>
         <MDBBtn color="primary" className="w-100">
           <img width={30} src="https://img.uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/order-placed-purchased-icon.png" alt="Place Order" className="place-order-icon" />
            Place Order
         </MDBBtn>
       </MDBCardBody>
     </MDBCol>
   </MDBRow>
 </MDBContainer>
  );
};

export default Cart;
