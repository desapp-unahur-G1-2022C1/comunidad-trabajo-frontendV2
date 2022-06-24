import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Header from "../Header";
import Button from "@mui/material/Button";
import { Box, Step, Stepper } from "@mui/material";
import { Link } from "react-router-dom";

export default function AddressForm() {
  return (
    <React.Fragment>
      <Header />
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
      >
        Datos Académicos
      </Typography>
      <Grid container spacing={3} sx={{ padding: "2rem", paddingTop: "0" }}>
      <Grid item xs={12} sm={6}>
          <TextField
            id="estudios"
            name="estudios"
            label="Estudios"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="universidad"
            name="universidad"
            label="Universidad"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="carrera"
            name="carrera"
            label="Carrera"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="cantAprobadas"
            name="cantAprobadas"
            label="Cantidad de Materias Aprobadas"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="idioma"
            name="idioma"
            label="Idioma"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
       
      </Grid>
      <FormControlLabel control={<Checkbox sx={{display:"flex", justifyContent:"center", marginLeft:"2rem"}}/>} label="¿Es alumno UNAHUR?" />
      <Box sx={{ display: "flex", justifyContent: "center"}}>
            <Link style={{textDecoration:'none'}} to="/registroPostulante/2">
              <Button variant="contained" color="relaxed">
                Siguiente
              </Button>
            </Link>
          </Box>
    </React.Fragment>
  );
}
