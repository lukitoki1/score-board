import React from 'react';
import { Center, Spinner } from '@chakra-ui/react';

export const Loading = () => (
  <Center height="100vh">
    <Spinner size="xl" />
  </Center>
);