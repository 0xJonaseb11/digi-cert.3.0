import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Coins, Download, Gem, Share2, Verified } from "lucide-react";

export const NFTCertificatesSection: React.FC = () => (
  <section id="nft" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Badge className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
            <Gem className="w-4 h-4 mr-2" />
            NFT Technology
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            Next-Generation <span className="text-blue-600">NFT Certificates</span>
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Transform your certificates into unique, collectible NFTs with built-in verification, ownership tracking,
            and marketplace integration.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur rounded-lg p-6 border border-slate-200">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Unique Ownership</h3>
              <p className="text-slate-400 text-sm">
                Each certificate is a unique NFT with verifiable ownership on the blockchain.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-lg p-6 border border-slate-200">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Transferable</h3>
              <p className="text-slate-400 text-sm">
                Certificates can be transferred between wallets while maintaining verification.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-lg p-6 border border-slate-200">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Collectible</h3>
              <p className="text-slate-400 text-sm">
                Build collections of achievements and credentials in your digital wallet.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-lg p-6 border border-slate-200">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                <Verified className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Marketplace Ready</h3>
              <p className="text-slate-400 text-sm">Compatible with major NFT marketplaces for trading and showcase.</p>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Gem className="mr-2 w-5 h-5" />
            Mint NFT Certificate
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-3xl"></div>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=600&h=400&fit=crop"
            alt="NFT certificate visualization"
            className="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
          />
        </div>
      </div>
    </div>
  </section>
);

export default NFTCertificatesSection;
