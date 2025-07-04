import React, { useState, useEffect, useRef } from 'react';

const RollToSeduceWebsite = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [downloadStates, setDownloadStates] = useState({
    windows: 'idle',
    android: 'idle'
  });
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const canvasRef = useRef(null);

  // Media gallery data
  const mediaGallery = [
    {
      id: 1,
      type: 'image',
      src: '/public/pic1.png',
      thumbnail: '/public/pic1.png',
      category: 'characters',
      nsfw: true
    },
    {
      id: 2,
      type: 'gif',
      src: '/public/gif1.mp4',
      thumbnail: '/public/gif1.mp4',
      category: 'animations',
      nsfw: true
    },
    {
      id: 3,
      type: 'image',
      src: '/public/pic2.png',
      thumbnail: '/public/pic2.png',
      category: 'characters',
      nsfw: true
    },
    {
      id: 4,
      type: 'image',
      src: '/public/pic3.png',
      thumbnail: '/public/pic3.pngGrungelda',
      category: 'characters',
      nsfw: true
    },
    {
      id: 5,
      type: 'gif',
      src: '/public/gif2.mp4',
      thumbnail: '/public/gif2.mp4',
      category: 'animations',
      nsfw: true
    },  
  ];

  // Filter categories
  const filterCategories = [
    { id: 'all', label: 'All Media', icon: '🎮' },
    { id: 'characters', label: 'Characters', icon: '👹' },
    { id: 'cg', label: 'CG Scenes', icon: '🎨' },
    { id: 'animations', label: 'Animations', icon: '✨' },
    { id: 'environments', label: 'Environments', icon: '🏰' },
    { id: 'gameplay', label: 'Gameplay', icon: '⚔️' },
    { id: 'interface', label: 'Interface', icon: '🎛️' }
  ];

  // Filter media based on category
  const filteredMedia = activeFilter === 'all' 
    ? mediaGallery 
    : mediaGallery.filter(item => item.category === activeFilter);

  // Character data matching the dark fantasy theme
  const characters = [
    {
      id: 'alina',
      name: 'Alina',
      title: 'Succubus Queen',
      description: 'Placeholder text',
      quote: 'Placeholder text',
      colors: ['#FF4757', '#C44569']
    },
    {
      id: 'grungelda',
      name: 'Grungelda',
      title: 'Troll',
      description: 'Placeholder text',
      quote: 'Placeholder text',
      colors: ['#9B59B6', '#8E44AD']
    },
    {
      id: 'luciana',
      name: 'Luciana',
      title: 'Human',
      description: 'Placeholder text',
      quote: 'Placeholder text',
      colors: ['#5F27CD', '#341F97']
    },
  ];

  // Download configurations
  const downloadConfigs = {
    windows: {
      url: 'https://github.com/rolltoseduce/releases/download/v2.0/RTS_v2.0_Windows.zip',
      filename: 'RollToSeduce_v2.0_Windows.zip',
      size: '2.8 GB',
      version: 'v2.0.4'
    },
    android: {
      url: 'https://github.com/rolltoseduce/releases/download/v2.0/RTS_v2.0_Android.apk',
      filename: 'RollToSeduce_v2.0_Android.apk',
      size: '1.2 GB',
      version: 'v2.0.4'
    }
  };

  // Enhanced download handler with progress simulation
  const handleDownload = async (platform) => {
    setDownloadStates(prev => ({ ...prev, [platform]: 'downloading' }));
    
    try {
      // Create invisible anchor element for download
      const link = document.createElement('a');
      link.href = downloadConfigs[platform].url;
      link.download = downloadConfigs[platform].filename;
      link.style.display = 'none';
      
      // Add to body and trigger download
      document.body.appendChild(link);
      link.click();
      
      // Simulate download progress
      setTimeout(() => {
        setDownloadStates(prev => ({ ...prev, [platform]: 'complete' }));
        
        // Reset state after 3 seconds
        setTimeout(() => {
          setDownloadStates(prev => ({ ...prev, [platform]: 'idle' }));
        }, 3000);
      }, 2000);
      
      // Clean up
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadStates(prev => ({ ...prev, [platform]: 'error' }));
      
      // Reset error state after 3 seconds
      setTimeout(() => {
        setDownloadStates(prev => ({ ...prev, [platform]: 'idle' }));
      }, 3000);
    }
  };

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated background particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: Math.random() * 0.2 + 0.05,
        opacity: Math.random() * 0.3 + 0.1,
        hue: Math.random() * 60 + 320
      });
    }

    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 15, 18, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsl(${particle.hue}, 70%, 60%)`;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        particle.x += particle.speedX;
        particle.y -= particle.speedY;
        particle.opacity *= 0.999;

        if (particle.opacity < 0.05 || particle.y < 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = canvas.height + 10;
          particle.opacity = Math.random() * 0.3 + 0.1;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Download button content based on state
  const getDownloadButtonContent = (platform, defaultContent) => {
    const state = downloadStates[platform];
    
    switch(state) {
      case 'downloading':
        return (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>DOWNLOADING...</span>
          </>
        );
      case 'complete':
        return (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>DOWNLOAD COMPLETE!</span>
          </>
        );
      case 'error':
        return (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>DOWNLOAD FAILED - RETRY</span>
          </>
        );
      default:
        return defaultContent;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F12] text-[#FAFAFA] overflow-hidden">
      {/* Animated background */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />
      
      {/* Dynamic gradient overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
                      rgba(255, 71, 87, 0.08) 0%, transparent 50%)`
        }}
      />

      {/* Progress indicator */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-50 bg-[#1A1A1F]">
        <div 
          className="h-full bg-gradient-to-r from-[#FF4757] via-[#9B59B6] to-[#FF6B9D] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-lg bg-[#0F0F12]/80 border-b border-[#2D2D33]">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF4757] to-[#9B59B6] rounded-full blur opacity-60"></div>
              <div className="relative w-10 h-10 bg-[#1A1A1F] rounded-full flex items-center justify-center">
                <span className="text-[#FF4757] font-bold">R2S</span>
              </div>
            </div>
            <div className="text-sm tracking-[0.3em] font-light text-[#A8A8B3]">ROLL TO SEDUCE</div>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="https://discord.gg/grRXZDQvjy" target="_blank" rel="noopener noreferrer" className="text-[#E5E5E7] hover:text-[#FF4757] transition-colors tracking-wide">Discord</a>
            <a href="https://x.com/RSeduce85040" target="_blank" rel="noopener noreferrer" className="text-[#E5E5E7] hover:text-[#FF4757] transition-colors tracking-wide">Twitter/X</a>
            <button className="text-[#E5E5E7] hover:text-[#FF4757] transition-colors tracking-wide">18+</button>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section className="relative min-h-screen flex items-center justify-center px-8 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF4757]/5 to-[#0F0F12]" />
        
        <div className="relative z-20 max-w-5xl mx-auto text-center">
          {/* Version badge */}
          <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-[#1A1A1F] border border-[#2D2D33] rounded-full">
            <div className="w-2 h-2 bg-[#2ECC71] rounded-full animate-pulse"></div>
            <span className="text-sm text-[#E5E5E7] tracking-wide">Early Access v2.0 • In Active Development</span>
          </div>

          <div className="mb-12">
            <h1 className="font-serif text-7xl md:text-9xl font-thin leading-none mb-4">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF4757] to-[#9B59B6]">
                ROLL TO
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#FF4757] font-light italic">
                SEDUCE
              </span>
            </h1>
            <p className="text-lg text-[#FF4757]/60 tracking-[0.3em] font-light">
              WHERE DEMONS PLAY & MORTALS PRAY
            </p>
          </div>
          
          <p className="text-xl text-[#E5E5E7] font-light leading-relaxed max-w-3xl mx-auto mb-12">
            Join thousands of players shaping the ultimate supernatural seduction experience. 
            New content added monthly as we build this dark fantasy together.
          </p>
          
          <div className="flex gap-6 justify-center mb-8">
            <button 
              className="group relative px-10 py-4 overflow-hidden"
              onClick={() => document.getElementById('download-section').scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF4757] to-[#9B59B6] transform transition-transform group-hover:scale-110" />
              <div className="absolute inset-[2px] bg-[#0F0F12]" />
              <span className="relative text-[#FAFAFA] group-hover:text-white transition-colors tracking-wider font-medium">
                PLAY DEMO (v2.0)
              </span>
            </button>
            <a href="https://discord.gg/grRXZDQvjy" target="_blank" rel="noopener noreferrer" className="px-10 py-4 border-2 border-[#2D2D33] hover:border-[#FF4757]/50 bg-[#1A1A1F] hover:bg-[#252529] text-[#E5E5E7] hover:text-[#FF4757] transition-all tracking-wider">
              JOIN DISCORD
            </a>
          </div>

          {/* Stats bar */}
          <div className="flex justify-center gap-8 text-sm text-[#A8A8B3]">
            <div className="flex items-center gap-2">
              <span className="text-[#2ECC71]">●</span>
              <span>2.5k Active Players</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#9B59B6]">●</span>
              <span>Weekly Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#FF6B9D]">●</span>
              <span>Community Driven</span>
            </div>
          </div>

          {/* Age gate notice */}
          <div className="mt-12 text-sm text-[#A8A8B3]">
            <p className="tracking-wide">This experience contains adult content • 18+ only</p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#FF4757]/50 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Game overview */}
      <section className="relative py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-serif font-light">
                Temptation Has <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4757] to-[#FF6B9D]">Many Faces</span>
              </h2>
              <div className="space-y-6 text-[#E5E5E7]">
                <p className="text-lg leading-relaxed">
                  You've been chosen. Four supernatural beauties compete for the right 
                  to claim your soul, each offering pleasures beyond mortal comprehension.
                </p>
                <p className="text-lg leading-relaxed">
                  Navigate branching storylines where every seduction is a battle, every 
                  kiss a conquest. Will you maintain your humanity, or surrender to the 
                  sweetest damnation?
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm text-[#A8A8B3]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FF4757] rounded-full"></div>
                  <span>4+ Unique Routes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#9B59B6] rounded-full"></div>
                  <span>1+ Endings</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#FF6B9D] rounded-full"></div>
                  <span>Fully Voiced</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-[#1A1A1F] to-[#252529] rounded-lg overflow-hidden border border-[#2D2D33]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-2xl font-serif italic text-[#FF4757]/80 mb-2">
                    "Your corruption begins now..."
                  </p>
                  <p className="text-sm text-[#A8A8B3]">Begin your descent into darkness</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Characters section */}
      <section className="relative py-24 bg-gradient-to-b from-transparent via-[#1A1A1F]/20 to-transparent">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-light mb-6">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4757] to-[#9B59B6]">Temptation</span>
            </h2>
            <p className="text-xl text-[#E5E5E7] max-w-3xl mx-auto">
              Four supernatural seductresses await. Each offers a unique path to pleasure... and peril.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {characters.map((character) => (
              <div 
                key={character.id}
                className="group relative bg-[#1A1A1F] border border-[#2D2D33] hover:border-[#3D3D44] transition-all duration-500 cursor-pointer overflow-hidden"
                onClick={() => setSelectedCharacter(character)}
              >
                {/* Character gradient background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${character.colors[0]} 0%, ${character.colors[1]} 100%)`
                  }}
                />
                
                <div className="relative p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-3xl font-serif text-[#FAFAFA]">{character.name}</h3>
                      <p className="text-sm tracking-wide" style={{ color: character.colors[0] }}>
                        {character.title}
                      </p>
                    </div>
                    <div className="text-xs text-[#A8A8B3] tracking-wider">{character.power}</div>
                  </div>
                  
                  <p className="text-[#E5E5E7] mb-6 leading-relaxed">
                    {character.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm italic text-[#A8A8B3]">"{character.quote}"</p>
                    <span className="text-xs text-[#A8A8B3] group-hover:text-[#FF4757] transition-colors">
                      Explore →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot Gallery Section */}
      <section className="py-24 px-8 bg-gradient-to-b from-transparent via-[#1A1A1F]/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-light mb-6">
              Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4757] to-[#9B59B6]">Showcase</span>
            </h2>
            <p className="text-xl text-[#E5E5E7] max-w-3xl mx-auto">
              Explore stunning artwork, dynamic animations, and atmospheric environments from the world of Roll to Seduce
            </p>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filterCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-full border transition-all duration-300 flex items-center gap-2
                  ${activeFilter === category.id 
                    ? 'bg-gradient-to-r from-[#FF4757] to-[#9B59B6] border-transparent text-white' 
                    : 'bg-[#1A1A1F] border-[#2D2D33] hover:border-[#FF4757]/50 text-[#E5E5E7]'
                  }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm font-medium tracking-wide">{category.label}</span>
                {category.id !== 'all' && (
                  <span className="text-xs opacity-60">
                    ({mediaGallery.filter(item => item.category === category.id).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Media grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMedia.map((media, index) => (
              <div
                key={media.id}
                className="group relative bg-[#1A1A1F] border border-[#2D2D33] rounded-lg overflow-hidden hover:border-[#FF4757]/50 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedMedia(media)}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  opacity: 0
                }}
              >
                {/* NSFW blur overlay */}
                {media.nsfw && (
                  <div className="absolute inset-0 z-20 bg-[#0F0F12]/80 backdrop-blur-md flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                    <div className="text-center">
                      <span className="text-2xl mb-2">🔞</span>
                      <p className="text-xs text-[#FF4757]">NSFW Content</p>
                      <p className="text-xs text-[#A8A8B3]">Hover to reveal</p>
                    </div>
                  </div>
                )}

                {/* Media type indicator */}
                {media.type === 'gif' && (
                  <div className="absolute top-3 right-3 z-30 px-2 py-1 bg-[#9B59B6]/80 backdrop-blur-sm rounded-full">
                    <span className="text-xs font-medium text-white">GIF</span>
                  </div>
                )}

                {/* Thumbnail */}
                <div className="aspect-video bg-[#252529] relative overflow-hidden">
                  <img 
                    src={media.thumbnail} 
                    alt={media.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white">
                      <h4 className="text-lg font-medium mb-1">{media.title}</h4>
                      <p className="text-sm text-gray-300">{media.description}</p>
                    </div>
                  </div>
                </div>

                {/* Character indicator */}
                {media.character && (
                  <div className="absolute top-3 left-3 z-30">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: `linear-gradient(135deg, ${characters.find(c => c.id === media.character)?.colors[0]} 0%, ${characters.find(c => c.id === media.character)?.colors[1]} 100%)`
                      }}
                    >
                      {media.character.charAt(0).toUpperCase()}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* View more button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 border border-[#2D2D33] hover:border-[#FF4757]/50 bg-[#1A1A1F] hover:bg-[#252529] text-[#E5E5E7] hover:text-[#FF4757] transition-all tracking-wider">
              LOAD MORE MEDIA
            </button>
          </div>
        </div>
      </section>

      {/* Media Lightbox Modal */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#0F0F12]/95 backdrop-blur-md"
          onClick={() => setSelectedMedia(null)}
        >
          <div 
            className="relative max-w-6xl w-full bg-[#1A1A1F] border border-[#2D2D33] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 z-10 text-[#A8A8B3] hover:text-[#FAFAFA] transition-colors bg-[#0F0F12]/80 backdrop-blur-sm rounded-full p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Media display */}
            <div className="relative bg-[#0F0F12]">
              {selectedMedia.type === 'image' ? (
                <img 
                  src={selectedMedia.src} 
                  alt={selectedMedia.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              ) : (
                <img 
                  src={selectedMedia.src} 
                  alt={selectedMedia.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              )}
            </div>

            {/* Media info */}
            <div className="p-6 bg-gradient-to-t from-[#1A1A1F] to-[#252529]">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-light text-[#FAFAFA] mb-2">{selectedMedia.title}</h3>
                  <p className="text-[#E5E5E7] mb-4">{selectedMedia.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="px-3 py-1 bg-[#252529] rounded-full text-[#A8A8B3] capitalize">
                      {selectedMedia.category}
                    </span>
                    {selectedMedia.character && (
                      <span 
                        className="px-3 py-1 rounded-full text-white capitalize"
                        style={{
                          background: `linear-gradient(90deg, ${characters.find(c => c.id === selectedMedia.character)?.colors[0]} 0%, ${characters.find(c => c.id === selectedMedia.character)?.colors[1]} 100%)`
                        }}
                      >
                        {selectedMedia.character}
                      </span>
                    )}
                    {selectedMedia.nsfw && (
                      <span className="px-3 py-1 bg-[#FF4757]/20 text-[#FF4757] rounded-full">
                        NSFW
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Navigation arrows */}
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const currentIndex = filteredMedia.findIndex(m => m.id === selectedMedia.id);
                      const prevIndex = currentIndex === 0 ? filteredMedia.length - 1 : currentIndex - 1;
                      setSelectedMedia(filteredMedia[prevIndex]);
                    }}
                    className="p-2 bg-[#252529] hover:bg-[#2D2D33] rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const currentIndex = filteredMedia.findIndex(m => m.id === selectedMedia.id);
                      const nextIndex = currentIndex === filteredMedia.length - 1 ? 0 : currentIndex + 1;
                      setSelectedMedia(filteredMedia[nextIndex]);
                    }}
                    className="p-2 bg-[#252529] hover:bg-[#2D2D33] rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features section */}
      <section className="py-24 px-8 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-light mb-6">
              Unity <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4757] to-[#9B59B6]">Excellence</span>
            </h2>
            <p className="text-xl text-[#E5E5E7]">
              Premium visual novel features powered by cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group text-center p-8 bg-[#1A1A1F] border border-[#2D2D33] hover:border-[#FF4757]/50 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF4757] to-[#9B59B6] rounded-full flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-xl mb-3 font-medium text-[#FAFAFA]">Stunning Artwork</h3>
              <p className="text-[#E5E5E7] text-sm">
                Hand-drawn CGs with multiple variations and dynamic expressions
              </p>
            </div>
            <div className="group text-center p-8 bg-[#1A1A1F] border border-[#2D2D33] hover:border-[#9B59B6]/50 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#9B59B6] to-[#FF6B9D] rounded-full flex items-center justify-center">
                <span className="text-2xl">💋</span>
              </div>
              <h3 className="text-xl mb-3 font-medium text-[#FAFAFA]">Interactive Seduction</h3>
              <p className="text-[#E5E5E7] text-sm">
                Your choices shape how each temptress pursues you
              </p>
            </div>
            <div className="group text-center p-8 bg-[#1A1A1F] border border-[#2D2D33] hover:border-[#FF6B9D]/50 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#FF6B9D] to-[#FF4757] rounded-full flex items-center justify-center">
                <span className="text-2xl">🌙</span>
              </div>
              <h3 className="text-xl mb-3 font-medium text-[#FAFAFA]">Dark Romance</h3>
              <p className="text-[#E5E5E7] text-sm">
                Where love and damnation intertwine beautifully
              </p>
            </div>
          </div>

          {/* Unity specific features */}
          <div className="bg-[#1A1A1F] border border-[#2D2D33] p-8">
            <h3 className="text-2xl font-medium mb-8 text-center text-[#FAFAFA]">
              Advanced Game Features
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <span className="text-[#9B59B6] mt-1 text-lg">▸</span>
                  <div>
                    <h4 className="text-[#FAFAFA] font-semibold text-lg">Enhanced Graphics</h4>
                    <p className="text-sm text-[#E5E5E7] mt-1">Unity's powerful rendering for stunning visual effects</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#9B59B6] mt-1 text-lg">▸</span>
                  <div>
                    <h4 className="text-[#FAFAFA] font-semibold text-lg">Smooth Animations</h4>
                    <p className="text-sm text-[#E5E5E7] mt-1">60 FPS character animations and transitions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#9B59B6] mt-1 text-lg">▸</span>
                  <div>
                    <h4 className="text-[#FAFAFA] font-semibold text-lg">Dynamic Audio</h4>
                    <p className="text-sm text-[#E5E5E7] mt-1">3D positional audio and atmospheric soundscapes</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <span className="text-[#FF4757] mt-1 text-lg">▸</span>
                  <div>
                    <h4 className="text-[#FAFAFA] font-semibold text-lg">Advanced Save System</h4>
                    <p className="text-sm text-[#E5E5E7] mt-1">Cloud saves with unlimited slots and thumbnails</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF4757] mt-1 text-lg">▸</span>
                  <div>
                    <h4 className="text-[#FAFAFA] font-semibold text-lg">Gallery & Achievements</h4>
                    <p className="text-sm text-[#E5E5E7] mt-1">Unlock system with Steam achievement integration</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#FF4757] mt-1 text-lg">▸</span>
                  <div>
                    <h4 className="text-[#FAFAFA] font-semibold text-lg">Cross-Platform Play</h4>
                    <p className="text-sm text-[#E5E5E7] mt-1">Seamless experience across PC, Mac, and Linux</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Roadmap */}
      <section className="py-24 px-8 bg-gradient-to-b from-transparent via-[#1A1A1F]/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-light mb-6">
              Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4757] to-[#9B59B6]">Roadmap</span>
            </h2>
            <p className="text-xl text-[#E5E5E7]">
              Join us on the journey to v2.0 and beyond
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-[#FF4757]/50 via-[#9B59B6]/50 to-[#FF6B9D]/50"></div>
            
            <div className="space-y-12">
              {/* Current version */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8">
                  <h3 className="text-2xl font-light text-[#FF4757]">Version 2.0</h3>
                  <p className="text-[#A8A8B3] mt-1">Current Build</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#FF4757] rounded-full ring-4 ring-[#FF4757]/20 animate-pulse"></div>
                <div className="flex-1 pl-8">
                  <ul className="text-sm text-[#E5E5E7] space-y-1">
                    <li>• 2 character routes</li>
                    <li>• 15+ CG scenes</li>
                    <li>• Basic save system</li>
                  </ul>
                </div>
              </div>

              {/* Upcoming */}
              <div className="relative flex items-center opacity-75">
                <div className="flex-1 text-right pr-8">
                  <h3 className="text-2xl font-light text-[#9B59B6]">Version 3.0</h3>
                  <p className="text-[#A8A8B3] mt-1">July 20th 2025</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#2D2D33] rounded-full"></div>
                <div className="flex-1 pl-8">
                  <ul className="text-sm text-[#A8A8B3] space-y-1">
                    <li>• Coming Soon</li>
                    <li>• Coming Soon</li>
                  </ul>
                </div>
              </div>

              {/* Future */}
              <div className="relative flex items-center opacity-50">
                <div className="flex-1 text-right pr-8">
                  <h3 className="text-2xl font-light text-[#FF6B9D]">Version 4.0</h3>
                  <p className="text-[#A8A8B3] mt-1">Q2 2025</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#2D2D33] rounded-full"></div>
                <div className="flex-1 pl-8">
                  <ul className="text-sm text-[#A8A8B3] space-y-1">
                    <li>• Coming Soon</li>
                    <li>• Coming Soon</li>
                    <li>• Coming Soon</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="py-24 px-8 bg-gradient-to-t from-[#1A1A1F]/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-light mb-6">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4757] to-[#9B59B6]">Updates</span>
            </h2>
            <p className="text-xl text-[#E5E5E7]">
              Fresh from the development hell
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#1A1A1F] border border-[#2D2D33] p-8 hover:border-[#FF4757]/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-[#FF4757]/20 text-[#FF4757] text-xs tracking-wider">PATCH NOTES</span>
                <span className="text-xs text-[#A8A8B3]">2 days ago</span>
              </div>
              <h3 className="text-2xl font-light mb-3 text-[#FAFAFA]">Version 2.0 Released!</h3>
                  <ul className="text-[#E5E5E7] mb-4 space-y-2">
                   <li className="flex items-start gap-2">
                 <span className="text-[#FF4757] mt-0.5">•</span>
               <span>Meet the new characters: the magnificent Luciana and the cheeky Grungelda</span>
                    </li>
                        <li className="flex items-start gap-2">
                     <span className="text-[#FF4757] mt-0.5">•</span>
                 <span>New NSFW animation plus extra spicy artwork</span>
                  </li>
                        <li className="flex items-start gap-2">
                 <span className="text-[#FF4757] mt-0.5">•</span>
                      <span>Hidden Object minigame</span>
                      </li>
                       <li className="flex items-start gap-2">
                            <span className="text-[#FF4757] mt-0.5">•</span>
                          <span>A huge lore drop</span>
                          </li>
                        </ul>
              <button className="text-sm text-[#FF4757] hover:text-[#FF6B9D] transition-colors">
                Read full notes →
              </button>
            </div>

            <div className="bg-[#1A1A1F] border border-[#2D2D33] p-8 hover:border-[#9B59B6]/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-[#9B59B6]/20 text-[#9B59B6] text-xs tracking-wider">DEV BLOG</span>
                <span className="text-xs text-[#A8A8B3]">1 week ago</span>
              </div>
              <h3 className="text-2xl font-light mb-3 text-[#FAFAFA]">Behind the Scenes: Alina</h3>
              <p className="text-[#E5E5E7] mb-4">
                Coming soon.
              </p>
              <button className="text-sm text-[#9B59B6] hover:text-[#FF6B9D] transition-colors">
                Continue reading →
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 border border-[#2D2D33] hover:border-[#FF4757]/50 bg-[#1A1A1F] hover:bg-[#252529] text-[#E5E5E7] hover:text-[#FF4757] transition-all tracking-wider">
              VIEW ALL UPDATES
            </button>
          </div>
        </div>
      </section>

      {/* Community section */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-light mb-6">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4757] to-[#9B59B6]">Cult</span>
            </h2>
            <p className="text-xl text-[#E5E5E7]">
              A thriving community of sinners shaping the game together
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-[#1A1A1F] border border-[#2D2D33]">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-2xl font-light mb-2 text-[#FAFAFA]">Discord Community</h3>
              <p className="text-[#E5E5E7] mb-4">100+ active members</p>
              <p className="text-sm text-[#A8A8B3]">
                Daily discussions, exclusive previews, and direct dev interaction
              </p>
            </div>
            
            <div className="text-center p-8 bg-[#1A1A1F] border border-[#2D2D33]">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-2xl font-light mb-2 text-[#FAFAFA]">Fan Creations</h3>
              <p className="text-[#E5E5E7] mb-4">10+ artworks</p>
              <p className="text-sm text-[#A8A8B3]">
                Community showcase featuring incredible fan art and stories
              </p>
            </div>
            
            <div className="text-center p-8 bg-[#1A1A1F] border border-[#2D2D33]">
              <div className="text-4xl mb-4">🗳️</div>
              <h3 className="text-2xl font-light mb-2 text-[#FAFAFA]">Shape Development</h3>
              <p className="text-[#E5E5E7] mb-4">Weekly polls</p>
              <p className="text-sm text-[#A8A8B3]">
                Vote on features, characters, and story directions
              </p>
            </div>
          </div>

          {/* Newsletter signup */}
          <div className="max-w-2xl mx-auto text-center p-8 bg-gradient-to-r from-[#FF4757]/10 to-[#9B59B6]/10 border border-[#FF4757]/30">
            <h3 className="text-2xl font-light mb-4 text-[#FAFAFA]">Stay Corrupted</h3>
            <p className="text-[#E5E5E7] mb-6">
              Monthly dev updates, exclusive art, and early access announcements
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="your.soul@email.com" 
                className="flex-1 px-4 py-3 bg-[#1A1A1F] border border-[#2D2D33] focus:border-[#FF4757] outline-none transition-colors text-[#FAFAFA] placeholder-[#A8A8B3]"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#FF4757] to-[#9B59B6] hover:from-[#E53E3E] hover:to-[#8E44AD] transition-all text-white font-medium">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Patreon Integration Section */}
      <section className="py-24 px-8 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#9B59B6] rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF6B9D] rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header with Patreon branding */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F96854] to-[#FF424D] rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">P</span>
              </div>
              <span className="text-sm text-[#A8A8B3] tracking-wider">OFFICIAL PATREON</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-light mb-6">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4757] via-[#9B59B6] to-[#FF6B9D]">Inner Circle</span>
            </h2>
            <p className="text-xl text-[#E5E5E7] max-w-3xl mx-auto leading-relaxed">
              Unlock exclusive content, influence development, and become part of an intimate community 
              shaping the most seductive visual novel experience ever created
            </p>
          </div>

          {/* Patron count and goals */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-[#1A1A1F]/90 to-[#252529]/90 backdrop-blur-sm border border-[#9B59B6]/30 rounded-lg p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-light text-[#9B59B6] mb-2">127</div>
                  <p className="text-sm text-[#A8A8B3] tracking-wider">ACTIVE PATRONS</p>
                </div>
                <div>
                  <div className="text-4xl font-light text-[#FF6B9D] mb-2">$1,847</div>
                  <p className="text-sm text-[#A8A8B3] tracking-wider">MONTHLY SUPPORT</p>
                </div>
                <div>
                  <div className="text-4xl font-light text-[#FF4757] mb-2">89%</div>
                  <p className="text-sm text-[#A8A8B3] tracking-wider">TO NEXT GOAL</p>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-8">
                <div className="flex justify-between text-xs text-[#A8A8B3] mb-2">
                  <span>Voice Acting Implementation</span>
                  <span>$2,000/month</span>
                </div>
                <div className="h-2 bg-[#1A1A1F] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#9B59B6] to-[#FF6B9D] rounded-full transition-all duration-1000" style={{ width: '89%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced tier design */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Tier 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-b from-[#FF4757]/20 to-transparent rounded-lg transform rotate-3 group-hover:rotate-1 transition-transform"></div>
              <div className="relative bg-[#1A1A1F] border border-[#2D2D33] rounded-lg p-8 hover:border-[#FF4757]/50 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-light text-[#FAFAFA]">Tempted Soul</h3>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF4757] to-[#C44569] flex items-center justify-center">
                    <span className="text-lg">🔥</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <span className="text-4xl font-light text-[#FF4757]">$5</span>
                  <span className="text-[#A8A8B3]">/month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#FF4757] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-[#E5E5E7] text-sm">Early access to all game updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#FF4757] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-[#E5E5E7] text-sm">Exclusive Discord role & channels</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#FF4757] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-[#E5E5E7] text-sm">Your name in game credits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#FF4757] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-[#E5E5E7] text-sm">Patron-only news & updates</span>
                  </li>
                </ul>

                <a href="https://www.patreon.com/rolltoseduce" target="_blank" rel="noopener noreferrer">
                  <button className="w-full py-3 border border-[#2D2D33] hover:border-[#FF4757] bg-[#252529] hover:bg-[#FF4757]/10 transition-all text-[#FAFAFA] font-medium tracking-wider">
                    BECOME A PATRON
                  </button>
                </a>
              </div>
            </div>

            {/* Tier 2 - Featured */}
            <div className="group relative transform lg:scale-110 z-10">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-[#9B59B6] to-[#FF6B9D] rounded-full">
                <span className="text-xs font-medium tracking-wider">MOST POPULAR</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#9B59B6]/30 to-[#FF6B9D]/30 rounded-lg blur-xl"></div>
              <div className="relative bg-[#1A1A1F] border-2 border-[#9B59B6]/50 rounded-lg p-8 hover:border-[#9B59B6] transition-all shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-light text-[#FAFAFA]">Corrupted Heart</h3>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9B59B6] to-[#FF6B9D] flex items-center justify-center">
                    <span className="text-lg">💜</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <span className="text-4xl font-light text-[#9B59B6]">$15</span>
                  <span className="text-[#A8A8B3]">/month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#9B59B6] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-[#FAFAFA] text-sm font-medium">Everything from Tempted Soul</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#9B59B6] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-[#FAFAFA] text-sm">Vote on story directions & features</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#9B59B6] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-[#FAFAFA] text-sm">Exclusive NSFW art & scenes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#9B59B6] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-[#FAFAFA] text-sm">HD wallpapers & concept art</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#9B59B6] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-[#FAFAFA] text-sm">Behind-the-scenes content</span>
                  </li>
                </ul>

                <a href="https://www.patreon.com/rolltoseduce" target="_blank" rel="noopener noreferrer">
                  <button className="w-full py-3 bg-gradient-to-r from-[#9B59B6] to-[#FF6B9D] hover:from-[#8E44AD] hover:to-[#EC4899] transition-all text-white font-medium tracking-wider shadow-lg">
                    BECOME A PATRON
                  </button>
                </a>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-b from-[#FF6B9D]/20 to-transparent rounded-lg transform -rotate-3 group-hover:-rotate-1 transition-transform"></div>
              <div className="relative bg-[#1A1A1F] border border-[#2D2D33] rounded-lg p-8 hover:border-[#FF6B9D]/50 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-light text-[#FAFAFA]">Damned Devotee</h3>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B9D] to-[#FF4757] flex items-center justify-center">
                    <span className="text-lg">👹</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <span className="text-4xl font-light text-[#FF6B9D]">$30</span>
                  <span className="text-[#A8A8B3]">/month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#FF6B9D] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-[#E5E5E7] text-sm">Everything from lower tiers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#FF6B9D] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-[#E5E5E7] text-sm">Design a background character</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#FF6B9D] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-[#E5E5E7] text-sm">Monthly video call with developer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#FF6B9D] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-[#E5E5E7] text-sm">Physical merchandise package</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#FF6B9D] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-[#E5E5E7] text-sm">Alpha/Beta access to new projects</span>
                  </li>
                </ul>

                <a href="https://www.patreon.com/rolltoseduce" target="_blank" rel="noopener noreferrer">
                  <button className="w-full py-3 border border-[#2D2D33] hover:border-[#FF6B9D] bg-[#252529] hover:bg-[#FF6B9D]/10 transition-all text-[#FAFAFA] font-medium tracking-wider">
                    BECOME A PATRON
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Benefits showcase */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl font-light text-center mb-12">
              Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B59B6] to-[#FF6B9D]">Patron Benefits</span>
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-[#1A1A1F] to-[#252529] border border-[#2D2D33] rounded-lg p-6 text-center hover:border-[#FF4757]/50 transition-all">
                <div className="text-3xl mb-3">🎨</div>
                <h4 className="text-lg font-medium text-[#FAFAFA] mb-2">Exclusive Art</h4>
                <p className="text-sm text-[#A8A8B3]">Access to 50+ patron-only CGs and sketches</p>
              </div>
              <div className="bg-gradient-to-br from-[#1A1A1F] to-[#252529] border border-[#2D2D33] rounded-lg p-6 text-center hover:border-[#9B59B6]/50 transition-all">
                <div className="text-3xl mb-3">🗳️</div>
                <h4 className="text-lg font-medium text-[#FAFAFA] mb-2">Shape the Story</h4>
                <p className="text-sm text-[#A8A8B3]">Vote on character routes and plot developments</p>
              </div>
              <div className="bg-gradient-to-br from-[#1A1A1F] to-[#252529] border border-[#2D2D33] rounded-lg p-6 text-center hover:border-[#FF6B9D]/50 transition-all">
                <div className="text-3xl mb-3">💬</div>
                <h4 className="text-lg font-medium text-[#FAFAFA] mb-2">Dev Access</h4>
                <p className="text-sm text-[#A8A8B3]">Direct communication with the development team</p>
              </div>
              <div className="bg-gradient-to-br from-[#1A1A1F] to-[#252529] border border-[#2D2D33] rounded-lg p-6 text-center hover:border-[#FF4757]/50 transition-all">
                <div className="text-3xl mb-3">🎁</div>
                <h4 className="text-lg font-medium text-[#FAFAFA] mb-2">Early Access</h4>
                <p className="text-sm text-[#A8A8B3]">Play new content weeks before public release</p>
              </div>
            </div>
          </div>

          {/* Social proof */}
          <div className="mt-16 text-center">
            <p className="text-sm text-[#A8A8B3] mb-4">Join 127+ patrons supporting Roll to Seduce</p>
            <div className="flex justify-center gap-4">
              <a href="https://www.patreon.com/rolltoseduce" target="_blank" rel="noopener noreferrer" 
                 className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF424D] hover:bg-[#E63946] transition-colors rounded-full text-white font-medium">
                <span>Support on Patreon</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <button className="px-6 py-3 border border-[#2D2D33] hover:border-[#3D3D44] bg-[#1A1A1F] hover:bg-[#252529] rounded-full text-[#E5E5E7] transition-all">
                Alternative Platforms
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Download section with instant downloads */}
      <section id="download-section" className="py-24 px-8 bg-gradient-to-t from-[#1A1A1F]/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-serif font-light mb-8">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4757] via-[#9B59B6] to-[#FF6B9D] italic">Play?</span>
            </h2>
            <p className="text-xl text-[#E5E5E7] mb-4">
              Experience the world of Roll to Seduce in stunning visual novel format
            </p>
            <p className="text-sm text-[#A8A8B3]">
              Direct downloads • No registration • Instant access
            </p>
          </div>

          {/* Main download section */}
          <div className="max-w-4xl mx-auto">
            {/* Download cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Windows Download */}
              <div className="bg-[#1A1A1F] border border-[#2D2D33] rounded-lg p-8 hover:border-[#FF4757]/50 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0078D4] to-[#40E0D0] rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 5.5V18.5Q3 19.35 3.575 19.925Q4.15 20.5 5 20.5H19Q19.85 20.5 20.425 19.925Q21 19.35 21 18.5V5.5Q21 4.65 20.425 4.075Q19.85 3.5 19 3.5H5Q4.15 3.5 3.575 4.075Q3 4.65 3 5.5ZM5 5.5H19Q19 5.5 19 5.5Q19 5.5 19 5.5V18.5Q19 18.5 19 18.5Q19 18.5 19 18.5H5Q5 18.5 5 18.5Q5 18.5 5 18.5V5.5Q5 5.5 5 5.5Q5 5.5 5 5.5ZM5 5.5V18.5Q5 18.5 5 18.5Q5 18.5 5 18.5Q5 18.5 5 18.5Q5 18.5 5 18.5V5.5Q5 5.5 5 5.5Q5 5.5 5 5.5Q5 5.5 5 5.5Q5 5.5 5 5.5Z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-light text-[#FAFAFA]">Windows</h3>
                      <p className="text-sm text-[#A8A8B3]">64-bit • DirectX 11</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#2ECC71]">RECOMMENDED</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A8A8B3]">Version</span>
                    <span className="text-[#E5E5E7] font-medium">{downloadConfigs.windows.version}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A8A8B3]">File Size</span>
                    <span className="text-[#E5E5E7] font-medium">{downloadConfigs.windows.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A8A8B3]">Requirements</span>
                    <span className="text-[#E5E5E7] font-medium">Windows 10+</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleDownload('windows')}
                  disabled={downloadStates.windows === 'downloading'}
                  className={`w-full py-4 font-medium tracking-wider flex items-center justify-center gap-3 transition-all transform
                    ${downloadStates.windows === 'downloading' 
                      ? 'bg-[#252529] cursor-wait' 
                      : downloadStates.windows === 'complete'
                      ? 'bg-gradient-to-r from-[#2ECC71] to-[#27AE60]'
                      : downloadStates.windows === 'error'
                      ? 'bg-gradient-to-r from-[#E74C3C] to-[#C0392B]'
                      : 'bg-gradient-to-r from-[#FF4757] to-[#9B59B6] hover:from-[#E53E3E] hover:to-[#8E44AD] hover:scale-[1.02] active:scale-[0.98]'
                    } text-white`}
                >
                  {getDownloadButtonContent('windows', (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>DOWNLOAD FOR WINDOWS</span>
                    </>
                  ))}
                </button>
              </div>

              {/* Android Download */}
              <div className="bg-[#1A1A1F] border border-[#2D2D33] rounded-lg p-8 hover:border-[#3DDC84]/50 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#3DDC84] to-[#00C853] rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 00-.83.22l-1.88 3.24a11.463 11.463 0 00-8.94 0L5.65 5.67a.643.643 0 00-.87-.2c-.28.18-.37.54-.2.83L6.42 9.48A10.78 10.78 0 001 18.56h22A10.78 10.78 0 0017.6 9.48zM7 15.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-light text-[#FAFAFA]">Android</h3>
                      <p className="text-sm text-[#A8A8B3]">APK • OpenGL ES 3.0</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#FF6B9D]">MOBILE</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A8A8B3]">Version</span>
                    <span className="text-[#E5E5E7] font-medium">{downloadConfigs.android.version}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A8A8B3]">File Size</span>
                    <span className="text-[#E5E5E7] font-medium">{downloadConfigs.android.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A8A8B3]">Requirements</span>
                    <span className="text-[#E5E5E7] font-medium">Android 7.0+</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleDownload('android')}
                  disabled={downloadStates.android === 'downloading'}
                  className={`w-full py-4 font-medium tracking-wider flex items-center justify-center gap-3 transition-all transform
                    ${downloadStates.android === 'downloading' 
                      ? 'bg-[#252529] cursor-wait' 
                      : downloadStates.android === 'complete'
                      ? 'bg-gradient-to-r from-[#2ECC71] to-[#27AE60]'
                      : downloadStates.android === 'error'
                      ? 'bg-gradient-to-r from-[#E74C3C] to-[#C0392B]'
                      : 'bg-gradient-to-r from-[#3DDC84] to-[#00C853] hover:from-[#34C271] hover:to-[#00A843] hover:scale-[1.02] active:scale-[0.98]'
                    } text-white`}
                >
                  {getDownloadButtonContent('android', (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      <span>DOWNLOAD FOR ANDROID</span>
                    </>
                  ))}
                </button>
              </div>
            </div>

            {/* Demo features */}
            <div className="bg-[#252529] rounded-lg p-8 mb-12">
              <h3 className="text-2xl font-light mb-6 text-center text-[#FAFAFA]">Demo Version 2.0 Includes</h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-light text-[#FF4757] mb-2">2</div>
                  <p className="text-[#E5E5E7]">2 Routes</p>
                  <p className="text-xs text-[#A8A8B3] mt-1">Alina & Luciana</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-[#9B59B6] mb-2">15+</div>
                  <p className="text-[#E5E5E7]">CG Scenes</p>
                  <p className="text-xs text-[#A8A8B3] mt-1">Fully unlockable</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-[#FF6B9D] mb-2">3+</div>
                  <p className="text-[#E5E5E7]">Hours Gameplay</p>
                  <p className="text-xs text-[#A8A8B3] mt-1">Per route</p>
                </div>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#2ECC71] mt-0.5">✓</span>
                  <span className="text-[#E5E5E7]">Full save system - continue your progress in the full version</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2ECC71] mt-0.5">✓</span>
                  <span className="text-[#E5E5E7]">Gallery mode with unlockable CGs and scene replay</span>
                </li>
              </ul>
            </div>

            {/* Additional download options */}
            <div className="text-center mb-12">
              <p className="text-sm text-[#A8A8B3] mb-4">Need help installing? Check our <a href="#" className="text-[#FF4757] hover:text-[#FF6B9D] transition-colors">installation guide</a></p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="https://2girls1game.itch.io/roll-to-seduce" target="_blank" rel="noopener noreferrer" 
                   className="inline-flex items-center gap-2 px-6 py-2 bg-[#1A1A1F] border border-[#2D2D33] hover:border-[#FF4757]/50 rounded-lg transition-all">
                  <span className="text-sm text-[#E5E5E7]">Download from itch.io</span>
                  <svg className="w-4 h-4 text-[#A8A8B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a href="https://www.patreon.com/rolltoseduce" target="_blank" rel="noopener noreferrer" 
                   className="inline-flex items-center gap-2 px-6 py-2 bg-[#1A1A1F] border border-[#2D2D33] hover:border-[#9B59B6]/50 rounded-lg transition-all">
                  <span className="text-sm text-[#E5E5E7]">Full version on Patreon</span>
                  <svg className="w-4 h-4 text-[#A8A8B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* System requirements */}
            <div className="bg-[#1A1A1F] border border-[#2D2D33] rounded-lg p-8">
              <h4 className="text-lg font-medium text-[#FF4757] mb-6">System Requirements</h4>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h5 className="text-[#9B59B6] mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 5.5V18.5Q3 19.35 3.575 19.925Q4.15 20.5 5 20.5H19Q19.85 20.5 20.425 19.925Q21 19.35 21 18.5V5.5Q21 4.65 20.425 4.075Q19.85 3.5 19 3.5H5Q4.15 3.5 3.575 4.075Q3 4.65 3 5.5Z"/>
                    </svg>
                    Windows Requirements
                  </h5>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-[#A8A8B3]">OS:</dt>
                      <dd className="text-[#E5E5E7]">Windows 10+ (64-bit)</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[#A8A8B3]">Processor:</dt>
                      <dd className="text-[#E5E5E7]">2.5 GHz Dual Core</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[#A8A8B3]">Memory:</dt>
                      <dd className="text-[#E5E5E7]">4 GB RAM</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[#A8A8B3]">Graphics:</dt>
                      <dd className="text-[#E5E5E7]">DirectX 11</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[#A8A8B3]">Storage:</dt>
                      <dd className="text-[#E5E5E7]">3 GB available</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h5 className="text-[#3DDC84] mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 00-.83.22l-1.88 3.24a11.463 11.463 0 00-8.94 0L5.65 5.67a.643.643 0 00-.87-.2c-.28.18-.37.54-.2.83L6.42 9.48A10.78 10.78 0 001 18.56h22A10.78 10.78 0 0017.6 9.48z"/>
                    </svg>
                    Android Requirements
                  </h5>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-[#A8A8B3]">OS:</dt>
                      <dd className="text-[#E5E5E7]">Android 7.0+</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[#A8A8B3]">RAM:</dt>
                      <dd className="text-[#E5E5E7]">2 GB minimum</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[#A8A8B3]">Processor:</dt>
                      <dd className="text-[#E5E5E7]">Snapdragon 625+</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[#A8A8B3]">GPU:</dt>
                      <dd className="text-[#E5E5E7]">OpenGL ES 3.0</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[#A8A8B3]">Storage:</dt>
                      <dd className="text-[#E5E5E7]">1.5 GB available</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-[#2D2D33]">
                <p className="text-xs text-[#9B59B6] text-center">
                  <span className="inline-block mr-2">🎮</span>
                  Built with Unity 2022.3 LTS • Full controller support • Cloud save ready
                </p>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="mt-12 text-center">
            <p className="text-sm text-[#FF4757] font-medium">
              ⚠️ This game contains adult content and is intended for mature audiences only (18+)
            </p>
            <p className="text-xs text-[#A8A8B3] mt-2">
              By downloading, you confirm you are of legal age in your jurisdiction
            </p>
          </div>
        </div>
      </section>

      {/* Character modal */}
      {selectedCharacter && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F0F12]/95 backdrop-blur-sm"
          onClick={() => setSelectedCharacter(null)}
        >
          <div 
            className="relative w-full max-w-5xl bg-[#1A1A1F] border border-[#2D2D33] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCharacter(null)}
              className="absolute top-6 right-6 text-[#A8A8B3] hover:text-[#FAFAFA] z-10 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="grid md:grid-cols-2">
              {/* Left side - Character art placeholder */}
              <div 
                className="relative min-h-[600px] bg-[#252529] overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${selectedCharacter.colors[0]}20 0%, ${selectedCharacter.colors[1]}20 100%)`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F12] via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-12">
                  <h3 className="text-6xl font-serif font-thin mb-2 text-[#FAFAFA]">{selectedCharacter.name}</h3>
                  <p className="text-2xl font-light" style={{ color: selectedCharacter.colors[0] }}>
                    {selectedCharacter.title}
                  </p>
                </div>
              </div>
              
              {/* Right side - Character details */}
              <div className="p-12 space-y-8">
                <div>
                  <h4 className="text-xs tracking-[0.3em] text-[#A8A8B3] mb-3">SUPERNATURAL POWER</h4>
                  <p className="text-2xl font-light" style={{ color: selectedCharacter.colors[0] }}>
                    {selectedCharacter.power}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xs tracking-[0.3em] text-[#A8A8B3] mb-3">DESCRIPTION</h4>
                  <p className="text-[#E5E5E7] leading-relaxed text-lg">
                    {selectedCharacter.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xs tracking-[0.3em] text-[#A8A8B3] mb-3">STORY ROUTE</h4>
                  <p className="text-[#E5E5E7]">{selectedCharacter.route}</p>
                </div>
                
                <div className="py-8 border-y border-[#2D2D33]">
                  <p className="text-2xl italic text-[#E5E5E7]">
                    "{selectedCharacter.quote}"
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-light mb-1" style={{ color: selectedCharacter.colors[0] }}>100%</div>
                    <div className="text-xs text-[#A8A8B3]">VOICED</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light mb-1" style={{ color: selectedCharacter.colors[0] }}>5</div>
                    <div className="text-xs text-[#A8A8B3]">ENDINGS</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light mb-1" style={{ color: selectedCharacter.colors[0] }}>18+</div>
                    <div className="text-xs text-[#A8A8B3]">SCENES</div>
                  </div>
                </div>
                
                <button 
                  className="w-full py-4 mt-8 relative group overflow-hidden"
                  onClick={() => setSelectedCharacter(null)}
                >
                  <div 
                    className="absolute inset-0 transform transition-transform group-hover:scale-110"
                    style={{
                      background: `linear-gradient(90deg, ${selectedCharacter.colors[0]} 0%, ${selectedCharacter.colors[1]} 100%)`
                    }}
                  />
                  <div className="absolute inset-[2px] bg-[#1A1A1F]" />
                  <span className="relative text-[#FAFAFA] tracking-wider font-medium">
                    CHOOSE {selectedCharacter.name.toUpperCase()}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#2D2D33] py-12 px-8 bg-gradient-to-b from-transparent to-[#0F0F12]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-[#FF4757] mb-4 tracking-wider text-sm">GAME</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#download-section" className="text-[#A8A8B3] hover:text-[#FF4757] transition-colors">Download Demo</a></li>
                <li><a href="https://www.patreon.com/rolltoseduce" target="_blank" rel="noopener noreferrer" className="text-[#A8A8B3] hover:text-[#FF4757] transition-colors">Full Version</a></li>
                <li><a href="#" className="text-[#A8A8B3] hover:text-[#FF4757] transition-colors">Gallery</a></li>
                <li><a href="#" className="text-[#A8A8B3] hover:text-[#FF4757] transition-colors">Soundtrack</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#9B59B6] mb-4 tracking-wider text-sm">COMMUNITY</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://discord.gg/grRXZDQvjy" target="_blank" rel="noopener noreferrer" className="text-[#A8A8B3] hover:text-[#9B59B6] transition-colors">Discord</a></li>
                <li><a href="https://x.com/RSeduce85040" target="_blank" rel="noopener noreferrer" className="text-[#A8A8B3] hover:text-[#9B59B6] transition-colors">Twitter/X</a></li>
                <li><a href="#" className="text-[#A8A8B3] hover:text-[#9B59B6] transition-colors">Reddit</a></li>
                <li><a href="#" className="text-[#A8A8B3] hover:text-[#9B59B6] transition-colors">Fan Art</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#FF6B9D] mb-4 tracking-wider text-sm">SUPPORT</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.patreon.com/rolltoseduce" target="_blank" rel="noopener noreferrer" className="text-[#A8A8B3] hover:text-[#FF6B9D] transition-colors">Patreon</a></li>
                <li><a href="#" className="text-[#A8A8B3] hover:text-[#FF6B9D] transition-colors">SubscribeStar</a></li>
                <li><a href="#" className="text-[#A8A8B3] hover:text-[#FF6B9D] transition-colors">Buy Me a Coffee</a></li>
                <li><a href="#" className="text-[#A8A8B3] hover:text-[#FF6B9D] transition-colors">Merch Store</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#E5E5E7] mb-4 tracking-wider text-sm">INFO</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-[#A8A8B3] hover:text-[#E5E5E7] transition-colors">Installation Guide</a></li>
                <li><a href="#" className="text-[#A8A8B3] hover:text-[#E5E5E7] transition-colors">Contact</a></li>
                <li><a href="#" className="text-[#A8A8B3] hover:text-[#E5E5E7] transition-colors">Privacy</a></li>
                <li><a href="#" className="text-[#A8A8B3] hover:text-[#E5E5E7] transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 mt-8 border-t border-[#2D2D33] text-center space-y-2">
            <p className="text-sm text-[#E5E5E7]">
              © 2025 Roll to Seduce • Developed by <a href="https://2girls1game.itch.io" target="_blank" rel="noopener noreferrer" className="text-[#FF4757] hover:text-[#FF6B9D] transition-colors">2 Girls 1 Game</a> • Made with <span className="text-[#FF4757]">♥</span> and <span className="text-[#9B59B6]">Unity</span>
            </p>
            <p className="text-sm text-[#FF4757] font-medium">
              This game contains adult content. You must be 18+ to play.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        .font-serif {
          font-family: 'Crimson Text', 'Georgia', serif;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #1A1A1F;
        }

        ::-webkit-scrollbar-thumb {
          background: #FF4757;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #E53E3E;
        }
      `}</style>
    </div>
  );
};

export default RollToSeduceWebsite;