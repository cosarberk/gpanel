import { Box, Spinner } from '@chakra-ui/react'
import React from 'react'

export  function Loading({display}) {
  return (
    <Box sx={{width:"100%",height:"100vh",position:"fixed",top:0,left:0,zIndex:9999,backgroundColor:"rgba(0,0,0,0.7)",
        display:display,justifyContent:"center",alignItems:"center",
    }} >
        <Spinner size={"xl"} />
    </Box>
  )
}
