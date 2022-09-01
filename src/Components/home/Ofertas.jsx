import React, { Fragment } from "react";
import { useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const Ofertas = ({listaOfertas}) => {
 
  
  return (
    <Fragment>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}> 
      
        {listaOfertas.map((oferta) => (
          <Card sx={{ width: 500, margin: "1rem" }} key = {oferta.id}>
            <Box sx={{ height: 325, margin: "1rem" }}>
            <CardMedia
              component="img"
              height="140"
              image="https://cdn.discordapp.com/attachments/955646153297395722/996230598853148792/unknown.png"
            />
            <CardContent>
            <Typography variant="h5" gutterBottom component="div" sx={{height:'3rem'}}>
                {oferta.titulo_oferta.toUpperCase()}
            </Typography>
            <Typography variant="h6" gutterBottom component="div" sx={{height:'2rem'}}>
                {oferta.Empresa.nombre_empresa}
            </Typography>
            <Typography variant="body1" gutterBottom component="div">
               
                {
                  oferta.descripcion.length < 120
                  ?
                  oferta.descripcion
                  :
                  <p>{oferta.descripcion.substring(0,120)}...</p>
                }
              </Typography>
            </CardContent>
            </Box>
             <Box sx={{display:"flex", justifyContent:"center", textDecoration:"none", margin:"1rem"}}>
                <Link to={`/oferta/${oferta.id}`} style={{ textDecoration: "none"}}>
                  <Button variant="contained" color="relaxed" >
                    Ver oferta
                  </Button>
                </Link>
              </Box>
          </Card>
        ))}
      </Box>
    </Fragment>
  );
}


export default Ofertas