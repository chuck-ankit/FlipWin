import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Coins, Menu, X, Wallet, GamepadIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useWallet } from '@/context/WalletContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isConnected, isDemoAccount, balance, connectWallet, connectDemo, disconnectWallet } = useWallet();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'App', path: '/app' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-5'
      )}
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <Coins className="h-8 w-8 text-primary" />
          <span className="font-heading font-bold text-xl">FlipWin</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {location.pathname === '/app' ? (
            <div className="flex items-center space-x-4">
              {isConnected && (
                <div className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {balance.toFixed(2)} SOL {isDemoAccount ? '(Demo)' : ''}
                </div>
              )}
              {isConnected ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={disconnectWallet}
                >
                  Disconnect
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={connectWallet}
                    className="glow-button"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect Wallet
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={connectDemo}
                  >
                    <GamepadIcon className="mr-2 h-4 w-4" />
                    Demo
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Button asChild className="glow-button">
              <Link to="/app">Launch App</Link>
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-md md:hidden flex flex-col p-5 shadow-lg"
            >
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary p-2',
                      location.pathname === link.path
                        ? 'text-primary bg-primary/10 rounded-md'
                        : 'text-muted-foreground'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                {location.pathname === '/app' ? (
                  <div className="flex flex-col space-y-3 pt-3 border-t border-border">
                    {isConnected && (
                      <div className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        {balance.toFixed(2)} SOL {isDemoAccount ? '(Demo)' : ''}
                      </div>
                    )}
                    {isConnected ? (
                      <Button
                        variant="outline"
                        onClick={disconnectWallet}
                      >
                        Disconnect
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="default"
                          onClick={connectWallet}
                          className="glow-button"
                        >
                          <Wallet className="mr-2 h-4 w-4" />
                          Connect Wallet
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={connectDemo}
                        >
                          <GamepadIcon className="mr-2 h-4 w-4" />
                          Play Demo
                        </Button>
                      </>
                    )}
                  </div>
                ) : (
                  <Button asChild className="mt-3 glow-button">
                    <Link to="/app" onClick={() => setMobileMenuOpen(false)}>
                      Launch App
                    </Link>
                  </Button>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}