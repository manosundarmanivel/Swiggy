import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { imgLink } from "../config";
const Restarunt =(props)=>{
    const {name , place,id,cloudinaryImageId, } = props.res.data;
    const {opened,totalRatingsString} = props.res.data;


    

    return(
    //     <div className="restarunt-list">
    //         <div className="card">
           
    //        <img src={imgLink+ cloudinaryImageId}></img>
    //        <h1 key= {id} >{name}</h1>
    //        {(opened==true)?<h3>Opened</h3>:<h3>Closed</h3>}
    //        <h3>{totalRatingsString}</h3>
    //    </div>
    //     </div>
        <Card style={{ width: '18rem' , height : '18rem' , marginRight:'10px' ,marginLeft:'20px' }}>
        <Card.Img variant="top" src={imgLink+ cloudinaryImageId} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle>{}</Card.Subtitle>
          <Card.Text>
            {totalRatingsString}
          </Card.Text>
         
        </Card.Body>
      </Card>
        
    
        
        
        
        
    );
};

export default Restarunt;