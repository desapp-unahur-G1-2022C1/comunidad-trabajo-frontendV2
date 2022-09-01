import Header from "../Header";
import { Fragment } from "react";
import Stack from "@mui/material/Stack";
import { Avatar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { Link } from "react-router-dom";

const PanelAdmin = () => {
  return (
    <Fragment>
      <Header />
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignContent: "center",
          }}
        >
          <Box>
            <Stack direction="row" spacing={2} sx={{ padding: "1rem" }}>
              <Avatar
                src="/broken-image.jpg"
                sx={{ height: "8rem", width: "8rem" }}
              />
            </Stack>
          </Box>
          <Box sx={{ padding: "1rem" }}>
            <h1 style={{ display: "flex" }}>ADMINISTRADOR</h1>
          </Box>
        </Box>
        
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
        >
          <Link  style={{textDecoration:"none"}} to="/admin/listadoPostulantes"><Button variant="contained" sx={{ width: "25rem" }}>
          
            Postulantes
          </Button></Link>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
        >
           <Link  style={{textDecoration:"none"}} to="/admin/listadoOfertas"><Button variant="contained" sx={{ width: "25rem" }}>
            Ofertas
          </Button></Link>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
        >
        <Link  style={{textDecoration:"none"}} to="/admin/listadoEmpresas"> <Button variant="contained" sx={{ width: "25rem" }}>
            Empresas
          </Button></Link> 
        </Box>
      </Box>
      <Box
          sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
        >
          <Button variant="contained" sx={{ width: "25rem" }}>
            Estadisticas
          </Button>
        </Box>
    </Fragment>
  );
};

export default PanelAdmin;
