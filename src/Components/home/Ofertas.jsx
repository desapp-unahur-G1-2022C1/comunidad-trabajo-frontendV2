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
          <Card sx={{ maxWidth: 250, margin: "1rem" }} key = {oferta.i}>
            <CardMedia
              component="img"
              height="140"
              image="https://media.discordapp.net/attachments/955646153297395722/996231287230705734/unknown.png?width=504&height=468"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div"  sx={{height:'4rem'}}>
                {oferta.titulo_oferta}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{height:'4rem', textOverflow: 'ellipsis' }}>
               
                {
                  oferta.descripcion.length < 120
                  ?
                  oferta.descripcion
                  :
                  <p>{oferta.descripcion.substring(0,120)}...</p>
                }
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Link to={`/oferta/${oferta.id}`} style={{ textDecoration: "none", height:'4rem'}}>
                <Button size="large" variant="contained" color="relaxed" >
                  Ver oferta
                </Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Fragment>
  );
}


export default Ofertas;