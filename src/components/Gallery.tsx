import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Camera, X, Maximize2 } from 'lucide-react';

interface GalleryPhoto {
  id: string;
  name: string;
  image: string; // base64 or URL
  tag?: string;
}

const DEFAULT_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g1',
    name: 'HackSprint 1.0 — 24H Campus Hackathon',
    image: '',
    tag: 'Hackathon',
  },
  {
    id: 'g2',
    name: 'HackSprint 2.0 — Software Engineering Sprint',
    image: '',
    tag: 'Hackathon',
  },
  {
    id: 'g3',
    name: 'Sadhana — Hands-on Tech Session & Masterclass',
    image: '',
    tag: 'Tech Session',
  },
  {
    id: 'g4',
    name: 'Code4Change — Social Good Developer Sprint',
    image: '',
    tag: 'Community',
  },
  {
    id: 'g5',
    name: 'Tech Quiz Tournament Finals',
    image: '',
    tag: 'Competition',
  },
  {
    id: 'g6',
    name: 'Industry Expert Talks & Career Mentorship',
    image: '',
    tag: 'Mentorship',
  },
];

const STORAGE_KEY = 'compass_gallery_photos_v1';

export const Gallery: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>();
  const [photos] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_PHOTOS;
  });

  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    // Expose for developer inspection or export if needed
    (window as unknown as { __compassGallery: GalleryPhoto[] }).__compassGallery = photos;
  }, [photos]);

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

        {/* 2-Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {photos.map((item) => (
            <div
              key={item.id}
              onClick={() => item.image && setSelectedPhoto(item)}
              className={`group relative p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#080E1E]/95 via-[#060A16]/90 to-[#040711]/95 border border-white/[0.08] transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col justify-between ${item.image
                ? 'hover:border-cyan-500/40 hover:shadow-[0_16px_50px_rgba(0,242,254,0.12)] hover:-translate-y-1 cursor-pointer'
                : 'hover:border-white/20'
                }`}
            >
              {/* Subtle top glowing accent line */}
              <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Ambient Aura */}
              <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />

              <div>
                {/* Image Frame */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-[#060B18] border border-white/[0.08] group-hover:border-cyan-500/30 transition-all duration-300 flex items-center justify-center shadow-inner">
                  {item.image ? (
                    <>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Corner Maximize Icon indicator on hover */}
                      <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/70 backdrop-blur-xs border border-white/10 text-slate-300 group-hover:text-cyan-300 group-hover:border-cyan-400/40 transition-all opacity-0 group-hover:opacity-100">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-t from-[#040711] via-[#081024] to-[#0c1630] flex flex-col items-center justify-center p-6 text-slate-400">
                      <div className="w-14 h-14 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 shadow-[0_0_15px_rgba(0,242,254,0.15)] group-hover:scale-110 transition-transform duration-300">
                        <Camera className="w-6 h-6 text-cyan-400" />
                      </div>
                      <span className="text-xs font-mono text-cyan-300/90 tracking-wider uppercase font-semibold">
                        COMPASS MOMENTS
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 mt-1">
                        GECH • CS&amp;E
                      </span>
                    </div>
                  )}
                </div>

                {/* Event Name & Tag */}
                <div className="flex items-start justify-between gap-3 pt-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-200 transition-colors tracking-tight">
                    {item.name}
                  </h3>
                  {item.tag && (
                    <span className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                      {item.tag}
                    </span>
                  )}
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

            <div className="relative max-h-[75vh] w-full flex items-center justify-center bg-[#050811]">
              {selectedPhoto.image ? (
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.name}
                  className="max-h-[75vh] w-auto object-contain"
                />
              ) : (
                <div className="h-80 w-full flex flex-col items-center justify-center text-slate-500">
                  <Camera className="w-16 h-16 text-cyan-400/30 mb-2" />
                  <span className="text-xs font-mono">No image available</span>
                </div>
              )}
            </div>

            <div className="p-4 sm:p-5 bg-[#060913] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <h3 className="text-lg font-bold text-white">
                {selectedPhoto.name}
              </h3>
              {selectedPhoto.tag && (
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  {selectedPhoto.tag}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
