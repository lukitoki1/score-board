import { createStandaloneToast, ToastPosition, useToast } from '@chakra-ui/react';
import { AlertStatus } from '@chakra-ui/alert';
import { ReactNode } from 'react';

export interface TriggerToastProps {
  title: string;
  description?: ReactNode;
  status: AlertStatus;
  isClosable?: boolean;
  isPersistent?: boolean;
  position?: ToastPosition;
}

export const useAppToast = (isStandalone?: boolean) => {
  const toast = isStandalone ? createStandaloneToast().toast : useToast();

  const triggerToast = ({
    title,
    description,
    status,
    isClosable = true,
    isPersistent,
    position
  }: TriggerToastProps) => {
    return toast({
      title,
      description,
      status,
      isClosable,
      duration: isPersistent ? null : undefined,
      position: position || 'bottom-right',
    });
  }

  return { triggerToast };
};
