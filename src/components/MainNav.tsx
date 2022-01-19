import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Logo from 'icons/Logo';
import React from 'react';
import NextLink from 'next/link';

const MainNav = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={useColorModeValue('gray.300', 'gray.600')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box cursor="pointer">
          <NextLink href="/">
            <Logo />
          </NextLink>
        </Box>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MainNav;
