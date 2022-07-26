import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Allcoin from "./Allcoin";
import Likecoin from "./Likecoin";
import News from "./News";

export default function MainTabs(props) {
  return (
    <Tabs defaultActiveKey="profile" id="fill-tab-example" className="mb" fill>
      <Tab eventKey="home" title="Like Coin">
        <Likecoin data={props.data} />
      </Tab>
      <Tab eventKey="profile" title="Coin List">
        <Allcoin data={props.data} />
      </Tab>
      <Tab eventKey="longer-tab" title="News">
        <News />
      </Tab>
    </Tabs>
  );
}
