import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    textStyles: {
      modalHeading: {
        fontSize: 'lg',
        fontWeight: 'semibold',
        lineHeight: '120%',
        letterSpacing: '-1%',
      },
    },
  },
);