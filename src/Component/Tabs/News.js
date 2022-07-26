import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ComponentIteamNew from "./ComponentIteamNew";
export default function News() {
  const [news, setnews] = useState([]);
  useEffect(() => {
    axios
      .get("https://backendextension-production.up.railway.app/news")
      .then((e) => {
        setnews(e.data.results);
      });
  }, []);
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {news.map((e, i) => (
        <ComponentIteamNew key={i} data={e} />
      ))}
    </List>
  );
}
