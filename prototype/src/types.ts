export type Persona = 'buyer' | 'seller' | 'admin';

export interface Buyer {
  id: string;
  name: string;
  company: string;
  location: string;
  verified: boolean;
  rfqCount: number;
  totalSpend: number;
}

export interface Seller {
  id: string;
  name: string;
  company: string;
  category: string;
  location: string;
  verified: boolean;
  rating: number;
  dealsCompleted: number;
  responseTime: string;
}

export interface RFQ {
  id: string;
  buyerId: string;
  product: string;
  quantity: number;
  unit: string;
  deliveryLocation: string;
  requiredBy: string;
  specifications: string;
  status: 'Open' | 'Quote Received' | 'Quote Accepted' | 'Negotiation' | 'Order';
  createdAt: string;
  suppliersMatched: number;
  quotesCount: number;
}

export interface Quote {
  id: string;
  rfqId: string;
  sellerId: string;
  quantity: number;
  unitPrice: number;
  currency: string;
  deliveryTime: string;
  freight: number;
  totalPrice: number;
  paymentTerms: string;
  validity: string;
  status: 'Submitted' | 'Under Review' | 'Accepted' | 'Rejected';
  createdAt: string;
  notes: string;
}

export interface Transaction {
  id: string;
  rfqId: string;
  buyerId: string;
  sellerId: string;
  product: string;
  quantity: number;
  value: number;
  status: 'RFQ Created' | 'Quote Received' | 'Quote Accepted' | 'Negotiation' | 'Order' | 'Delivery' | 'Completed';
  createdAt: string;
  timeline: TransactionEvent[];
}

export interface TransactionEvent {
  status: string;
  timestamp: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface AppState {
  buyers: Buyer[];
  sellers: Seller[];
  rfqs: RFQ[];
  quotes: Quote[];
  transactions: Transaction[];
  categories: Category[];
  currentBuyerId?: string;
  currentSellerId?: string;
}
