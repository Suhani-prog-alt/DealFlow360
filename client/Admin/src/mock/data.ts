// ─── PRODUCTS ────────────────────────────────────────────────────────────────
export const initialProducts = [
  { id: 'P001', name: 'Enterprise Laptop Pro 15"', sku: 'HW-LP-001', type: 'HARDWARE', price: 1899, cost: 1100, unit: 'pcs', tax: 0.1, margin: 42, categoryId: 'cat-1', isActive: true, createdAt: '2025-01-10' },
  { id: 'P002', name: 'Server Rack 42U Full-Tower', sku: 'HW-SR-001', type: 'HARDWARE', price: 5200, cost: 2900, unit: 'pcs', tax: 0.1, margin: 44, categoryId: 'cat-1', isActive: true, createdAt: '2025-01-10' },
  { id: 'P003', name: 'Network Switch 48-Port PoE+', sku: 'HW-NS-001', type: 'HARDWARE', price: 1450, cost: 820, unit: 'pcs', tax: 0.1, margin: 43, categoryId: 'cat-1', isActive: true, createdAt: '2025-01-12' },
  { id: 'P004', name: 'Workstation Tower i9', sku: 'HW-WS-001', type: 'HARDWARE', price: 2800, cost: 1600, unit: 'pcs', tax: 0.1, margin: 43, categoryId: 'cat-1', isActive: true, createdAt: '2025-01-15' },
  { id: 'P005', name: 'UPS 3000VA Rack Mount', sku: 'HW-UP-001', type: 'HARDWARE', price: 950, cost: 520, unit: 'pcs', tax: 0.1, margin: 45, categoryId: 'cat-1', isActive: true, createdAt: '2025-01-18' },
  { id: 'P006', name: 'Wireless Access Point WiFi 6E', sku: 'HW-AP-001', type: 'HARDWARE', price: 380, cost: 200, unit: 'pcs', tax: 0.1, margin: 47, categoryId: 'cat-1', isActive: true, createdAt: '2025-01-20' },
  { id: 'P007', name: 'Firewall Appliance Enterprise', sku: 'HW-FW-001', type: 'HARDWARE', price: 4200, cost: 2300, unit: 'pcs', tax: 0.1, margin: 45, categoryId: 'cat-1', isActive: true, createdAt: '2025-01-22' },
  { id: 'P008', name: 'Storage Array 100TB SAS', sku: 'HW-SA-001', type: 'HARDWARE', price: 18500, cost: 10200, unit: 'pcs', tax: 0.1, margin: 45, categoryId: 'cat-1', isActive: true, createdAt: '2025-01-25' },
  { id: 'P009', name: 'KVM Switch 16-Port', sku: 'HW-KV-001', type: 'HARDWARE', price: 620, cost: 340, unit: 'pcs', tax: 0.1, margin: 45, categoryId: 'cat-1', isActive: true, createdAt: '2025-02-01' },
  { id: 'P010', name: 'Office Desktop i5', sku: 'HW-OD-001', type: 'HARDWARE', price: 1100, cost: 640, unit: 'pcs', tax: 0.1, margin: 42, categoryId: 'cat-1', isActive: true, createdAt: '2025-02-05' },
  { id: 'P011', name: 'Thin Client Terminal', sku: 'HW-TC-001', type: 'HARDWARE', price: 480, cost: 260, unit: 'pcs', tax: 0.1, margin: 46, categoryId: 'cat-1', isActive: true, createdAt: '2025-02-08' },
  { id: 'P012', name: 'Blade Server 2U Dual Xeon', sku: 'HW-BS-001', type: 'HARDWARE', price: 9800, cost: 5400, unit: 'pcs', tax: 0.1, margin: 45, categoryId: 'cat-1', isActive: true, createdAt: '2025-02-10' },
  { id: 'P013', name: 'IP Camera 4K PoE Dome', sku: 'HW-IC-001', type: 'HARDWARE', price: 280, cost: 140, unit: 'pcs', tax: 0.1, margin: 50, categoryId: 'cat-1', isActive: true, createdAt: '2025-02-12' },
  { id: 'P014', name: 'Barcode Scanner 2D USB', sku: 'HW-BC-001', type: 'HARDWARE', price: 175, cost: 90, unit: 'pcs', tax: 0.1, margin: 49, categoryId: 'cat-1', isActive: true, createdAt: '2025-02-15' },
  { id: 'P015', name: 'Label Printer Industrial', sku: 'HW-LP-002', type: 'HARDWARE', price: 920, cost: 510, unit: 'pcs', tax: 0.1, margin: 45, categoryId: 'cat-1', isActive: false, createdAt: '2025-02-18' },
  // Software
  { id: 'P016', name: 'ERP Suite Enterprise License', sku: 'SW-ER-001', type: 'SUBSCRIPTION', price: 3500, cost: 400, unit: 'mth', tax: 0.05, margin: 89, categoryId: 'cat-3', isActive: true, createdAt: '2025-01-08' },
  { id: 'P017', name: 'CRM Professional License', sku: 'SW-CR-001', type: 'SUBSCRIPTION', price: 1200, cost: 150, unit: 'mth', tax: 0.05, margin: 88, categoryId: 'cat-3', isActive: true, createdAt: '2025-01-08' },
  { id: 'P018', name: 'HR Management Platform', sku: 'SW-HR-001', type: 'SUBSCRIPTION', price: 890, cost: 110, unit: 'mth', tax: 0.05, margin: 88, categoryId: 'cat-3', isActive: true, createdAt: '2025-01-10' },
  { id: 'P019', name: 'Business Intelligence Pro', sku: 'SW-BI-001', type: 'SUBSCRIPTION', price: 2100, cost: 250, unit: 'mth', tax: 0.05, margin: 88, categoryId: 'cat-3', isActive: true, createdAt: '2025-01-12' },
  { id: 'P020', name: 'Cloud Analytics Platform', sku: 'SW-CA-001', type: 'SUBSCRIPTION', price: 1850, cost: 220, unit: 'mth', tax: 0.05, margin: 88, categoryId: 'cat-3', isActive: true, createdAt: '2025-01-15' },
  { id: 'P021', name: 'Security Suite 500 Endpoints', sku: 'SW-SS-001', type: 'SUBSCRIPTION', price: 4200, cost: 500, unit: 'mth', tax: 0.05, margin: 88, categoryId: 'cat-3', isActive: true, createdAt: '2025-01-18' },
  { id: 'P022', name: 'DevOps Platform Teams', sku: 'SW-DO-001', type: 'SUBSCRIPTION', price: 2800, cost: 330, unit: 'mth', tax: 0.05, margin: 88, categoryId: 'cat-3', isActive: true, createdAt: '2025-01-20' },
  { id: 'P023', name: 'Project Management Suite', sku: 'SW-PM-001', type: 'SUBSCRIPTION', price: 650, cost: 80, unit: 'mth', tax: 0.05, margin: 88, categoryId: 'cat-3', isActive: true, createdAt: '2025-01-22' },
  { id: 'P024', name: 'Email & Collaboration Suite', sku: 'SW-EC-001', type: 'SUBSCRIPTION', price: 420, cost: 50, unit: 'mth', tax: 0.05, margin: 88, categoryId: 'cat-3', isActive: true, createdAt: '2025-01-25' },
  { id: 'P025', name: 'Cloud Backup 1TB', sku: 'SW-CB-001', type: 'SUBSCRIPTION', price: 50, cost: 6, unit: 'mth', tax: 0.05, margin: 88, categoryId: 'cat-3', isActive: true, createdAt: '2025-02-01' },
  { id: 'P026', name: 'Cloud Backup 10TB', sku: 'SW-CB-002', type: 'SUBSCRIPTION', price: 300, cost: 36, unit: 'mth', tax: 0.05, margin: 88, categoryId: 'cat-3', isActive: true, createdAt: '2025-02-01' },
  { id: 'P027', name: 'Disaster Recovery as a Service', sku: 'SW-DR-001', type: 'SUBSCRIPTION', price: 1600, cost: 190, unit: 'mth', tax: 0.05, margin: 88, categoryId: 'cat-3', isActive: true, createdAt: '2025-02-05' },
  // Services
  { id: 'P028', name: 'Implementation Service', sku: 'SV-IM-001', type: 'SERVICE', price: 250, cost: 90, unit: 'hr', tax: 0, margin: 64, categoryId: 'cat-2', isActive: true, createdAt: '2025-01-08' },
  { id: 'P029', name: 'Security Audit', sku: 'SV-SA-001', type: 'SERVICE', price: 8500, cost: 3200, unit: 'project', tax: 0, margin: 62, categoryId: 'cat-2', isActive: true, createdAt: '2025-01-10' },
  { id: 'P030', name: 'Network Design Consulting', sku: 'SV-ND-001', type: 'SERVICE', price: 4200, cost: 1600, unit: 'project', tax: 0, margin: 62, categoryId: 'cat-2', isActive: true, createdAt: '2025-01-12' },
  { id: 'P031', name: 'Data Migration Service', sku: 'SV-DM-001', type: 'SERVICE', price: 6500, cost: 2500, unit: 'project', tax: 0, margin: 62, categoryId: 'cat-2', isActive: true, createdAt: '2025-01-15' },
  { id: 'P032', name: 'Staff Augmentation - Senior Dev', sku: 'SV-ST-001', type: 'SERVICE', price: 180, cost: 70, unit: 'hr', tax: 0, margin: 61, categoryId: 'cat-2', isActive: true, createdAt: '2025-01-18' },
  { id: 'P033', name: 'Penetration Testing Service', sku: 'SV-PT-001', type: 'SERVICE', price: 12000, cost: 4600, unit: 'project', tax: 0, margin: 62, categoryId: 'cat-2', isActive: true, createdAt: '2025-01-20' },
  { id: 'P034', name: 'Cloud Migration Service', sku: 'SV-CM-001', type: 'SERVICE', price: 18000, cost: 6800, unit: 'project', tax: 0, margin: 62, categoryId: 'cat-2', isActive: true, createdAt: '2025-01-22' },
  { id: 'P035', name: 'Training & Enablement (per day)', sku: 'SV-TR-001', type: 'SERVICE', price: 2200, cost: 840, unit: 'day', tax: 0, margin: 62, categoryId: 'cat-2', isActive: true, createdAt: '2025-01-25' },
  // Support / Maintenance
  { id: 'P036', name: 'Basic Support Plan', sku: 'SU-BS-001', type: 'SUBSCRIPTION', price: 200, cost: 24, unit: 'mth', tax: 0, margin: 88, categoryId: 'cat-4', isActive: true, createdAt: '2025-01-08' },
  { id: 'P037', name: 'Professional Support Plan', sku: 'SU-PS-001', type: 'SUBSCRIPTION', price: 500, cost: 60, unit: 'mth', tax: 0, margin: 88, categoryId: 'cat-4', isActive: true, createdAt: '2025-01-08' },
  { id: 'P038', name: 'Enterprise Support Plan', sku: 'SU-ES-001', type: 'SUBSCRIPTION', price: 1500, cost: 180, unit: 'mth', tax: 0, margin: 88, categoryId: 'cat-4', isActive: true, createdAt: '2025-01-08' },
  { id: 'P039', name: 'Hardware Maintenance Contract', sku: 'SU-HM-001', type: 'SUBSCRIPTION', price: 800, cost: 96, unit: 'mth', tax: 0, margin: 88, categoryId: 'cat-4', isActive: true, createdAt: '2025-01-10' },
  { id: 'P040', name: 'Extended Warranty - 2yr', sku: 'SU-EW-001', type: 'SERVICE', price: 350, cost: 130, unit: 'pcs', tax: 0, margin: 63, categoryId: 'cat-4', isActive: true, createdAt: '2025-01-12' },
];

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
export const initialCategories = [
  { id: 'cat-1', name: 'Hardware', description: 'Physical equipment and devices', productCount: 15 },
  { id: 'cat-2', name: 'Services', description: 'Consulting, implementation, and project services', productCount: 8 },
  { id: 'cat-3', name: 'Software & Cloud', description: 'SaaS platforms and cloud services', productCount: 12 },
  { id: 'cat-4', name: 'Support & Maintenance', description: 'Ongoing support plans and warranties', productCount: 5 },
];

// ─── CUSTOMERS ────────────────────────────────────────────────────────────────
const TIERS = ['Bronze', 'Silver', 'Gold'];
const INDUSTRIES = ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Logistics', 'Energy', 'Education', 'Government', 'Telecom'];
const STATUSES = ['Active', 'Active', 'Active', 'Active', 'Inactive', 'On Hold'];
const COMPANIES = [
  'Acme Corp', 'Quantum Systems', 'NovaTech Solutions', 'Pinnacle Industries', 'Horizon Enterprises',
  'Apex Global', 'ClearPath Technologies', 'Beacon IT Partners', 'Citadel Networks', 'Driftwood Digital',
  'Eclipse Systems', 'Frontier Analytics', 'GlobalEdge Corp', 'HarbourView Tech', 'IronBridge Group',
  'JetStream Software', 'Keystone Data', 'LighthouseLabs', 'Meridian IT', 'Nexus Platform',
  'OmniCloud Solutions', 'Paragon Systems', 'QuickScale Inc', 'RedLine Security', 'SkyLink Networks',
  'TerraBase Corp', 'UrbanMesh Tech', 'VaultCore Analytics', 'WaveFront Group', 'Xcell Industries',
  'YellowBridge IT', 'ZeniMax Systems', 'AlphaEdge Consulting', 'BrightPath Solutions', 'CoreLogic Inc',
  'DataForge Ltd', 'Elevation Networks', 'FalconSoft Corp', 'GearUp Technologies', 'HighGround IT',
  'Innova Systems', 'JunctionCloud', 'KaleidoTech', 'LaunchPoint Corp', 'MicroNova Ltd',
  'NodeBridge Inc', 'OpenPath Analytics', 'PrismSoft', 'Quadrant Solutions', 'RapidScale Tech',
  'Sequoia Systems', 'TechTower Corp', 'Unified Networks', 'VisionBridge Inc', 'WestEdge Technologies',
  'XenoCore Ltd', 'YellowFinch Systems', 'ZeroLatency Inc', 'ArcPath Solutions', 'BlueSky Platforms',
  'CatalystCloud', 'Deepshore Analytics', 'EnterpriseLink', 'FineTune Tech', 'GridPeak Corp',
  'HelixSoft', 'ImpactCloud', 'JoinPoint Inc', 'KineticIQ', 'LatticeCore',
  'MetroTech Group', 'NetStream Corp', 'OrionIT Solutions', 'PeakFlow Analytics', 'Quantum Bridge',
  'RealTime Systems', 'SpiralEdge Inc', 'TrustArc Tech', 'UltraLogic', 'VanguardSoft',
  'WideAngle Technologies', 'Xponent Corp', 'YellowRock Systems', 'ZeroBase Inc', 'AstroCloud',
  'BridgePoint Tech', 'CoreStream Analytics', 'DataLine Corp', 'EchoPath Systems', 'FocusGrid Inc',
  'GreenLane IT', 'HexaCore Solutions', 'IronPath Analytics', 'JetBlue Systems', 'KernelLogic',
  'LumaPath Corp', 'MapleEdge Tech', 'NeonSoft', 'OutbackSystems', 'PolarSync Inc',
  'QuantumLeap Corp', 'RidgeLine Tech', 'SunPath Analytics', 'ThinCloud Inc', 'UltraStream Systems',
  'VortexIT', 'WildCard Networks', 'Xcelerate Corp', 'YachtCloud', 'ZuluPath Inc',
  'ArcticEdge Systems', 'BlazeCore Inc', 'CrescentTech', 'DawnBridge Analytics', 'EverEdge Corp'
];

export const initialCustomers = COMPANIES.map((name, i) => {
  const tier = TIERS[i % 3];
  const orders = Math.floor(Math.random() * 40) + 2;
  const avgOrder = tier === 'Gold' ? 45000 : tier === 'Silver' ? 22000 : 8000;
  return {
    id: `C${String(i + 1).padStart(3, '0')}`,
    name,
    contactPerson: ['James Wilson', 'Maria Garcia', 'David Chen', 'Sarah Johnson', 'Michael Brown', 'Emma Davis', 'Chris Lee', 'Olivia Martinez', 'Daniel Taylor', 'Sophia Anderson'][i % 10],
    email: `contact@${name.toLowerCase().replace(/[^a-z]/g, '')}.com`,
    phone: `+1-${600 + i}-${String(Math.floor(Math.random() * 9000000) + 1000000)}`,
    industry: INDUSTRIES[i % 10],
    tier,
    status: STATUSES[i % 6],
    totalOrders: orders,
    totalRevenue: Math.round(orders * avgOrder * (0.8 + Math.random() * 0.4)),
    quotations: Math.floor(orders * 1.4),
    createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 730).toISOString().split('T')[0],
  };
});

// ─── PRICE LISTS ──────────────────────────────────────────────────────────────
export const initialPriceLists = [
  { id: 'PL001', name: 'Bronze Standard USD', customerTier: 'Bronze', currency: 'USD', discount: 0, isActive: true, createdAt: '2025-01-01' },
  { id: 'PL002', name: 'Silver Preferred USD', customerTier: 'Silver', currency: 'USD', discount: 8, isActive: true, createdAt: '2025-01-01' },
  { id: 'PL003', name: 'Gold Premium USD', customerTier: 'Gold', currency: 'USD', discount: 15, isActive: true, createdAt: '2025-01-01' },
  { id: 'PL004', name: 'Bronze Standard EUR', customerTier: 'Bronze', currency: 'EUR', discount: 0, isActive: true, createdAt: '2025-01-01' },
  { id: 'PL005', name: 'Silver Preferred EUR', customerTier: 'Silver', currency: 'EUR', discount: 8, isActive: true, createdAt: '2025-01-01' },
  { id: 'PL006', name: 'Gold Premium EUR', customerTier: 'Gold', currency: 'EUR', discount: 15, isActive: true, createdAt: '2025-01-01' },
  { id: 'PL007', name: 'Hardware Volume - Bronze', customerTier: 'Bronze', currency: 'USD', discount: 3, isActive: true, createdAt: '2025-02-01' },
  { id: 'PL008', name: 'Hardware Volume - Silver', customerTier: 'Silver', currency: 'USD', discount: 10, isActive: true, createdAt: '2025-02-01' },
  { id: 'PL009', name: 'Hardware Volume - Gold', customerTier: 'Gold', currency: 'USD', discount: 18, isActive: true, createdAt: '2025-02-01' },
  { id: 'PL010', name: 'SaaS Bundle - All Tiers', customerTier: 'Gold', currency: 'USD', discount: 20, isActive: true, createdAt: '2025-03-01' },
  { id: 'PL011', name: 'Services Rate Card', customerTier: 'Silver', currency: 'USD', discount: 5, isActive: true, createdAt: '2025-03-01' },
  { id: 'PL012', name: 'Year-End Promo 2025', customerTier: 'Bronze', currency: 'USD', discount: 7, isActive: false, createdAt: '2025-06-01' },
];

// ─── DISCOUNT RULES ───────────────────────────────────────────────────────────
export const initialDiscountRules = [
  { id: 'DR001', customerTier: 'Bronze', categoryId: 'cat-1', category: 'Hardware', maxDiscount: 5, riskLevel: 'Low', requiresApproval: false, effectiveDate: '2025-01-01', status: 'Active', createdAt: '2025-01-01T00:00:00.000Z' },
  { id: 'DR002', customerTier: 'Bronze', categoryId: 'cat-2', category: 'Services', maxDiscount: 3, riskLevel: 'Low', requiresApproval: false, effectiveDate: '2025-01-01', status: 'Active', createdAt: '2025-01-01T00:00:00.000Z' },
  { id: 'DR003', customerTier: 'Bronze', categoryId: 'cat-3', category: 'Software', maxDiscount: 5, riskLevel: 'Low', requiresApproval: false, effectiveDate: '2025-01-01', status: 'Active', createdAt: '2025-01-01T00:00:00.000Z' },
  { id: 'DR004', customerTier: 'Bronze', categoryId: 'cat-4', category: 'Support', maxDiscount: 4, riskLevel: 'Low', requiresApproval: false, effectiveDate: '2025-01-01', status: 'Active', createdAt: '2025-01-01T00:00:00.000Z' },
  { id: 'DR005', customerTier: 'Silver', categoryId: 'cat-1', category: 'Hardware', maxDiscount: 10, riskLevel: 'Low', requiresApproval: false, effectiveDate: '2025-01-01', status: 'Active', createdAt: '2025-01-01T00:00:00.000Z' },
  { id: 'DR006', customerTier: 'Silver', categoryId: 'cat-2', category: 'Services', maxDiscount: 7, riskLevel: 'Medium', requiresApproval: true, effectiveDate: '2025-01-01', status: 'Active', createdAt: '2025-01-01T00:00:00.000Z' },
  { id: 'DR007', customerTier: 'Silver', categoryId: 'cat-3', category: 'Software', maxDiscount: 10, riskLevel: 'Low', requiresApproval: false, effectiveDate: '2025-01-01', status: 'Active', createdAt: '2025-01-01T00:00:00.000Z' },
  { id: 'DR008', customerTier: 'Silver', categoryId: 'cat-4', category: 'Support', maxDiscount: 8, riskLevel: 'Low', requiresApproval: false, effectiveDate: '2025-01-01', status: 'Active', createdAt: '2025-01-01T00:00:00.000Z' },
  { id: 'DR009', customerTier: 'Gold', categoryId: 'cat-1', category: 'Hardware', maxDiscount: 18, riskLevel: 'Medium', requiresApproval: true, effectiveDate: '2025-01-01', status: 'Active', createdAt: '2025-01-01T00:00:00.000Z' },
  { id: 'DR010', customerTier: 'Gold', categoryId: 'cat-2', category: 'Services', maxDiscount: 12, riskLevel: 'Medium', requiresApproval: true, effectiveDate: '2025-01-01', status: 'Active', createdAt: '2025-01-01T00:00:00.000Z' },
  { id: 'DR011', customerTier: 'Gold', categoryId: 'cat-3', category: 'Software', maxDiscount: 20, riskLevel: 'High', requiresApproval: true, effectiveDate: '2025-01-01', status: 'Active', createdAt: '2025-01-01T00:00:00.000Z' },
  { id: 'DR012', customerTier: 'Gold', categoryId: 'cat-4', category: 'Support', maxDiscount: 15, riskLevel: 'Medium', requiresApproval: true, effectiveDate: '2025-01-01', status: 'Active', createdAt: '2025-01-01T00:00:00.000Z' },
  { id: 'DR013', customerTier: 'Bronze', categoryId: null, category: 'All Categories', maxDiscount: 5, riskLevel: 'Low', requiresApproval: false, effectiveDate: '2025-01-01', status: 'Active', createdAt: '2025-01-01T00:00:00.000Z' },
  { id: 'DR014', customerTier: 'Silver', categoryId: null, category: 'All Categories', maxDiscount: 10, riskLevel: 'Low', requiresApproval: false, effectiveDate: '2025-01-01', status: 'Active', createdAt: '2025-01-01T00:00:00.000Z' },
  { id: 'DR015', customerTier: 'Gold', categoryId: null, category: 'All Categories', maxDiscount: 15, riskLevel: 'Medium', requiresApproval: true, effectiveDate: '2025-01-01', status: 'Active', createdAt: '2025-01-01T00:00:00.000Z' },
];

// ─── APPROVAL CHAINS ──────────────────────────────────────────────────────────
export const initialApprovalChains = [
  { id: 'AC001', name: 'Auto-Approve Low Risk', level: 0, threshold: 0, role: 'SYSTEM', isActive: true, description: 'Quotations within discount ceiling auto-approved', createdAt: '2025-01-01' },
  { id: 'AC002', name: 'Manager Review - Tier 1', level: 1, threshold: 10, role: 'MANAGER', isActive: true, description: 'Sales Manager must approve discounts above 10%', createdAt: '2025-01-01' },
  { id: 'AC003', name: 'Finance Review - Tier 2', level: 2, threshold: 15, role: 'FINANCE', isActive: true, description: 'Finance Director approval required above 15%', createdAt: '2025-01-01' },
  { id: 'AC004', name: 'VP Approval - Critical', level: 3, threshold: 25, role: 'VP', isActive: true, description: 'VP Sales sign-off required above 25%', createdAt: '2025-01-01' },
  { id: 'AC005', name: 'Director Override', level: 3, threshold: 20, role: 'DIRECTOR', isActive: true, description: 'Director-level approval for high-value deals', createdAt: '2025-02-01' },
  { id: 'AC006', name: 'Manager Review - Services', level: 1, threshold: 7, role: 'MANAGER', isActive: true, description: 'Lower threshold for services category', createdAt: '2025-02-01' },
  { id: 'AC007', name: 'Finance Review - Services', level: 2, threshold: 12, role: 'FINANCE', isActive: true, description: 'Finance review for service discounts above 12%', createdAt: '2025-02-01' },
  { id: 'AC008', name: 'Emergency Fast-Track', level: 1, threshold: 20, role: 'MANAGER', isActive: false, description: 'Expedited approval for time-critical deals (deprecated)', createdAt: '2025-03-15' },
];

// ─── WAREHOUSES ───────────────────────────────────────────────────────────────
export const initialWarehouses = [
  { id: 'WH001', name: 'Main Warehouse', location: 'Dallas, TX', manager: 'Robert Hayes', capacity: 50000, usedCapacity: 34200, shippingWeight: 10000, isActive: true, productsStored: 38, createdAt: '2025-01-01' },
  { id: 'WH002', name: 'North Distribution Center', location: 'Chicago, IL', manager: 'Jennifer Walsh', capacity: 35000, usedCapacity: 22800, shippingWeight: 8000, isActive: true, productsStored: 29, createdAt: '2025-01-01' },
  { id: 'WH003', name: 'West Coast Hub', location: 'Los Angeles, CA', manager: 'Carlos Mendez', capacity: 40000, usedCapacity: 31500, shippingWeight: 9000, isActive: true, productsStored: 33, createdAt: '2025-01-01' },
  { id: 'WH004', name: 'East Distribution Center', location: 'Newark, NJ', manager: 'Patricia Kim', capacity: 30000, usedCapacity: 18900, shippingWeight: 7000, isActive: true, productsStored: 26, createdAt: '2025-02-01' },
  { id: 'WH005', name: 'South Distribution Center', location: 'Atlanta, GA', manager: 'Marcus Johnson', capacity: 28000, usedCapacity: 14600, shippingWeight: 6000, isActive: true, productsStored: 22, createdAt: '2025-02-01' },
  { id: 'WH006', name: 'North Depot (Overflow)', location: 'Detroit, MI', manager: 'Sandra Brooks', capacity: 15000, usedCapacity: 4200, shippingWeight: null, isActive: true, productsStored: 12, createdAt: '2025-03-01' },
  { id: 'WH007', name: 'Pacific Northwest Depot', location: 'Seattle, WA', manager: 'Thomas Grant', capacity: 20000, usedCapacity: 8900, shippingWeight: 5000, isActive: true, productsStored: 18, createdAt: '2025-04-01' },
  { id: 'WH008', name: 'Central Returns Center', location: 'Kansas City, MO', manager: 'Amanda Price', capacity: 12000, usedCapacity: 3100, shippingWeight: 3000, isActive: false, productsStored: 8, createdAt: '2025-05-01' },
];

// ─── SUBSCRIPTION PLANS ───────────────────────────────────────────────────────
export const initialSubscriptionPlans = [
  { id: 'SP001', name: 'Starter Monthly', frequency: 'MONTHLY', price: 99, prorationRule: 'Daily', cancelRule: 'End of Cycle', refundPolicy: 'None', features: 'Up to 5 users, Basic support', isActive: true, subscribers: 42, createdAt: '2025-01-01' },
  { id: 'SP002', name: 'Professional Monthly', frequency: 'MONTHLY', price: 299, prorationRule: 'Daily', cancelRule: 'End of Cycle', refundPolicy: 'Prorated', features: 'Up to 25 users, Priority support, API access', isActive: true, subscribers: 87, createdAt: '2025-01-01' },
  { id: 'SP003', name: 'Enterprise Monthly', frequency: 'MONTHLY', price: 999, prorationRule: 'Daily', cancelRule: 'Immediate with fee', refundPolicy: 'Prorated 30-day', features: 'Unlimited users, SLA 99.9%, Dedicated CSM', isActive: true, subscribers: 31, createdAt: '2025-01-01' },
  { id: 'SP004', name: 'Starter Quarterly', frequency: 'QUARTERLY', price: 270, prorationRule: 'Monthly', cancelRule: 'End of Cycle', refundPolicy: 'None', features: 'Up to 5 users, Basic support, 10% savings', isActive: true, subscribers: 28, createdAt: '2025-01-01' },
  { id: 'SP005', name: 'Professional Quarterly', frequency: 'QUARTERLY', price: 810, prorationRule: 'Monthly', cancelRule: 'End of Cycle', refundPolicy: 'Prorated', features: 'Up to 25 users, Priority support, 10% savings', isActive: true, subscribers: 54, createdAt: '2025-01-01' },
  { id: 'SP006', name: 'Enterprise Quarterly', frequency: 'QUARTERLY', price: 2700, prorationRule: 'Monthly', cancelRule: 'Immediate with fee', refundPolicy: 'Prorated 30-day', features: 'Unlimited users, SLA 99.9%, 10% savings', isActive: true, subscribers: 22, createdAt: '2025-01-01' },
  { id: 'SP007', name: 'Starter Annual', frequency: 'YEARLY', price: 999, prorationRule: 'None', cancelRule: 'End of Cycle', refundPolicy: 'None', features: 'Up to 5 users, Basic support, 16% savings', isActive: true, subscribers: 19, createdAt: '2025-01-01' },
  { id: 'SP008', name: 'Professional Annual', frequency: 'YEARLY', price: 2999, prorationRule: 'None', cancelRule: 'End of Cycle', refundPolicy: 'None', features: 'Up to 25 users, Priority support, 16% savings', isActive: true, subscribers: 63, createdAt: '2025-01-01' },
  { id: 'SP009', name: 'Enterprise Annual', frequency: 'YEARLY', price: 9999, prorationRule: 'None', cancelRule: 'Immediate with fee', refundPolicy: 'Credit note issued', features: 'Unlimited users, SLA 99.99%, 17% savings', isActive: true, subscribers: 18, createdAt: '2025-01-01' },
  { id: 'SP010', name: 'Cloud Backup 1TB Monthly', frequency: 'MONTHLY', price: 50, prorationRule: 'Daily', cancelRule: 'Immediate', refundPolicy: 'None', features: '1TB encrypted cloud backup, 30-day retention', isActive: true, subscribers: 134, createdAt: '2025-01-01' },
  { id: 'SP011', name: 'Cloud Backup 10TB Monthly', frequency: 'MONTHLY', price: 300, prorationRule: 'Daily', cancelRule: 'Immediate', refundPolicy: 'None', features: '10TB encrypted cloud backup, 90-day retention', isActive: true, subscribers: 67, createdAt: '2025-01-01' },
  { id: 'SP012', name: 'Enterprise Support Monthly', frequency: 'MONTHLY', price: 1500, prorationRule: 'Daily', cancelRule: 'Immediate with fee', refundPolicy: 'Prorated', features: '24/7 support, 1hr response SLA, Dedicated engineer', isActive: true, subscribers: 23, createdAt: '2025-02-01' },
  { id: 'SP013', name: 'Security Suite 500 Endpoints Monthly', frequency: 'MONTHLY', price: 4200, prorationRule: 'Daily', cancelRule: 'Immediate with fee', refundPolicy: 'Prorated', features: 'EDR, SIEM, DLP for 500 endpoints', isActive: true, subscribers: 14, createdAt: '2025-02-01' },
  { id: 'SP014', name: 'ERP Suite Enterprise Annual', frequency: 'YEARLY', price: 38000, prorationRule: 'None', cancelRule: 'Immediate with fee', refundPolicy: 'Credit note issued', features: 'Full ERP suite, 3 environments, dedicated support', isActive: true, subscribers: 7, createdAt: '2025-02-01' },
  { id: 'SP015', name: 'Legacy Standard (Deprecated)', frequency: 'MONTHLY', price: 49, prorationRule: 'None', cancelRule: 'End of Cycle', refundPolicy: 'None', features: 'Basic features only (migration required)', isActive: false, subscribers: 0, createdAt: '2024-06-01' },
];

// ─── UPSELL RULES ─────────────────────────────────────────────────────────────
export const initialUpsellRules = [
  { id: 'UR001', sourceProduct: 'Enterprise Laptop Pro 15"', recommendedProduct: 'Extended Warranty - 2yr', ruleType: 'Cross-sell', minMargin: 20, promotion: 'Bundle: Save 15%', priority: 'High', isActive: true },
  { id: 'UR002', sourceProduct: 'Enterprise Laptop Pro 15"', recommendedProduct: 'Professional Support Plan', ruleType: 'Cross-sell', minMargin: 25, promotion: '1st Month Free', priority: 'Medium', isActive: true },
  { id: 'UR003', sourceProduct: 'Enterprise Laptop Pro 15"', recommendedProduct: 'Hardware Maintenance Contract', ruleType: 'Cross-sell', minMargin: 20, promotion: 'None', priority: 'Medium', isActive: true },
  { id: 'UR004', sourceProduct: 'Server Rack 42U Full-Tower', recommendedProduct: 'Enterprise Support Plan', ruleType: 'Cross-sell', minMargin: 15, promotion: 'Extended Warranty Included', priority: 'High', isActive: true },
  { id: 'UR005', sourceProduct: 'Server Rack 42U Full-Tower', recommendedProduct: 'Implementation Service', ruleType: 'Cross-sell', minMargin: 20, promotion: 'None', priority: 'High', isActive: true },
  { id: 'UR006', sourceProduct: 'Network Switch 48-Port PoE+', recommendedProduct: 'Network Design Consulting', ruleType: 'Cross-sell', minMargin: 20, promotion: 'None', priority: 'Medium', isActive: true },
  { id: 'UR007', sourceProduct: 'ERP Suite Enterprise License', recommendedProduct: 'Data Migration Service', ruleType: 'Cross-sell', minMargin: 30, promotion: 'Free Data Migration Included', priority: 'High', isActive: true },
  { id: 'UR008', sourceProduct: 'ERP Suite Enterprise License', recommendedProduct: 'Training & Enablement (per day)', ruleType: 'Cross-sell', minMargin: 25, promotion: '2 Days Free Training', priority: 'High', isActive: true },
  { id: 'UR009', sourceProduct: 'CRM Professional License', recommendedProduct: 'Business Intelligence Pro', ruleType: 'Upsell', minMargin: 30, promotion: 'Integrated BI Bundle', priority: 'High', isActive: true },
  { id: 'UR010', sourceProduct: 'CRM Professional License', recommendedProduct: 'Sales Automation', ruleType: 'Upsell', minMargin: 25, promotion: 'None', priority: 'Medium', isActive: true },
  { id: 'UR011', sourceProduct: 'Security Suite 500 Endpoints Monthly', recommendedProduct: 'Penetration Testing Service', ruleType: 'Cross-sell', minMargin: 20, promotion: '15% off first engagement', priority: 'High', isActive: true },
  { id: 'UR012', sourceProduct: 'Cloud Backup 1TB', recommendedProduct: 'Cloud Backup 10TB', ruleType: 'Upsell', minMargin: 35, promotion: '2 Months Free on Upgrade', priority: 'High', isActive: true },
  { id: 'UR013', sourceProduct: 'Basic Support Plan', recommendedProduct: 'Professional Support Plan', ruleType: 'Upsell', minMargin: 30, promotion: 'Upgrade & Save 10%', priority: 'High', isActive: true },
  { id: 'UR014', sourceProduct: 'Professional Support Plan', recommendedProduct: 'Enterprise Support Plan', ruleType: 'Upsell', minMargin: 25, promotion: 'SLA Guarantee Included', priority: 'High', isActive: true },
  { id: 'UR015', sourceProduct: 'Cloud Analytics Platform', recommendedProduct: 'Business Intelligence Pro', ruleType: 'Upsell', minMargin: 30, promotion: 'Unified Analytics Bundle', priority: 'Medium', isActive: true },
  { id: 'UR016', sourceProduct: 'Workstation Tower i9', recommendedProduct: 'Extended Warranty - 2yr', ruleType: 'Cross-sell', minMargin: 20, promotion: 'None', priority: 'Low', isActive: true },
  { id: 'UR017', sourceProduct: 'Firewall Appliance Enterprise', recommendedProduct: 'Security Suite 500 Endpoints Monthly', ruleType: 'Cross-sell', minMargin: 15, promotion: 'Complete Security Bundle', priority: 'High', isActive: true },
  { id: 'UR018', sourceProduct: 'Office Desktop i5', recommendedProduct: 'Enterprise Laptop Pro 15"', ruleType: 'Upsell', minMargin: 20, promotion: 'Trade-Up Program', priority: 'Medium', isActive: false },
  { id: 'UR019', sourceProduct: 'Staff Augmentation - Senior Dev', recommendedProduct: 'DevOps Platform Teams', ruleType: 'Cross-sell', minMargin: 25, promotion: 'Platform Trial Included', priority: 'Medium', isActive: true },
  { id: 'UR020', sourceProduct: 'Implementation Service', recommendedProduct: 'Professional Support Plan', ruleType: 'Cross-sell', minMargin: 20, promotion: '3 Months at Basic Rate', priority: 'High', isActive: true },
];

// ─── AUDIT LOGS ───────────────────────────────────────────────────────────────
const AUDIT_USERS = ['admin@dealflow.io', 'sarah.ops@dealflow.io', 'james.admin@dealflow.io', 'system@dealflow.io', 'maria.finance@dealflow.io'];
const AUDIT_ACTIONS = ['CREATE', 'UPDATE', 'DELETE', 'EXPORT', 'LOGIN', 'CONFIG_CHANGE'];
const AUDIT_ENTITIES = ['Product', 'DiscountRule', 'Warehouse', 'SubscriptionPlan', 'ApprovalChain', 'PriceList', 'UpsellRule', 'Customer', 'UserRole'];
const AUDIT_DETAILS = [
  'Added Enterprise Laptop Pro to product catalog with SKU HW-LP-001',
  'Updated Gold tier discount ceiling from 12% to 15% on Hardware category',
  'Added North Distribution Center warehouse in Chicago, IL',
  'Modified Enterprise Support Plan proration from Monthly to Daily',
  'Added Finance Review approval chain at threshold 15%',
  'Updated Gold Tier Pricing list base discount from 14% to 15%',
  'Added cross-sell rule: Server Rack → Enterprise Support',
  'Deactivated Office Desktop i5 product listing',
  'Updated Central Warehouse shipping weight limit to 3000kg',
  'Increased Silver tier max discount to 10% across all categories',
  'Created Security Suite 500 Endpoints product SKU SW-SS-001',
  'Activated ERP Suite Enterprise Annual subscription plan',
  'Modified CRM Professional License pricing from $1100 to $1200/mth',
  'Added Data Migration Service to product catalog',
  'Deleted legacy Standard Plan (deprecated - migrated customers)',
  'Exported Q3 product catalog to CSV (requested by Finance)',
  'Changed approver role for Tier 2 from MANAGER to FINANCE',
  'System auto-recalculated blended risk scores for 47 open quotations',
  'Updated West Coast Hub manager assignment to Carlos Mendez',
  'Admin login from IP 192.168.1.45 — successful',
  'Updated Penetration Testing Service from $10000 to $12000 per project',
  'Added Bronze tier category-specific rules for Software at 5% max',
  'Created Starter Annual subscription plan at $999/yr',
  'Bulk-updated UPS 3000VA Rack Mount pricing by 8% (vendor increase)',
  'Disabled Emergency Fast-Track approval chain (policy change)',
  'Added Extended Warranty 2yr product SKU SU-EW-001',
  'Updated cancel policy on Enterprise Monthly to Immediate with fee',
  'Added Upsell rule: Cloud Backup 1TB → Cloud Backup 10TB',
  'System backup completed — 2.4GB configuration data archived',
  'Modified Manager Review threshold from 8% to 10%',
  'Created Professional Annual plan at $2999/yr',
  'Deleted unused test price list (Bronze Test EUR)',
  'Added 5 new products under Support & Maintenance category',
  'Updated ERP Suite pricing: $3200 → $3500/mth (tier adjustment)',
  'Configured 8 new upsell rules for hardware cross-sell scenarios',
  'Exported Audit log Q2 to Excel for compliance review',
  'Added Blade Server 2U product with SKU HW-BS-001',
  'Updated Business Intelligence Pro description and feature list',
  'Created Disaster Recovery as a Service subscription product',
  'Added South Distribution Center warehouse in Atlanta, GA',
  'Updated IP Camera 4K margin from 45% to 50%',
  'Modified Enterprise approval chain to include Director level',
  'Created quarterly pricing variants for all three tiers',
  'Removed duplicate price list (Gold EUR duplicate)',
  'Updated Barcode Scanner description and technical specifications',
  'Admin password policy enforced — minimum 12 chars required',
  'Label Printer Industrial set to Inactive (end of life)',
  'System health check passed — all 7 warehouses online',
  'Added Staff Augmentation service with hourly rate $180/hr',
  'Updated refund policy on Enterprise Annual plans to credit note',
  'Created Pacific Northwest Depot warehouse in Seattle, WA',
  'Upsell rule priority updated: Server → Implementation to High',
  'Added KVM Switch 16-Port to Hardware catalog',
  'Updated Training & Enablement day rate from $2000 to $2200',
  'Activated Enterprise Annual ERP plan for customer cohort',
  'System notification sent: 3 products below reorder threshold',
  'Updated Starter Monthly plan to include API access for audit',
  'Deactivated Legacy Standard plan — all subscribers migrated',
  'Configured auto-approve rule for sub-10% discount quotations',
  'Exported warehouse stock report for Q3 board presentation',
  'Added category: Support & Maintenance with 5 initial products',
];

export const initialAuditLogs = Array.from({ length: 60 }, (_, i) => ({
  id: `AL${String(i + 1).padStart(3, '0')}`,
  user: AUDIT_USERS[i % AUDIT_USERS.length],
  action: AUDIT_ACTIONS[i % AUDIT_ACTIONS.length],
  entity: AUDIT_ENTITIES[i % AUDIT_ENTITIES.length],
  details: AUDIT_DETAILS[i % AUDIT_DETAILS.length],
  createdAt: new Date(Date.now() - (60 - i) * 1000 * 60 * 60 * 6).toISOString(),
}));
