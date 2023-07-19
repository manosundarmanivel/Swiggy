import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { imgLink } from "../config";
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBCardSubTitle,
} from "mdb-react-ui-kit";
import Cart from "./Cart";
import ShimmerUi from "./Shimmer";
import axios from "axios";

const RestaruntMenu = () => {
    const navigator = useNavigate();
  const param = useParams();
  const { resId } = param;
  console.log(resId);
  const [restaruntMenu, setRestaruntMenu] = useState({});
  const [resMenu, setResMenu] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    RestaruntMenuData();
  }, []);
  async function RestaruntMenuData() {
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.0759837&lng=72.8776559&restaurantId=" +
        resId +
        ""
    );
    const json = await data.json();
    // console.log(json.data.cards[0]?.card?.card?.info);
    setRestaruntMenu(json.data.cards[0]?.card?.card?.info);
    setResMenu(json?.data);
    console.log(
      resMenu?.cards[resMenu?.cards.length - 1]?.groupedCard?.cardGroupMap
        ?.REGULAR?.cards[2]?.card?.card?.itemCards
    );

    // setRestaruntMenuList(json.data.card[2].groupedCard.cardGroupMap.REGULAR.cards)
  }
  function addItemFunc(item) {
    val = {
      id: item.card.info.id,
      name: item.card.info.name,
      price: item?.card?.info?.price/100,
    };
    const email = "Yunus@gmail.com"

    axios.post('http://localhost:8000/addItems',{val,email }).then(res=>{
        
    }).catch(error=>{
        console.log(error)
    })
    
    // newlist = [...cartItems, val];
    // setCartItems(newlist);

    // console.log(cartItems);
  }

  return (resMenu==null)?(<ShimmerUi/>):(
    <div>
         <MDBContainer style={{marginTop:"20px"}}>
      <MDBRow >
        <MDBCol >
          {/* Your banner content goes here */}
          <div className="banner">
            <h1>{restaruntMenu.name}</h1>
            <p>{restaruntMenu.locality+", " + restaruntMenu.areaName+", " + restaruntMenu.city}</p>
            
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {(resMenu?.cards[
          resMenu?.cards.length - 1
        ]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards).map(
          (item) => {
            return (
              <div
                className="flex flex-col justify-between border-b pb-6 mb-4 gap-6 md:flex-row"
                key={item?.card?.info?.id}
              >
                <MDBCard style={{ width: "20rem" }}>
                  <MDBRipple
                    rippleColor="light"
                    rippleTag="div"
                    className="bg-image hover-overlay"
                  >
                    <MDBCardImage width={"100%"}
                      style={{  objectFit: "cover" }}
                      src={
                        item?.card?.info?.imageId
                          ? imgLink + item?.card?.info?.imageId
                          : "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/39cd5e4824e5c011ffaf56ddc39891e8"
                      }
                      fluid
                      alt="..."
                    />
                    <a>
                      <div
                        className="mask"
                        style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                      ></div>
                    </a>
                  </MDBRipple>
                  <MDBCardBody>
                    <MDBCardTitle>{item?.card?.info?.name}</MDBCardTitle>
                    {/* <MDBCardText>
        {item?.card?.info?.description}
        </MDBCardText> */}
                    <MDBCardSubTitle>
                      Rs.
                      {item?.card?.info?.price
                        ? item?.card?.info?.price / 100
                        : 150}
                    </MDBCardSubTitle>
                    <MDBBtn className="btn " style={{backgroundColor:"orange"}} onClick={() => addItemFunc(item)}>
                      ADD TO CART
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </div>
            );
          }
        )}
      </div>
      {/* <button onClick={()=>naviCart()} >View Cart</button> */}
      {/* <Cart data = {cartItems}/> */}
    </div>
  );
        };
export default RestaruntMenu;
