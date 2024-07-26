import React from 'react'
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter, IconButton,Tooltip
} from '@chakra-ui/react'

export function PModal({ children,onSave,icon,tooltip,title="Arama Seçenekleri" }) {
  const { isOpen, onOpen, onClose } = useDisclosure()


  const handleClick = () => {
    onClose();
    if (onSave) {
      onSave();
    }
};

  return (
    <>
    <Tooltip label={tooltip} fontSize='md'>
      <IconButton   isRound={true} icon={icon} onClick={onOpen}/>
    </Tooltip>

      <Modal  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              İptal
            </Button>
            <Button onClick={handleClick} variant='ghost'>Kaydet</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

