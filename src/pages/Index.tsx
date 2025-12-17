import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TaroCertificate from '@/components/TaroCertificate';
import Icon from '@/components/ui/icon';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Index = () => {
  const [fullName, setFullName] = useState('');
  const [questionsCount, setQuestionsCount] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    if (fullName.trim() && questionsCount) {
      setShowCertificate(true);
    }
  };

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      backgroundColor: null,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [800, 600],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, 800, 600);
    pdf.save(`certificate-${fullName.replace(/\s+/g, '-')}.pdf`);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Sparkles" size={32} className="text-accent" />
            <h1 className="font-cormorant text-5xl font-bold text-foreground">
              Генератор сертификатов таро
            </h1>
            <Icon name="Sparkles" size={32} className="text-accent" />
          </div>
          <p className="text-muted-foreground text-lg">
            Создайте мистический сертификат для раскладов таро
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Card className="bg-card border-border animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-cormorant text-2xl">
                <Icon name="FileText" size={24} className="text-accent" />
                Данные сертификата
              </CardTitle>
              <CardDescription>
                Заполните информацию для создания персонализированного сертификата
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-foreground font-medium">
                  ФИО получателя
                </Label>
                <Input
                  id="fullName"
                  placeholder="Введите полное имя"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="questionsCount" className="text-foreground font-medium">
                  Количество вопросов
                </Label>
                <Input
                  id="questionsCount"
                  type="number"
                  min="1"
                  placeholder="Введите число"
                  value={questionsCount}
                  onChange={(e) => setQuestionsCount(e.target.value)}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!fullName.trim() || !questionsCount}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                size="lg"
              >
                <Icon name="Wand2" size={20} className="mr-2" />
                Сгенерировать сертификат
              </Button>

              {showCertificate && (
                <Button
                  onClick={handleDownloadPDF}
                  variant="outline"
                  className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  size="lg"
                >
                  <Icon name="Download" size={20} className="mr-2" />
                  Скачать PDF
                </Button>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            {showCertificate ? (
              <div className="animate-scale-in">
                <div className="mb-4 text-center">
                  <p className="text-sm text-muted-foreground">Предпросмотр сертификата</p>
                </div>
                <div className="flex justify-center overflow-x-auto">
                  <div className="inline-block shadow-2xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                    <TaroCertificate
                      ref={certificateRef}
                      fullName={fullName}
                      questionsCount={parseInt(questionsCount)}
                      date={new Date().toLocaleDateString('ru-RU')}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <Card className="bg-card/50 border-dashed border-2 border-border h-[400px] flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <Icon name="FileQuestion" size={64} className="text-muted-foreground mx-auto opacity-50" />
                  <p className="text-muted-foreground text-lg">
                    Заполните форму, чтобы увидеть сертификат
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Star" size={16} className="text-accent" />
            <span>Создано с мистической энергией</span>
            <Icon name="Star" size={16} className="text-accent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
