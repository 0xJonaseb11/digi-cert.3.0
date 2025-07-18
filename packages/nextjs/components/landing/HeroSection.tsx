import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Blocks, Star, Activity, Shield, QrCode } from "lucide-react";
import ConnectWalletButton from "./ConnectWalletButton";

export const HeroSection: React.FC = () => (
  <section id="home" className="py-20 lg:py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
    <div className="container mx-auto px-6 relative">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200">
            <Blocks className="w-4 h-4 mr-2" />
            Trusted by 500+ Enterprises
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Secure Digital Certificates
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-2">
              Powered by Blockchain
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Transform your certification process with tamper-proof, instantly verifiable digital certificates.
            Built on blockchain technology with NFT integration and smart contract automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <ConnectWalletButton />
            <Button size="lg" variant="outline" className="border-slate-300">
              <QrCode className="mr-2 w-5 h-5" />
              Verify Certificate
            </Button>
          </div>
          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-8 text-slate-500">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>SOC 2 Compliant</span>
            </div>
          </div>
        </div>
        <div className="lg:pl-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-3xl"></div>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&h=600&fit=crop"
              alt="Blockchain certification technology"
              className="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection; 