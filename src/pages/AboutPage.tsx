import React, { useEffect } from 'react';
import { HiUserGroup, HiStar, HiTruck, HiShieldCheck, HiAcademicCap, HiGlobe, HiCheckCircle, HiCurrencyDollar, HiHeart, HiLightningBolt, HiChatAlt2 } from 'react-icons/hi';
import { FiArrowRight, FiClock, FiTruck, FiMessageCircle } from 'react-icons/fi';

export function AboutPage() {
  useEffect(() => {
    // JavaScript fallback for browsers that don't support @scroll-timeline
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      // Parallax effect for hero background
      const heroParallax = document.querySelector('.hero-parallax-bg');
      if (heroParallax) {
        (heroParallax as HTMLElement).style.transform = `translateY(${rate}px)`;
      }
      
      // Animate elements on scroll
      const animatedElements = document.querySelectorAll('.scroll-animate');
      animatedElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animate-in');
        } else {
          element.classList.remove('animate-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-white pt-20 scroll-container">
      {/* SEO Meta Information */}
      <div style={{ display: 'none' }}>
        <h1>Rurident Health Supplies - More Than Tools. A Legacy in Every Smile.</h1>
        <meta name="description" content="Rurident exists for dental professionals - artists of confidence, engineers of trust, guardians of every smile. Premium tools that honor your craft." />
        <meta name="keywords" content="dental equipment Kenya, dental supplies Nairobi, professional dental tools, dental artistry, precision instruments" />
      </div>

      {/* Hero Section with Parallax Background */}
      <div className="hero-section relative overflow-hidden min-h-screen flex items-center">
        {/* Parallax Background Layers */}
        <div className="hero-parallax-bg absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-600">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="floating-element-1 absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="floating-element-2 absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-white w-full">
          <div className="container-max py-16 md:py-24">
            <div className="text-center">
              <div className="hero-badge scroll-animate mb-8">
                <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                  <HiHeart className="w-6 h-6 text-red-200 animate-pulse" />
                  <span className="font-medium text-lg">About Us</span>
                </div>
              </div>
              
              <h1 className="hero-title scroll-animate text-4xl sm:text-5xl lg:text-7xl font-bold mb-8">
                <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
                  More Than Tools.
                </span>
                <br />
                <span className="text-white">
                  A Legacy in Every Smile.
                </span>
              </h1>
              
              <p className="hero-subtitle scroll-animate text-xl sm:text-2xl text-orange-100 max-w-4xl mx-auto mb-8">
                For the artists of confidence. The engineers of trust. The guardians of every smile.
              </p>
              
              <div className="hero-buttons scroll-animate flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Discover Our Story
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105">
                  View Our Tools
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="who-we-are-section container-max py-8 md:py-16 lg:py-24">
        <div className="text-center mb-8 md:mb-16">
          <div className="section-badge scroll-animate inline-flex items-center space-x-3 bg-orange-100 text-orange-800 rounded-full px-4 py-2 md:px-6 md:py-3 mb-4 md:mb-8">
            <HiUserGroup className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-medium text-sm md:text-base">Who We Are</span>
          </div>
          <h2 className="section-title scroll-animate text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-8 leading-tight">
            <span className="block sm:inline">Dentists and dental technicians are not just professionals</span><br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              you are artists of confidence
            </span>
          </h2>
          <p className="section-subtitle scroll-animate text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-4 md:mb-8">
            engineers of trust, and guardians of every smile.
          </p>
          <div className="section-highlight scroll-animate text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-8">
            At Rurident, we exist for you.
          </div>
          <p className="section-description scroll-animate text-sm sm:text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Not to simply sell instruments, materials, or devices — but to equip your hands with tools 
            that feel like extensions of your skill. Because in your work, every millimeter matters. 
            Every detail counts. Every patient remembers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <div className="card-animate scroll-animate bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 md:p-6 lg:p-8 border-l-4 border-orange-500 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <HiHeart className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">For Dentists</h3>
              </div>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                You are the face patients remember. The calm voice when fear takes over. 
                The healer who makes them believe in smiling again.
              </p>
            </div>
            
            <div className="card-animate scroll-animate bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 md:p-6 lg:p-8 border-l-4 border-red-500 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <HiAcademicCap className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">For Dental Technicians</h3>
              </div>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                You are the unsung sculptors. The silent perfectionists behind every crown, 
                denture, and masterpiece that leaves the lab. Patients may never know your name, 
                but they live every day with the precision of your craft.
              </p>
            </div>
          </div>
          
          <div className="relative mt-6 lg:mt-0">
            <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl md:rounded-2xl blur-xl md:blur-2xl opacity-20"></div>
            <div className="featured-card scroll-animate relative bg-white rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl p-4 md:p-6 lg:p-8 text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <HiShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">We honor both.</h3>
              <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
                That's why Rurident exists — to make sure your tools match your talent.
              </p>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg md:rounded-xl p-4 md:p-6">
                <p className="text-sm md:text-base text-orange-800 font-medium">
                  "Tools that never betray your hands, so your patients see only your skill, never your struggle."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why We Exist Section with Sticky Elements */}
      <div className="why-we-exist-section bg-gradient-to-r from-gray-900 to-black text-white py-8 md:py-16 lg:py-24 sticky-section">
        <div className="container-max">
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <div className="section-badge scroll-animate inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3 mb-4 md:mb-8">
              <HiLightningBolt className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
              <span className="font-medium text-sm md:text-base">Why We Exist</span>
            </div>
            <h2 className="section-title scroll-animate text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-8">
              Because every detail matters
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12 lg:mb-16">
            <div className="card-slide-left scroll-animate bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20">
              <div className="text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4 lg:mb-6">👨‍⚕️</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-4 text-yellow-400">1. You are the face patients remember.</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                The calm voice when fear takes over. The healer who makes them believe in smiling again.
              </p>
            </div>
            
            <div className="card-slide-right scroll-animate bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20">
              <div className="text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4 lg:mb-6">🎨</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-4 text-yellow-400">2. You are the unsung sculptors.</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                The silent perfectionists behind every crown, denture, and masterpiece that leaves the lab. 
                Patients may never know your name, but they live every day with the precision of your craft.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="featured-highlight scroll-animate inline-block bg-gradient-to-r from-orange-500 to-red-500 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-xl md:shadow-2xl">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-4">We honor both.</h3>
              <p className="text-base sm:text-lg md:text-xl mb-3 md:mb-6">
                That's why Rurident exists — to make sure your tools match your talent.
              </p>
              <div className="bg-black/30 rounded-lg md:rounded-xl p-3 md:p-4">
                <p className="text-sm sm:text-base md:text-lg font-medium text-yellow-200">
                  "Your work isn't just about precision — it's about perfection."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fast Delivery Section */}
      <div className="delivery-section container-max py-8 md:py-16 lg:py-24">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <div className="section-badge scroll-animate inline-flex items-center space-x-3 bg-blue-100 text-blue-800 rounded-full px-4 py-2 md:px-6 md:py-3 mb-4 md:mb-8">
            <FiTruck className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-medium text-sm md:text-base">Fast Delivery</span>
          </div>
          <h2 className="section-title scroll-animate text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-8">
            Because Patients Don't Wait
          </h2>
          <p className="section-subtitle scroll-animate text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-6 md:mb-8 lg:mb-12">
            We know what's at stake when you're waiting on supplies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="card-slide-up scroll-animate bg-red-50 border-l-4 border-red-400 p-6 rounded-r-xl">
              <p className="text-lg text-gray-800 leading-relaxed">
                An empty tray in a dental chair or a half-finished model in the lab isn't just "inconvenient" — 
                <span className="font-bold text-red-600"> it's stress, delays, and trust on the line.</span>
              </p>
            </div>
            
            <div className="card-slide-up scroll-animate bg-green-50 border-l-4 border-green-400 p-6 rounded-r-xl">
              <p className="text-lg text-gray-800 leading-relaxed">
                That's why at Rurident, once your payment clears, your order is already flying your way. 
                <span className="font-bold text-green-600">🚚💨</span>
              </p>
            </div>
            
            <div className="card-slide-up scroll-animate bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-xl">
              <p className="text-lg font-bold text-gray-900">
                We deliver like your reputation depends on it — because it does.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-2xl opacity-20"></div>
            <div className="featured-card-scale scroll-animate relative bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiClock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-blue-600">2-4 hrs</div>
                    <div className="text-sm text-gray-600">Nairobi CBD</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-purple-600">24 hrs</div>
                    <div className="text-sm text-gray-600">Nationwide</div>
                  </div>
                </div>
                <p className="text-gray-700">
                  Your tools arrive before your next patient does.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Your Voice Shapes Us Section */}
      <div className="voice-section bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-16 md:py-24">
        <div className="container-max">
          <div className="text-center mb-16">
            <div className="section-badge scroll-animate inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <FiMessageCircle className="w-5 h-5 text-purple-300" />
              <span className="font-medium">Your Voice Shapes Us</span>
            </div>
            <h2 className="section-title scroll-animate text-4xl md:text-5xl font-bold mb-8">
              Dentists and technicians know better than anyone<br />
              <span className="text-purple-300">what works and what fails.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="card-fade-up scroll-animate text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiChatAlt2 className="w-10 h-10 text-purple-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Your opinions aren't "feedback" to us</h3>
              <p className="text-lg text-purple-100">They're instructions.</p>
            </div>
            
            <div className="card-fade-up scroll-animate text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiCheckCircle className="w-10 h-10 text-blue-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">We listen, we adjust</h3>
              <p className="text-lg text-blue-100">and we grow because you demand it.</p>
            </div>
            
            <div className="card-fade-up scroll-animate text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiStar className="w-10 h-10 text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Your work isn't just about precision</h3>
              <p className="text-lg text-yellow-100">it's about perfection.</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="featured-highlight scroll-animate bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <p className="text-xl font-medium text-yellow-200 mb-4">
                "Perfection leaves no room for suppliers who don't listen."
              </p>
              <p className="text-lg text-gray-300">
                That's why your voice shapes every decision we make.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Promise Section */}
      <div className="promise-section container-max py-16 md:py-24">
        <div className="text-center mb-16">
          <div className="section-badge scroll-animate inline-flex items-center space-x-3 bg-green-100 text-green-800 rounded-full px-6 py-3 mb-8">
            <HiShieldCheck className="w-5 h-5" />
            <span className="font-medium">Our Promise to You</span>
          </div>
          <h2 className="section-title scroll-animate text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            More than promises.<br />
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              Guarantees.
            </span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="promise-card scroll-animate bg-white rounded-2xl shadow-xl p-8 border-t-4 border-green-500 transform hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiHeart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tools that never betray your hands</h3>
              <p className="text-gray-700">
                so your patients see only your skill, never your struggle.
              </p>
            </div>
          </div>
          
          <div className="promise-card scroll-animate bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-500 transform hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiStar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Materials and devices that respect your artistry</h3>
              <p className="text-gray-700">
                so every restoration is as strong as it is beautiful.
              </p>
            </div>
          </div>
          
          <div className="promise-card scroll-animate bg-white rounded-2xl shadow-xl p-8 border-t-4 border-purple-500 transform hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiUserGroup className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">A partner who values your craft</h3>
              <p className="text-gray-700">
                as much as you do.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Dilemma Section */}
      <div className="dilemma-section bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-16 md:py-24">
        <div className="container-max">
          <div className="text-center mb-16">
            <div className="section-badge scroll-animate inline-flex items-center space-x-3 bg-yellow-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <HiLightningBolt className="w-5 h-5 text-yellow-400" />
              <span className="font-medium text-yellow-300">The Dilemma We Leave You With</span>
            </div>
            <h2 className="final-title scroll-animate text-4xl md:text-6xl font-bold mb-12 leading-tight">
              Would you rather rely on tools<br />
              <span className="text-gray-400">that get the job done…</span><br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                or instruments that elevate you
              </span><br />
              from being a professional…<br />
              <span className="text-yellow-300">to being unforgettable?</span>
            </h2>
            
            <div className="max-w-2xl mx-auto mb-12">
              <div className="final-answer scroll-animate bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <p className="text-2xl font-bold text-yellow-300 mb-4">
                  We already know your answer. 😉
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="brand-showcase scroll-animate inline-block bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-1 shadow-2xl">
                <div className="bg-black rounded-3xl px-8 py-6">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <span className="text-3xl">✨</span>
                    <h3 className="text-3xl md:text-4xl font-bold">Rurident</h3>
                    <span className="text-3xl">✨</span>
                  </div>
                  <p className="text-xl md:text-2xl font-medium text-gray-300 mb-2">
                    More Than Tools.
                  </p>
                  <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    A Legacy in Every Smile.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="final-cta scroll-animate mt-16 flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-xl">
                Start Your Legacy Today
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
                Explore Our Tools
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Advanced CSS Scroll-Driven Animations */}
      <style>{`
        /* Scroll-driven animations using modern CSS */
        @supports (animation-timeline: scroll()) {
          .scroll-container {
            scroll-timeline: --page-scroll;
          }
          
          .hero-parallax-bg {
            animation: parallax-hero linear both;
            animation-timeline: --page-scroll;
            animation-range: 0% 100%;
          }
          
          .floating-element-1 {
            animation: float-1 linear both;
            animation-timeline: --page-scroll;
            animation-range: 0% 50%;
          }
          
          .floating-element-2 {
            animation: float-2 linear both;
            animation-timeline: --page-scroll;
            animation-range: 0% 60%;
          }
          
          .hero-badge {
            animation: fade-slide-down linear both;
            animation-timeline: --page-scroll;
            animation-range: 0% 20%;
          }
          
          .hero-title {
            animation: scale-fade-in linear both;
            animation-timeline: --page-scroll;
            animation-range: 0% 25%;
          }
          
          .hero-subtitle {
            animation: fade-slide-up linear both;
            animation-timeline: --page-scroll;
            animation-range: 5% 30%;
          }
          
          .hero-buttons {
            animation: fade-scale-in linear both;
            animation-timeline: --page-scroll;
            animation-range: 10% 35%;
          }
          
          .card-animate {
            animation: card-rise linear both;
            animation-timeline: --page-scroll;
            animation-range: 20% 60%;
          }
          
          .card-slide-left {
            animation: slide-in-left linear both;
            animation-timeline: --page-scroll;
            animation-range: 30% 70%;
          }
          
          .card-slide-right {
            animation: slide-in-right linear both;
            animation-timeline: --page-scroll;
            animation-range: 35% 75%;
          }
          
          .card-slide-up {
            animation: slide-up-fade linear both;
            animation-timeline: --page-scroll;
            animation-range: 40% 80%;
          }
          
          .card-fade-up {
            animation: fade-up-scale linear both;
            animation-timeline: --page-scroll;
            animation-range: 50% 90%;
          }
          
          .featured-card {
            animation: featured-entrance linear both;
            animation-timeline: --page-scroll;
            animation-range: 25% 65%;
          }
          
          .featured-card-scale {
            animation: scale-rotate linear both;
            animation-timeline: --page-scroll;
            animation-range: 45% 85%;
          }
          
          .featured-highlight {
            animation: highlight-glow linear both;
            animation-timeline: --page-scroll;
            animation-range: 35% 75%;
          }
          
          .promise-card {
            animation: promise-reveal linear both;
            animation-timeline: --page-scroll;
            animation-range: 60% 95%;
          }
          
          .section-badge {
            animation: badge-pop linear both;
            animation-timeline: --page-scroll;
            animation-range: 15% 85%;
          }
          
          .section-title {
            animation: title-expand linear both;
            animation-timeline: --page-scroll;
            animation-range: 20% 80%;
          }
          
          .final-title {
            animation: final-dramatic linear both;
            animation-timeline: --page-scroll;
            animation-range: 70% 100%;
          }
          
          .sticky-section {
            position: sticky;
            top: 0;
            z-index: 1;
          }
        }
        
        /* Keyframe definitions */
        @keyframes parallax-hero {
          0% { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-200px) scale(1.1); }
        }
        
        @keyframes float-1 {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          100% { transform: translateY(-150px) rotate(180deg); opacity: 0.1; }
        }
        
        @keyframes float-2 {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
          100% { transform: translateY(100px) rotate(-90deg); opacity: 0.05; }
        }
        
        @keyframes fade-slide-down {
          0% { opacity: 0; transform: translateY(-50px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0px) scale(1); }
        }
        
        @keyframes scale-fade-in {
          0% { opacity: 0; transform: scale(0.8) translateY(30px); }
          100% { opacity: 1; transform: scale(1) translateY(0px); }
        }
        
        @keyframes fade-slide-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0px); }
        }
        
        @keyframes fade-scale-in {
          0% { opacity: 0; transform: scale(0.9) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0px); }
        }
        
        @keyframes card-rise {
          0% { opacity: 0; transform: translateY(60px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0px) scale(1); }
        }
        
        @keyframes slide-in-left {
          0% { opacity: 0; transform: translateX(-80px) rotateY(15deg); }
          100% { opacity: 1; transform: translateX(0px) rotateY(0deg); }
        }
        
        @keyframes slide-in-right {
          0% { opacity: 0; transform: translateX(80px) rotateY(-15deg); }
          100% { opacity: 1; transform: translateX(0px) rotateY(0deg); }
        }
        
        @keyframes slide-up-fade {
          0% { opacity: 0; transform: translateY(50px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0px) scale(1); }
        }
        
        @keyframes fade-up-scale {
          0% { opacity: 0; transform: translateY(40px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0px) scale(1); }
        }
        
        @keyframes featured-entrance {
          0% { opacity: 0; transform: translateY(80px) scale(0.9) rotateX(10deg); }
          100% { opacity: 1; transform: translateY(0px) scale(1) rotateX(0deg); }
        }
        
        @keyframes scale-rotate {
          0% { opacity: 0; transform: scale(0.8) rotate(-5deg) translateY(40px); }
          100% { opacity: 1; transform: scale(1) rotate(0deg) translateY(0px); }
        }
        
        @keyframes highlight-glow {
          0% { opacity: 0; transform: scale(0.95); box-shadow: 0 0 0 rgba(255, 165, 0, 0); }
          100% { opacity: 1; transform: scale(1); box-shadow: 0 20px 40px rgba(255, 165, 0, 0.3); }
        }
        
        @keyframes promise-reveal {
          0% { opacity: 0; transform: translateY(60px) rotateX(20deg); }
          100% { opacity: 1; transform: translateY(0px) rotateX(0deg); }
        }
        
        @keyframes badge-pop {
          0% { opacity: 0; transform: scale(0.8) translateY(-20px); }
          100% { opacity: 1; transform: scale(1) translateY(0px); }
        }
        
        @keyframes title-expand {
          0% { opacity: 0; transform: scaleX(0.8) translateY(30px); }
          100% { opacity: 1; transform: scaleX(1) translateY(0px); }
        }
        
        @keyframes final-dramatic {
          0% { opacity: 0; transform: scale(0.9) translateY(50px); }
          50% { opacity: 0.5; transform: scale(0.95) translateY(25px); }
          100% { opacity: 1; transform: scale(1) translateY(0px); }
        }
        
        /* Fallback animations for browsers without scroll-timeline support */
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .scroll-animate.animate-in {
          opacity: 1;
          transform: translateY(0px);
        }
        
        /* Enhanced hover effects */
        .card-animate:hover,
        .featured-card:hover,
        .promise-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Additional responsive animations */
        @media (max-width: 768px) {
          .hero-parallax-bg {
            transform: none !important;
          }
          
          .scroll-animate {
            transform: translateY(20px);
          }
        }
        
        /* Legacy fadeIn animations */
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInDown {
          animation: fadeInDown 1s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}