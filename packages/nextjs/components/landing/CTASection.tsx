import { Button } from "../ui/button";
import ConnectWalletButton from "./ConnectWalletButton";
import { QrCode } from "lucide-react";

export const CTASection: React.FC = () => (
  <section className="py-20 bg-gradient-to-r from-[#23272f] to-[#2d3340] relative overflow-hidden">
    <div className="absolute inset-0 bg-black/10"></div>
    <div className="container mx-auto px-6 text-center relative">
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Transform Your Certification Process?</h2>
      <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
        Join hundreds of organizations already using DIGICERT to issue secure, verifiable digital certificates powered
        by blockchain technology.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <ConnectWalletButton />
        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
          <QrCode className="mr-2 w-5 h-5" />
          Verify Certificate
        </Button>
      </div>
      <div className="text-blue-200 text-sm">No fees to connect • Multi-chain support • Enterprise ready</div>
    </div>
  </section>
);

export default CTASection;
