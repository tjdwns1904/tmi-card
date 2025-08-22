import { Theme } from './ThemePicker';

interface CardPreviewProps {
  question: string;
  answer: string;
  theme: Theme;
  cardRef: React.RefObject<HTMLDivElement>;
}

export function CardPreview({ question, answer, theme, cardRef }: CardPreviewProps) {
  const themeClass = theme === 'minimal' ? 'theme-minimal' : 'theme-pastel';

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-sm text-muted-foreground mb-2 text-center">
        카드 미리보기 (1080×1920)
      </div>

      {/* Container scaled to fit screen while maintaining aspect ratio */}
      <div
        className="relative w-full overflow-hidden rounded-3xl card-shadow"
        style={{ aspectRatio: '1080/1920' }}
      >
        <div
          id="preview"
          ref={cardRef}
          className={`w-full h-full p-12 flex flex-col justify-between ${themeClass}`}
        >
          {/* Question Section */}
          <div className="text-center">
            <div className="text-4xl font-bold mb-8">🃏</div>
            <h1 className="text-4xl font-bold leading-tight mb-12">랜덤 TMI</h1>
            <div className="w-32 h-1 bg-current opacity-30 mx-auto mb-16"></div>
          </div>

          {/* Question Text */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl leading-relaxed font-medium">
                {question || '버튼을 클릭하여 TMI 질문을 생성해주세요!'}
              </p>
            </div>
          </div>

          {/* Answer Section */}
          <div className="text-center">
            <div className="w-32 h-1 bg-current opacity-30 mx-auto mt-16"></div>
            <div className="min-h-[300px] flex items-center justify-center">
              <p className="text-2xl leading-relaxed opacity-80 italic">
                {answer || '답변이 여기 출력될 거예요...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
