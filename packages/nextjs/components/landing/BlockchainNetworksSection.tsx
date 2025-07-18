import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Card } from "../ui/card";
import { CheckCircle } from "lucide-react";

export const BlockchainNetworksSection: React.FC = () => (
  <section id="blockchain" className="py-20 bg-gradient-to-b from-white to-slate-50">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Multi-Chain Blockchain Support</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Deploy your certificates across multiple blockchain networks for maximum security and global reach.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          {
            name: "Ethereum",
            icon: "⟠",
            color: "from-blue-500 to-blue-600",
            desc: "Leading smart contract platform",
          },
          {
            name: "Polygon",
            icon: "⬢",
            color: "from-purple-500 to-purple-600",
            desc: "Low-cost, fast transactions",
          },
          {
            name: "Binance Smart Chain",
            icon: "◆",
            color: "from-yellow-500 to-yellow-600",
            desc: "High performance network",
          },
          { name: "Solana", icon: "◉", color: "from-green-500 to-green-600", desc: "Ultra-fast blockchain" },
        ].map((network, index) => (
          <Card key={index} className="text-center">
            <div
              className={`w-16 h-16 mx-auto bg-gradient-to-br ${network.color} rounded-full flex items-center justify-center mb-4 text-white text-2xl`}
            >
              {network.icon}
            </div>
            <div className="text-white font-bold text-lg mb-2">{network.name}</div>
            <div className="text-slate-400">{network.desc}</div>
          </Card>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Cross-Chain Compatibility</h3>
          <p className="text-slate-600 mb-6">
            Our platform supports multiple blockchain networks, allowing you to choose the best network for your needs
            while maintaining seamless interoperability across chains.
          </p>
          <div className="space-y-4">
            {[
              { title: "Smart Contract Automation", desc: "Automated certificate issuance and validation" },
              { title: "Cross-Chain Bridges", desc: "Move certificates between different blockchains" },
              { title: "Multi-Signature Security", desc: "Enterprise-grade security with multiple validators" },
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-900">{feature.title}</h4>
                  <p className="text-slate-600 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=600&h=400&fit=crop"
            alt="Blockchain network visualization"
            className="rounded-xl shadow-lg w-full h-80 object-cover"
          />
        </div>
      </div>
    </div>
  </section>
);

export default BlockchainNetworksSection;
