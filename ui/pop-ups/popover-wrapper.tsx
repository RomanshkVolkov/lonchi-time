import {
  Popover,
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
} from '@heroui/react';

type Props = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  popoverProps: Omit<PopoverProps, 'children'>;
};
export default function PopoveprWrpapper({
  children,
  trigger,
  popoverProps,
}: Props) {
  return (
    <Popover {...popoverProps} style={{ zIndex: 20 }}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className="p-1">{children}</PopoverContent>
    </Popover>
  );
}
