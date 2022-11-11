import React, { Fragment, useEffect } from 'react';
import Header from '../../Header';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';

const MiCV = () => {
    var datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario'))

    const [pdf, setPdf] = useState();

    const [selectedFile, setSelectedFile] = useState(null)




    function splitFileName(str) {
        return str.split("|")[1];
    }

    useEffect(() => {
        const traerPdf = async () => {
            const fetchedData = await axios.get(
                `https://comunidad-backend-v3.herokuapp.com/files`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "type": "application/pdf",
                        "file": splitFileName(datosUsuario.cv)
                    },
                    responseType: 'blob'
                }
            );

            console.log(fetchedData)
            const pdfBlob = new Blob([fetchedData.data], { type: "application/pdf" });
            console.log(pdfBlob)
            const virtualUrl = URL.createObjectURL(pdfBlob);
            console.log(virtualUrl)
            setPdf(virtualUrl);

        };
        traerPdf();
    }, []);

    function abrirPdf() {
        window.open(pdf);
    }


   





    return (
        <Fragment>
            <Header />
            <Box sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}>
                <Typography variant="h4" >
                    Mi CV
                </Typography>
            </Box>
            <Box>
                <Box sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
                    <Button variant="contained" size="large" onClick={abrirPdf} sx={{ width: "25rem" }}>
                        VER MI CV
                    </Button>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
                    <Button variant="contained" size="large" sx={{ width: "25rem" }}>
                        ACTUALIZAR MI CV
                    </Button>
                </Box>
            </Box>


        </Fragment>
    );
}

export default MiCV;