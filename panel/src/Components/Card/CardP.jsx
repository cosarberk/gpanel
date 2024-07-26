'use client'

import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

export  function PCard({name,tc,date}) {
  return (
<Box float="left" >
      <Stack
      margin={2}
        borderWidth="1px"
        borderRadius="lg"
        w="350px"
        height="170px"
        direction="row"
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        padding={4}>
        <Flex flex={0.6} bg="blue.200">
          <Image
            objectFit="cover"
            boxSize="100%"
            src={
              '/p.png'
            }
            alt="#"
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={2}>
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {name}
          </Heading>
          <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
            {tc}
          </Text>
          <Text
            textAlign={'center'}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
            {date}
            
          </Text>
         

       
        </Stack>
      </Stack>

</Box>
  )
}