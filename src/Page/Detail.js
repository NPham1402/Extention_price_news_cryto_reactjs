import { Avatar, Chip } from "@mui/material";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import React, { useEffect } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import List from "@mui/material/List";
import ComponentIteamNew from "../Component/Tabs/ComponentIteamNew";
import Col from "react-bootstrap/Col";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import IconButton from "@mui/material/IconButton";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Stack from "@mui/material/Stack";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import { useCookies } from "react-cookie";
export default function Like_coin() {
  const [cookies, setCookie] = useCookies();
  const location = useLocation();
  const [data, setdata] = useState({ data: [], chart: {}, news: [] });
  const [status, setlink] = useState({ Copy: "copy", like: false });
  const [state, setState] = useState([{ selection: "one_year" }]);
  const updateData = (timeline) => {
    setState({
      selection: timeline,
    });
    switch (timeline) {
      case "one_month":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("28 Jan 2013").getTime(),
          new Date("27 Feb 2013").getTime()
        );
        break;
      case "six_months":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("27 Sep 2021").getTime(),
          new Date("27 Feb 2021").getTime()
        );
        break;
      case "one_year":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("27 Feb 2012").getTime(),
          new Date("27 Feb 2013").getTime()
        );
        break;
      case "ytd":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("01 Jan 2013").getTime(),
          new Date("27 Feb 2013").getTime()
        );
        break;
      case "all":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("23 Jan 2012").getTime(),
          new Date("27 Feb 2013").getTime()
        );
        break;
      default:
    }
  };
  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    annotations: {
      yaxis: [
        {
          y: 30,
          borderColor: "#999",
          label: {
            show: true,
            style: {
              color: "#fff",
              background: "#00E396",
            },
          },
        },
      ],
      xaxis: [
        {
          x: new Date().getTime(),
          borderColor: "#999",
          yAxisIndex: 0,
          label: {
            show: true,
            text: "Rally",
            style: {
              color: "#fff",
              background: "#775DD0",
            },
          },
        },
      ],
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
      style: "hollow",
    },
    xaxis: {
      type: "datetime",
      min: data.chart.mindate * 1000,
      tickAmount: 6,
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
  };

  const likeclick = () => {
    if (!status.like) {
      const temp = [];
      temp.push(location.state.uuid);
      const temp2 = [...cookies.id_coins.data, ...temp];
      setCookie("id_coins", { data: temp2 });
    } else {
      if (cookies.id_coins.data.length === 1) {
        setCookie("id_coins", { data: [] });
      } else {
        const temp = cookies.id_coins.data.splice(
          cookies.id_coins.data.indexOf(location.state.uuid, 1)
        );
        setCookie("id_coins", { data: temp });
      }
    }
    setlink({ Copy: status.Copy, like: !status.like });
  };
  useEffect(() => {
    if (cookies.id_coins.data.includes(location.state.uuid)) {
      setlink({ Copy: status.Copy, like: true });
    }
    if (data !== undefined) {
      axios
        .get(
          "https://backendextension-production.up.railway.app/coin/" +
            location.state.uuid,
          {
            headers: { id: location.state.symbol },
          }
        )
        .then((e) => {
          setdata({
            data: e.data.infor.data.coin,
            chart: e.data.chart,
            news: e.data.news.results,
          });
        });
    }
  }, []);
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3" className="text-center">
        <h3>Share it with your friends</h3>{" "}
      </Popover.Header>
      <Popover.Body>
        <h5 className="text-center">
          {" "}
          The price of {data.data.name} is {data.data.price}USD
        </h5>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Link</InputGroup.Text>
          <Form.Control
            aria-label="small"
            aria-describedby="inputGroup-sizing-sm"
            disabled
            value={data.data.websiteUrl}
          ></Form.Control>
          <CopyToClipboard
            text={data.data.websiteUrl}
            onCopy={() => {
              setlink("Copied");
            }}
          >
            <span>
              <Button>{status.Copy}</Button>
            </span>
          </CopyToClipboard>
        </InputGroup>
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <Container>
        <Row>
          <h1 className="text-center" background="#474887">
            <img
              src="https://res.cloudinary.com/nguyten/image/upload/v1658418110/logo192_p1usyg.png"
              height="75"
              alt="dnsj"
            />
            Crytocurrency For Everyone
          </h1>

          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Detail</Breadcrumb.Item>
          </Breadcrumb>
        </Row>

        <Row style={{ display: "flex" }}>
          <Col>
            {" "}
            <div style={{ display: "flex" }}>
              <h3 className="m-1"> {data.data.name} </h3>
              {status.like ? (
                <>
                  <IconButton aria-label="delete" onClick={likeclick}>
                    <FavoriteIcon style={{ color: "red" }} />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton aria-label="delete">
                    <FavoriteBorderIcon onClick={likeclick} />
                  </IconButton>
                </>
              )}

              <div className="m-1">
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={popover}
                >
                  <IosShareIcon />
                </OverlayTrigger>
              </div>
            </div>
            <Stack direction="row" spacing={1}>
              <Chip
                label={data.data.symbol}
                avatar={
                  <Avatar
                    className="text-right "
                    src={data.data.iconUrl}
                  ></Avatar>
                }
                variant="outlined"
              />
              <Chip
                label="rank"
                avatar={
                  <Avatar className="text-right ">{data.data.rank}</Avatar>
                }
                variant="outlined"
              />
            </Stack>
          </Col>
          <Col>
            <p className="text-end">
              {data.data.name} Price ({data.data.symbol})
            </p>
            <h4 className="text-end">
              {parseFloat(data.data.price).toFixed(2)} USD
            </h4>

            <p className="text-end">
              {data.data.change < 0 ? (
                <div style={{ color: "red" }}>▼ {data.data.change}%</div>
              ) : (
                <>
                  <div style={{ color: "green" }}>▲ {data.data.change}% </div>
                </>
              )}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            24h Volume:
            <p class="h6">
              {
                <span style={{ fontWeight: "bold", color: "#002358" }}>
                  {" "}
                  {"$ " +
                    (parseFloat(data.data["24hVolume"]) / 1000000000)
                      .toFixed(2)
                      .toLocaleString() +
                    " Bilion"}
                </span>
              }
            </p>
          </Col>
          <Col className="text-center">
            Market Cap:
            <p class="h6">
              <span style={{ fontWeight: "bold", color: "#002358" }}>
                {" "}
                {"$ " +
                  (parseFloat(data.data.marketCap) / 1000000000)
                    .toFixed(2)
                    .toLocaleString() +
                  " Bilion"}
              </span>{" "}
            </p>
          </Col>
          <Col className="text-center">
            Number Of Markets:
            <p class="h6">{data.data.numberOfMarkets}</p>
          </Col>
          <Col className="text-end">
            Number Of Exchanges:
            <p class="h6">{data.data.numberOfExchanges}</p>
          </Col>
        </Row>
        <Row>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Description</Accordion.Header>
              <Accordion.Body>
                <div
                  dangerouslySetInnerHTML={{ __html: data.data.description }}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
        <br />
        <Row>
          <div id="chart">
            <div class="toolbar">
              <Button
                variant="outlined"
                id="one_month"
                onClick={() => updateData("one_month")}
                className={state.selection === "one_month" ? "active" : ""}
              >
                1 month
              </Button>
              &nbsp;
              <Button
                variant="outlined"
                id="six_months"
                onClick={() => updateData("six_months")}
                className={state.selection === "six_months" ? "active" : ""}
              >
                6 months
              </Button>
              &nbsp;
              <Button
                variant="outlined"
                id="one_year"
                onClick={() => updateData("one_year")}
                className={state.selection === "one_year" ? "active" : ""}
              >
                1 years
              </Button>
              &nbsp;
              <Button
                variant="outlined"
                id="ytd"
                onClick={() => updateData("ytd")}
                className={state.selection === "ytd" ? "active" : ""}
              >
                YTD
              </Button>
              &nbsp;
              <Button
                variant="outlined"
                id="all"
                onClick={() => updateData("all")}
                className={state.selection === "all" ? "active" : ""}
              >
                ALL
              </Button>
            </div>
            <div id="chart-timeline">
              {state.series}
              <ReactApexChart
                options={options}
                series={[{ data: data.chart.data }]}
                type="area"
                height={350}
              />
            </div>
          </div>{" "}
        </Row>
        <Row>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {data.news.map((e, i) => (
              <ComponentIteamNew key={i} data={e} />
            ))}
          </List>
        </Row>
      </Container>
    </>
  );
}
