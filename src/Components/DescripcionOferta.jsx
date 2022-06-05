import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { Avatar, Button, ButtonBase, styled } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import ConfirmacionPostulacion from './ConfirmacionPostulacion'

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
      <Box>
        <Box sx={{display:"flex", justifyContent:"center"}}><h1>Descripcion de la oferta</h1></Box>
        <Box sx={{display:"flex", justifyContent:"flex-start", alignContent:"center"}}>
            <Box>
                <Stack direction="row" spacing={2} sx={{padding:"1rem"}}>
                    <WorkIcon sx={{height:"8rem", width:"8rem"}}/>
                </Stack>
            </Box>
            <Box sx={{padding:"1rem"}}>
                <h1 style={{display:"flex"}}>Desarrollador Junior - Java</h1>
                <h3 style={{display:"flex"}}>Nombre empresa</h3>
            </Box>
        </Box>
        <Box sx={{padding:"1rem"}}>
            <h4 style={{padding:"1rem"}}>Descripcion:</h4>
            <h4 style={{padding:"1rem"}}>Zona de trabajo:</h4>
            <h4 style={{padding:"1rem"}}>Horario:</h4>
            <h4 style={{padding:"1rem"}}>Idiomas:</h4>
            <h4 style={{padding:"1rem"}}>Modalidad de trabajo:</h4>
            <h4 style={{padding:"1rem"}}>Salario:</h4>
            <h4 style={{padding:"1rem"}}>Datos del representante:</h4>
        </Box>
        <Box sx={{padding:"1rem", display:"flex", justifyContent:"center"}}>
            <Button  size="large" variant="contained" color="secondary" onClick={handleClickOpen}>Postularme</Button> 
            <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
        <ConfirmacionPostulacion></ConfirmacionPostulacion>
        </BootstrapDialog>
        </Box>
      </Box>
    </React.Fragment>
  );
}