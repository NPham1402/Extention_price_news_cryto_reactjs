import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Searchcoin from "../Component/Search_coin";
import MainTabs from "../Component/Tabs/MainTabs";
import { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default function All_coin() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get("https://backendextension-production.up.railway.app")
      .then((e) => {
        setdata(e.data.data.coins);
      });
  }, []);
  return (
    <>
      <Container>
        <Row>
          <h2 className="text-center" background="#474887">
            <img
              src="https://res.cloudinary.com/nguyten/image/upload/v1658418110/logo192_p1usyg.png"
              height="75"
              alt="dnsj"
            />
            Crytocurrency For Everyone
          </h2>

          <Breadcrumb>
            <Breadcrumb.Item active>Home/</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row>
          <Searchcoin style={{ textalign: "center" }} data={data} />
        </Row>
        <br />
        <Row>
          <MainTabs data={data} />
        </Row>
      </Container>
    </>
  );
}
