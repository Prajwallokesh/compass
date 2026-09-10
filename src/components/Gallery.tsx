import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { X, Maximize2 } from 'lucide-react';
import galleryPhotos from '../data/gallery.json';

interface GalleryPhoto {
  id: string;
  name: string;
  image: string; // URL or static asset path
  tag?: string;
}

export const Gallery: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>();
  const photos = galleryPhotos as GalleryPhoto[];
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  // Clean up legacy localStorage keys to ensure data is always loaded from bundled code
  useEffect(() => {
    try {
      localStorage.removeItem('compass_gallery_photos_v1');
      localStorage.removeItem('compass_gallery_photos');
    } catch {
      // ignore
    }
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="reveal-init relative py-10 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-transparent select-none"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase">
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              GALLERY
            </span>
          </h2>
        </div>

        {/* 2-Images Grid - Pure Photo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {photos.map((item) => (
            <div
              key={item.id}
              onClick={() => item.image && setSelectedPhoto(item)}
              className="group relative p-3 sm:p-4 rounded-3xl bg-gradient-to-b from-[#080E1E]/95 via-[#060A16]/90 to-[#040711]/95 border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_50px_rgba(0,242,254,0.15)] hover:-translate-y-1.5 cursor-pointer overflow-hidden"
            >
              {/* Subtle top glowing accent line */}
              <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Ambient Aura */}
              <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />

              {/* Image Frame */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#060B18] border border-white/[0.08] group-hover:border-cyan-500/30 transition-all duration-300 flex items-center justify-center shadow-inner">
                <img
                  src={item.image}
                  alt="COMPASS Gallery"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Corner Maximize Icon indicator on hover */}
                <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/70 backdrop-blur-xs border border-white/10 text-slate-300 group-hover:text-cyan-300 group-hover:border-cyan-400/40 transition-all opacity-0 group-hover:opacity-100">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-2xl bg-[#080E1E] border border-cyan-500/30 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.95)]"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-[#04060A]/80 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative max-h-[85vh] w-full flex items-center justify-center bg-[#050811] p-3 sm:p-4">
              <img
                src={selectedPhoto.image}
                alt="COMPASS Gallery"
                className="max-h-[80vh] w-auto object-contain rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
