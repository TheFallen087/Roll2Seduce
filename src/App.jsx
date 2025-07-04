import React, { useState, useEffect, useRef } from 'react';

const RollToSeduceWebsite = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
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
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
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
                  <p className="text-sm text-[#A8A8B3]">Chapter 1: The Summoning</p>
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
              Join us on the journey to v1.0 and beyond
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
                    <li>• 2 Complete character routes</li>
                    <li>• 15+ CG scenes</li>
                    <li>• Basic save system</li>
                  </ul>
                </div>
              </div>

              {/* Upcoming */}
              <div className="relative flex items-center opacity-75">
                <div className="flex-1 text-right pr-8">
                  <h3 className="text-2xl font-light text-[#9B59B6]">Version 2.5</h3>
                  <p className="text-[#A8A8B3] mt-1">Q2 2025</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#2D2D33] rounded-full"></div>
                <div className="flex-1 pl-8">
                  <ul className="text-sm text-[#A8A8B3] space-y-1">
                    <li>• Morgana route completion</li>
                    <li>• Voice acting integration</li>
                    <li>• Gallery mode</li>
                  </ul>
                </div>
              </div>

              {/* Future */}
              <div className="relative flex items-center opacity-50">
                <div className="flex-1 text-right pr-8">
                  <h3 className="text-2xl font-light text-[#FF6B9D]">Version 3.0</h3>
                  <p className="text-[#A8A8B3] mt-1">Q3 2025</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#2D2D33] rounded-full"></div>
                <div className="flex-1 pl-8">
                  <ul className="text-sm text-[#A8A8B3] space-y-1">
                    <li>• Final character route</li>
                    <li>• Multiple endings system</li>
                    <li>• Steam achievements</li>
                  </ul>
                </div>
              </div>
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
                </ul>

                <a href="https://www.patreon.com/rolltoseduce" target="_blank" rel="noopener noreferrer">
                  <button className="w-full py-3 border border-[#2D2D33] hover:border-[#FF6B9D] bg-[#252529] hover:bg-[#FF6B9D]/10 transition-all text-[#FAFAFA] font-medium tracking-wider">
                    BECOME A PATRON
                  </button>
                </a>
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
              <p className="text-[#E5E5E7] mb-4">
                Major update bringing Lilith's complete route with 7 new CG scenes, 
                improved dialogue system, and bug fixes based on community feedback.
              </p>
              <button className="text-sm text-[#FF4757] hover:text-[#FF6B9D] transition-colors">
                Read full notes →
              </button>
            </div>

            <div className="bg-[#1A1A1F] border border-[#2D2D33] p-8 hover:border-[#9B59B6]/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-[#9B59B6]/20 text-[#9B59B6] text-xs tracking-wider">DEV BLOG</span>
                <span className="text-xs text-[#A8A8B3]">1 week ago</span>
              </div>
              <h3 className="text-2xl font-light mb-3 text-[#FAFAFA]">Behind the Scenes: Morgana</h3>
              <p className="text-[#E5E5E7] mb-4">
                Dive into the creative process behind our fallen angel. See concept art, 
                story drafts, and learn how community feedback shaped her character.
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
              <p className="text-[#E5E5E7] mb-4">2,500+ active members</p>
              <p className="text-sm text-[#A8A8B3]">
                Daily discussions, exclusive previews, and direct dev interaction
              </p>
            </div>
            
            <div className="text-center p-8 bg-[#1A1A1F] border border-[#2D2D33]">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-2xl font-light mb-2 text-[#FAFAFA]">Fan Creations</h3>
              <p className="text-[#E5E5E7] mb-4">500+ artworks</p>
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

      {/* Download section */}
      <section className="py-24 px-8 bg-gradient-to-t from-[#1A1A1F]/20 to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-6xl font-serif font-light mb-8">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4757] via-[#9B59B6] to-[#FF6B9D] italic">Play?</span>
          </h2>
          
          <p className="text-xl text-[#E5E5E7] mb-12">
            Experience the world of Roll to Seduce in stunning visual novel format
          </p>

          {/* Demo download */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="p-8 bg-[#1A1A1F] border border-[#2D2D33] hover:border-[#FF4757]/50 transition-all">
              <h3 className="text-3xl font-light mb-4 text-[#FAFAFA]">Demo Version 2.0</h3>
              <p className="text-[#E5E5E7] text-lg mb-6">Experience the beginning of your corruption</p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8 text-left">
                <div className="text-center">
                  <div className="text-2xl text-[#FF4757] mb-2">2</div>
                  <p className="text-sm text-[#E5E5E7]">Full Chapters</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-[#9B59B6] mb-2">15+</div>
                  <p className="text-sm text-[#E5E5E7]">CG Scenes</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-[#FF6B9D] mb-2">4</div>
                  <p className="text-sm text-[#E5E5E7]">Characters</p>
                </div>
              </div>
              
              <div className="mb-8 p-4 bg-[#252529] rounded">
                <p className="text-sm text-[#E5E5E7] mb-2">Demo includes:</p>
                <ul className="text-sm text-[#FAFAFA] space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF4757] mt-0.5">♦</span>
                    <span>First two chapters of each character route</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9B59B6] mt-0.5">♦</span>
                    <span>Preview of the gallery system with select scenes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF6B9D] mt-0.5">♦</span>
                    <span>Full save/load functionality to continue in full version</span>
                  </li>
                </ul>
              </div>
              
              {/* Platform-specific download buttons */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <button 
                  onClick={() => {
                    // Direct download for Windows
                    const link = document.createElement('a');
                    link.href = '/downloads/RTS_0.02_4.zip'; // Update with your actual file path
                    link.download = 'RTS_0.02_4.zip';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-[#FF4757] to-[#9B59B6] hover:from-[#E53E3E] hover:to-[#8E44AD] transition-all text-white font-medium tracking-wider flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5.5V18.5Q3 19.35 3.575 19.925Q4.15 20.5 5 20.5H19Q19.85 20.5 20.425 19.925Q21 19.35 21 18.5V5.5Q21 4.65 20.425 4.075Q19.85 3.5 19 3.5H5Q4.15 3.5 3.575 4.075Q3 4.65 3 5.5ZM5 5.5H19Q19 5.5 19 5.5Q19 5.5 19 5.5V18.5Q19 18.5 19 18.5Q19 18.5 19 18.5H5Q5 18.5 5 18.5Q5 18.5 5 18.5V5.5Q5 5.5 5 5.5Q5 5.5 5 5.5ZM5 5.5V18.5Q5 18.5 5 18.5Q5 18.5 5 18.5Q5 18.5 5 18.5Q5 18.5 5 18.5V5.5Q5 5.5 5 5.5Q5 5.5 5 5.5Q5 5.5 5 5.5Q5 5.5 5 5.5Z"/>
                  </svg>
                  <span>DOWNLOAD FOR WINDOWS</span>
                  <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                
                <button 
                  onClick={() => {
                    // Direct download for Android
                    const link = document.createElement('a');
                    link.href = '/downloads/RollToSeduce_v2.0.apk'; // Update with your actual file path
                    link.download = 'RollToSeduce_v2.0.apk';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-[#3DDC84] to-[#00C853] hover:from-[#34C271] hover:to-[#00A843] transition-all text-white font-medium tracking-wider flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 00-.83.22l-1.88 3.24a11.463 11.463 0 00-8.94 0L5.65 5.67a.643.643 0 00-.87-.2c-.28.18-.37.54-.2.83L6.42 9.48A10.78 10.78 0 001 18.56h22A10.78 10.78 0 0017.6 9.48zM7 15.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm10 0c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
                  </svg>
                  <span>DOWNLOAD FOR ANDROID</span>
                  <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
              
              <div className="text-center mb-4">
                <p className="text-xs text-[#A8A8B3]">
                  <span className="inline-block w-2 h-2 bg-[#2ECC71] rounded-full animate-pulse mr-2"></span>
                  Direct download • No external redirects • Instant access
                </p>
              </div>
              
              <p className="text-xs text-[#A8A8B3] text-center">
                Windows 10+ (64-bit) • Android 7.0+ • No registration required
              </p>
            </div>
          </div>

          {/* Community links */}
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
            <div className="p-6 bg-[#1A1A1F] border border-[#2D2D33] hover:border-[#9B59B6]/50 transition-all">
              <h4 className="text-xl font-light mb-3 text-[#9B59B6]">Join Our Discord</h4>
              <p className="text-[#E5E5E7] mb-4">
                Connect with 2,500+ players, share fan art, and get development updates
              </p>
              <a href="https://discord.gg/grRXZDQvjy" target="_blank" rel="noopener noreferrer" className="text-[#9B59B6] hover:text-[#FF6B9D] transition-colors text-sm tracking-wider">
                JOIN COMMUNITY →
              </a>
            </div>
            
            <div className="p-6 bg-[#1A1A1F] border border-[#2D2D33] hover:border-[#FF6B9D]/50 transition-all">
              <h4 className="text-xl font-light mb-3 text-[#FF6B9D]">Support Development</h4>
              <p className="text-[#E5E5E7] mb-4">
                Help us create more content through Patreon or SubscribeStar
              </p>
              <a href="https://www.patreon.com/rolltoseduce" target="_blank" rel="noopener noreferrer" className="text-[#FF6B9D] hover:text-[#FF4757] transition-colors text-sm tracking-wider">
                LEARN MORE →
              </a>
            </div>
          </div>

          {/* System requirements */}
          <div className="max-w-2xl mx-auto text-left p-6 bg-[#1A1A1F] border border-[#2D2D33]">
            <h4 className="text-sm tracking-wider text-[#FF4757] mb-3 font-medium">SYSTEM REQUIREMENTS</h4>
            <div className="space-y-4">
              <div>
                <h5 className="text-[#9B59B6] text-sm mb-2">Windows Requirements</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#A8A8B3]">OS:</span> <span className="text-[#FAFAFA]">Windows 10 or higher (64-bit)</span>
                  </div>
                  <div>
                    <span className="text-[#A8A8B3]">Processor:</span> <span className="text-[#FAFAFA]">2.5 GHz Dual Core</span>
                  </div>
                  <div>
                    <span className="text-[#A8A8B3]">Memory:</span> <span className="text-[#FAFAFA]">4 GB RAM</span>
                  </div>
                  <div>
                    <span className="text-[#A8A8B3]">Storage:</span> <span className="text-[#FAFAFA]">3 GB available space</span>
                  </div>
                  <div>
                    <span className="text-[#A8A8B3]">Graphics:</span> <span className="text-[#FAFAFA]">DirectX 11 compatible</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-[#2D2D33] pt-4">
                <h5 className="text-[#3DDC84] text-sm mb-2">Android Requirements</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#A8A8B3]">OS:</span> <span className="text-[#FAFAFA]">Android 7.0 (API 24) or higher</span>
                  </div>
                  <div>
                    <span className="text-[#A8A8B3]">RAM:</span> <span className="text-[#FAFAFA]">2 GB minimum</span>
                  </div>
                  <div>
                    <span className="text-[#A8A8B3]">Storage:</span> <span className="text-[#FAFAFA]">1.5 GB available space</span>
                  </div>
                  <div>
                    <span className="text-[#A8A8B3]">GPU:</span> <span className="text-[#FAFAFA]">OpenGL ES 3.0 support</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#2D2D33]">
              <p className="text-xs text-[#9B59B6]">
                <span className="inline-block mr-2">🎮</span>
                Built with Unity • Full controller support • Auto-save functionality
              </p>
            </div>
          </div>
          
          <div className="mt-12 space-y-2">
            <p className="text-sm text-[#E5E5E7]">
              <span className="text-[#A8A8B3]">Available on:</span> 
              <a href="https://2girls1game.itch.io/roll-to-seduce" target="_blank" rel="noopener noreferrer" className="text-[#FF4757] hover:text-[#FF6B9D] transition-colors">itch.io</a> • 
              <a href="https://www.patreon.com/rolltoseduce" target="_blank" rel="noopener noreferrer" className="text-[#9B59B6] hover:text-[#FF6B9D] transition-colors">Patreon</a> • 
              Steam (Coming Soon)
            </p>
            <p className="text-sm text-[#FF4757] font-medium">
              ⚠️ This game contains adult content and is intended for mature audiences only (18+)
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
                    <div className="text-2xl font-light mb-1" style={{ color: selectedCharacter.colors[0] }}>7</div>
                    <div className="text-xs text-[#A8A8B3]">CHAPTERS</div>
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
                <li><a href="#" className="text-[#A8A8B3] hover:text-[#FF4757] transition-colors">Download Demo</a></li>
                <li><a href="#" className="text-[#A8A8B3] hover:text-[#FF4757] transition-colors">Early Access</a></li>
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
                <li><a href="#" className="text-[#A8A8B3] hover:text-[#FF6B9D] transition-colors">Patreon</a></li>
                <li><a href="#" className="text-[#A8A8B3] hover:text-[#FF6B9D] transition-colors">SubscribeStar</a></li>
                <li><a href="#" className="text-[#A8A8B3] hover:text-[#FF6B9D] transition-colors">Buy Me a Coffee</a></li>
                <li><a href="#" className="text-[#A8A8B3] hover:text-[#FF6B9D] transition-colors">Merch Store</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#E5E5E7] mb-4 tracking-wider text-sm">INFO</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-[#A8A8B3] hover:text-[#E5E5E7] transition-colors">Press Kit</a></li>
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