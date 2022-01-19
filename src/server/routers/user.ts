import { TRPCError } from '@trpc/server';
import axios from 'axios';
import { createRouter } from 'server/createRouter';
import { z } from 'zod';

interface AddressProps {
  city: string;
  geo: {
    lat: string;
    lng: string;
  };
  street: string;
  suite: string;
  zipcode: string;
}

interface CompanyProps {
  bs: string;
  catchPhrase: string;
  name: string;
}

export interface UserProps {
  address: AddressProps;
  company: CompanyProps;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

export const userRouter = createRouter()
  // read
  .query('all', {
    async resolve() {
      const result = await axios.get(
        `https://jsonplaceholder.typicode.com/users`,
      );

      return result.data as UserProps[];
    },
  })
  .query('avatarByName', {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ input }) {
      const { name } = input;

      const response = await axios.get(
        `https://avatars.dicebear.com/v2/avataaars/${name}.svg?options[mood][]=happy`,
      );

      return response.data;
    },
  })
  .query('byId', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      const { id } = input;

      const user = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`,
      );

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No user with id '${id}'`,
        });
      }

      return user.data as UserProps;
    },
  });
