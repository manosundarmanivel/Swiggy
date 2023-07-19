import { RestaruntList, erodeApi, perunduraiApi } from "../config";
import Button from "react-bootstrap/Button";
import Restarunt from "./ResturantCard";
import React, { lazy, useEffect, useState } from "react";
import ShimmerUi from "./Shimmer";
import { Link, useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Form, FormControl, Button } from "react-bootstrap";
import { erodeApi } from "../config";
import { perunduraiApi } from "../config";
import useOnline from "react-hook-online-ms";

// import useOnline from "../utils/useOnline";

function dataFilter(searchText, restaruntList) {
  const filter = restaruntList.filter((resturant) => {
    return resturant?.data?.name
      ?.toLowerCase()
      .includes(searchText.toLowerCase()); // <-- Add return statement here
  });

  return filter;
}

const Body = () => {
  const location = useLocation();
  const user = location.state.name;
  const email = location.state.email;
  const [searchText, setSearchText] = useState("");
  const [filterrestaruntList, setFilterRestaruntList] = useState([]);
  const [allRestaruntList, setAllRestaruntList] = useState([]);
  useEffect(() => {
    dataFetch();
  }, []);
  console.log(allRestaruntList);

  async function dataFetch() {
    const data = await fetch(erodeApi);
    const json = await data.json();
    console.log(json);
    setAllRestaruntList(json.data.cards[2].data.data.cards);
    setFilterRestaruntList(json.data.cards[2].data.data.cards);
  }

  const online = useOnline();

  if (!online) {
    return <h1>No Internet Connection</h1>;
  }
  // if(filterrestaruntList?.length==0)
  // return <h1>Not Found</h1>;

  return allRestaruntList?.length == 0 ? (
    <ShimmerUi />
  ) : (
    <React.Fragment>
      <div style={{ marginTop: "60px", marginBottom: "60px" }}>
        {/* <h1>{location.state.name}</h1>
           <h1>{location.state.email}</h1> */}
        <Container>
          <Row className="justify-content-center">
            <Col md={6} className="text-center">
              <h1
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: "40px",
                  lineHeight: "1.5",
                }}
              >
                Welcome {user.toUpperCase()}
              </h1>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={6} className="text-center">
              <p
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: "20px",
                  color: "#333",
                  lineHeight: "1.5",
                }}
              >
                Discover the best restaurants and enjoy delicious food delivered
                straight to your doorstep.
              </p>
              <Form className="d-flex">
                <FormControl
                  type="text"
                  placeholder="Search for restaurants"
                  className="mr-2"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
                <Button
                  className="btn"
                  variant="primary"
                  style={{
                    fontFamily: "Proxima Nova, sans-serif",
                    backgroundColor: "orange",
                  }}
                  onClick={() => {
                    const data = dataFilter(searchText, allRestaruntList);
                    setFilterRestaruntList(data);
                  }}
                >
                  Search
                </Button>
                {/* <Button variant="primary" onClick={test}>Test</Button> */}
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <div class="d-flex justify-content-center py-3 px-5">
  
  
  <div class="input-group">
  
    <input
      type="text"
      class="form-control"
      placeholder="Search for Restaurants"
      value={searchText}
      onChange={(e) => {
        setSearchText(e.target.value);
      }}
    />
    <button class="btn btn-primary" onClick={() => {
      const data = dataFilter(searchText, allRestaruntList);
      setFilterRestaruntList(data);
    }}>
      Search
    </button>
  </div>
</div> */}
      <h2
        style={{
          fontFamily: "Proxima Nova, sans-serif",
          fontWeight: "50",
          marginLeft: "120px",
        }}
      >
        {"    " + filterrestaruntList.length + " Restaurants Found"}
      </h2>
      <hr style={{ borderTop: "1px solid black", margin: "0px 125px" }} />

      <div
        style={{ marginLeft: "110px", marginTop: "30px", marginBottom: "40px" }}
        className="restaruntCard"
      >
         
        {filterrestaruntList != 0 ? (
          filterrestaruntList.map((restarunt) => {
            // console.log(restarunt.data)

            return (
              <Link
                to={"/restaruntMenu/" + restarunt.data.id}
                key={restarunt.data.id}
              >
                <Restarunt res={restarunt} />
              </Link>
            );
          })
        ) : (
          <h1>Not Found</h1>
        )}
      </div>
    </React.Fragment>
  );
};

export default Body;
