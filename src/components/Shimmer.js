// const ShimmerUi = () =>{
//     return(
        
//         <div className="restaruntCard">
//             {Array(20).fill("").map((e , index)=>(<div key = {index} className="Shimmer">
            
//             </div>))}
            
//         </div>
//     )
// }

// export default ShimmerUi;

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';



const ShimmerUi = () =>{
    return(
        
        <div className="restaruntCard">
            {Array(20).fill("").map((e , index)=>( 
    <div key={index} className="d-flex justify-content-around">
      

      <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src="https://media.tarkett-image.com/large/TH_25094225_25187225_001.jpg" />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
        
        </Card.Body>
      </Card>
    </div>))}
            
        </div>
    )
}

export default ShimmerUi;
