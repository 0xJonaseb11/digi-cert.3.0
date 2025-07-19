import { Button } from "../ui/button";
import ConnectWalletButton from "./ConnectWalletButton";
import { Eye } from "lucide-react";
import { Shield } from "lucide-react";

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => (
  <header className="sticky top-0 z-50 w-full bg-blue-600/70 backdrop-blur-md shadow-lg border-b border-blue-500/30">
    <div className="container mx-auto px-6 py-3 md:py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight drop-shadow">DIGICERT</span>
      </div>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        <a href="#home" className="text-white/90 hover:text-yellow-300 font-medium transition-colors duration-200">
          Home
        </a>
        <a href="#features" className="text-white/90 hover:text-yellow-300 font-medium transition-colors duration-200">
          Features
        </a>
        <a
          href="#blockchain"
          className="text-white/90 hover:text-yellow-300 font-medium transition-colors duration-200"
        >
          Blockchain
        </a>
        <a href="#solutions" className="text-white/90 hover:text-yellow-300 font-medium transition-colors duration-200">
          Solutions
        </a>
        <a href="#nft" className="text-white/90 hover:text-yellow-300 font-medium transition-colors duration-200">
          NFT Certs
        </a>
        <a href="#pricing" className="text-white/90 hover:text-yellow-300 font-medium transition-colors duration-200">
          Pricing
        </a>
      </nav>
      {/* CTA Button */}
      <div className="hidden md:flex items-center space-x-4">
        <Button variant="outline" className="border-white/60 text-white hover:bg-white/10 transition-all duration-200">
          <Eye className="w-4 h-4 mr-2" />
          Verify Certificate
        </Button>
        <ConnectWalletButton />
      </div>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-white hover:text-yellow-300 transition-colors duration-200"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </div>
  </header>
);

export default Header;
