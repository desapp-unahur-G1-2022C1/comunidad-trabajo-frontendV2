import React from "react";

import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";



const BarraBusquedaPostulantes = (props) => {
    return ( 
        <form onSubmit={props.traerPostulantes} >
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
            placeholder="Buscar postulantes..."
            type="search"
            name="usuario"
          ></TextField>
          <Button type="submit" variant="contained">
            <SearchIcon />
          </Button>
        </Box>
      </form>
     );
}
 
export default BarraBusquedaPostulantes;