import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField } from '@mui/material';
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

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{justifyContent:"center", padding:"1rem"}}>
        <Box sx={{display:"flex", justifyContent:"center"}}>
          <img style={{display:"flex", maxWidth:"250px", margin:"8px"}} src="http://comunidad-de-trabajo.unahur.edu.ar/static/media/logoComunidadDeTrabajo.b8bf300b.svg"></img>
        </Box>
        <Box sx={{display:"flex", justifyContent:"center"}}> <h1>Iniciar Sesion</h1> </Box>
        <TextField 
          sx={{ display:"flex", justifyContent:"center", margin:'1rem'}}
          id="outlined-textarea"
          label="Usuario"
          multiline
        />
        <FormControl sx={{display:"flex", justifyContent:"center", margin:'1rem' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Box sx={{display:"flex", justifyContent:"center"}}>
          <Button sx={{display:"flex", justifyContent:"center"}} variant="contained" color="relaxed">
            Iniciar sesion
          </Button>
        </Box>
        
        <Box sx={{display:"flex", justifyContent:"center"}}>
          <Link to="/recuperarContrasena"style={{ textDecoration: 'none'}}><h6 style={{display:"flex", marginRight:"2rem", margin:"1rem", justifyContent:"flex-start", color:"#3f50b5"}}>¿Olvidaste tu contraseña?</h6></Link>
          <Link to="/registroPregunta"style={{ textDecoration: 'none'}}><h6 style={{display:"flex", marginLeft:"2rem", margin:"1rem", justifyContent:"flex-end", color:"#3f50b5"}}>Registrate</h6></Link>
        </Box>
    </Box>
  );
}