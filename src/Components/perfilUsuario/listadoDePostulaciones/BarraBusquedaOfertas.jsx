import React, { useState } from "react";
import { Fragment } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";



const BarraBusquedaPostulaciones = (props) => {
    return ( 
        <form onSubmit={props.traerPostulaciones} >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "row",
            margin:"1rem"
          }}
        >
          <TextField
            placeholder="Buscar Ofertas..."
            type="search"
            name="tituloPostulacion"
          ></TextField>
          <Button type="submit" variant="contained">
            <SearchIcon />
          </Button>
        </Box>
      </form>
     );
}
 
export default BarraBusquedaPostulaciones;