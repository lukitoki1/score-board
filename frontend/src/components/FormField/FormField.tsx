import { FC, HTMLInputTypeAttribute } from "react";
import { Field, FieldProps } from "formik";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

export interface FormFieldProps {
  name: string;
  error?: string;
  isInvalid?: boolean;
  label: string;
  type?: HTMLInputTypeAttribute;
}

export const FormField: FC<FormFieldProps> = ({ name, error, isInvalid, label, type }) => {
  return (
    <Field name={name}>
      {(props: FieldProps<string>) => (
        <FormControl isInvalid={isInvalid} height="28">
          <FormLabel
            htmlFor={name}>
            {label}
          </FormLabel>
          <Input id={name} type={type} {...props.field} />
          <FormErrorMessage>
            {error}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}