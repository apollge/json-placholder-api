import { EmailIcon, ExternalLinkIcon, PhoneIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { UserProps } from 'server/routers/user';
import InlineSVG from 'svg-inline-react';
import { trpc } from 'utils/trpc';

interface UserCardPros {
  user: UserProps;
}

const UserCard: FC<UserCardPros> = ({ user }) => {
  const router = useRouter();

  const { data: userAvatar } = trpc.useQuery([
    'user.avatarByName',
    { name: user.name },
  ]);

  //   console.log('userAvatar', userAvatar);

  return (
    <Box
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
    >
      <Image
        h={'120px'}
        w={'full'}
        src={
          'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
        }
        objectFit={'cover'}
      />
      <Flex justify={'center'} mt={-12}>
        <Box
          width="90px"
          border="2px solid white"
          borderRadius="full"
          background="gray.300"
        >
          <InlineSVG src={userAvatar} />
        </Box>
      </Flex>

      <Box p={6}>
        <Stack spacing={0} align={'center'} mb={5}>
          <Heading
            fontSize={'2xl'}
            fontWeight={500}
            fontFamily={'body'}
            textAlign="center"
          >
            {user.name}
          </Heading>
          <Text color={'gray.500'}>@{user.username.toLocaleLowerCase()}</Text>
        </Stack>

        <Stack
          alignItems="flex-start"
          color={'gray.500'}
          direction={'column'}
          fontSize={'sm'}
          spacing={3}
        >
          <Link href={`mailto:${user.email}`}>
            <EmailIcon /> {user.email.toLocaleLowerCase()}
          </Link>
          <Link href={`tel:+${user.phone}`}>
            <PhoneIcon /> {user.phone}
          </Link>
          <Link href={user.website} isExternal>
            <ExternalLinkIcon /> {user.website}
          </Link>
        </Stack>

        <Button
          bg={'blue.400'}
          color={'white'}
          flex={1}
          fontSize={'sm'}
          mt={8}
          rounded={'full'}
          w={'full'}
          boxShadow={
            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
          }
          onClick={() => {
            router.push(`/user/${user.id}`);
          }}
          _hover={{
            bg: 'blue.500',
          }}
          _focus={{
            bg: 'blue.500',
          }}
        >
          View
        </Button>
      </Box>
    </Box>
  );
};

export default UserCard;
