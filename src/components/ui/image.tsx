import { forwardRef, type ImgHTMLAttributes, useEffect, useState } from 'react';
import './image.css';

const FALLBACK_IMAGE_URL = 'https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png';
const STATIC_MEDIA_URL = 'https://static.wixstatic.com/media/';

export type FittingType = 'fit' | 'fill';

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fittingType?: FittingType;
  originWidth?: number;
  originHeight?: number;
  focalPointX?: number;
  focalPointY?: number;
};

const resolveImageUrl = (url?: string): string => {
  if (!url) return FALLBACK_IMAGE_URL;

  // Handle wix:image://v1/${uri}/${filename}#originWidth=${width}&originHeight=${height}
  const wixImagePrefix = 'wix:image://v1/';
  if (url.startsWith(wixImagePrefix)) {
    const uri = url.replace(wixImagePrefix, '').split('#')[0].split('/')[0];
    return uri ? `${STATIC_MEDIA_URL}${uri}` : FALLBACK_IMAGE_URL;
  }

  // If it's already an http/https URL or relative path
  return url;
};

export const Image = forwardRef<HTMLImageElement, ImageProps>(({ src, alt = '', className = '', ...props }, ref) => {
  const [imgSrc, setImgSrc] = useState<string>(() => resolveImageUrl(typeof src === 'string' ? src : undefined));

  useEffect(() => {
    if (typeof src === 'string') {
      setImgSrc(resolveImageUrl(src));
    }
  }, [src]);

  return (
    <img
      ref={ref}
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (imgSrc !== FALLBACK_IMAGE_URL) {
          setImgSrc(FALLBACK_IMAGE_URL);
        }
      }}
      loading={props.loading || 'lazy'}
      {...props}
    />
  );
});

Image.displayName = 'Image';
export default Image;
