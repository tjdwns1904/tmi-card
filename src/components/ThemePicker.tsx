import { Palette, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type Theme = 'minimal' | 'pastel';

interface ThemePickerProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function ThemePicker({ theme, onThemeChange }: ThemePickerProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant={theme === 'minimal' ? 'default' : 'secondary'}
        onClick={() => onThemeChange('minimal')}
        className="flex-1 py-3 rounded-xl transition-all duration-200"
      >
        <Minimize2 className="w-4 h-4 mr-2" />
        미니멀
      </Button>
      <Button
        variant={theme === 'pastel' ? 'default' : 'secondary'}
        onClick={() => onThemeChange('pastel')}
        className="flex-1 py-3 rounded-xl transition-all duration-200"
      >
        <Palette className="w-4 h-4 mr-2" />
        파스텔
      </Button>
    </div>
  );
}
