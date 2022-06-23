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
  fetch(API_URL)
    .then((res) => res.json())
    .then((datos) => {
      setListaOfertas(datos.contenido);
    })
    .catch((error) => console.log(error));

  return (
    <Fragment>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {listaOfertas.map((oferta) => (
          <Card sx={{ maxWidth: 250, margin: "1rem" }}>
            <CardMedia
              component="img"
              height="140"
              image="https://i.blogs.es/deec05/pepsi/450_1000.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {oferta.titulo_oferta}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {oferta.descripcion}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Link to="/descripcionOferta" style={{ textDecoration: "none" }}>
                <Button size="large" variant="contained" color="relaxed">
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
