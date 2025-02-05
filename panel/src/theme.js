// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  zIndices: {
    modal: 1300,
    loading: 1400,
},
}

// 3. extend the theme
const theme = extendTheme({ config })

export default theme