import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { Button, ButtonProps, Tooltip, TooltipProps } from '@heroui/react';

/**
 * ClipboardButton component
 * @param {string} txt - Text to copy to clipboard
 * @param {TooltipProps} tooltipProps - Props to tooltip heroui component
 * @param {ButtonProps} buttonProps  - Props to button heroui component
 * @returns React component
 */
export default function ClipboardButton({
  txt,
  tooltipProps,
  buttonProps,
}: {
  txt: string;
  tooltipProps?: Omit<TooltipProps, 'children'>;
  buttonProps?: Omit<ButtonProps, 'as' | 'href' | 'children' | 'onPress'>;
}) {
  const handleCopy = () => {
    navigator.clipboard.writeText(txt);
  };

  return (
    <Tooltip content="Copiar al portapapeles" {...tooltipProps}>
      <Button
        variant="light"
        isIconOnly
        className="cursor-pointer text-lg text-default-400 active:opacity-50"
        onPress={handleCopy}
        {...buttonProps}
      >
        <ClipboardDocumentIcon className="w-5" />
      </Button>
    </Tooltip>
  );
}
