import 'bootstrap/dist/css/bootstrap.css';
import React,  { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header"; 
import Body from "./components/Body";
import Footer from "./components/Footer";
import { createBrowserRouter , RouterProvider} from "react-router-dom";
import Error from "./components/Error";
import About from "./components/About";
import { Outlet } from "react-router-dom";
import Contact from "./components/Contact";
import RestaruntMenu from "./components/RestraruntMenu";
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Cart from './components/Cart';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { lazy } from 'react';
const InstaMart = lazy(()=> import("./components/Instamart"));

// const heading = React.createElement("h1",{id:"title" ,key:"h1"},"Heading 1");
// React.createElement ==> object ==> HTML(DOM)
// for building a large HTML file we should not use React.createElement
// insted use JSX

// const heading2 = React.createElement("h2",{id:"title2", key:"h2"},"Heading 2");
//JSX - is a HTML like Syntax not (HTML inside the js)
// const head = <h1>JSX Heading</h1>;
// const Component = () =>{
//     return  ({heading},<h1>Header from functional component</h1>);
// };
//babel will convert the JSX file into React.createElement("h2",{id:"title2", key:"h2"},"Heading 2"); which then converted => object => HTML(DOM)
// const div = React.createElement("div",{id:"div"},[heading,heading2]);


const AppLayout = () => {
  return (
    <React.Fragment>
      <Header />
      <Outlet/>
      <Footer />
    </React.Fragment>
  );
};

const Approuter = createBrowserRouter([
  {
    path : "/",
    element : <AppLayout/>,
    errorElement: <Error/>,
    children:[
      {
        path : "/about",
        element: <About/>,
        errorElement:<Error/>,
        children:[
          {
            path:"profile",
            element:<Profile/>,
            errorElement:<Error/>
          }
        ]
        
    
      },
      {
        path:"/",
        element: <Body/>,
        errorElement: <Error/>
      },
      {
        path:"/contact",
        element: <Contact/>,
        errorElement:<Error/>
      },
      {
        path:"/restaruntMenu/:resId",
        element: <RestaruntMenu/>,
        errorElement: <Error/>
      },
      
      
    ]
    
  },
  {
    path:"/login",
    element:<Login/>,
    errorElement:<Error/>
  },
  {
    path:"/signUp",
    element:<SignUp/>,
    errorElement:<Error/>
  },
  {
    path:"/cart",
    element: <Cart/>,
    errorElement:<Error/>
  },
  {
    path:"/instamart",
    element: <Suspense><InstaMart/></Suspense> ,
    errorElement:<Error/>
  }
  
])


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={Approuter}/>);

export default AppLayout;
