import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { CheckCircle, FileText, HelpCircle, ShieldCheck } from "lucide-react";

const faqList = [
  {
    icon: <ShieldCheck className="w-5 h-5 text-blue-600 mr-2" />,
    question: "How does blockchain ensure certificate security?",
    answer:
      "Each certificate is cryptographically signed and stored on an immutable blockchain ledger. This creates a permanent, tamper-proof record that can be instantly verified without relying on the issuing organization.",
  },
  {
    icon: <HelpCircle className="w-5 h-5 text-blue-600 mr-2" />,
    question: "What wallet types are supported for connection?",
    answer:
      "We support all major wallets including MetaMask, WalletConnect, Coinbase Wallet, and hardware wallets like Ledger and Trezor. Enterprise customers can also use custodial wallet solutions.",
  },
  {
    icon: <FileText className="w-5 h-5 text-blue-600 mr-2" />,
    question: "Can certificates be converted to NFTs?",
    answer:
      "Yes! Any certificate can be minted as an NFT with unique metadata, making it collectible and tradeable on NFT marketplaces while maintaining its verification capabilities.",
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />,
    question: "What are the transaction costs?",
    answer:
      "We support multiple blockchain networks with varying costs. Ethereum certificates cost $2-5 per transaction, while Polygon certificates cost under $0.01. We also offer gasless solutions for enterprise customers.",
  },
  {
    icon: <HelpCircle className="w-5 h-5 text-blue-600 mr-2" />,
    question: "How do I verify a certificate without connecting a wallet?",
    answer:
      "You can verify certificates using our web portal, QR code scanner, or API without needing a wallet. However, connecting a wallet provides additional features like certificate ownership and NFT functionality.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-blue-600 mr-2" />,
    question: "Is the platform compliant with data protection regulations?",
    answer:
      "Yes, DIGICERT is fully compliant with GDPR, CCPA, and other major data protection regulations. We use privacy-preserving blockchain techniques that don't store personal data on-chain.",
  },
];

export const FAQSection: React.FC = () => (
  <section className="py-20 bg-gradient-to-b from-white to-slate-50">
    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center mb-12">
        <div className="relative w-20 h-20 mb-4">
          <Image
            src="/logo.svg"
            alt="DIGICERT blockchain security"
            fill
            className="object-contain drop-shadow-xl"
            priority
          />
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
          Frequently <span className="text-blue-600">Asked Questions</span>
        </h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto text-center">
          Get answers to common questions about our blockchain certification platform.
        </p>
      </div>
      <div className="w-full">
        <div className="w-full max-w-none bg-gradient-to-br from-white via-blue-50 to-slate-100 shadow-2xl rounded-2xl p-8 border border-blue-200">
          <Accordion type="single" collapsible>
            {faqList.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx + 1}`}
                className="mb-4 border-b border-blue-200 last:border-b-0"
              >
                <AccordionTrigger className="flex items-center text-lg font-semibold text-slate-800 hover:text-blue-700 transition-colors py-4">
                  {faq.icon}
                  <span className="text-left">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-700 text-base leading-relaxed py-2 animate-fade-in">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 flex flex-col items-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg">
              <ShieldCheck className="w-5 h-5 mr-2 text-yellow-300" />
              Why trust <span className="ml-1 font-bold">DIGICERT</span>?
            </div>
            <p className="mt-4 text-slate-700 text-center max-w-xl text-lg leading-relaxed">
              DIGICERT leverages advanced blockchain technology, cryptographic security, and regulatory compliance to
              ensure your digital certificates are always secure, verifiable, and trusted worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FAQSection;
