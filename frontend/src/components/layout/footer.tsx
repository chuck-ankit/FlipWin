import { Link } from 'react-router-dom';
import { Coins, Github, Twitter, Disc as Discord } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Coins className="h-8 w-8 text-primary" />
              <span className="font-heading font-bold text-xl">FlipWin</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Experience the thrill of betting on Solana with our secure and transparent coin flip platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Discord className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="font-heading font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/app" className="text-muted-foreground hover:text-primary transition-colors">
                  Launch App
                </Link>
              </li>
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-heading font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Risk Disclosure
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Responsible Gambling
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                support@flipwin.xyz
              </li>
              <li className="text-muted-foreground">
                Join our Discord community
              </li>
              <li className="text-muted-foreground">
                Follow us on Twitter
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8 opacity-50" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} FlipWin. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            For entertainment purposes only. Play responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}