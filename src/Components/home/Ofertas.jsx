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

export default function MediaCard() {
  const [listaOfertas, setListaOfertas] = useState([]);

  const API_URL = `https://comunidad-de-trabajo.herokuapp.com/ofertas`;

  const ofertasAPI = async () => {
    try {
      const api = await fetch(API_URL);
      const datos = await api.json();
      setListaOfertas(datos.contenido);
      } catch (error) {
        console.log(error);
    }
  }
  ofertasAPI()
  return (
    <Fragment>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}> 
      
        {listaOfertas.map((oferta) => (
          <Card sx={{ maxWidth: 250, margin: "1rem" }} key = {oferta.id_oferta}>
            <CardMedia
              component="img"
              height="140"
              image="https://i.blogs.es/deec05/pepsi/450_1000.jpg"
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
              <Link to={`/descripcionOferta/${oferta.id_oferta}`} style={{ textDecoration: "none", height:'4rem'}}>
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
