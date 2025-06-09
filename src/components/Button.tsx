// components/Button.tsx (create this file first)
import Link from 'next/link';

interface ButtonProps {
  style: 'primary' | 'secondary';
  href: string;
  text: string;
}

export const Button = ({ style, href, text }: ButtonProps) => {
  const baseClasses = "inline-block px-6 py-3 rounded-lg font-medium transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-md text-center";
  
  const primaryClasses = "bg-green-700 hover:bg-green-700 text-white";
  const secondaryClasses = "bg-white text-green-600 hover:bg-green-50";

  return (
    <Link href={href} className={`${baseClasses} ${
      style === 'primary' ? primaryClasses : secondaryClasses
    }`}>
      {text}
    </Link>
  );
};