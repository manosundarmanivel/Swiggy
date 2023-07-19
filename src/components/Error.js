import { useRouteError } from "react-router-dom";
const Error = () =>{
    const error  = useRouteError();
    return(<div>
        <h1>Opps!!</h1>
        <h1>Something went wrong</h1>
        <h1>{error.status+":"+error.statusText}</h1>
    </div>)
};

export default Error;