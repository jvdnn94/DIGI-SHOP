// components/ImageWithFallback.tsx
import Image from 'next/image';

interface Props {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}

export default function ImageWithFallback({ 
  src, 
  alt, 
  className = "object-cover object-center", 
  fill,
  priority 
}: Props) {
  const fallback = "https://via.placeholder.com/800x600/f1f5f9/64748b?text=No+Image";

  return (
    <Image
      src={src || fallback}
      alt={alt}
      fill={fill}
      priority={priority}
      className={className}
      onError={(e) => {
        e.currentTarget.src = fallback;
      }}
    />
  );
}