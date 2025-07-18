import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import ConnectWalletButton from "./ConnectWalletButton";

export const MobileMenu: React.FC = () => (
  <div className="md:hidden mt-4 pb-4 border-t border-slate-200 pt-4">
    <nav className="flex flex-col space-y-4">
      <a href="#home" className="text-slate-700 hover:text-blue-600 transition-colors">Home</a>
      <a href="#features" className="text-slate-700 hover:text-blue-600 transition-colors">Features</a>
      <a href="#blockchain" className="text-slate-700 hover:text-blue-600 transition-colors">Blockchain</a>
      <a href="#solutions" className="text-slate-700 hover:text-blue-600 transition-colors">Solutions</a>
      <a href="#nft" className="text-slate-700 hover:text-blue-600 transition-colors">NFT Certs</a>
      <a href="#pricing" className="text-slate-700 hover:text-blue-600 transition-colors">Pricing</a>
      <div className="flex flex-col space-y-2 pt-4">
        <Button variant="outline" className="border-slate-300">
          <Eye className="w-4 h-4 mr-2" />
          Verify Certificate
        </Button>
        <ConnectWalletButton />
      </div>
    </nav>
  </div>
);

export default MobileMenu; 