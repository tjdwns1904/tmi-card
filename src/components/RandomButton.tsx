import { Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RandomButtonProps {
  onNewQuestion: () => void;
  disabled?: boolean;
}

export function RandomButton({ onNewQuestion, disabled }: RandomButtonProps) {
  return (
    <Button
      onClick={onNewQuestion}
      disabled={disabled}
      className="w-full bg-primary hover:bg-primary-hover text-primary-foreground button-shadow transition-all duration-200 py-6 text-lg font-medium rounded-2xl"
    >
      <Shuffle className="w-5 h-5 mr-2" />
      랜덤 TMI 질문 받기
    </Button>
  );
}
