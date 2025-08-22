import { useState, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { RandomButton } from '@/components/RandomButton';
import { ThemePicker, Theme } from '@/components/ThemePicker';
import { CardPreview } from '@/components/CardPreview';
import { SaveShareButton } from '@/components/SaveShareButton';
import { QUESTIONS, Question } from '@/data/questions';

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [previousQuestionId, setPreviousQuestionId] = useState<number | null>(null);
  const [answer, setAnswer] = useState('');
  const [theme, setTheme] = useState<Theme>('minimal');
  const cardRef = useRef<HTMLDivElement>(null);

  const getRandomQuestion = () => {
    const availableQuestions = QUESTIONS.filter((q) => q.id !== previousQuestionId);
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const newQuestion = availableQuestions[randomIndex];

    setCurrentQuestion(newQuestion);
    setPreviousQuestionId(newQuestion.id);
    setAnswer(''); // Clear previous answer
  };

  const handleAnswerChange = (value: string) => {
    if (value.length <= 200) {
      setAnswer(value);
    }
  };

  const isExportDisabled = !currentQuestion || !answer.trim();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🃏</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">랜덤 TMI 카드</h1>
          <p className="text-muted-foreground">TMI 카드를 생성하고 답변을 공유해보세요!</p>
        </div>

        {/* Main Controls */}
        <div className="space-y-6">
          {/* Random Question Button */}
          <RandomButton onNewQuestion={getRandomQuestion} />

          {/* Current Question Display */}
          {currentQuestion && (
            <div className="bg-muted rounded-2xl p-6">
              <h2 className="font-semibold text-foreground mb-2">질문:</h2>
              <p className="text-foreground leading-relaxed">{currentQuestion.text}</p>
            </div>
          )}

          {/* Answer Input */}
          {currentQuestion && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">답변:</label>
                <span className="text-sm text-muted-foreground">{answer.length}/200</span>
              </div>
              <Textarea
                value={answer}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="답변을 작성해주세요..."
                className="min-h-[120px] resize-none rounded-xl border-border bg-input"
              />
            </div>
          )}

          {/* Theme Picker */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">카드 테마:</label>
            <ThemePicker theme={theme} onThemeChange={setTheme} />
          </div>
        </div>

        {/* Card Preview */}
        {currentQuestion && (
          <div className="mt-8">
            <CardPreview
              question={currentQuestion.text}
              answer={answer}
              theme={theme}
              cardRef={cardRef}
            />
          </div>
        )}

        {/* Export Button */}
        {currentQuestion && (
          <div className="mt-6">
            <SaveShareButton cardRef={cardRef} disabled={isExportDisabled} />
          </div>
        )}

        {/* Instructions */}
        {!currentQuestion && (
          <div className="mt-8 text-center text-muted-foreground text-sm">
            <p>"랜덤 TMI 질문 받기" 버튼을 눌러 TMI 카드를 생성해주세요!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
