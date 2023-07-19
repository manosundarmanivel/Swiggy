import { Outlet } from "react-router-dom";
import ProfileClass from "./ProfileClass";

const About =()=>{
    return(
        <div>
            <h1>This is an About Page</h1>
           <Outlet/>
            <ProfileClass/>
        </div>
    )
}

export default About;