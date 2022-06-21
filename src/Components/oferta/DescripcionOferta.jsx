import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Avatar, Button, ButtonBase, styled, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import ConfirmacionPostulacion from './ConfirmacionPostulacion'
import Grid from '@mui/material/Grid';
import StoreIcon from '@mui/icons-material/Store';
import Header from '../Header'


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  export default function CustomizedDialogs() {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <React.Fragment>
      <Header/>
      <Box sx={{padding:"2rem"}}>
        <Grid container spacing={3} sx={{justifyContent:"center", padding:"1rem"}}>
        <Box sx={{position:"relative"}}>
            <Box sx={{padding:"2rem", justifyContent:"center", display:"flex"}}>
                <Stack direction="row" spacing={2}>
                    <StoreIcon sx={{height:"8rem", width:"8rem"}}/>
                </Stack>
            </Box>
            <Box sx={{padding:"2rem"}}>
                <h1 style={{display:"flex"}}>Desarrollador Junior - Java</h1>
                <h3 style={{display:"flex"}}>Nombre empresa</h3>
            </Box>
            <Box sx={{padding:"1rem", display:"flex", justifyContent:"center"}}>
              <Button  size="large" variant="contained" color="relaxed" onClick={handleClickOpen} sx={{width:"300px"}}>Postularme</Button> 
              <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
            <ConfirmacionPostulacion></ConfirmacionPostulacion>
            </BootstrapDialog>
            </Box>
        </Box>

        <Box sx={{padding:"1rem", maxWidth:"30rem"}}>
            <Box sx={{borderBottom:"#009688 2px solid"}}> <h3>Descripcion:</h3> <Typography sx={{fontSize:"20px"}}>  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe nemo commodi deserunt atque voluptates fugiat quis aspernatur cumque nobis voluptatum, iure ex quod esse! Fugit dolores tempore necessitatibus ipsum magnam.</Typography></Box>
            <Box sx={{display:"flex", borderBottom:"#009688 2px solid"}}> <h3>Zona de trabajo:</h3> <Typography sx={{padding:"1rem", fontSize:"20px"}}>  Moron</Typography></Box>
            <Box sx={{display:"flex", borderBottom:"#009688 2px solid"}}> <h3>Horario:</h3> <Typography sx={{padding:"1rem", fontSize:"20px"}}>  9hs a 18hs</Typography></Box>
            <Box sx={{display:"flex", borderBottom:"#009688 2px solid"}}> <h3>Ingles:</h3> <Typography sx={{padding:"1rem", fontSize:"20px"}}>  Ingles Basico</Typography></Box>
            <Box sx={{display:"flex", borderBottom:"#009688 2px solid"}}> <h3>Modalidad de trabajo:</h3> <Typography sx={{padding:"1rem", fontSize:"20px"}}>  Hibrido</Typography></Box>
            <Box sx={{display:"flex", borderBottom:"#009688 2px solid"}}> <h3>Salario:</h3> <Typography sx={{padding:"1rem", fontSize:"20px"}}>  10.000 USD</Typography></Box>
            <Box sx={{display:"flex"}}> <h3>Nombre del representante:</h3> <Typography sx={{padding:"1rem", fontSize:"20px"}}>  Juan Roman Riquelme</Typography></Box>
        </Box>
        </Grid>
      </Box>
    </React.Fragment>
  );
}