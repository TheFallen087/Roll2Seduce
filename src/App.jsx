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
      colors: ['#DC143C', '#8B0000']
    },
    {
      id: 'morgana',
      name: 'Morgana',
      title: 'Fallen Angel',
      description: 'Cast from heaven for loving too deeply, her corrupted wings now serve darker purposes.',
      power: 'Divine Corruption',
      route: 'Path of Forbidden Grace',
      quote: 'Heaven\'s loss is your exquisite gain...',
      colors: ['#4B0082', '#9400D3']
    },
    {
      id: 'nyx',
      name: 'Nyx',
      title: 'Shadow Mistress',
      description: 'Born from nightmares and desires, she exists in the space between dream and reality.',
      power: 'Dream Weaving',
      route: 'Path of Midnight Whispers',
      quote: 'In dreams, all your darkest wishes come true...',
      colors: ['#191970', '#000080']
    },
    {
      id: 'scarlett',
      name: 'Scarlett',
      title: 'Vampire Duchess',
      description: 'Centuries of seduction have perfected her art. Every kiss is both ecstasy and damnation.',
      power: 'Blood Magic',
      route: 'Path of Eternal Thirst',
      quote: 'One taste, and you\'ll beg for eternity...',
      colors: ['#8B0000', '#FF1493']
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
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.5 + 0.2,
        hue: Math.random() * 60 + 300 // Purple to red range
      });
    }

    let animationId;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = `hsl(${particle.hue}, 70%, 50%)`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsl(${particle.hue}, 70%, 50%)`;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        particle.x += particle.speedX;
        particle.y -= particle.speedY;
        particle.opacity *= 0.998;

        if (particle.opacity < 0.1 || particle.y < 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = canvas.height + 10;
          particle.opacity = Math.random() * 0.5 + 0.2;
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
    <div className="min-h-screen bg-black text-gray-100 overflow-hidden">
      {/* Animated background */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      
      {/* Dynamic gradient overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
                      rgba(220, 20, 60, 0.1) 0%, transparent 50%)`
        }}
      />

      {/* Progress indicator */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-50 bg-gray-950">
        <div 
          className="h-full bg-gradient-to-r from-red-600 via-purple-600 to-pink-600"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-lg bg-black/50 border-b border-red-900/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-purple-600 rounded-full blur opacity-50"></div>
              <div className="relative w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <span className="text-red-500 font-bold">R2S</span>
              </div>
            </div>
            <div className="text-sm tracking-[0.3em] font-light text-gray-400">ROLL TO SEDUCE</div>
          </div>
          <div className="flex gap-8 text-sm">
            <button className="text-gray-400 hover:text-red-400 transition-colors tracking-wide">Gallery</button>
            <button className="text-gray-400 hover:text-red-400 transition-colors tracking-wide">Characters</button>
            <button className="text-gray-400 hover:text-red-400 transition-colors tracking-wide">18+</button>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section className="relative min-h-screen flex items-center justify-center px-8 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/10 to-black/50" />
        
        <div className="relative z-20 max-w-5xl mx-auto text-center">
          {/* Version badge */}
          <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-red-900/20 border border-red-800/30 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-red-400 tracking-wide">Early Access v2.0 • In Active Development</span>
          </div>

          <div className="mb-12">
            <h1 className="font-serif text-7xl md:text-9xl font-thin leading-none mb-4">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">
                ROLL TO
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-600 font-light italic">
                SEDUCE
              </span>
            </h1>
            <p className="text-lg text-red-400/60 tracking-[0.3em] font-light">
              WHERE DEMONS PLAY & MORTALS PRAY
            </p>
          </div>
          
          <p className="text-xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto mb-12">
            Join thousands of players shaping the ultimate supernatural seduction experience. 
            New content added monthly as we build this dark fantasy together.
          </p>
          
          <div className="flex gap-6 justify-center mb-8">
            <button 
              className="group relative px-10 py-4 overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-600 transform transition-transform group-hover:scale-110" />
              <div className="absolute inset-[1px] bg-black" />
              <span className="relative text-red-400 group-hover:text-white transition-colors tracking-wider">
                PLAY DEMO (v2.0)
              </span>
            </button>
            <button className="px-10 py-4 border border-gray-800 hover:border-red-800/50 text-gray-400 hover:text-red-400 transition-all tracking-wider">
              JOIN DISCORD
            </button>
          </div>

          {/* Stats bar */}
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-green-500">●</span>
              <span>2.5k Active Players</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-purple-500">●</span>
              <span>Weekly Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-pink-500">●</span>
              <span>Community Driven</span>
            </div>
          </div>

          {/* Age gate notice */}
          <div className="mt-12 text-sm text-gray-600">
            <p className="tracking-wide">This experience contains adult content • 18+ only</p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-red-800/50 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Game overview */}
      <section className="relative py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-serif font-light">
                Temptation Has <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">Many Faces</span>
              </h2>
              <div className="space-y-6 text-gray-300">
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
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>4 Unique Routes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>20+ Endings</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Fully Voiced</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-red-950/20 to-purple-950/20 rounded-lg overflow-hidden border border-red-900/20">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-2xl font-serif italic text-red-400/80 mb-2">
                    "Your corruption begins now..."
                  </p>
                  <p className="text-sm text-gray-500">Chapter 1: The Summoning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Characters section */}
      <section className="relative py-24 bg-gradient-to-b from-transparent via-red-950/5 to-transparent">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-light mb-6">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">Temptation</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Four supernatural seductresses await. Each offers a unique path to pleasure... and peril.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {characters.map((character) => (
              <div 
                key={character.id}
                className="group relative bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 hover:border-red-800/50 transition-all duration-500 cursor-pointer overflow-hidden"
                onClick={() => setSelectedCharacter(character)}
              >
                {/* Character gradient background */}
                <div 
                  className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, ${character.colors[0]} 0%, ${character.colors[1]} 100%)`
                  }}
                />
                
                <div className="relative p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-3xl font-serif mb-1">{character.name}</h3>
                      <p className="text-sm tracking-wide" style={{ color: character.colors[0] }}>
                        {character.title}
                      </p>
                    </div>
                    <div className="text-xs text-gray-600 tracking-wider">{character.power}</div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {character.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm italic text-gray-500">"{character.quote}"</p>
                    <span className="text-xs text-gray-600 group-hover:text-red-400 transition-colors">
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
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-light mb-6">
              Ren'Py <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">Excellence</span>
            </h2>
            <p className="text-xl text-gray-400">
              Premium visual novel features for the ultimate experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-8 border border-gray-900 hover:border-red-900/50 transition-colors">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-xl mb-2 font-light">Stunning Artwork</h3>
              <p className="text-gray-300 text-sm">
                Hand-drawn CGs with multiple variations and dynamic expressions
              </p>
            </div>
            <div className="text-center p-8 border border-gray-900 hover:border-red-900/50 transition-colors">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">💋</span>
              </div>
              <h3 className="text-xl mb-2 font-light">Interactive Seduction</h3>
              <p className="text-gray-300 text-sm">
                Your choices shape how each temptress pursues you
              </p>
            </div>
            <div className="text-center p-8 border border-gray-900 hover:border-red-900/50 transition-colors">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-600 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌙</span>
              </div>
              <h3 className="text-xl mb-2 font-light">Dark Romance</h3>
              <p className="text-gray-300 text-sm">
                Where love and damnation intertwine beautifully
              </p>
            </div>
          </div>

          {/* Ren'py specific features */}
          <div className="bg-gradient-to-r from-purple-950/20 to-red-950/20 border border-purple-900/30 p-8">
            <h3 className="text-2xl font-light mb-6 text-center text-purple-300">Visual Novel Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▸</span>
                  <div>
                    <h4 className="text-gray-200 font-medium">Advanced Save System</h4>
                    <p className="text-sm text-gray-400">Unlimited saves with thumbnails & chapter markers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▸</span>
                  <div>
                    <h4 className="text-gray-200 font-medium">Skip & Auto Features</h4>
                    <p className="text-sm text-gray-400">Fast-forward read text & adjustable auto-advance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">▸</span>
                  <div>
                    <h4 className="text-gray-200 font-medium">Text History</h4>
                    <p className="text-sm text-gray-400">Full backlog with rollback support</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">▸</span>
                  <div>
                    <h4 className="text-gray-200 font-medium">Gallery Mode</h4>
                    <p className="text-sm text-gray-400">Unlock & revisit all CGs and scenes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">▸</span>
                  <div>
                    <h4 className="text-gray-200 font-medium">Multiple Endings</h4>
                    <p className="text-sm text-gray-400">Track your progress with ending completion</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">▸</span>
                  <div>
                    <h4 className="text-gray-200 font-medium">Accessibility Options</h4>
                    <p className="text-sm text-gray-400">Font size, speed controls & colorblind modes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Roadmap */}
      <section className="py-24 px-8 bg-gradient-to-b from-transparent via-red-950/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-light mb-6">
              Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">Roadmap</span>
            </h2>
            <p className="text-xl text-gray-400">
              Join us on the journey to v1.0 and beyond
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-red-800/50 via-purple-800/50 to-pink-800/50"></div>
            
            <div className="space-y-12">
              {/* Current version */}
              <div className="relative flex items-center">
                <div className="flex-1 text-right pr-8">
                  <h3 className="text-2xl font-light text-red-400">Version 2.0</h3>
                  <p className="text-gray-500 mt-1">Current Build</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full ring-4 ring-red-500/20 animate-pulse"></div>
                <div className="flex-1 pl-8">
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• 2 Complete character routes</li>
                    <li>• 15+ CG scenes</li>
                    <li>• Basic save system</li>
                  </ul>
                </div>
              </div>

              {/* Upcoming */}
              <div className="relative flex items-center opacity-75">
                <div className="flex-1 text-right pr-8">
                  <h3 className="text-2xl font-light text-purple-400">Version 2.5</h3>
                  <p className="text-gray-600 mt-1">Q2 2025</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-700 rounded-full"></div>
                <div className="flex-1 pl-8">
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Morgana route completion</li>
                    <li>• Voice acting integration</li>
                    <li>• Gallery mode</li>
                  </ul>
                </div>
              </div>

              {/* Future */}
              <div className="relative flex items-center opacity-50">
                <div className="flex-1 text-right pr-8">
                  <h3 className="text-2xl font-light text-pink-400">Version 3.0</h3>
                  <p className="text-gray-700 mt-1">Q3 2025</p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full"></div>
                <div className="flex-1 pl-8">
                  <ul className="text-sm text-gray-600 space-y-1">
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
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header with Patreon branding */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">P</span>
              </div>
              <span className="text-sm text-gray-400 tracking-wider">OFFICIAL PATREON</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-light mb-6">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500">Inner Circle</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Unlock exclusive content, influence development, and become part of an intimate community 
              shaping the most seductive visual novel experience ever created
            </p>
          </div>

          {/* Patron count and goals */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-purple-800/30 rounded-lg p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-light text-purple-400 mb-2">127</div>
                  <p className="text-sm text-gray-400 tracking-wider">ACTIVE PATRONS</p>
                </div>
                <div>
                  <div className="text-4xl font-light text-pink-400 mb-2">$1,847</div>
                  <p className="text-sm text-gray-400 tracking-wider">MONTHLY SUPPORT</p>
                </div>
                <div>
                  <div className="text-4xl font-light text-red-400 mb-2">89%</div>
                  <p className="text-sm text-gray-400 tracking-wider">TO NEXT GOAL</p>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-8">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Voice Acting Implementation</span>
                  <span>$2,000/month</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-1000" style={{ width: '89%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced tier design */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Tier 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-b from-red-600/20 to-transparent rounded-lg transform rotate-3 group-hover:rotate-1 transition-transform"></div>
              <div className="relative bg-black border border-red-800/30 rounded-lg p-8 hover:border-red-600/50 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-light">Tempted Soul</h3>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                    <span className="text-lg">🔥</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <span className="text-4xl font-light text-red-400">$5</span>
                  <span className="text-gray-500">/month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-300 text-sm">Early access to all game updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-300 text-sm">Exclusive Discord role & channels</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-300 text-sm">Your name in game credits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-300 text-sm">Patron-only news & updates</span>
                  </li>
                </ul>

                <a href="https://www.patreon.com/rolltoseduce" target="_blank" rel="noopener noreferrer">
                  <button className="w-full py-3 border border-red-700 hover:bg-red-900/20 hover:border-red-600 transition-all text-red-400 hover:text-red-300 font-medium tracking-wider">
                    BECOME A PATRON
                  </button>
                </a>
              </div>
            </div>

            {/* Tier 2 - Featured */}
            <div className="group relative transform lg:scale-110 z-10">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                <span className="text-xs font-medium tracking-wider">MOST POPULAR</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-purple-600/30 to-pink-600/30 rounded-lg blur-xl"></div>
              <div className="relative bg-black border-2 border-purple-600/50 rounded-lg p-8 hover:border-purple-500 transition-all shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-light">Corrupted Heart</h3>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <span className="text-lg">💜</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <span className="text-4xl font-light text-purple-400">$15</span>
                  <span className="text-gray-500">/month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-200 text-sm font-medium">Everything from Tempted Soul</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-200 text-sm">Vote on story directions & features</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-200 text-sm">Exclusive NSFW art & scenes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-200 text-sm">HD wallpapers & concept art</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-200 text-sm">Behind-the-scenes content</span>
                  </li>
                </ul>

                <a href="https://www.patreon.com/rolltoseduce" target="_blank" rel="noopener noreferrer">
                  <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all text-white font-medium tracking-wider shadow-lg">
                    BECOME A PATRON
                  </button>
                </a>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-b from-pink-600/20 to-transparent rounded-lg transform -rotate-3 group-hover:-rotate-1 transition-transform"></div>
              <div className="relative bg-black border border-pink-800/30 rounded-lg p-8 hover:border-pink-600/50 transition-all">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-light">Damned Devotee</h3>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-600 to-red-600 flex items-center justify-center">
                    <span className="text-lg">👹</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <span className="text-4xl font-light text-pink-400">$30</span>
                  <span className="text-gray-500">/month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-300 text-sm">Everything from lower tiers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-300 text-sm">Design a background character</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-300 text-sm">Monthly video call with developer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-300 text-sm">Physical merchandise package</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 0z"/>
                    </svg>
                    <span className="text-gray-300 text-sm">Alpha/Beta access to new projects</span>
                  </li>
                </ul>

                <a href="https://www.patreon.com/rolltoseduce" target="_blank" rel="noopener noreferrer">
                  <button className="w-full py-3 border border-pink-700 hover:bg-pink-900/20 hover:border-pink-600 transition-all text-pink-400 hover:text-pink-300 font-medium tracking-wider">
                    BECOME A PATRON
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Benefits showcase */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl font-light text-center mb-12">
              Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Patron Benefits</span>
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl mb-3">🎨</div>
                <h4 className="text-lg font-medium text-gray-200 mb-2">Exclusive Art</h4>
                <p className="text-sm text-gray-400">Access to 50+ patron-only CGs and sketches</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl mb-3">🗳️</div>
                <h4 className="text-lg font-medium text-gray-200 mb-2">Shape the Story</h4>
                <p className="text-sm text-gray-400">Vote on character routes and plot developments</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl mb-3">💬</div>
                <h4 className="text-lg font-medium text-gray-200 mb-2">Dev Access</h4>
                <p className="text-sm text-gray-400">Direct communication with the development team</p>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl mb-3">🎁</div>
                <h4 className="text-lg font-medium text-gray-200 mb-2">Early Access</h4>
                <p className="text-sm text-gray-400">Play new content weeks before public release</p>
              </div>
            </div>
          </div>

          {/* Social proof */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-400 mb-4">Join 127+ patrons supporting Roll to Seduce</p>
            <div className="flex justify-center gap-4">
              <a href="https://www.patreon.com/rolltoseduce" target="_blank" rel="noopener noreferrer" 
                 className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff424d] hover:bg-[#e63946] transition-colors rounded-full text-white font-medium">
                <span>Support on Patreon</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <button className="px-6 py-3 border border-gray-700 hover:border-gray-600 rounded-full text-gray-400 hover:text-gray-300 transition-all">
                Alternative Platforms
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="py-24 px-8 bg-gradient-to-t from-red-950/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-light mb-6">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">Updates</span>
            </h2>
            <p className="text-xl text-gray-400">
              Fresh from the development hell
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 p-8 hover:border-red-800/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-red-900/30 text-red-400 text-xs tracking-wider">PATCH NOTES</span>
                <span className="text-xs text-gray-600">2 days ago</span>
              </div>
              <h3 className="text-2xl font-light mb-3">Version 2.0 Released!</h3>
              <p className="text-gray-400 mb-4">
                Major update bringing Lilith's complete route with 7 new CG scenes, 
                improved dialogue system, and bug fixes based on community feedback.
              </p>
              <button className="text-sm text-red-400 hover:text-red-300 transition-colors">
                Read full notes →
              </button>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 p-8 hover:border-purple-800/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-purple-900/30 text-purple-400 text-xs tracking-wider">DEV BLOG</span>
                <span className="text-xs text-gray-600">1 week ago</span>
              </div>
              <h3 className="text-2xl font-light mb-3">Behind the Scenes: Morgana</h3>
              <p className="text-gray-400 mb-4">
                Dive into the creative process behind our fallen angel. See concept art, 
                story drafts, and learn how community feedback shaped her character.
              </p>
              <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                Continue reading →
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 border border-gray-800 hover:border-red-800/50 text-gray-400 hover:text-red-400 transition-all tracking-wider">
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
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">Cult</span>
            </h2>
            <p className="text-xl text-gray-400">
              A thriving community of sinners shaping the game together
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-gradient-to-br from-gray-900/30 to-black border border-gray-800">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-2xl font-light mb-2">Discord Community</h3>
              <p className="text-gray-400 mb-4">2,500+ active members</p>
              <p className="text-sm text-gray-500">
                Daily discussions, exclusive previews, and direct dev interaction
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-gray-900/30 to-black border border-gray-800">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-2xl font-light mb-2">Fan Creations</h3>
              <p className="text-gray-400 mb-4">500+ artworks</p>
              <p className="text-sm text-gray-500">
                Community showcase featuring incredible fan art and stories
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-gray-900/30 to-black border border-gray-800">
              <div className="text-4xl mb-4">🗳️</div>
              <h3 className="text-2xl font-light mb-2">Shape Development</h3>
              <p className="text-gray-400 mb-4">Weekly polls</p>
              <p className="text-sm text-gray-500">
                Vote on features, characters, and story directions
              </p>
            </div>
          </div>

          {/* Newsletter signup */}
          <div className="max-w-2xl mx-auto text-center p-8 bg-gradient-to-r from-red-950/20 to-purple-950/20 border border-red-900/30">
            <h3 className="text-2xl font-light mb-4">Stay Corrupted</h3>
            <p className="text-gray-400 mb-6">
              Monthly dev updates, exclusive art, and early access announcements
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="your.soul@email.com" 
                className="flex-1 px-4 py-3 bg-black/50 border border-gray-800 focus:border-red-800 outline-none transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 transition-all">
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Download section */}
      <section className="py-24 px-8 bg-gradient-to-t from-red-950/10 to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-6xl font-serif font-light mb-8">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 italic">Play?</span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-12">
            Experience the world of Roll to Seduce in stunning visual novel format
          </p>

          {/* Demo download */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="p-8 bg-gradient-to-br from-gray-900/50 to-black border border-red-800/30 hover:border-red-600/50 transition-all">
              <h3 className="text-3xl font-light mb-4 text-gray-100">Demo Version 2.0</h3>
              <p className="text-gray-300 text-lg mb-6">Experience the beginning of your corruption</p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8 text-left">
                <div className="text-center">
                  <div className="text-2xl text-red-400 mb-2">2</div>
                  <p className="text-sm text-gray-300">Full Chapters</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-purple-400 mb-2">15+</div>
                  <p className="text-sm text-gray-300">CG Scenes</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-pink-400 mb-2">4</div>
                  <p className="text-sm text-gray-300">Characters</p>
                </div>
              </div>
              
              <div className="mb-8 p-4 bg-black/30 rounded">
                <p className="text-sm text-gray-300 mb-2">Demo includes:</p>
                <ul className="text-sm text-gray-200 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">♦</span>
                    <span>First two chapters of each character route</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">♦</span>
                    <span>Preview of the gallery system with select scenes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-400 mt-0.5">♦</span>
                    <span>Full save/load functionality to continue in full version</span>
                  </li>
                </ul>
              </div>
              
              <button className="w-full py-4 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 transition-all text-white font-medium tracking-wider text-lg">
                DOWNLOAD DEMO NOW
              </button>
              
              <p className="text-xs text-gray-400 mt-4">
                Available for Windows, macOS, and Linux • No registration required
              </p>
            </div>
          </div>

          {/* Community links */}
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
            <div className="p-6 border border-gray-800 hover:border-purple-800/50 transition-all">
              <h4 className="text-xl font-light mb-3 text-purple-300">Join Our Discord</h4>
              <p className="text-gray-300 mb-4">
                Connect with 2,500+ players, share fan art, and get development updates
              </p>
              <button className="text-purple-400 hover:text-purple-300 transition-colors text-sm tracking-wider">
                JOIN COMMUNITY →
              </button>
            </div>
            
            <div className="p-6 border border-gray-800 hover:border-pink-800/50 transition-all">
              <h4 className="text-xl font-light mb-3 text-pink-300">Support Development</h4>
              <p className="text-gray-300 mb-4">
                Help us create more content through Patreon or SubscribeStar
              </p>
              <button className="text-pink-400 hover:text-pink-300 transition-colors text-sm tracking-wider">
                LEARN MORE →
              </button>
            </div>
          </div>

          {/* System requirements */}
          <div className="max-w-2xl mx-auto text-left p-6 bg-gradient-to-br from-gray-900/30 to-black/50 border border-gray-800">
            <h4 className="text-sm tracking-wider text-red-400/80 mb-3 font-medium">MINIMUM REQUIREMENTS</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">OS:</span> <span className="text-gray-200">Windows 7+, macOS 10.12+, Ubuntu 16.04+</span>
              </div>
              <div>
                <span className="text-gray-400">Processor:</span> <span className="text-gray-200">2.0 GHz Core 2 Duo</span>
              </div>
              <div>
                <span className="text-gray-400">Memory:</span> <span className="text-gray-200">2 GB RAM</span>
              </div>
              <div>
                <span className="text-gray-400">Storage:</span> <span className="text-gray-200">2 GB available space</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-xs text-purple-400">
                <span className="inline-block mr-2">🎮</span>
                Built with Ren'Py 8.1 • Full controller support • Auto-save functionality
              </p>
            </div>
          </div>
          
          <div className="mt-12 space-y-2">
            <p className="text-sm text-gray-300">
              <span className="text-gray-400">Available on:</span> Steam • Itch.io • Patreon • Direct Download
            </p>
            <p className="text-sm text-red-400/80 font-medium">
              ⚠️ This game contains adult content and is intended for mature audiences only (18+)
            </p>
          </div>
        </div>
      </section>

      {/* Character modal */}
      {selectedCharacter && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedCharacter(null)}
        >
          <div 
            className="relative w-full max-w-5xl bg-black border border-red-900/30 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCharacter(null)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white z-10 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="grid md:grid-cols-2">
              {/* Left side - Character art placeholder */}
              <div 
                className="relative min-h-[600px] overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${selectedCharacter.colors[0]}20 0%, ${selectedCharacter.colors[1]}20 100%)`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-12">
                  <h3 className="text-6xl font-serif font-thin mb-2">{selectedCharacter.name}</h3>
                  <p className="text-2xl font-light" style={{ color: selectedCharacter.colors[0] }}>
                    {selectedCharacter.title}
                  </p>
                </div>
              </div>
              
              {/* Right side - Character details */}
              <div className="p-12 space-y-8">
                <div>
                  <h4 className="text-xs tracking-[0.3em] text-gray-500 mb-3">SUPERNATURAL POWER</h4>
                  <p className="text-2xl font-light" style={{ color: selectedCharacter.colors[0] }}>
                    {selectedCharacter.power}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xs tracking-[0.3em] text-gray-500 mb-3">DESCRIPTION</h4>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {selectedCharacter.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xs tracking-[0.3em] text-gray-500 mb-3">STORY ROUTE</h4>
                  <p className="text-gray-400">{selectedCharacter.route}</p>
                </div>
                
                <div className="py-8 border-y border-gray-800">
                  <p className="text-2xl italic text-gray-300">
                    "{selectedCharacter.quote}"
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-light mb-1" style={{ color: selectedCharacter.colors[0] }}>7</div>
                    <div className="text-xs text-gray-500">CHAPTERS</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light mb-1" style={{ color: selectedCharacter.colors[0] }}>5</div>
                    <div className="text-xs text-gray-500">ENDINGS</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light mb-1" style={{ color: selectedCharacter.colors[0] }}>18+</div>
                    <div className="text-xs text-gray-500">SCENES</div>
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
                  <div className="absolute inset-[1px] bg-black" />
                  <span className="relative text-white tracking-wider">
                    CHOOSE {selectedCharacter.name.toUpperCase()}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-900 py-12 px-8 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-red-400 mb-4 tracking-wider text-sm">GAME</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Download Demo</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Early Access</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Gallery</a></li>
                <li><a href="#" className="text-gray-400 hover:text-red-400 transition-colors">Soundtrack</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-purple-400 mb-4 tracking-wider text-sm">COMMUNITY</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Discord</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Twitter/X</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Reddit</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Fan Art</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-pink-400 mb-4 tracking-wider text-sm">SUPPORT</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Patreon</a></li>
                <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">SubscribeStar</a></li>
                <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Buy Me a Coffee</a></li>
                <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Merch Store</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-400 mb-4 tracking-wider text-sm">INFO</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">Press Kit</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 mt-8 border-t border-gray-900 text-center space-y-2">
            <p className="text-sm text-gray-300">
              © 2025 Roll to Seduce • Made with <span className="text-red-500">♥</span> and <span className="text-purple-400">Ren'Py</span>
            </p>
            <p className="text-sm text-red-400 font-medium">
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
          background: #0a0a0a;
        }

        ::-webkit-scrollbar-thumb {
          background: #7f1d1d;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #991b1b;
        }
      `}</style>
    </div>
  );
};

export default RollToSeduceWebsite;