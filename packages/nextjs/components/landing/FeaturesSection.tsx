import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Activity,
  BarChart3,
  Code,
  FileText,
  Fingerprint,
  Globe,
  KeyRound,
  Layers,
  Link,
  Lock,
  QrCode,
  Zap,
} from "lucide-react";

export const FeaturesSection: React.FC = () => (
  <section id="features" className="py-20">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
          Advanced <span className="text-blue-600">Blockchain Features</span>
        </h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Comprehensive blockchain-powered certification platform with cutting-edge features for maximum security and
          efficiency.
        </p>
      </div>
      <Tabs defaultValue="security" className="w-full">
        <TabsList className="flex w-full justify-center gap-2 mb-8 bg-gray-100 border border-blue-100 rounded-full p-2 shadow-sm">
          <TabsTrigger
            value="security"
            className="px-8 py-3 rounded-full font-semibold text-base transition-all duration-200 focus:outline-none data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-blue-300 data-[state=inactive]:bg-transparent data-[state=inactive]:text-slate-700 hover:bg-white/70"
          >
            Security
          </TabsTrigger>
          <TabsTrigger
            value="verification"
            className="px-8 py-3 rounded-full font-semibold text-base transition-all duration-200 focus:outline-none data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-blue-300 data-[state=inactive]:bg-transparent data-[state=inactive]:text-slate-700 hover:bg-white/70"
          >
            Verification
          </TabsTrigger>
          <TabsTrigger
            value="integration"
            className="px-8 py-3 rounded-full font-semibold text-base transition-all duration-200 focus:outline-none data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-blue-300 data-[state=inactive]:bg-transparent data-[state=inactive]:text-slate-700 hover:bg-white/70"
          >
            Integration
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="px-8 py-3 rounded-full font-semibold text-base transition-all duration-200 focus:outline-none data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-blue-300 data-[state=inactive]:bg-transparent data-[state=inactive]:text-slate-700 hover:bg-white/70"
          >
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="security" className="mt-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-bold text-lg mb-2">Cryptographic Security</div>
              <div className="text-slate-400">
                Advanced encryption with SHA-256 hashing and digital signatures for tamper-proof certificates.
              </div>
            </Card>
            <Card>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <KeyRound className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-bold text-lg mb-2">Multi-Signature Validation</div>
              <div className="text-slate-400">
                Require multiple authorized signers for certificate issuance and validation processes.
              </div>
            </Card>
            <Card>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Fingerprint className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-bold text-lg mb-2">Biometric Integration</div>
              <div className="text-slate-400">
                Optional biometric verification for enhanced security and identity verification.
              </div>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="verification" className="mt-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-bold text-lg mb-2">Instant Verification</div>
              <div className="text-slate-400">
                Verify certificates in milliseconds using our global blockchain network infrastructure.
              </div>
            </Card>
            <Card>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-bold text-lg mb-2">QR Code Verification</div>
              <div className="text-slate-400">
                Scan QR codes for instant certificate verification without any special applications.
              </div>
            </Card>
            <Card>
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-bold text-lg mb-2">Global Verification Network</div>
              <div className="text-slate-400">
                Worldwide verification network ensuring certificates are accessible from anywhere.
              </div>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="integration" className="mt-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-bold text-lg mb-2">RESTful APIs</div>
              <div className="text-slate-400">
                Comprehensive REST APIs for seamless integration with existing enterprise systems.
              </div>
            </Card>
            <Card>
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-bold text-lg mb-2">SDK Libraries</div>
              <div className="text-slate-400">
                Native SDKs for Python, JavaScript, Java, and other popular programming languages.
              </div>
            </Card>
            <Card>
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                <Link className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-bold text-lg mb-2">Webhooks</div>
              <div className="text-slate-400">
                Real-time notifications for certificate events and blockchain confirmations.
              </div>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="mt-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-bold text-lg mb-2">Advanced Analytics</div>
              <div className="text-slate-400">
                Detailed analytics on certificate issuance, verification rates, and usage patterns.
              </div>
            </Card>
            <Card>
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-lg flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-bold text-lg mb-2">Real-time Monitoring</div>
              <div className="text-slate-400">
                Live monitoring of blockchain transactions and certificate status updates.
              </div>
            </Card>
            <Card>
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="text-white font-bold text-lg mb-2">Audit Trails</div>
              <div className="text-slate-400">Complete audit trails for compliance and regulatory requirements.</div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </section>
);

export default FeaturesSection;
