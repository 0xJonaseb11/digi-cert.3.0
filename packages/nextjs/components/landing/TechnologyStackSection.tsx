import { Card } from "../ui/card";
import { Cloud, Code, Cpu, Database, Hexagon, Network, Shield, Smartphone } from "lucide-react";

export const TechnologyStackSection: React.FC = () => (
  <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
          Advanced <span className="text-blue-600">Technology Stack</span>
        </h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Built on cutting-edge blockchain technology with enterprise-grade security and scalability.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { name: "Smart Contracts", icon: <Code className="w-8 h-8" />, color: "from-blue-500 to-blue-600" },
          { name: "IPFS Storage", icon: <Database className="w-8 h-8" />, color: "from-green-500 to-green-600" },
          { name: "Quantum Security", icon: <Shield className="w-8 h-8" />, color: "from-purple-500 to-purple-600" },
          { name: "Edge Computing", icon: <Network className="w-8 h-8" />, color: "from-orange-500 to-orange-600" },
          { name: "AI Verification", icon: <Cpu className="w-8 h-8" />, color: "from-red-500 to-red-600" },
          { name: "Mobile SDK", icon: <Smartphone className="w-8 h-8" />, color: "from-teal-500 to-teal-600" },
          { name: "Cloud Infrastructure", icon: <Cloud className="w-8 h-8" />, color: "from-indigo-500 to-indigo-600" },
          { name: "API Gateway", icon: <Hexagon className="w-8 h-8" />, color: "from-pink-500 to-pink-600" },
        ].map((tech, index) => (
          <Card key={index} className="text-center group">
            <div
              className={`w-16 h-16 mx-auto bg-gradient-to-br ${tech.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white`}
            >
              {tech.icon}
            </div>
            <div className="font-bold text-white text-lg mb-2">{tech.name}</div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default TechnologyStackSection;
