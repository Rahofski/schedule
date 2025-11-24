import { Button } from '@/components/ui/shadcn/button';

interface ScheduleSaveButtonProps {
  handleSave?: () => void;
  isDisabled?: boolean;
}

export const ScheduleSaveButton = ({ handleSave, isDisabled }: ScheduleSaveButtonProps) => {
  return (
    <Button
      type='submit'
      onClick={handleSave}
      disabled={isDisabled}
      className={`${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      Сохранить
    </Button>
  );
};
