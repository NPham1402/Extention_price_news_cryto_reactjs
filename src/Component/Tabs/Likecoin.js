import { Divider, List, ListItemButton } from "@mui/material";
import React from "react";
import LikeIcon from "../LikeIcon";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const find = (value, array) => {
  return array.filter((iteam) => {
    if (iteam.uuid === value) {
      return iteam;
    }
  });
};
export default function Likecoin(props) {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  return (
    <div>
      {cookies.id_coins.data.length === 0 ? (
        <>
          <div class="d-flex justify-content-center">
            You don't have a favorite coin. Please choose it.
          </div>
        </>
      ) : (
        <>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {props.data.length !== 0 &&
              cookies.id_coins.data.map((e, i) => {
                const data2 = find(e, props.data);
                return (
                  <>
                    <ListItemButton
                      onClick={(e) => {
                        navigate("/detail", {
                          state: {
                            uuid: data2[0].uuid,
                            symbol: data2[0].symbol,
                          },
                        });
                      }}
                    >
                      <LikeIcon sx={{ width: "100%" }} data={data2} />
                    </ListItemButton>
                    <Divider variant="inset" component="li" />
                  </>
                );
              })}
          </List>
        </>
      )}
    </div>
  );
}
