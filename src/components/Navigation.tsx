import { useState } from 'react';
import { Menu, X, Brain } from 'lucide-react';
import { Button } from './ui/button';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Início' },
    { id: 'about', label: 'Quem Somos' },
    { id: 'ecosystem', label: 'Ecossistema' },
    { id: 'solutions', label: 'Soluções' },
    { id: 'blog', label: 'Conteúdo' },
    { id: 'contact', label: 'Contato' },
  ];

  const highlightIA = (text: string) => {
    if (text.includes('.A.')) {
      const parts = text.split('.A.');
      return (
        <>
          {parts[0]}.
          <span className="text-primary glow-text font-black">A</span>.
        </>
      );
    }
    return text;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Brain className="w-10 h-10 text-primary animate-pulse" strokeWidth={1.5} />
            <span className="text-2xl font-black tracking-tight">
              EXTRAORDINÁR<span className="text-primary glow-text">I.A.</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`font-semibold transition-all hover:text-primary ${
                  activeSection === item.id ? 'text-primary' : 'text-white/70'
                }`}
              >
                {highlightIA(item.label)}
              </button>
            ))}
            <Button 
              onClick={() => onNavigate('experience')}
              className="bg-primary text-black hover:bg-primary/90 font-black glow-border"
            >
              Agende sua EXPERIENCI<span className="font-black">.A</span>.
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-white/10 mt-2 pt-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left py-3 font-semibold transition-all hover:text-primary ${
                  activeSection === item.id ? 'text-primary' : 'text-white/70'
                }`}
              >
                {highlightIA(item.label)}
              </button>
            ))}
            <Button 
              onClick={() => {
                onNavigate('experience');
                setIsMenuOpen(false);
              }}
              className="w-full mt-4 bg-primary text-black hover:bg-primary/90 font-black"
            >
              Agende sua EXPERIENCI<span className="font-black">.A</span>.
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
