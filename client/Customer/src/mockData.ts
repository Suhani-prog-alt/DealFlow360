export const mockUser = {
  name: "Jane Doe",
  company: "Acme Corp",
  email: "jane@acmecorp.com"
};

export type QuotationStatus = 'Draft' | 'Sent' | 'Awaiting Customer' | 'Under Negotiation' | 'Approved' | 'Accepted' | 'Expired';

export interface QuotationLine {
  id: string;
  product: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  tax: number;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  date: string;
  validUntil: string;
  salesRep: string;
  status: QuotationStatus;
  lines: QuotationLine[];
}

export interface NegotiationMessage {
  id: string;
  lineId?: string;
  sender: 'Customer' | 'Sales Rep';
  text: string;
  timestamp: string;
  counterDiscount?: number;
}

export interface Notification {
  id: string;
  message: string;
  date: string;
  read: boolean;
  quoteId?: string;
}

export const initialQuotations: Quotation[] = [
  {
    id: "q1",
    quoteNumber: "Q-1042",
    date: "2026-09-01",
    validUntil: "2026-09-30",
    salesRep: "Alice Smith",
    status: "Awaiting Customer",
    lines: [
      { id: "l1", product: "Enterprise Laptop Pro", quantity: 5, unitPrice: 2000, discount: 10, tax: 5 },
      { id: "l2", product: "Implementation Service", quantity: 1, unitPrice: 5000, discount: 0, tax: 5 },
      { id: "l3", product: "Cloud Backup", quantity: 12, unitPrice: 100, discount: 0, tax: 5 }
    ]
  },
  {
    id: "q2",
    quoteNumber: "Q-1038",
    date: "2026-08-20",
    validUntil: "2026-09-20",
    salesRep: "Bob Johnson",
    status: "Under Negotiation",
    lines: [
      { id: "l4", product: "Server Rack", quantity: 2, unitPrice: 15000, discount: 5, tax: 5 }
    ]
  }
];

export const initialMessages: Record<string, NegotiationMessage[]> = {
  "q2": [
    { id: "m1", sender: 'Customer', text: "Can you provide a better discount on the server rack?", timestamp: "2026-08-21T10:00:00Z", counterDiscount: 10 },
    { id: "m2", sender: 'Sales Rep', text: "I can do 5% maximum.", timestamp: "2026-08-21T11:00:00Z" }
  ]
};

export const initialNotifications: Notification[] = [
  { id: "n1", message: "Quotation Q-1042 is awaiting your response.", date: "2026-09-02", read: false, quoteId: "q1" },
  { id: "n2", message: "Sales Rep responded to your negotiation request on Q-1038.", date: "2026-08-21", read: true, quoteId: "q2" }
];
