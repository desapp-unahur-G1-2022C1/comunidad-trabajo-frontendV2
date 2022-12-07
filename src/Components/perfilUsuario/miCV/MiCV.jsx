import React, { Fragment, useEffect } from 'react';
import Header from '../../Header';
import { FormControl, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';

const MiCV = () => {
    var datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario'))
    var token = sessionStorage.getItem('token')

    const [pdf, setPdf] = useState();

    const [uploadCV, setUploadCV] = useState(null)

    function timeoutReload() {
        setTimeout(function () { window.location.reload() }, 2000);
      }

    const handleSubmit  = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('uploadCV', uploadCV);
        try {
            const res = await axios({
              method: "post",
              url: `https://comunidad-backend-v3.herokuapp.com/files/cv/?authorization=${token}`,
              data: formData,
              headers: { 
                "Content-Type": "multipart/form-data",
                "id": datosUsuario.id
            },
            })
            Swal.fire({
                icon: 'success',
                title: 'Su CV fue actualizado correctamente',
                confirmButtonText: 'Finalizar',
                text: 'Para continuar pulse finalizar',
                footer: '',
                showCloseButton: true
              })
                .then(async function (result) {
                  if (result.value) {
                    await axios.get(`https://comunidad-backend-v3.herokuapp.com/postulantes/idUsuario/${datosUsuario.Usuario.id}`)
                      .then(({ data }) => {
                        console.log(data)
                        sessionStorage.setItem('datosUsuario', JSON.stringify(data));
                        timeoutReload()
                      })
                  }
                });
            } catch (err) {
              console.log(err);
            }
          }

    const handleFileSelect = (e) => {
        setUploadCV(e.target.files[0])
    }

    function splitFileName(str) {
        return str.split("|")[1];
    }

    useEffect(() => {
        const traerPdf = async () => {
            const fetchedData = await axios.get(
                `https://comunidad-backend-v3.herokuapp.com/files/?authorization=${token}`,
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
                   <form onSubmit={handleSubmit}> 
                        <input type="file" onChange={handleFileSelect} />
                        <input type="submit" value="SUBIR CV" />
                   </form>
                </Box>
            </Box>


        </Fragment>
    );
}

export default MiCV;