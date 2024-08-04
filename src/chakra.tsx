import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'

const Chakra = ({ children }: { children: ReactNode }) => {
  return <ChakraProvider>{children}</ChakraProvider>
}

export default Chakra
