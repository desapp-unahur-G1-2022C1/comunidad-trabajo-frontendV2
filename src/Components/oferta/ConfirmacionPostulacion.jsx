import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import '../../App.css';

export default function InputAdornments(props) {
  const [values, setValues] = React.useState({
    password: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Box sx={{justifyContent:"center", padding:"1rem"}}>
        <h4 style={{display:"flex", justifyContent:"center", padding:"1rem"}}>Postulacion confirmada!</h4>  
        <Card sx={{ maxWidth: 250, margin:"1rem" }}>
            <CardMedia
                component="img"
                height="140"
                image= "https://cdn.discordapp.com/attachments/955646153297395722/996230598853148792/unknown.png"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {props.tituloOferta}
                </Typography>
                <Typography gutterBottom variant="body" component="div">
                {props.nombreEmpresa}
                </Typography>
            </CardContent>
            <CardActions sx={{display:"flex", justifyContent:"center"}}>
            </CardActions>
            </Card>  
            <Box sx={{display:"flex", justifyContent:"center", padding:"1rem"}}>
                <Link style={{textDecoration:'none'}} to="/"> <Button size="large" variant="contained" color="relaxed">Volver a inicio</Button> </Link>
            </Box>
    </Box>
  );
}