import { FaGithub, FaTwitter, FaEnvelope } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">FlipWin</h2>
            <p className="text-gray-400">The Ultimate Solana Coin Flip Game</p>
          </div>
          
          <div className="flex space-x-6">
            <a
              href="mailto:ankitkumar9864@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaEnvelope className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/ankitkumar9864"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/ankitkumar9864"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} FlipWin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}; 