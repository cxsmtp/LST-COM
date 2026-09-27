
interface CardProps {
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', clickable = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-lg border border-border-light shadow-sm p-6
        ${clickable ? 'cursor-pointer hover:shadow-md hover:border-accent/30 transition-all' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
