import React, { Fragment } from "react";
import App from "../App.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";

export default function MediaCard() {
  return (
    <Fragment>
    <Box sx={{display:"flex", flexWrap:'wrap', justifyContent:"center"}}>
    <Card sx={{ maxWidth: 250, margin:"1rem" }}>
      <CardMedia
        component="img"
        height="140"
        image= "https://i.blogs.es/deec05/pepsi/450_1000.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions sx={{display:"flex", justifyContent:"center"}}>
      <Button  size="large" variant="contained" color="secondary">Ver oferta</Button>
    </CardActions>
    </Card>
    <Card sx={{ maxWidth: 250, margin:"1rem" }}>
    <CardMedia
      component="img"
      height="140"
      image= "https://i.blogs.es/deec05/pepsi/450_1000.jpg"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Lizard
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>
    </CardContent>
    <CardActions sx={{display:"flex", justifyContent:"center"}}>
      <Button  size="large" variant="contained" color="secondary">Ver oferta</Button>
    </CardActions>
  </Card>
  <Card sx={{ maxWidth: 250, margin:"1rem" }}>
    <CardMedia
      component="img"
      height="140"
      image= "https://i.blogs.es/deec05/pepsi/450_1000.jpg"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Lizard
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>
    </CardContent>
    <CardActions sx={{display:"flex", justifyContent:"center"}}>
      <Button  size="large" variant="contained" color="secondary">Ver oferta</Button>
    </CardActions>
  </Card>
  <Card sx={{ maxWidth: 250, margin:"1rem" }}>
    <CardMedia
      component="img"
      height="140"
      image= "https://i.blogs.es/deec05/pepsi/450_1000.jpg"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Lizard
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>
    </CardContent>
    <CardActions sx={{display:"flex", justifyContent:"center"}}>
      <Button  size="large" variant="contained" color="secondary">Ver oferta</Button>
    </CardActions>
  </Card>
  <Card sx={{ maxWidth: 250, margin:"1rem" }}>
    <CardMedia
      component="img"
      height="140"
      image= "https://i.blogs.es/deec05/pepsi/450_1000.jpg"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Lizard
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>
    </CardContent>
    <CardActions sx={{display:"flex", justifyContent:"center"}}>
      <Button  size="large" variant="contained" color="secondary">Ver oferta</Button>
    </CardActions>
  </Card>
  <Card sx={{ maxWidth: 250, margin:"1rem" }}>
    <CardMedia
      component="img"
      height="140"
      image= "https://i.blogs.es/deec05/pepsi/450_1000.jpg"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        Lizard
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>
    </CardContent>
    <CardActions sx={{display:"flex", justifyContent:"center"}}>
      <Button  size="large" variant="contained" color="secondary">Ver oferta</Button>
    </CardActions>
  </Card>  
  </Box>
  </Fragment>
  );
}