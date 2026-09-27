import { useState } from 'react';
import { AppState } from '../types';
import { AlertCircle, MessageCircle, CheckCircle, TrendingUp } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

interface SellerViewProps {
  appState: AppState;
  updateAppState?: (updates: Partial<AppState>) => void;
}

type SellerTab = 'dashboard' | 'rfqs' | 'quotes' | 'products' | 'orders' | 'profile';

export default function SellerView({ appState }: SellerViewProps) {
  const [activeTab, setActiveTab] = useState<SellerTab>('dashboard');
  const [selectedRFQ, setSelectedRFQ] = useState<string | null>(null);
  const [expandedQuote, setExpandedQuote] = useState<string | null>(null);

  const currentSeller = appState.sellers.find(s => s.id === appState.currentSellerId);

  const sellerQuotes = appState.quotes.filter(q => q.sellerId === appState.currentSellerId);
  const sellerTransactions = appState.transactions.filter(t => t.sellerId === appState.currentSellerId);

  const renderDashboard = () => (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary">Good morning, {currentSeller?.company}</h1>
        <p className="text-lg text-text-secondary">Manage your marketplace opportunities</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-12">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-1">New RFQs</p>
              <p className="text-3xl font-bold text-primary">{appState.rfqs.length}</p>
            </div>
            <AlertCircle className="text-accent" size={24} />
          </div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-1">Quotes Submitted</p>
              <p className="text-3xl font-bold text-primary">{sellerQuotes.length}</p>
            </div>
            <MessageCircle className="text-accent" size={24} />
          </div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-1">Orders Won</p>
              <p className="text-3xl font-bold text-primary">{currentSeller?.dealsCompleted || 0}</p>
            </div>
            <CheckCircle className="text-accent" size={24} />
          </div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-1">Pipeline Value</p>
              <p className="text-3xl font-bold text-primary">
                ${(sellerQuotes.reduce((sum, q) => sum + q.totalPrice, 0) / 1000000).toFixed(1)}M
              </p>
            </div>
            <TrendingUp className="text-accent" size={24} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-lg text-primary mb-4">Recent Opportunities</h3>
          <div className="space-y-3">
            {appState.rfqs.slice(0, 5).map(rfq => {
              const sellerHasQuote = appState.quotes.some(
                q => q.rfqId === rfq.id && q.sellerId === appState.currentSellerId
              );
              return (
                <div
                  key={rfq.id}
                  onClick={() => {
                    setSelectedRFQ(rfq.id);
                    setActiveTab('rfqs');
                  }}
                  className="p-3 bg-bg-light rounded hover:bg-accent-light cursor-pointer transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-primary">{rfq.product}</p>
                      <p className="text-sm text-text-secondary">{rfq.quantity} {rfq.unit}</p>
                    </div>
                    {sellerHasQuote && (
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-700">
                        Quoted
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-lg text-primary mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div>
              <p className="text-text-secondary text-sm mb-1">Response Time</p>
              <p className="text-lg font-semibold text-primary">{currentSeller?.responseTime}</p>
            </div>
            <div>
              <p className="text-text-secondary text-sm mb-1">Rating</p>
              <div className="flex items-center gap-1">
                <span className="text-2xl">⭐</span>
                <p className="text-lg font-semibold text-primary">{currentSeller?.rating}/5.0</p>
              </div>
            </div>
            <div>
              <p className="text-text-secondary text-sm mb-1">Status</p>
              {currentSeller?.verified ? (
                <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded inline-block">
                  ✓ Verified Business
                </span>
              ) : null}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderRFQs = () => (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">New RFQs & Opportunities</h1>

      {selectedRFQ ? (
        (() => {
          const rfq = appState.rfqs.find(r => r.id === selectedRFQ);
          if (!rfq) return null;

          const buyer = appState.buyers.find(b => b.id === rfq.buyerId);
          const existingQuote = appState.quotes.find(
            q => q.rfqId === rfq.id && q.sellerId === appState.currentSellerId
          );

          return (
            <Card>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary">{rfq.product}</h2>
                  <p className="text-lg text-text-secondary mt-1">From: {buyer?.company}</p>
                </div>
                <span className={`text-sm font-semibold px-3 py-1.5 rounded ${
                  rfq.status === 'Quote Received'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {rfq.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-accent-light rounded">
                <div>
                  <p className="text-text-secondary text-sm">Quantity Required</p>
                  <p className="text-lg font-semibold text-primary">{rfq.quantity} {rfq.unit}</p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm">Delivery Location</p>
                  <p className="text-lg font-semibold text-primary">{rfq.deliveryLocation}</p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm">Required By</p>
                  <p className="text-lg font-semibold text-primary">{rfq.requiredBy}</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-text-secondary text-sm mb-2">Specifications</p>
                <p className="text-primary text-lg">{rfq.specifications}</p>
              </div>

              <div className="mb-8 pb-8 border-b border-border-light">
                <p className="text-text-secondary text-sm mb-2">Buyer Information</p>
                <div className="flex items-center gap-2">
                  <div>
                    <p className="font-semibold text-primary">{buyer?.company}</p>
                    <p className="text-sm text-text-secondary">{buyer?.location}</p>
                  </div>
                  {buyer?.verified && (
                    <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>

              {existingQuote ? (
                <Card className="bg-green-50 border-green-200 mb-6">
                  <p className="text-sm text-green-700 font-semibold">✓ You have already submitted a quote for this RFQ</p>
                  <div className="mt-3 text-sm text-text-secondary">
                    <p>Price: ${existingQuote.unitPrice}/unit</p>
                    <p>Total: ${existingQuote.totalPrice.toLocaleString()}</p>
                  </div>
                </Card>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => setActiveTab('quotes')}
                >
                  Submit Quote
                </Button>
              )}

              <Button
                variant="secondary"
                className="w-full mt-4"
                onClick={() => setSelectedRFQ(null)}
              >
                Back to RFQs
              </Button>
            </Card>
          );
        })()
      ) : (
        <div className="space-y-4">
          {appState.rfqs.map(rfq => {
            const buyer = appState.buyers.find(b => b.id === rfq.buyerId);
            const sellerQuote = appState.quotes.find(
              q => q.rfqId === rfq.id && q.sellerId === appState.currentSellerId
            );

            return (
              <Card
                key={rfq.id}
                clickable
                onClick={() => setSelectedRFQ(rfq.id)}
                className={sellerQuote ? 'border-l-4 border-l-green-500' : ''}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-primary">{rfq.product}</h3>
                    <p className="text-text-secondary text-sm">From: {buyer?.company} ({buyer?.location})</p>
                    <div className="flex gap-4 mt-3 text-sm">
                      <span>📦 {rfq.quantity} {rfq.unit}</span>
                      <span>📍 {rfq.deliveryLocation}</span>
                      <span>📅 By {rfq.requiredBy}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {sellerQuote && (
                      <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded block mb-2">
                        ✓ Quoted
                      </span>
                    )}
                    <span className={`text-sm font-semibold px-3 py-1 rounded ${
                      rfq.status === 'Quote Received'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {rfq.status}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderQuotes = () => (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">My Quotes</h1>

      {sellerQuotes.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-secondary text-lg">No quotes submitted yet</p>
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => setActiveTab('rfqs')}
          >
            Browse RFQs
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {sellerQuotes.map(quote => {
            const rfq = appState.rfqs.find(r => r.id === quote.rfqId);
            const buyer = appState.buyers.find(b => b.id === rfq?.buyerId);

            return (
              <Card
                key={quote.id}
                className={expandedQuote === quote.id ? 'border-accent border-2' : ''}
              >
                <button
                  onClick={() => setExpandedQuote(expandedQuote === quote.id ? null : quote.id)}
                  className="w-full text-left"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-primary">{rfq?.product}</h3>
                      <p className="text-text-secondary text-sm">To: {buyer?.company}</p>
                      <p className="text-text-secondary text-sm">{quote.quantity} {rfq?.unit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-accent font-bold text-xl">${quote.unitPrice}/unit</p>
                      <p className="text-text-secondary text-sm">Total: ${quote.totalPrice.toLocaleString()}</p>
                      <span className={`text-xs font-semibold px-2 py-1 rounded block mt-2 w-fit ml-auto ${
                        quote.status === 'Accepted'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {quote.status}
                      </span>
                    </div>
                  </div>
                </button>

                {expandedQuote === quote.id && (
                  <div className="mt-6 pt-6 border-t border-border-light space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-text-secondary text-sm">Delivery Time</p>
                        <p className="font-semibold text-primary">{quote.deliveryTime}</p>
                      </div>
                      <div>
                        <p className="text-text-secondary text-sm">Freight</p>
                        <p className="font-semibold text-primary">${quote.freight}</p>
                      </div>
                      <div>
                        <p className="text-text-secondary text-sm">Payment Terms</p>
                        <p className="font-semibold text-primary">{quote.paymentTerms}</p>
                      </div>
                      <div>
                        <p className="text-text-secondary text-sm">Quote Validity</p>
                        <p className="font-semibold text-primary">{quote.validity}</p>
                      </div>
                    </div>
                    {quote.notes && (
                      <div>
                        <p className="text-text-secondary text-sm">Notes</p>
                        <p className="text-primary">{quote.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderProducts = () => (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Products & Services</h1>
      <Card>
        <p className="text-text-secondary mb-4">Products managed by {currentSeller?.company}</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-bg-light rounded">
            <p className="font-bold text-primary">{currentSeller?.category}</p>
            <p className="text-sm text-text-secondary mt-2">Primary category</p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderOrders = () => (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Orders Won</h1>

      {sellerTransactions.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-text-secondary text-lg">No orders yet</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {sellerTransactions.map(tx => {
            const buyer = appState.buyers.find(b => b.id === tx.buyerId);
            return (
              <Card key={tx.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-lg text-primary">{tx.product}</p>
                    <p className="text-text-secondary text-sm">From: {buyer?.company}</p>
                    <p className="text-primary mt-2">{tx.quantity} units | ${tx.value.toLocaleString()}</p>
                  </div>
                  <span className="text-sm font-semibold px-3 py-1 rounded bg-green-100 text-green-700">
                    {tx.status}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderProfile = () => (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Company Profile</h1>

      <Card>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">{currentSeller?.company}</h2>
            <div className="space-y-4">
              <div>
                <p className="text-text-secondary text-sm">Business Type</p>
                <p className="font-semibold text-primary">Manufacturer</p>
              </div>
              <div>
                <p className="text-text-secondary text-sm">Location</p>
                <p className="font-semibold text-primary">{currentSeller?.location}</p>
              </div>
              <div>
                <p className="text-text-secondary text-sm">Primary Category</p>
                <p className="font-semibold text-primary">{currentSeller?.category}</p>
              </div>
              <div>
                <p className="text-text-secondary text-sm">Verification Status</p>
                {currentSeller?.verified && (
                  <span className="text-sm font-semibold text-green-700 bg-green-100 px-3 py-1 rounded inline-block">
                    ✓ Business Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg text-primary mb-6">Marketplace Activity</h3>
            <div className="space-y-4">
              <div className="p-4 bg-bg-light rounded">
                <p className="text-text-secondary text-sm">Response Time</p>
                <p className="text-2xl font-bold text-primary">{currentSeller?.responseTime}</p>
              </div>
              <div className="p-4 bg-bg-light rounded">
                <p className="text-text-secondary text-sm">Rating</p>
                <p className="text-2xl font-bold text-primary">⭐ {currentSeller?.rating}/5.0</p>
              </div>
              <div className="p-4 bg-bg-light rounded">
                <p className="text-text-secondary text-sm">Completed Deals</p>
                <p className="text-2xl font-bold text-primary">{currentSeller?.dealsCompleted}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div>
      <div className="bg-white border-b border-border-light">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-8">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'rfqs', label: 'RFQs & Opportunities' },
              { id: 'quotes', label: 'My Quotes' },
              { id: 'products', label: 'Products' },
              { id: 'orders', label: 'Orders Won' },
              { id: 'profile', label: 'Company Profile' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as SellerTab);
                  setSelectedRFQ(null);
                }}
                className={`py-4 px-1 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-text-secondary hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'rfqs' && renderRFQs()}
      {activeTab === 'quotes' && renderQuotes()}
      {activeTab === 'products' && renderProducts()}
      {activeTab === 'orders' && renderOrders()}
      {activeTab === 'profile' && renderProfile()}
    </div>
  );
}
