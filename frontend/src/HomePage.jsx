import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';

import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';
import { Card, CardContent } from './components/ui/Card';
// Removed QubitAnimation import since assets are removed
// import QubitAnimation from './components/QubitAnimation';
import ManimVisualizer from './components/ManimVisualizer';

import '../styles/globals.css';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const siteNameRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const finalName = 'ASKQUBITS';

    const tl = gsap.timeline();

    finalName.split('').forEach((letter, index) => {
      tl.to(siteNameRef.current, {
        duration: 0.1,
        onUpdate: function () {
          const currentText = siteNameRef.current.innerText.split('');
          currentText[index] = chars[Math.floor(Math.random() * 26)];
          siteNameRef.current.innerText = currentText.join('');
        },
        onComplete: function () {
          const currentText = siteNameRef.current.innerText.split('');
          currentText[index] = letter;
          siteNameRef.current.innerText = currentText.join('');
        },
        repeat: 5,
      });
    });

    gsap.from(contentRef.current.children, {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from('.scroll-trigger', {
      scrollTrigger: {
        trigger: '.scroll-trigger',
        start: 'top bottom',
        end: 'center center',
        scrub: 1,
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });
  }, []);

  const handleQuerySubmit = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setReport(null);

    try {
      const response = await axios.post('/api/getReport', { query });
      setReport(response.data.report);
    } catch (error) {
      console.error('Error fetching report:', error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-dark text-white min-h-screen relative">
      {/* Background grid pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern"></div>
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              animation: `float ${Math.random() * 20 + 10}s linear infinite`,
            }}
          />
        ))}
      </div>

      <header className="p-6 text-center relative z-10">
        <h1
          ref={siteNameRef}
          className="text-5xl font-bold tracking-wider bg-clip-text"
          style={{
            backgroundImage: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            color: 'transparent',
          }}
        >
          ASKQUBITS
        </h1>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div ref={contentRef} className="max-w-2xl w-full space-y-8">
          <h2
            className="text-3xl font-semibold text-center bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(to right, #bfdbfe, #ddd6fe)',
              color: 'transparent',
            }}
          >
            Ask anything, get quantum answers
          </h2>

          <div className="relative">
            <Input
              type="text"
              placeholder="Enter your quantum query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-opacity-5 border-gray-700 text-white placeholder-gray-400 rounded-full py-2 px-4"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: '#374151',
                outline: 'none',
              }}
            />
            <Button
              onClick={handleQuerySubmit}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full px-4 py-1 text-sm"
              style={{
                backgroundImage: 'linear-gradient(to right, #2563eb, #6b21a8)',
                color: '#fff',
                border: 'none',
              }}
            >
              Ask
            </Button>
          </div>

          {/* Display loading indicator */}
          {loading && (
            <div className="text-center mt-4">
              <p className="text-gray-300">Generating your report...</p>
            </div>
          )}

          {/* Display the report if available */}
          {report && (
            <div
              className="p-4 bg-opacity-5 rounded-lg mt-4"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">Report for "{query}"</h3>
              <p className="text-gray-300 whitespace-pre-line">{report}</p>
            </div>
          )}

          {/* Display Manim visualization */}
          {query && <ManimVisualizer query={query} />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 scroll-trigger">
            <Card
              className="bg-opacity-5 rounded-lg overflow-hidden"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: '#374151',
              }}
            >
              <CardContent className="p-4">
                <h3
                  className="text-lg font-semibold mb-1 bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #93c5fd, #c4b5fd)',
                    color: 'transparent',
                  }}
                >
                  Tesla Stock Analysis
                </h3>
                <p className="text-gray-300 text-sm">
                  Get quantum insights on Tesla's stock performance and predictions.
                </p>
              </CardContent>
            </Card>
            <Card
              className="bg-opacity-5 rounded-lg overflow-hidden"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: '#374151',
              }}
            >
              <CardContent className="p-4">
                <h3
                  className="text-lg font-semibold mb-1 bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #93c5fd, #c4b5fd)',
                    color: 'transparent',
                  }}
                >
                  Market Volatility Forecast
                </h3>
                <p className="text-gray-300 text-sm">
                  Predict market volatility using quantum algorithms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="p-4 text-center text-gray-400 relative z-10 text-sm">
        © 2023 askQubits. All rights entangled.
      </footer>

      {/* Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(5px, 5px);
          }
          50% {
            transform: translate(0, 10px);
          }
          75% {
            transform: translate(-5px, 5px);
          }
        }
        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.1) 1px,
              transparent 1px
            );
          background-size: 20px 20px;
          animation: glow 4s ease-in-out infinite alternate;
        }
        @keyframes glow {
          0% {
            opacity: 0.3;
          }
          100% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
