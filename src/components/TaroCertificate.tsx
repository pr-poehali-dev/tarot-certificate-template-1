import { forwardRef } from 'react';
import Icon from '@/components/ui/icon';

interface TaroCertificateProps {
  questionsCount: number;
  certificateCode: string;
  date: string;
}

const TaroCertificate = forwardRef<HTMLDivElement, TaroCertificateProps>(
  ({ questionsCount, certificateCode, date }, ref) => {
    return (
      <div 
        ref={ref}
        className="relative w-[800px] h-[600px] bg-gradient-to-br from-[#1a1033] via-[#2d1b4e] to-[#1a1033] overflow-hidden font-montserrat"
      >
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full animate-shimmer"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute top-10 left-1/2 -translate-x-1/2">
          <svg width="80" height="80" viewBox="0 0 100 100" className="animate-float">
            <circle cx="50" cy="50" r="40" fill="none" stroke="url(#grad1)" strokeWidth="1"/>
            <circle cx="50" cy="50" r="30" fill="none" stroke="url(#grad1)" strokeWidth="0.5"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="url(#grad1)" strokeWidth="0.5"/>
            {[...Array(8)].map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={50 + 40 * Math.cos(angle)}
                  y2={50 + 40 * Math.sin(angle)}
                  stroke="url(#grad1)"
                  strokeWidth="0.5"
                />
              );
            })}
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#9b87f5', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute top-10 left-10">
          <svg width="60" height="60" viewBox="0 0 100 100">
            <path
              d="M50,10 L61.8,38.2 L93.3,43.3 L71.7,64.3 L76.9,95.8 L50,81.2 L23.1,95.8 L28.3,64.3 L6.7,43.3 L38.2,38.2 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1"
              opacity="0.4"
            />
          </svg>
        </div>

        <div className="absolute top-10 right-10">
          <svg width="60" height="60" viewBox="0 0 100 100">
            <path
              d="M50,10 L61.8,38.2 L93.3,43.3 L71.7,64.3 L76.9,95.8 L50,81.2 L23.1,95.8 L28.3,64.3 L6.7,43.3 L38.2,38.2 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1"
              opacity="0.4"
            />
          </svg>
        </div>

        <div className="absolute bottom-10 left-10 opacity-20">
          <Icon name="Moon" size={48} className="text-accent" />
        </div>

        <div className="absolute bottom-10 right-10 opacity-20">
          <Icon name="Sun" size={48} className="text-accent" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-16 text-center">
          <div className="mb-8">
            <h1 className="font-cormorant text-6xl font-bold text-accent mb-2 tracking-wide">
              ПОДАРОЧНЫЙ
            </h1>
            <h2 className="font-cormorant text-5xl font-bold text-foreground mb-3">
              СЕРТИФИКАТ
            </h2>
            <div className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent" />
          </div>

          <div className="mb-8">
            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4">
              Расклад на картах таро
            </p>
            <div className="bg-card/30 backdrop-blur-sm border border-accent/30 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-muted-foreground text-base mb-2">
                Номинал сертификата
              </p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="font-cormorant text-6xl font-bold text-accent">
                  {questionsCount || '0'}
                </span>
                <span className="text-2xl text-foreground">
                  {questionsCount === 1 ? 'вопрос' : questionsCount < 5 ? 'вопроса' : 'вопросов'}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Icon name="Hash" size={16} className="text-accent" />
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                Код сертификата
              </p>
            </div>
            <p className="font-mono text-lg font-bold text-accent tracking-widest">
              {certificateCode || 'XXXX-XXXX-XXXX'}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <Icon name="Sparkles" size={20} className="text-accent" />
            <p className="text-sm text-muted-foreground">
              Пусть звёзды укажут путь
            </p>
            <Icon name="Sparkles" size={20} className="text-accent" />
          </div>

          <div className="mt-auto pt-8">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Действителен с {date || new Date().toLocaleDateString('ru-RU')}
            </p>
          </div>
        </div>

        <div className="absolute inset-0 border-4 border-accent/20 pointer-events-none" />
        <div className="absolute inset-4 border border-accent/10 pointer-events-none" />
      </div>
    );
  }
);

TaroCertificate.displayName = 'TaroCertificate';

export default TaroCertificate;