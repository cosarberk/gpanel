'use client'

import React, { ReactNode } from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Button,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Badge,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'







export function SideBar({ isOpen, onOpen, onClose,data ,onSelectData}) {



  return (
    <>

      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen} size={"full"}>
        {/* <DrawerOverlay backgroundColor={"rgba(0,0,0,0.3)"} /> */}
        <DrawerContent  >
          <DrawerCloseButton />
          <DrawerHeader>ARAMA MODLARI</DrawerHeader>
          <DrawerBody >
            {
              data && data.map((d, i) => {
                return (
                  <React.Fragment key={i}>
                    <Badge id={i} onClick={onSelectData} userSelect={"none"} _hover={{bgColor:"green.800"}} transition={"0.3s linear"} cursor={"pointer"} margin={1} padding={3} variant='outline' colorScheme='green'>
                      {d.name}
                    </Badge>
                  </React.Fragment>
                )
              })
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}


