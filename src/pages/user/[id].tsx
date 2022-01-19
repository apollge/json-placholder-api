import { EmailIcon, ExternalLinkIcon, PhoneIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Heading,
  Link,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import MainNav from 'components/MainNav';
import NextError from 'next/error';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import InlineSVG from 'svg-inline-react';
import { trpc } from 'utils/trpc';

const UserViewPage: NextPageWithLayout = () => {
  const userId = useRouter().query.id;
  const userQuery = trpc.useQuery(['user.byId', { id: Number(userId) }]);

  if (userQuery.error) {
    return (
      <NextError
        title={userQuery.error.message}
        statusCode={userQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (userQuery.status !== 'success') {
    return <>Loading...</>;
  }

  const { data: user } = userQuery;

  const { data: userAvatar } = trpc.useQuery([
    'user.avatarByName',
    { name: user.name },
  ]);

  return (
    <>
      <MainNav />

      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={16}
        >
          <Box alt={'avatar'} w={'100%'}>
            <InlineSVG src={userAvatar} />
          </Box>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              >
                {user.name}
              </Heading>
              <Text color={'gray.500'}>
                @{user.username.toLocaleLowerCase()}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={<StackDivider borderColor="gray.200" />}
            >
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

              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color="yellow.500"
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  Address
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>Street</ListItem>
                    <ListItem>Suite</ListItem>
                    <ListItem>City</ListItem>
                    <ListItem>Zipcode</ListItem>
                  </List>
                  <List spacing={2}>
                    <ListItem>{user.address.street}</ListItem>
                    <ListItem>{user.address.suite}</ListItem>
                    <ListItem>{user.address.city}</ListItem>
                    <ListItem>{user.address.zipcode}</ListItem>
                  </List>
                </SimpleGrid>
              </Box>

              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color="yellow.500"
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  Company
                </Text>

                <List spacing={2}>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Name:
                    </Text>{' '}
                    {user.company.name}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Catchphrase:
                    </Text>{' '}
                    {user.company.catchPhrase}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      BS:
                    </Text>{' '}
                    {user.company.bs}
                  </ListItem>
                </List>
              </Box>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default UserViewPage;
