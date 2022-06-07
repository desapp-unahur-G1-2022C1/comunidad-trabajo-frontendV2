import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Header from "./Header";
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
        <Grid item xs={6} sm={6}>
          <TextField
            required
            id="nombre"
            name="Nombre"
            label="Nombre"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            required
            id="apellido"
            name="Apellido"
            label="Apellido"
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="dni"
            name="dni"
            label="DNI"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="fechaNacimiento"
            name="fechaNacimiento"
            label="Fecha de nacimiento"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            type="date"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            required
            id="nacionalidad"
            name="nacionalidad"
            label="Nacionalidad"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            id="provincia"
            name="provincia"
            label="Provincia"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            required
            id="localidad"
            name="localidad"
            label="Localidad"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Link to="/registroPostulante/2">
              <Button variant="contained" color="secondary">
                Siguiente
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
