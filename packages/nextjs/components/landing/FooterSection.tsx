import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Shield } from "lucide-react";

export const FooterSection: React.FC = () => (
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
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Subscribe</Button>
          </div>
        </div>
        {/* Product */}
        <div>
          <h3 className="font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-slate-400">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Blockchain Networks
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                NFT Certificates
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Smart Contracts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                API Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                SDK Libraries
              </a>
            </li>
          </ul>
        </div>
        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-slate-400">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Press
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Security
              </a>
            </li>
          </ul>
        </div>
        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-slate-400">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Status
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Separator className="bg-slate-700 mb-8" />
      <div className="flex flex-col md:flex-row justify-between items-center text-slate-400">
        <p>© 2025 DIGICERT. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Cookies
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Security
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default FooterSection;
