import React from 'react';
import { LucideProps } from 'lucide-react';

// Minimal icon placeholders to satisfy local imports during static analysis.
export const MessageCircle = (props: LucideProps) => <svg {...props}><circle cx="12" cy="12" r="10" fill="currentColor" /></svg>;
export const Clock = (props: LucideProps) => <svg {...props}><circle cx="12" cy="12" r="10" fill="currentColor" /></svg>;
export const TrendingUp = (props: LucideProps) => <svg {...props}><path d="M4 12l4-4 4 4 6-6" stroke="currentColor" strokeWidth="2" fill="none" /></svg>;
export const CheckCircle = (props: LucideProps) => <svg {...props}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /></svg>;
export const Zap = (props: LucideProps) => <svg {...props}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" fill="currentColor"/></svg>;
export const ArrowRight = (props: LucideProps) => <svg {...props}><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none"/></svg>;
export const Star = (props: LucideProps) => <svg {...props}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor"/></svg>;
export const X = (props: LucideProps) => <svg {...props}><path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" fill="none"/></svg>;

export default {};
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

const Svg: React.FC<IconProps> = ({ children, className, ...props }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {children}
  </svg>
);

export const MessageCircle: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-1.9 5.4 8.5 8.5 0 0 1-6.6 3.1c-1.7 0-3.3-.5-4.6-1.4L3 21l1.9-3.8A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 1 1 21 11.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const Clock: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const TrendingUp: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M3 17l6-6 4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const CheckCircle: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
  </Svg>
);

export const Zap: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ArrowRight: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const Star: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M12 .587l3.668 7.431L23 9.753l-5.5 5.356L18.335 24 12 20.202 5.665 24 7.5 15.109 2 9.753l7.332-1.735L12 .587z" stroke="currentColor" strokeWidth="0.5" fill="currentColor" />
  </Svg>
);

export const X: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default Svg;
