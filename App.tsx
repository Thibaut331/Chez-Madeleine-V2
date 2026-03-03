/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Users, 
  Bed, 
  Bath, 
  Car, 
  Wifi, 
  Coffee, 
  Wind, 
  Calendar,
  Star,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  X,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Key,
  WashingMachine,
  AlertTriangle,
  Train,
  Heart
} from 'lucide-react';

const AMENITIES = [
  { icon: <Users className="w-5 h-5" />, label: "4 Voyageurs" },
  { icon: <Bed className="w-5 h-5" />, label: "2 Lits Queen Size (160x200)" },
  { icon: <Bath className="w-5 h-5" />, label: "Salle d'eau moderne" },
  { icon: <WashingMachine className="w-5 h-5" />, label: "Machine à laver" },
  { icon: <Car className="w-5 h-5" />, label: "Parking Gratuit (200 pl.)" },
  { icon: <Wifi className="w-5 h-5" />, label: "Wi-Fi Inclus" },
  { icon: <Coffee className="w-5 h-5" />, label: "Cuisine Équipée" },
  { icon: <Key className="w-5 h-5" />, label: "Arrivée Autonome" },
];

const PROXIMITY = [
  { name: "Eguisheim", time: "10 min", dist: "11 km" },
  { name: "Colmar", time: "18 min", dist: "16 km" },
  { name: "Mulhouse", time: "25 min", dist: "29 km" },
  { name: "Gare de Rouffach", time: "15 min à pied", dist: "1.2 km" },
];

const REVIEWS = [
  {
    name: "Mathilde",
    meta: "12 ans sur Airbnb",
    text: "Nous avons passé un très bon séjour dans ce logement bien rénové, très propre et confortable. C’est une bonne idée d’avoir choisi une décoration qui respecte le cadre ancien du bâtiment.",
    date: "Il y a 1 semaine"
  },
  {
    name: "Eurydice",
    meta: "7 ans sur Airbnb",
    text: "Nous avons passé un superbe séjour au gîte Chez Madeleine ! Le lieu est calme, très propre et décoré avec goût. Un vrai coup de cœur 💛",
    date: "Novembre 2025"
  },
  {
    name: "Serge",
    meta: "A récemment rejoint Airbnb",
    text: "Le gîte est impeccable, très propre, parfaitement équipé et décoré avec beaucoup de goût. On s’y sent immédiatement comme à la maison.",
    date: "Il y a 2 semaines"
  },
  {
    name: "Mathilde",
    meta: "10 ans sur Airbnb",
    text: "Excellent séjour chez Marie et Thibaut ! Le logement est conforme aux photos, très cosy, bien équipé et agréable. Gros gros + pour le parking gratuit juste à côté.",
    date: "Novembre 2025"
  }
];

const GALLERY = [
  { src: "https://res.cloudinary.com/dtm6swivg/image/upload/v1772564658/MG_27102025-01_sjq6h4.jpg", alt: "Extérieur maison" },
  { src: "https://res.cloudinary.com/dtm6swivg/image/upload/v1772564659/MG_27102025-02_y5xpro.jpg", alt: "Rue et église" },
  { src: "https://res.cloudinary.com/dtm6swivg/image/upload/v1772564659/MG_27102025-04_z9s0ip.jpg", alt: "Salle à manger" },
  { src: "https://res.cloudinary.com/dtm6swivg/image/upload/v1772564658/MG_27102025-05_rihh36.jpg", alt: "Table dressée" },
  { src: "https://res.cloudinary.com/dtm6swivg/image/upload/v1772564659/MG_27102025-06_n4vjre.jpg", alt: "Salon" },
  { src: "https://res.cloudinary.com/dtm6swivg/image/upload/v1772564659/MG_27102025-09_ycchin.jpg", alt: "TV salon" },
  { src: "https://res.cloudinary.com/dtm6swivg/image/upload/v1772564660/MG_27102025-13_xj8sll.jpg", alt: "Vue séjour" },
  { src: "https://res.cloudinary.com/dtm6swivg/image/upload/v1772564660/MG_27102025-14_oxbtf0.jpg", alt: "Cuisine" },
  { src: "https://res.cloudinary.com/dtm6swivg/image/upload/v1772564660/MG_27102025-17_ey4afk.jpg", alt: "Cuisine détail" },
  { src: "https://res.cloudinary.com/dtm6swivg/image/upload/v1772564660/MG_27102025-18_ntfarv.jpg", alt: "Chambre 1" },
  { src: "https://res.cloudinary.com/dtm6swivg/image/upload/v1772564660/MG_27102025-19_w2lcc8.jpg", alt: "Chambre 1 armoire" },
  { src: "https://res.cloudinary.com/dtm6swivg/image/upload/v1772564661/MG_27102025-22_ikbzsd.jpg", alt: "Chambre 2" },
  { src: "https://res.cloudinary.com/dtm6swivg/image/upload/v1772564661/MG_27102025-23_fwciaj.jpg", alt: "Chambre 2 vue" },
  { src: "https://res.cloudinary.com/dtm6swivg/image/upload/v1772564661/MG_27102025-25_gvsd75.jpg", alt: "Salle de bain" },
  { src: "https://res.cloudinary.com/dtm6swivg/image/upload/v1772564661/MG_27102025-27_duedbn.jpg", alt: "Salle de bain lavabo" },
  { src: "https://res.cloudinary.com/dtm6swivg/image/upload/v1772564662/MG_27102025-28_u7yt9b.jpg", alt: "Douche" },
];

export default function App() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % GALLERY.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + GALLERY.length) % GALLERY.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % GALLERY.length : null));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + GALLERY.length) % GALLERY.length : null));
  };
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#2D2926] font-serif selection:bg-[#5A5A40] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E5E1D8]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-11 h-11 flex items-center justify-center">
              <div className="absolute inset-0 border border-[#5A5A40]/20 rounded-full group-hover:scale-110 transition-transform duration-500" />
              <div className="w-9 h-9 bg-[#5A5A40] rounded-full flex items-center justify-center text-white font-serif italic text-xl shadow-lg shadow-[#5A5A40]/10">
                M
              </div>
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="font-serif text-xl tracking-[0.1em] uppercase text-[#2D2926] leading-none">Chez Madeleine</span>
              <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-[#5A5A40]/60 ml-0.5">Maison Historique</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-sans font-medium uppercase tracking-widest">
            <a href="#about" className="hover:text-[#5A5A40] transition-colors">Le Logement</a>
            <a href="#amenities" className="hover:text-[#5A5A40] transition-colors">Équipements</a>
            <a href="#proximity" className="hover:text-[#5A5A40] transition-colors">Alentours</a>
            <a 
              href="#booking" 
              className="bg-[#5A5A40] text-white px-6 py-2.5 rounded-full hover:bg-[#4A4A35] transition-all shadow-lg shadow-[#5A5A40]/20 flex items-center gap-2"
            >
              Réserver <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dtm6swivg/image/upload/v1772564658/MG_27102025-01_sjq6h4.jpg" 
            alt="Maison du 14ème siècle" 
            className="w-full h-full object-cover brightness-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#FDFCF8]" />
        </div>
        
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-sans font-bold uppercase tracking-widest mb-6">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> 
              Coup de cœur voyageurs (5.0)
            </div>
            <h1 className="text-6xl md:text-[120px] font-bold text-white mb-8 leading-[0.85] tracking-tighter">
              Chez Madeleine <br />
              <span className="italic font-light text-white/90">Charme & Histoire</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
              Découvrez un appartement d'exception niché dans l'une des plus anciennes maisons de Rouffach, datant du 14ème siècle.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="#booking" 
                className="w-full sm:w-auto bg-white text-[#2D2926] px-12 py-6 rounded-full font-serif text-xl hover:bg-[#FDFCF8] hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-4 group"
              >
                Réserver mon séjour 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white">
          <div className="w-px h-12 bg-white/50 mx-auto" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="text-sm font-sans font-bold uppercase tracking-widest text-[#5A5A40] border-b-2 border-[#5A5A40] pb-1">
                Le Logement
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
              L'alliance de l'ancien <br />
              <span className="italic font-light text-[#5A5A40]">et du confort moderne</span>
            </h2>
            <div className="space-y-4 text-lg text-[#5A5A40]/80 leading-relaxed max-w-xl">
              <p>
                Entièrement rénové, "Chez Madeleine" se situe au deuxième étage d'une demeure historique du 14ème siècle. 
                Le salon et la salle à manger, à la décoration soignée, conservent leurs poutres apparentes, 
                véritable signature du patrimoine alsacien.
              </p>
              <p>
                Posez vos valises : les draps et les serviettes sont fournis. Vous n'avez plus qu'à profiter 
                de vos deux chambres équipées de lits Queen Size (160x200cm).
              </p>
            </div>
            
            <div className="bg-[#5A5A40]/5 p-6 rounded-3xl border border-[#5A5A40]/10 flex gap-4 items-start">
              <AlertTriangle className="w-6 h-6 text-[#5A5A40] shrink-0 mt-1" />
              <p className="text-sm italic text-[#5A5A40]/70">
                À noter : l’appartement se situe au 2ᵉ étage et n’est pas adapté aux personnes à mobilité réduite (accès par escaliers uniquement).
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl rotate-2">
              <img 
                src="https://res.cloudinary.com/dtm6swivg/image/upload/v1772564659/MG_27102025-04_z9s0ip.jpg" 
                alt="Poutres apparentes" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 aspect-square rounded-[32px] overflow-hidden shadow-2xl -rotate-6 border-8 border-white hidden lg:block">
              <img 
                src="https://res.cloudinary.com/dtm6swivg/image/upload/v1772564660/MG_27102025-14_oxbtf0.jpg" 
                alt="Cuisine moderne" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section id="amenities" className="bg-[#5A5A40] py-24 px-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Services & Équipements</h2>
            <p className="text-white/70 max-w-xl mx-auto italic">
              Tout est prévu pour que vous vous sentiez comme chez vous dès votre arrivée.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {AMENITIES.map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="p-8 rounded-[32px] bg-white/5 border border-white/10 flex flex-col items-center text-center gap-4 group hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mb-2 group-hover:border-white/40 transition-colors">
                  {item.icon}
                </div>
                <span className="font-sans font-bold uppercase tracking-[0.2em] text-[10px] opacity-60 group-hover:opacity-100 transition-opacity">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proximity Section */}
      <section id="proximity" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-1 gap-6">
              {PROXIMITY.map((place, idx) => (
                <div key={idx} className="flex items-center justify-between p-8 rounded-[32px] bg-white border border-[#E5E1D8] shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full border border-[#5A5A40]/20 flex items-center justify-center text-[#5A5A40]">
                      {place.name.includes('Gare') ? <Train className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                    </div>
                    <span className="font-serif text-xl text-[#2D2926]">{place.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl text-[#5A5A40] leading-none">{place.time}</p>
                    <p className="text-[10px] text-[#5A5A40]/40 uppercase tracking-[0.2em] mt-2">{place.dist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-8 order-1 md:order-2">
            <span className="text-sm font-sans font-bold uppercase tracking-widest text-[#5A5A40]">Exploration</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Au cœur de la Route des Vins</h2>
            <p className="text-lg text-[#5A5A40]/80 leading-relaxed">
              "Chez Madeleine" est le point de départ idéal pour découvrir les ruelles pittoresques de Rouffach 
              et les charmes de la région alsacienne. Eguisheim, Colmar et Mulhouse sont à portée de main.
            </p>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-[#5A5A40]/5 border border-[#5A5A40]/10">
              <Car className="w-6 h-6 text-[#5A5A40]" />
              <div>
                <p className="font-bold">Parking Gratuit</p>
                <p className="text-sm text-[#5A5A40]/70">Un parking de 200 places se situe à quelques pas du logement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#F5F2ED] border-y border-[#E5E1D8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-sm font-sans font-bold uppercase tracking-widest text-[#5A5A40]">Avis Voyageurs</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ils ont adoré leur séjour</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {REVIEWS.map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[40px] shadow-sm border border-[#E5E1D8] flex flex-col items-center text-center"
              >
                <div className="flex text-[#5A5A40] mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="font-serif text-xl italic leading-relaxed mb-8 text-[#2D2926]">"{review.text}"</p>
                <div className="mt-auto w-full">
                  <div className="w-px h-8 bg-[#5A5A40]/20 mx-auto mb-6" />
                  <span className="font-serif text-lg text-[#5A5A40]">{review.name}</span>
                  <p className="text-[10px] opacity-40 uppercase tracking-[0.2em] mt-2">{review.meta}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="text-sm font-sans font-bold uppercase tracking-widest text-[#5A5A40]">Galerie</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Vivez l'expérience authentique</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GALLERY.map((img, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative overflow-hidden rounded-[32px] group cursor-pointer ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-sans font-bold uppercase tracking-widest text-xs">Agrandir</span>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImageIndex(null)}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            >
              <button 
                onClick={() => setSelectedImageIndex(null)}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
              >
                <X className="w-8 h-8" />
              </button>

              <button 
                onClick={prevImage}
                className="absolute left-4 md:left-10 text-white/70 hover:text-white transition-colors z-[110] bg-white/10 p-3 rounded-full backdrop-blur-md"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button 
                onClick={nextImage}
                className="absolute right-4 md:right-10 text-white/70 hover:text-white transition-colors z-[110] bg-white/10 p-3 rounded-full backdrop-blur-md"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              <motion.div
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
              >
                <img 
                  src={GALLERY[selectedImageIndex].src} 
                  alt={GALLERY[selectedImageIndex].alt} 
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="mt-6 text-center">
                  <p className="text-white text-lg font-medium">{GALLERY[selectedImageIndex].alt}</p>
                  <p className="text-white/40 text-sm mt-1 font-sans uppercase tracking-widest">
                    {selectedImageIndex + 1} / {GALLERY.length}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Booking CTA */}
      <section id="booking" className="py-24 px-6">
        <div className="max-w-6xl mx-auto bg-[#2D2926] rounded-[64px] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5A5A40] blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9]">Réservez votre séjour <br /> <span className="italic font-light text-white/80">Chez Madeleine</span></h2>
              <p className="text-white/60 max-w-2xl mx-auto text-xl font-light leading-relaxed">
                L'accès se fait en toute autonomie grâce à une boîte à clés sécurisée. 
                Choisissez votre plateforme préférée pour réserver votre expérience alsacienne.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4">
              <a 
                href="https://www.airbnb.fr/rooms/926753036019050970" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#FF385C] text-white px-12 py-6 rounded-2xl font-serif text-xl hover:scale-105 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-[#FF385C]/20"
              >
                Réserver sur Airbnb <ChevronRight className="w-5 h-5" />
              </a>
              <a 
                href="https://www.booking.com/hotel/fr/gite-chez-madeleine-en-plein-coeur-de-rouffach.fr.html?chal_t=1772561424222&force_referer=https%3A%2F%2Fwww.google.com%2F" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#003580] text-white px-12 py-6 rounded-2xl font-serif text-xl hover:scale-105 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-[#003580]/20"
              >
                Réserver sur Booking <ChevronRight className="w-5 h-5" />
              </a>
            </div>
            
            <div className="flex items-center justify-center gap-8 pt-8 opacity-50">
              <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" /> Arrivée Autonome
              </div>
              <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4" /> Draps Fournis
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FDFCF8] border-t border-[#E5E1D8] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity group cursor-pointer">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 border border-[#5A5A40]/30 rounded-full" />
              <div className="w-6 h-6 bg-[#5A5A40] rounded-full flex items-center justify-center text-white font-serif italic text-xs">
                M
              </div>
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="font-serif text-sm tracking-[0.1em] uppercase text-[#2D2926]">Chez Madeleine</span>
              <span className="text-[7px] font-sans uppercase tracking-[0.2em] text-[#5A5A40]/60">Rouffach</span>
            </div>
          </div>
          
          <div className="flex gap-8 text-xs font-sans font-bold uppercase tracking-widest text-[#5A5A40]/60">
            <a href="#" className="hover:text-[#5A5A40]">Mentions Légales</a>
            <a href="#" className="hover:text-[#5A5A40]">Confidentialité</a>
            <a href="#" className="hover:text-[#5A5A40]">Contact</a>
          </div>
          
          <p className="text-xs font-sans font-medium text-[#5A5A40]/40 uppercase tracking-widest">
            © 2026 Chez Madeleine Rouffach.
          </p>
        </div>
      </footer>
    </div>
  );
}
