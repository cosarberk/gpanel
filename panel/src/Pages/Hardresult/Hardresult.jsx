import { Box, Container, Flex, Heading, HStack, IconButton, Stack, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Loading, PCard } from '../../Components';
import DB from '../../Apis/DB';
import { useNavigate } from 'react-router-dom';

import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { HamburgerIcon, Search2Icon } from '@chakra-ui/icons';
const DynamicTable = ({ data }) => {
    if (!data || data.length === 0) return <Box>herhangibir sonuç bulunamadı</Box>;

    const keys = Object.keys(data[0]);

    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    {keys.map((key) => (
                        <Th key={key}>{key}</Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {data.map((item, index) => (
                    <Tr key={index}>
                        {keys.map((key) => (
                            <Td key={key}>{item[key]}</Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export function Hardresult() {

    const location = useLocation();
    const { FIND } = DB()
    const [persons, SetPersons] = useState()
    const [dsp, setDsp] = useState("none")
    const navigate = useNavigate();




    const FindGlobal = async () => {
        setDsp("flex")
        let r = await FIND("hard",{ val: location.state.val }, {'Content-Type': 'application/json'})
        console.log(r)
        setDsp("none")
        SetPersons(r.data)

    }


    useEffect(() => {
// console.log(location.state.val)
         FindGlobal()
    }, [])
    return (
        <Box w={"100vw"} display={"flex"} flexDirection={"column"} >
               <Flex
                as="header"
                width="100%"
                height="4rem"
                alignItems="center"
                justifyContent="space-between"
                color="white"
                px={4}
            >
                <HStack spacing={4}>
                  
                    <Heading size="md">ARAMA SONUÇLARI</Heading>
                </HStack>
                <Tooltip label={"Yeni Arama"} fontSize='md'>
      <IconButton   isRound={true} icon={<Search2Icon />} onClick={()=>navigate("/")}/>
    </Tooltip>
            </Flex>
            <Loading display={dsp} />
                {/* 
             
                <Box w={"100vw"} h={"100vh"} overflow={"auto"} >
                    {persons && persons.map((d, i) => {
                        return (
                            <React.Fragment key={i}>
                                <PCard date={d.DOGUMTARIHI} tc={d.TC} name={d.ADI + " " + d.SOYADI} />
                            </React.Fragment>
                        )
                    })}

                </Box> */}
      <Box style={{height: `calc(100vh - 4rem)`}} bgColor={"rgba(0,0,0,0.3)"} minH={"500px"} overflow={"auto"}  p={4}>
            <DynamicTable data={persons} />
        </Box>
        </Box>
    )
}
