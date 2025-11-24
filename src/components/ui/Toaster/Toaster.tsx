'use client';

import { Toaster as ShadCnToaster } from 'sonner';
import { ToasterProps as SonnerToasterProps } from 'sonner';

export type ToasterProps = Pick<
  SonnerToasterProps,
  | 'visibleToasts'
  | 'position'
  | 'offset'
  | 'mobileOffset'
  | 'swipeDirections'
  | 'toastOptions'
  | 'gap'
  | 'containerAriaLabel'
  | 'icons'
  | 'className'
  | 'richColors'
>;

export const Toaster = ({
  visibleToasts = 3,
  position = 'top-center',
  offset = 18,
  mobileOffset = 9,
  swipeDirections = ['bottom', 'left', 'top', 'right'],
  toastOptions = {
    duration: 7000,
  },
  gap = 9,
  containerAriaLabel,
  icons,
  className,
  richColors = true,
}: ToasterProps) => {
  const props: SonnerToasterProps = {
    visibleToasts,
    position,
    offset,
    mobileOffset,
    swipeDirections,
    toastOptions,
    gap,
    containerAriaLabel,
    icons,
    className,
    richColors,
  };

  return <ShadCnToaster {...props} />;
};
