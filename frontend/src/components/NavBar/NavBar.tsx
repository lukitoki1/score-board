import { FC } from 'react';
import { Box, Container, HStack, Text } from '@chakra-ui/react';
import { BiTable } from "react-icons/bi";
import { useTranslation } from "react-i18next";

export const NavBar: FC = () => {
  const { t } = useTranslation()

  return (
    <Box
      paddingY="28px"
      boxShadow="0 0 80px rgba(24, 38, 107, 0.1)"
      position="fixed"
      top="0"
      width="full"
      backgroundColor="white"
      zIndex="sticky"
    >
      <Container maxW="container.xl">
        <HStack spacing="2">
          <BiTable size="24px"/>
          <Text fontSize="2xl" fontWeight="bold">
            {t('navBar.title')}
          </Text>
        </HStack>
      </Container>
    </Box>
  );
};
