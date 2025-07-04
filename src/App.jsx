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
  const canvasRef = useRef(null);

  // Character data matching the dark fantasy theme
  const characters = [
    {
      id: 'lilith',
      name: 'Lilith',
      title: 'Succubus Queen',
      description: 'Ancient temptress who feeds on desire itself. Her wings cast shadows that whisper promises of eternal pleasure.',
      power: 'Desire Manipulation',
      route: 'Path of Crimson Temptation',
      quote: 'Your soul tastes sweeter when you offer it willingly...',
      colors: ['#FF4757', '#C44569']
    },
    {
      id: 'morgana',
      name: 'Morgana',
      title: 'Fallen Angel',
      description: 'Cast from heaven for loving too deeply, her corrupted wings now serve darker purposes.',
      power: 'Divine Corruption',
      route: 'Path of Forbidden Grace',
      quote: 'Heaven\'s loss is your exquisite gain...',
      colors: ['#9B59B6', '#8E44AD']
    },
    {
      id: 'nyx',
      name: 'Nyx',
      title: 'Shadow Mistress',
      description: 'Born from nightmares and desires, she exists in the space between dream and reality.',
      power: 'Dream Weaving',
      route: 'Path of Midnight Whispers',
      quote: 'In dreams, all your darkest wishes come true...',
      colors: ['#5F27CD', '#341F97']
    },
    {
      id: 'scarlett',
      name: 'Scarlett',
      title: 'Vampire Duchess',
      description: 'Centuries of seduction have perfected her art. Every kiss is both ecstasy and damnation.',
      power: 'Blood Magic',
      route: 'Path of Eternal Thirst',
      quote: 'One taste, and you\'ll beg for eternity...',
      colors: ['#FF6B9D', '#C44569']
    }
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
                  <span>4 Unique Routes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#9B59B6] rounded-full"></div>
                  <span>20+ Endings</span>
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
                  <p className="text-[#E5E5E7]">Complete Routes</p>
                  <p className="text-xs text-[#A8A8B3] mt-1">Lilith & Morgana</p>
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
                <li className="flex items-start gap-3">
                  <span className="text-[#2ECC71] mt-0.5">✓</span>
                  <span className="text-[#E5E5E7]">Multiple endings for each character route</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#2ECC71] mt-0.5">✓</span>
                  <span className="text-[#E5E5E7]">Full controller support and customizable settings</span>
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