import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";

export default function Search_coin(props) {
  const navigate = useNavigate();
  return (
    <>
      <Autocomplete
        id="country-select-demo"
        sx={{ width: "100%" }}
        options={props.data}
        autoHighlight
        getOptionLabel={(option) => option.name}
        onChange={(option, value) => {
          navigate("/detail", { state: { uuid: value.uuid } });
        }}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0, color: "#474887" } }}
            {...props}
          >
            <img loading="lazy" width="20" src={option.iconUrl} alt="" />
            {option.symbol} ({option.name})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Coin"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password",
            }}
          />
        )}
      />
    </>
  );
}
