import { ArrowRight, Check, TrendingUp, Shield, Zap } from 'lucide-react';
import Button from '../components/Button';

interface LandingPageProps {
  onStartDemo: () => void;
}

export default function LandingPage({ onStartDemo }: LandingPageProps) {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto px-6 py-20 text-center relative z-10">
          <div className="text-5xl font-bold text-primary mb-6">
            Connect industrial buyers with verified suppliers
          </div>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            TradeLink is the B2B marketplace connecting procurement professionals with trusted suppliers across steel, building materials, chemicals, and heavy equipment.
          </p>
          <div className="flex gap-4 justify-center mb-12">
            <Button size="lg" onClick={onStartDemo}>
              Explore Platform <ArrowRight className="inline ml-2" size={20} />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-bg-light">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">How TradeLink Works</h2>
          <div className="grid grid-cols-5 gap-4 items-center">
            <div className="text-center">
              <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                📋
              </div>
              <p className="font-semibold text-primary">Buyer posts RFQ</p>
              <p className="text-sm text-text-secondary mt-2">Specify requirements and quantity</p>
            </div>
            <div className="flex justify-center pb-8">
              <ArrowRight className="text-accent" size={32} />
            </div>
            <div className="text-center">
              <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🎯
              </div>
              <p className="font-semibold text-primary">Matching</p>
              <p className="text-sm text-text-secondary mt-2">Find verified suppliers</p>
            </div>
            <div className="flex justify-center pb-8">
              <ArrowRight className="text-accent" size={32} />
            </div>
            <div className="text-center">
              <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                💰
              </div>
              <p className="font-semibold text-primary">Compare & Accept</p>
              <p className="text-sm text-text-secondary mt-2">Select best quote</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Categories</h2>
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border border-blue-200">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-xl font-bold text-primary mb-2">Steel & Metals</h3>
              <p className="text-text-secondary">Structural steel, reinforcement, alloys</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg border border-orange-200">
              <div className="text-4xl mb-4">🧱</div>
              <h3 className="text-xl font-bold text-primary mb-2">Building Materials</h3>
              <p className="text-text-secondary">Cement, aggregates, bricks</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg border border-green-200">
              <div className="text-4xl mb-4">⚗️</div>
              <h3 className="text-xl font-bold text-primary mb-2">Chemicals</h3>
              <p className="text-text-secondary">Petrochemicals, specialty chemicals</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg border border-purple-200">
              <div className="text-4xl mb-4">🏭</div>
              <h3 className="text-xl font-bold text-primary mb-2">Machinery</h3>
              <p className="text-text-secondary">Cranes, excavators, equipment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why TradeLink */}
      <section className="py-20 bg-bg-light">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Why Choose TradeLink?</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="flex gap-4">
              <Shield className="text-accent flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-primary mb-2">Verified Businesses</h3>
                <p className="text-text-secondary">All buyers and suppliers are verified for credibility and compliance</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Zap className="text-accent flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-primary mb-2">Fast Matching</h3>
                <p className="text-text-secondary">AI-powered matching connects you with relevant suppliers instantly</p>
              </div>
            </div>
            <div className="flex gap-4">
              <TrendingUp className="text-accent flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-primary mb-2">Transparent Pricing</h3>
                <p className="text-text-secondary">Compare quotes side-by-side and make informed decisions</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Check className="text-accent flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-primary mb-2">Deal Tracking</h3>
                <p className="text-text-secondary">Track every RFQ and transaction from request to delivery</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Check className="text-accent flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-primary mb-2">Marketplace Analytics</h3>
                <p className="text-text-secondary">Real-time insights into market trends and pricing</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Check className="text-accent flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-primary mb-2">Business Verification</h3>
                <p className="text-text-secondary">Confidence in every transaction with verified partners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Our Revenue Model</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white border border-border-light rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">💎</div>
              <h3 className="text-xl font-bold text-primary mb-3">Supplier Subscriptions</h3>
              <p className="text-text-secondary mb-4">Premium listings and RFQ access for verified suppliers</p>
              <span className="text-sm text-accent font-semibold">Monthly/Annual</span>
            </div>
            <div className="bg-white border border-border-light rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-primary mb-3">Qualified RFQs</h3>
              <p className="text-text-secondary mb-4">Lead generation for suppliers seeking specific opportunities</p>
              <span className="text-sm text-accent font-semibold">Per Lead</span>
            </div>
            <div className="bg-white border border-border-light rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-primary mb-3">Transaction Services</h3>
              <p className="text-text-secondary mb-4">Future: Payment processing, logistics, financing</p>
              <span className="text-sm text-accent font-semibold">Commission</span>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 bg-bg-light">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Our Roadmap</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border-2 border-accent">
              <h3 className="text-2xl font-bold text-accent mb-6">📍 Today</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check size={20} className="text-accent flex-shrink-0" />
                  <span className="text-primary">Buyer & Seller Portal</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={20} className="text-accent flex-shrink-0" />
                  <span className="text-primary">RFQ Management</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={20} className="text-accent flex-shrink-0" />
                  <span className="text-primary">Quote Comparison</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={20} className="text-accent flex-shrink-0" />
                  <span className="text-primary">Business Verification</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg border-2 border-gray-300">
              <h3 className="text-2xl font-bold text-primary mb-6">🔜 Next (Q2-Q3 2025)</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <ArrowRight size={20} className="text-text-secondary flex-shrink-0" />
                  <span className="text-text-secondary">Payment Integrations</span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight size={20} className="text-text-secondary flex-shrink-0" />
                  <span className="text-text-secondary">Settlement System</span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight size={20} className="text-text-secondary flex-shrink-0" />
                  <span className="text-text-secondary">Logistics Partnerships</span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight size={20} className="text-text-secondary flex-shrink-0" />
                  <span className="text-text-secondary">Trade Financing</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg border-2 border-gray-300">
              <h3 className="text-2xl font-bold text-primary mb-6">🚀 Future (2026+)</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <ArrowRight size={20} className="text-text-secondary flex-shrink-0" />
                  <span className="text-text-secondary">Industrial Logistics</span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight size={20} className="text-text-secondary flex-shrink-0" />
                  <span className="text-text-secondary">Insurance Solutions</span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight size={20} className="text-text-secondary flex-shrink-0" />
                  <span className="text-text-secondary">Market Intelligence</span>
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight size={20} className="text-text-secondary flex-shrink-0" />
                  <span className="text-text-secondary">AI Sourcing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">Ready to Experience TradeLink?</h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Explore our interactive demo to see how TradeLink connects buyers and suppliers.
          </p>
          <Button size="lg" onClick={onStartDemo}>
            Start Interactive Demo <ArrowRight className="inline ml-2" size={20} />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>TradeLink © 2025 - Industrial B2B Marketplace</p>
          <p className="text-sm text-gray-400 mt-2">This is a demonstration prototype with sample data</p>
        </div>
      </footer>
    </div>
  );
}
