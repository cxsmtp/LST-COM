import { useState } from 'react';
import { AppState } from '../types';
import { Plus, Search, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

interface BuyerViewProps {
  appState: AppState;
  updateAppState?: (updates: Partial<AppState>) => void;
}

type BuyerTab = 'dashboard' | 'marketplace' | 'rfqs' | 'quotes' | 'orders';

export default function BuyerView({ appState }: BuyerViewProps) {
  const [activeTab, setActiveTab] = useState<BuyerTab>('dashboard');
  const [selectedRFQ, setSelectedRFQ] = useState<string | null>(null);

  const currentBuyer = appState.buyers.find(b => b.id === appState.currentBuyerId);
  const buyerRFQs = appState.rfqs.filter(r => r.buyerId === appState.currentBuyerId);
  const buyerTransactions = appState.transactions.filter(t => t.buyerId === appState.currentBuyerId);

  const activeRFQs = buyerRFQs.filter(r => ['Open', 'Quote Received'].includes(r.status));
  const quotesReceived = buyerRFQs.reduce((sum, rfq) => sum + rfq.quotesCount, 0);

  const renderDashboard = () => (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Good morning, {currentBuyer?.name}</h1>
        <p className="text-lg text-text-secondary">Manage your industrial procurement from one place</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-12">
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-1">Active RFQs</p>
              <p className="text-3xl font-bold text-primary">{activeRFQs.length}</p>
            </div>
            <AlertCircle className="text-accent" size={24} />
          </div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-1">Quotes Received</p>
              <p className="text-3xl font-bold text-primary">{quotesReceived}</p>
            </div>
            <MessageCircle className="text-accent" size={24} />
          </div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-1">Open Orders</p>
              <p className="text-3xl font-bold text-primary">
                {buyerTransactions.filter(t => ['Order', 'Delivery'].includes(t.status)).length}
              </p>
            </div>
            <CheckCircle className="text-accent" size={24} />
          </div>
        </Card>
        <Card>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-text-secondary text-sm mb-1">Est. Procurement Value</p>
              <p className="text-3xl font-bold text-primary">${(currentBuyer?.totalSpend || 0) / 1000000}M</p>
            </div>
            <div className="text-2xl">💰</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-lg text-primary mb-4">Recent RFQs</h3>
          <div className="space-y-3">
            {buyerRFQs.slice(0, 5).map(rfq => (
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
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    rfq.status === 'Quote Received'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {rfq.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-lg text-primary mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button
              variant="primary"
              className="w-full"
              onClick={() => setActiveTab('marketplace')}
            >
              <Plus size={18} className="inline mr-2" />
              Create RFQ
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setActiveTab('quotes')}
            >
              <MessageCircle size={18} className="inline mr-2" />
              View Quotes ({quotesReceived})
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setActiveTab('orders')}
            >
              <CheckCircle size={18} className="inline mr-2" />
              View Orders
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderMarketplace = () => (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Marketplace</h1>

      <Card className="mb-8">
        <div className="flex items-center gap-4">
          <Search className="text-text-secondary" size={20} />
          <input
            type="text"
            placeholder="What are you looking for? E.g., 250 MT structural steel ASTM A36"
            className="flex-1 bg-transparent text-primary placeholder-text-secondary focus:outline-none"
          />
        </div>
      </Card>

      <div className="mb-8">
        <h2 className="text-xl font-bold text-primary mb-4">Categories</h2>
        <div className="grid grid-cols-4 gap-4">
          {appState.categories.map(cat => (
            <Card key={cat.id} clickable>
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="font-bold text-primary">{cat.name}</h3>
              <p className="text-sm text-text-secondary mt-2">{cat.description}</p>
            </Card>
          ))}
        </div>
      </div>

      <Button
        variant="primary"
        onClick={() => setActiveTab('rfqs')}
      >
        <Plus size={18} className="inline mr-2" />
        Create New RFQ
      </Button>
    </div>
  );

  const renderRFQs = () => (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">My RFQs</h1>
        <Button variant="primary">
          <Plus size={18} className="inline mr-2" />
          Create RFQ
        </Button>
      </div>

      {selectedRFQ ? (
        <Card className="mb-8">
          {(() => {
            const rfq = appState.rfqs.find(r => r.id === selectedRFQ);
            if (!rfq) return null;
            const quotes = appState.quotes.filter(q => q.rfqId === rfq.id);

            return (
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-primary">{rfq.id}</h2>
                    <p className="text-lg text-primary mt-1">{rfq.product}</p>
                  </div>
                  <span className={`text-sm font-semibold px-3 py-1.5 rounded ${
                    rfq.status === 'Quote Received'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {rfq.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div>
                    <p className="text-text-secondary text-sm">Quantity</p>
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

                <div className="mb-8 pb-8 border-b border-border-light">
                  <p className="text-text-secondary text-sm mb-2">Specifications</p>
                  <p className="text-primary">{rfq.specifications}</p>
                </div>

                {quotes.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Quotes Received ({quotes.length})</h3>
                    <div className="space-y-4">
                      {quotes.map(quote => {
                        const seller = appState.sellers.find(s => s.id === quote.sellerId);
                        return (
                          <Card key={quote.id} className="bg-bg-light">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-bold text-primary">{seller?.company}</p>
                                <p className="text-sm text-text-secondary">{seller?.location}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-accent font-bold text-lg">${quote.unitPrice}/unit</span>
                                  <span className="text-text-secondary text-sm">Total: ${quote.totalPrice.toLocaleString()}</span>
                                </div>
                                <p className="text-sm text-text-secondary mt-1">Delivery: {quote.deliveryTime}</p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-1 mb-3">
                                  <span>⭐</span>
                                  <span className="font-semibold text-primary">{seller?.rating}</span>
                                </div>
                                {seller?.verified && (
                                  <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">
                                    ✓ Verified
                                  </span>
                                )}
                                <div className="mt-3 space-y-2">
                                  <Button size="sm" variant="primary" className="w-full">
                                    Accept
                                  </Button>
                                  <Button size="sm" variant="outline" className="w-full">
                                    Message
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                )}

                <Button
                  variant="secondary"
                  className="mt-6"
                  onClick={() => setSelectedRFQ(null)}
                >
                  Back to RFQ List
                </Button>
              </div>
            );
          })()}
        </Card>
      ) : (
        <div className="grid gap-4">
          {buyerRFQs.map(rfq => {
            const quotes = appState.quotes.filter(q => q.rfqId === rfq.id);
            return (
              <Card
                key={rfq.id}
                clickable
                onClick={() => setSelectedRFQ(rfq.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-primary">{rfq.product}</h3>
                    <p className="text-text-secondary text-sm mt-1">{rfq.quantity} {rfq.unit} | {rfq.deliveryLocation}</p>
                    <p className="text-text-secondary text-sm">Required by {rfq.requiredBy}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-semibold px-3 py-1 rounded block mb-3 ${
                      rfq.status === 'Quote Received'
                        ? 'bg-green-100 text-green-700 w-fit ml-auto'
                        : 'bg-yellow-100 text-yellow-700 w-fit ml-auto'
                    }`}>
                      {rfq.status}
                    </span>
                    <p className="text-text-secondary text-sm">{quotes.length} quotes</p>
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
      <h1 className="text-3xl font-bold text-primary mb-8">Quotes</h1>

      <div className="space-y-4">
        {buyerRFQs.map(rfq => {
          const quotes = appState.quotes.filter(q => q.rfqId === rfq.id);
          if (quotes.length === 0) return null;

          return (
            <div key={rfq.id}>
              <h3 className="font-bold text-primary mb-3">{rfq.product}</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {quotes.map(quote => {
                  const seller = appState.sellers.find(s => s.id === quote.sellerId);
                  return (
                    <Card key={quote.id}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-bold text-primary">{seller?.company}</p>
                          <p className="text-sm text-text-secondary">{seller?.location}</p>
                        </div>
                        {seller?.verified && (
                          <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">
                            ✓ Verified
                          </span>
                        )}
                      </div>

                      <div className="bg-accent-light p-3 rounded mb-4">
                        <p className="text-sm text-text-secondary">Price per Unit</p>
                        <p className="text-2xl font-bold text-accent">${quote.unitPrice}</p>
                        <p className="text-sm text-text-secondary mt-2">Total: ${quote.totalPrice.toLocaleString()}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                        <div>
                          <p className="text-text-secondary">Delivery</p>
                          <p className="font-semibold text-primary">{quote.deliveryTime}</p>
                        </div>
                        <div>
                          <p className="text-text-secondary">Freight</p>
                          <p className="font-semibold text-primary">${quote.freight}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="primary" className="flex-1">
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Message
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Orders</h1>

      <div className="space-y-4">
        {buyerTransactions.map(tx => (
          <Card key={tx.id} clickable>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-lg text-primary">{tx.product}</p>
                <p className="text-text-secondary text-sm">{tx.id}</p>
                <p className="text-primary mt-2">{tx.quantity} {tx.quantity === 1 ? 'unit' : 'units'}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold px-3 py-1 rounded bg-blue-100 text-blue-700">
                  {tx.status}
                </span>
                <p className="text-accent font-bold text-xl mt-2">${tx.value.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="bg-white border-b border-border-light">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-8">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'marketplace', label: 'Marketplace' },
              { id: 'rfqs', label: 'My RFQs' },
              { id: 'quotes', label: 'Quotes' },
              { id: 'orders', label: 'Orders' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as BuyerTab);
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
      {activeTab === 'marketplace' && renderMarketplace()}
      {activeTab === 'rfqs' && renderRFQs()}
      {activeTab === 'quotes' && renderQuotes()}
      {activeTab === 'orders' && renderOrders()}
    </div>
  );
}
