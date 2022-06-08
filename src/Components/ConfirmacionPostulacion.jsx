import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Card, CardActions, CardContent, CardMedia, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import '../App.css';

export default function InputAdornments() {
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
                image= "https://i.blogs.es/deec05/pepsi/450_1000.jpg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Desarrollador Trainee - java
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                Nombre empresa
                </Typography>
            </CardContent>
            <CardActions sx={{display:"flex", justifyContent:"center"}}>
            </CardActions>
            </Card>  
            <Box sx={{display:"flex", justifyContent:"center", padding:"1rem"}}>
                <Link style={{textDecoration:'none'}} to="/"> <Button size="large" variant="contained" color="secondary">Volver a inicio</Button> </Link>
            </Box>
    </Box>
  );
}