import React, { Fragment } from 'react'
import { Box, Typography } from '@mui/material'

export default function NotFound() {
  return (
    <Fragment>
      <Box sx={{display: 'flex', justifyContent:"center", margin:'2rem'}}>
        <Typography >
          404 - La página que usted está buscando no existe.
        </Typography>
      </Box>
    </Fragment>
  )
}
