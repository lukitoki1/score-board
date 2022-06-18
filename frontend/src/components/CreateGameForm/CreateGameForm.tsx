import { FC } from "react";
import { Form, useFormikContext } from "formik";
import {
  CreateGameFormFields,
  CreateGameFormValues,
  NAME_MAX_LENGTH
} from "./createGameFormValues";
import { Box, Button, HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { BiPlus } from "react-icons/bi";
import { FormField } from "../FormField/FormField";

export const CreateGameForm: FC = () => {
  const { errors, isSubmitting } = useFormikContext<CreateGameFormValues>();
  const { t } = useTranslation()

  const translateError = (error?: string) => error
    ? t(error, { maxCount: NAME_MAX_LENGTH })
    : undefined

  return (
    <Form>
      <Box
        width="full"
        borderRadius="8px"
        borderColor="gray.300"
        borderWidth="1px"
        padding="4"
        marginBottom="8"
      >
        <HStack spacing="2">
          <FormField
            name={CreateGameFormFields.HOME_NAME}
            error={translateError(errors[CreateGameFormFields.HOME_NAME])}
            isInvalid={!!errors[CreateGameFormFields.HOME_NAME]}
            label={t('createGameForm.homeName')}
            type="text"
          />
          <FormField
            name={CreateGameFormFields.AWAY_NAME}
            error={translateError(errors[CreateGameFormFields.AWAY_NAME])}
            isInvalid={!!errors[CreateGameFormFields.AWAY_NAME]}
            label={t('createGameForm.awayName')}
            type="text"
          />
          <Box>
            <Button type="submit" isLoading={isSubmitting} isDisabled={isSubmitting}
              rightIcon={<BiPlus/>} mb="2">
              {t('common.add')}
            </Button>
          </Box>
        </HStack>
      </Box>
    </Form>
  );
}