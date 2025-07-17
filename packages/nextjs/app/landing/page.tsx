import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";
import { Input } from "./components/ui/input";
import { Separator } from "./components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { 
  Shield, Award, Lock, Users, Zap, Globe, CheckCircle, ArrowRight, Menu, X, Star, TrendingUp,
  Wallet, Network, Database, Code, Fingerprint, Eye, Clock, Layers, Bitcoin, Cpu, 
  FileText, QrCode, Download, Share2, Settings, BarChart3, Activity, Link, BookOpen,
  Smartphone, Cloud, Verified, KeyRound, Blocks, Coins, Gem, Hexagon
} from "lucide-react";
import { useState } from "react";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    setWalletConnected(!walletConnected);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">CertifyChain</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-slate-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#features" className="text-slate-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#blockchain" className="text-slate-700 hover:text-blue-600 transition-colors">Blockchain</a>
              <a href="#solutions" className="text-slate-700 hover:text-blue-600 transition-colors">Solutions</a>
              <a href="#nft" className="text-slate-700 hover:text-blue-600 transition-colors">NFT Certs</a>
              <a href="#pricing" className="text-slate-700 hover:text-blue-600 transition-colors">Pricing</a>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" className="border-slate-300">
                <Eye className="w-4 h-4 mr-2" />
                Verify Certificate
              </Button>
              <Button 
                className={`relative overflow-hidden transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                  walletConnected 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 hover:shadow-green-500/25' 
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 hover:shadow-blue-500/25 animate-pulse'
                } group`}
                onClick={handleConnectWallet}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Wallet className={`w-4 h-4 mr-2 transition-transform duration-300 ${walletConnected ? '' : 'group-hover:rotate-12'}`} />
                <span className="relative z-10">
                  {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
                </span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-700" />
              ) : (
                <Menu className="w-6 h-6 text-slate-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
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
                  <Button 
                    className={`relative overflow-hidden transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                      walletConnected 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 hover:shadow-green-500/25' 
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 hover:shadow-blue-500/25 animate-pulse'
                    } group`}
                    onClick={handleConnectWallet}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Wallet className={`w-4 h-4 mr-2 transition-transform duration-300 ${walletConnected ? '' : 'group-hover:rotate-12'}`} />
                    <span className="relative z-10">
                      {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
                    </span>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
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
                <Button 
                  size="lg" 
                  className={`relative overflow-hidden transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                    walletConnected 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 hover:shadow-green-500/25' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 hover:shadow-blue-500/25 animate-pulse'
                  } px-8 group`}
                  onClick={handleConnectWallet}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Wallet className={`mr-2 w-5 h-5 transition-transform duration-300 ${walletConnected ? '' : 'group-hover:rotate-12'}`} />
                  <span className="relative z-10">
                    {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
                  </span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
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

      {/* Blockchain Networks Section */}
      <section id="blockchain" className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Multi-Chain Blockchain Support
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Deploy your certificates across multiple blockchain networks for maximum security and global reach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { name: "Ethereum", icon: "⟠", color: "from-blue-500 to-blue-600", desc: "Leading smart contract platform" },
              { name: "Polygon", icon: "⬢", color: "from-purple-500 to-purple-600", desc: "Low-cost, fast transactions" },
              { name: "Binance Smart Chain", icon: "◆", color: "from-yellow-500 to-yellow-600", desc: "High performance network" },
              { name: "Solana", icon: "◉", color: "from-green-500 to-green-600", desc: "Ultra-fast blockchain" }
            ].map((network, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-slate-200 bg-white/80 backdrop-blur text-center">
                <CardHeader>
                  <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${network.color} rounded-full flex items-center justify-center mb-4 text-white text-2xl`}>
                    {network.icon}
                  </div>
                  <CardTitle className="text-slate-900">{network.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600">
                    {network.desc}
                  </CardDescription>
                </CardContent>
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
                  { title: "Multi-Signature Security", desc: "Enterprise-grade security with multiple validators" }
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

      {/* Enhanced Features Overview */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Advanced Blockchain Features
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive blockchain-powered certification platform with cutting-edge features for maximum security and efficiency.
            </p>
          </div>

          <Tabs defaultValue="security" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="security" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 bg-white/80 backdrop-blur">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-slate-900">Cryptographic Security</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600">
                      Advanced encryption with SHA-256 hashing and digital signatures for tamper-proof certificates.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 bg-white/80 backdrop-blur">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <KeyRound className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-slate-900">Multi-Signature Validation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600">
                      Require multiple authorized signers for certificate issuance and validation processes.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 bg-white/80 backdrop-blur">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Fingerprint className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-slate-900">Biometric Integration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600">
                      Optional biometric verification for enhanced security and identity verification.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="verification" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 bg-white/80 backdrop-blur">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-slate-900">Instant Verification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600">
                      Verify certificates in milliseconds using our global blockchain network infrastructure.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 bg-white/80 backdrop-blur">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <QrCode className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-slate-900">QR Code Verification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600">
                      Scan QR codes for instant certificate verification without any special applications.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 bg-white/80 backdrop-blur">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-slate-900">Global Verification Network</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600">
                      Worldwide verification network ensuring certificates are accessible from anywhere.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="integration" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 bg-white/80 backdrop-blur">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-slate-900">RESTful APIs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600">
                      Comprehensive REST APIs for seamless integration with existing enterprise systems.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 bg-white/80 backdrop-blur">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Layers className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-slate-900">SDK Libraries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600">
                      Native SDKs for Python, JavaScript, Java, and other popular programming languages.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 bg-white/80 backdrop-blur">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Link className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-slate-900">Webhooks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600">
                      Real-time notifications for certificate events and blockchain confirmations.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 bg-white/80 backdrop-blur">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-slate-900">Advanced Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600">
                      Detailed analytics on certificate issuance, verification rates, and usage patterns.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 bg-white/80 backdrop-blur">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-slate-900">Real-time Monitoring</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600">
                      Live monitoring of blockchain transactions and certificate status updates.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 bg-white/80 backdrop-blur">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-slate-900">Audit Trails</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600">
                      Complete audit trails for compliance and regulatory requirements.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* NFT Certificates Section */}
      <section id="nft" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                <Gem className="w-4 h-4 mr-2" />
                NFT Technology
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                Next-Generation NFT Certificates
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Transform your certificates into unique, collectible NFTs with built-in verification, 
                ownership tracking, and marketplace integration.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/80 backdrop-blur rounded-lg p-6 border border-slate-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                    <Coins className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Unique Ownership</h3>
                  <p className="text-slate-600 text-sm">Each certificate is a unique NFT with verifiable ownership on the blockchain.</p>
                </div>

                <div className="bg-white/80 backdrop-blur rounded-lg p-6 border border-slate-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <Share2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Transferable</h3>
                  <p className="text-slate-600 text-sm">Certificates can be transferred between wallets while maintaining verification.</p>
                </div>

                <div className="bg-white/80 backdrop-blur rounded-lg p-6 border border-slate-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Download className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Collectible</h3>
                  <p className="text-slate-600 text-sm">Build collections of achievements and credentials in your digital wallet.</p>
                </div>

                <div className="bg-white/80 backdrop-blur rounded-lg p-6 border border-slate-200">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                    <Verified className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Marketplace Ready</h3>
                  <p className="text-slate-600 text-sm">Compatible with major NFT marketplaces for trading and showcase.</p>
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

      {/* Solutions Section */}
      <section id="solutions" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Perfect for Every Industry
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From education to healthcare, our platform serves diverse industries with tailored certification solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Education", description: "Academic credentials, diplomas, and course completions", icon: "🎓" },
              { title: "Healthcare", description: "Medical licenses, certifications, and training records", icon: "🏥" },
              { title: "Technology", description: "IT certifications, training completions, and skill badges", icon: "💻" },
              { title: "Finance", description: "Professional licenses, compliance training, and certifications", icon: "🏦" },
              { title: "Manufacturing", description: "Quality certifications, safety training, and compliance", icon: "🏭" },
              { title: "Government", description: "Official documents, licenses, and public certifications", icon: "🏛️" }
            ].map((solution, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-slate-200 bg-white">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{solution.icon}</div>
                  <CardTitle className="text-slate-900">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 text-center">
                    {solution.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Advanced Technology Stack
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
              { name: "API Gateway", icon: <Hexagon className="w-8 h-8" />, color: "from-pink-500 to-pink-600" }
            ].map((tech, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-slate-200 bg-white/80 backdrop-blur text-center group">
                <CardHeader>
                  <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${tech.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white`}>
                    {tech.icon}
                  </div>
                  <CardTitle className="text-slate-900">{tech.name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Get answers to common questions about our blockchain certification platform.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-slate-900">
                  How does blockchain ensure certificate security?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Each certificate is cryptographically signed and stored on an immutable blockchain ledger. This creates a permanent, tamper-proof record that can be instantly verified without relying on the issuing organization.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-slate-900">
                  What wallet types are supported for connection?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  We support all major wallets including MetaMask, WalletConnect, Coinbase Wallet, and hardware wallets like Ledger and Trezor. Enterprise customers can also use custodial wallet solutions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-slate-900">
                  Can certificates be converted to NFTs?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Yes! Any certificate can be minted as an NFT with unique metadata, making it collectible and tradeable on NFT marketplaces while maintaining its verification capabilities.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-slate-900">
                  What are the transaction costs?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  We support multiple blockchain networks with varying costs. Ethereum certificates cost $2-5 per transaction, while Polygon certificates cost under $0.01. We also offer gasless solutions for enterprise customers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-slate-900">
                  How do I verify a certificate without connecting a wallet?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  You can verify certificates using our web portal, QR code scanner, or API without needing a wallet. However, connecting a wallet provides additional features like certificate ownership and NFT functionality.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-slate-900">
                  Is the platform compliant with data protection regulations?
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  Yes, we're fully compliant with GDPR, CCPA, and other major data protection regulations. We use privacy-preserving blockchain techniques that don't store personal data on-chain.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Certification Process?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of organizations already using CertifyChain to issue secure, verifiable digital certificates powered by blockchain technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              className={`relative overflow-hidden transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                walletConnected 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 hover:shadow-green-500/25' 
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 hover:shadow-blue-500/25 animate-pulse'
              } px-8 group`}
              onClick={handleConnectWallet}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Wallet className={`mr-2 w-5 h-5 transition-transform duration-300 ${walletConnected ? '' : 'group-hover:rotate-12'}`} />
              <span className="relative z-10">
                {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
              </span>
            </Button>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <QrCode className="mr-2 w-5 h-5" />
              Verify Certificate
            </Button>
          </div>

          <div className="text-blue-200 text-sm">
            No fees to connect • Multi-chain support • Enterprise ready
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">CertifyChain</span>
              </div>
              <p className="text-slate-400 mb-4">
                Secure digital certificates powered by blockchain technology for the modern enterprise.
              </p>
              <div className="flex flex-col space-y-2">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                />
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Blockchain Networks</a></li>
                <li><a href="#" className="hover:text-white transition-colors">NFT Certificates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Smart Contracts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SDK Libraries</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <Separator className="bg-slate-700 mb-8" />

          <div className="flex flex-col md:flex-row justify-between items-center text-slate-400">
            <p>&copy; 2025 CertifyChain. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
