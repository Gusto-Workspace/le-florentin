import { useState } from 'react';
import Image from 'next/image';

/** Photographies illustratives Pexels, fichiers locaux validés par scripts/download_photos.py. */
export default function Photo({ name, alt, className = '', priority = false, eager = false, ...props }) {
  const [missing, setMissing] = useState(false);
  return (
    <div className={`photo-frame ${missing ? 'photo-unavailable' : ''} ${className}`} {...props}>
      {!missing && <Image
        src={`/images/${name}.jpg`}
        alt={alt}
        fill
        sizes={priority ? '100vw' : '(max-width: 700px) 95vw, 60vw'}
        preload={priority}
        loading={priority ? undefined : eager ? 'eager' : 'lazy'}
        style={{ objectFit: 'cover' }}
        onError={() => setMissing(true)}
      />}
      {missing && <span className="photo-missing-caption" role="status">Photographie d’ambiance à télécharger<br/>Voir README.md</span>}
    </div>
  );
}
