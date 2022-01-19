import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import MainNav from 'components/MainNav';
import UserCard from 'components/UserCard';
import Link from 'next/link';
import { useEffect } from 'react';
import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';

const IndexPage: NextPageWithLayout = () => {
  const utils = trpc.useContext();
  const usersQuery = trpc.useQuery(['user.all']);

  // prefetch all posts for instant navigation
  useEffect(() => {
    for (const { id } of usersQuery.data ?? []) {
      utils.prefetchQuery(['user.byId', { id }]);
    }
  }, [usersQuery.data, utils]);

  return (
    <>
      <MainNav />
      <Box bg={useColorModeValue('gray.100', 'gray.700')}>
        <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
          <Stack spacing={0} align={'center'}>
            <Heading>Users</Heading>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse.
            </Text>
          </Stack>
          <SimpleGrid
            gridTemplateColumns="repeat(auto-fit, minmax(270px, 1fr))"
            spacing={{ base: 10, md: 4, lg: 10 }}
          >
            {usersQuery.data?.map((user) => (
              <UserCard user={user} key={user.id} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};

export default IndexPage;
