import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Text,
    Button,
    IconButton,
    Avatar,
    VStack,
    HStack,
    Heading,
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useMediaQuery,
    Select,
    Stack,
    Input,
    useColorModeValue,
    Checkbox,
    Badge,
    Tooltip,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, HamburgerIcon, PlusSquareIcon, Search2Icon, SettingsIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import DB from '../../Apis/DB';
import { PModal } from '../Modal/PModal';
import { Loading } from '../Loading/Loading';




const Inputs = ({ label, plcaholder, onChange, value, w = 300 }) => {
    return (
        <Box mt={5} >
            <Text fontSize='sm'>{label}</Text>
            <Box width={w} >
                <Input
                    variant={'solid'}
                    borderWidth={1}
                    color={'gray.400'}
                    _placeholder={{
                        color: 'gray.600',
                    }}
                    bgColor={"rgba(0,0,0,0.5)"}
                    borderColor={useColorModeValue('gray.300', 'gray.700')}

                    type={'text'}
                    placeholder={plcaholder}
                    value={value}
                    onChange={onChange}
                />

            </Box>

        </Box>
    )
}

export const HPanel = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLargerThanMd] = useMediaQuery("(min-width: 48em)"); // 48em = 768px
    const [dsp, setDsp] = useState("none")
    const navigate = useNavigate();
    const { FIND } = DB()

    const [dbs, setDbs] = useState({
        dbname: [],
        tbname: []
    })

    const [Sdb, setSDb] = useState({
        dbname: "",
        tbname: ""
    })

    const [Cols, setCols] = useState([])
    const [FindClip, setFindClip] = useState()
    const [Afcname, setAfcname] = useState("")
    const [SaveAfc, setSaveAfc] = useState([])


    const SaveFind = () => {

        let sf = {
            db: Sdb.dbname,
            tb: Sdb.tbname,
            f: Cols.filter(e => e.check === true)
        }
        setFindClip(sf)
    }


    const updateColsValues = (s) => {

        // s nin ivallerini temizle
        let ss = s.dbsec.f.map(item => ({ ...item,  ival: "" }))
        //cols taki değerleri ss ile eşitle
        const updatedFirstArray = Cols.map(item1 => {
            const matchingItem = ss.find(item2 => item1.value === item2.value);
            if (matchingItem) {
                return { ...item1, check: matchingItem.check,ival:"" };
            } else {
                return { ...item1, check: false,ival:"" }; 
            }
        });
        setCols(updatedFirstArray)
        let sf = {
            db: s.dbsec.db,
            tb: s.dbsec.tb,
            f: ss.filter(e => e.check === true)
        }
        setFindClip(sf)
    };
    const ChatList = ({ data }) => (
        <VStack spacing={4} align="stretch">
            <Heading size="md">Arama kalıpları</Heading>
            {data && data.map((d, i) => {
                return (
                    <React.Fragment key={i}>
                        <Box onClick={()=>{
                                updateColsValues(d)
                             
                        }}  position={"relative"} userSelect={"none"} transition={"0.3s linear"} cursor={"pointer"} _hover={{ bgColor: "rgba(255,255,255,0.1)" }} p={4} bg="rgba(255,255,255,0.2)" borderRadius="md">
                            {d.afcname}
                            <Box  sx={{ position: "absolute", top: -3, right: 0 }}>
                            <Badge  colorScheme='green'> {d.dbsec.db} </Badge>
                            <Badge ml={2} colorScheme='purple'> {d.dbsec.tb} </Badge>
                            </Box>
                        </Box>
                            <Tooltip label={"Sil"} fontSize='md'>
                                <IconButton h={4} fontSize='10px'  isRound={true} icon={<DeleteIcon />} onClick={() => {delFinders(d.id)}} />
                            </Tooltip>
                    </React.Fragment>
                )
            })}
        </VStack>
    );



    const AddAfc = () => {
        if (Afcname === "") {
            alert("Boş Alanı Doldurun")
        } else {
          
            let sfcs = {
                afcname: Afcname,
                dbsec: JSON.stringify(FindClip)
            }
            console.log(sfcs)
            addFinders(sfcs)
            // setSaveAfc([...SaveAfc,sfcs])
            // console.log(sfcs)
        }
    }

    const GetCols = async () => {
        console.log(Sdb)
        if (Sdb.tbname ==="") {
            alert("Lütfen bir tablo adı seçin")
        } else {
            setDsp("flex")
            let r = await FIND("getcolumns", Sdb, "")
            let cols = []
            r.data.forEach(e => {
                cols.push({ value: e, check: false, ival: "" })
            });
            setCols(cols)
            setDsp("none")
            
        }

    }

    const GetTable=async(dbname)=>{
        setDsp("flex")
        let r = await FIND("gettables", {dbname: dbname}, "")
        setDbs(prevState => ({ ...prevState, tbname:  r.data  }));
        setDsp("none")
    }


    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        setCols(prevItems =>
            prevItems.map(item =>
                item.value === value ? { ...item, check: event.target.checked } : item
            )
        )
    };

    const DBSelect = () => {


        return (
            <>
            <Loading display={dsp} />

                <Text fontSize='sm'>Veri Tabanı Seçin</Text>
                <Select onChange={e => {
                    setSDb({  dbname: e.target.value,tbname:"" });
                    setDbs({ ...dbs, tbname:[]})
                    setCols()
                    GetTable(e.target.value)

            }} flex={1} placeholder={"Seçim Yapın"}
            value={Sdb.dbname} >
                    {dbs.dbname && dbs.dbname.map((d, i) => {
                        return (
                            <React.Fragment key={i}>
                                {<option value={d}>{d}</option>}
                            </React.Fragment>
                        )
                    })}

                </Select>
               

              { dbs.tbname && dbs.tbname.length>0 &&
              <>

               <Text marginTop={5} fontSize='sm'>Tablo Seçin</Text>
              <Select onChange={e => setSDb({ ...Sdb, tbname: e.target.value })} placeholder='Seçim Yapın'  value={Sdb.tbname} flex={1} >
                    {dbs.tbname && dbs.tbname.map((d, i) => {
                        return (
                            <React.Fragment key={i}>
                                {<option value={d}>{d}</option>}
                            </React.Fragment>
                        )
                    })}

                </Select>
                </>
                }
             {Sdb.tbname &&   <Button colorScheme='orange' w={"100%"} mt={10} mr={3} onClick={GetCols}>
                    Başlıkları Getir
                </Button>}

                <Box overflow={"auto"} maxH={200} mt={10}>
                    {Cols && Cols.map((d, i) => {
                        return (
                            <React.Fragment key={i}>
                                {d.value !== "id" && <Checkbox isChecked={Cols[i]?.check} onChange={handleCheckboxChange} m={2} size='lg' colorScheme='orange' value={d.value} >{d.value}</Checkbox>}
                            </React.Fragment>
                        )
                    })}

                </Box>

            </>
        )


    }

const getdatabases =async()=>{
    setDsp("flex")
    let r = await FIND("getdatabases", {}, "")
    setDbs(prevState => ({ ...prevState, dbname:  r.data  }));
    setDsp("none")
    
}

const getFinders =async()=>{
    
    setDsp("flex")
    let r = await FIND("getFinders", {}, "")
    setSaveAfc(r.data)
    setDsp("none")
}

const addFinders =async(d)=>{
    
    setDsp("flex")
    let r = await FIND("addFinder", d, "")
    getFinders()
    setDsp("none")
}

const delFinders =async(id)=>{
    setDsp("flex")
    let r = await FIND("delFinders", {id:id}, "")
    getFinders()
    setDsp("none")
}


useEffect(()=>{
    getdatabases()
    getFinders()
},[])



    return (
        
        <Flex width={"100%"} direction="column" height="100vh">
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
                    {!isLargerThanMd && (
                        <IconButton
                            icon={<HamburgerIcon />}
                            onClick={onOpen}
                            aria-label="Open Menu"
                            variant="ghost"
                            colorScheme="whiteAlpha"
                        />
                    )}
                    <Heading size="md">GPANEL ARAMA</Heading>
                </HStack>
             {dbs.dbname.length>0&&   <PModal icon={<SettingsIcon />} onSave={SaveFind} children={<DBSelect />} />}
            </Flex>

            <Flex flex="1" overflow="hidden">
                {isLargerThanMd ? (
                    <Box
                        flex="0 0 300px"
                        p={4}
                        overflowY="auto"
                        borderRight="1px solid #555"
                    >
                        <ChatList data={SaveAfc} />

                    </Box>
                ) : (
                    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader>Sohbet Başlıkları</DrawerHeader>
                            <DrawerBody>
                                <ChatList data={SaveAfc} />
                            </DrawerBody>
                            <DrawerFooter>
                                <Button variant="outline" mr={3} onClick={onClose}>
                                    Kapat
                                </Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                )}

                <Box flex="1" p={4} display={"flex"} flexDirection={"column"} alignItems={"center"} overflowY="auto">
                    {!FindClip && <Text fontSize="xl" mb={4}> Ayarlar kısmından inputları seçin ya da sol taraftan arama klıbı seçin </Text>}
                    {FindClip && <Stack direction='row'>
                        <Badge p={2} colorScheme='green'>{FindClip.db}</Badge>
                        <Badge p={2} colorScheme='purple'>{FindClip.tb} </Badge>
                    </Stack>}
                    {FindClip && FindClip.f.map((d, i) => {
                        return (
                            <React.Fragment key={i}>
                                {d.value !== "id" && d.check && <Inputs onChange={e => {
                                    const inputValue = e.target.value;
                                    const updatedFArray = FindClip.f.map(field =>
                                        field.value === d.value ? { ...field, ival: inputValue } : field
                                    );
                                    setFindClip({
                                        ...FindClip,
                                        f: updatedFArray
                                    });
                                }} value={FindClip.f[i].ival} plcaholder={d.value.toLowerCase() + " girin"} label={d.value} />}
                            </React.Fragment>
                        )
                    })}

                    {FindClip &&
                        <Stack w={300} mt={10} justifyContent={"space-between"} direction='row'>
                            <PModal tooltip="Araba Şablonu Olarak Kaydet" icon={<PlusSquareIcon />} onSave={AddAfc} children={<Inputs value={Afcname} onChange={(e) => setAfcname(e.target.value)} label={"Arama Kalıbı Adı"} w={"100%"} />} />
                            <PModal tooltip={"Arama Seçeneklerini Düzenle"} icon={<EditIcon />} onSave={SaveFind} children={<DBSelect />} />
                            <Tooltip label={"Ara"} fontSize='md'>
                                <IconButton isRound={true} icon={<Search2Icon />} onClick={() => {navigate("/hardresult", { state: { val:FindClip } })}} />
                            </Tooltip>




                        </Stack>}
                </Box>
            </Flex>
        </Flex>
    );
};

