import { useState } from 'react';
import { Download, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';

interface SaveShareButtonProps {
  cardRef: React.RefObject<HTMLDivElement>;
  disabled?: boolean;
}

export function SaveShareButton({ cardRef, disabled }: SaveShareButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const exportToPNG = async () => {
    if (!cardRef.current) return;

    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        width: 1080,
        height: 1920,
        backgroundColor: null,
        useCORS: true,
        allowTaint: true
      });

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), 'image/png', 1);
      });

      const file = new File([blob], 'tmi-card.png', { type: 'image/png' });

      // Try native sharing first
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            title: 'My TMI Card',
            text: 'Check out my TMI card!',
            files: [file]
          });
          toast({
            title: "Shared successfully!",
            description: "Your TMI card has been shared."
          });
          return;
        } catch (shareError) {
          if ((shareError as Error).name !== 'AbortError') {
            console.warn('Share failed, falling back to download:', shareError);
          } else {
            setIsExporting(false);
            return; // User cancelled sharing
          }
        }
      }

      // Fallback to download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'tmi-card.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Download started!",
        description: "Your TMI card is being downloaded."
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export failed",
        description: "Sorry, something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const hasNativeShare = navigator.share && navigator.canShare;

  return (
    <Button
      onClick={exportToPNG}
      disabled={disabled || isExporting}
      className="w-full bg-secondary hover:bg-secondary-hover text-secondary-foreground py-6 text-lg font-medium rounded-2xl transition-all duration-200"
    >
      {hasNativeShare ? (
        <Share className="w-5 h-5 mr-2" />
      ) : (
        <Download className="w-5 h-5 mr-2" />
      )}
      {isExporting
        ? 'Exporting...'
        : hasNativeShare
        ? 'Share Card'
        : 'Download PNG'
      }
    </Button>
  );
}