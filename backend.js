var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server/sales_rep/src/index.ts
var import_express2 = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

// server/sales_rep/src/ai/smart_logic.ts
var import_express = require("express");
var import_client = require("@prisma/client");
var import_openai = __toESM(require("openai"));
var router = (0, import_express.Router)();
var prisma = new import_client.PrismaClient();
var openai = new import_openai.default({
  apiKey: process.env.OPENAI_API_KEY || "dummy_key_to_prevent_crash"
});
router.post("/recommendations", async (req, res) => {
  const { currentItems, customerSector = "Technology" } = req.body;
  if (!process.env.OPENAI_API_KEY) {
    return res.json({
      success: true,
      note: "Using mock data (Provide OPENAI_API_KEY in .env for real AI generation)",
      recommendations: [
        { product: "Laptop Bag", marginImpact: "+12%", score: 0.95, reason: "High co-purchase history with Laptops" },
        { product: "Extended Warranty", marginImpact: "+40%", score: 0.88, reason: "High margin, meets minimum margin threshold" },
        { product: "Mouse", marginImpact: "+8%", score: 0.92, reason: "Frequently bought together" }
      ]
    });
  }
  try {
    const prompt = `
      You are an AI sales assistant. A customer in the ${customerSector} sector is currently buying: ${JSON.stringify(currentItems)}.
      Recommend 3 cross-sell or upsell items. Include the product name, estimated margin impact (e.g. '+15%'), a confidence score (0 to 1), and a reason based on typical B2B purchases.
      Respond strictly in JSON format with a "recommendations" array.
    `;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });
    const aiContent = completion.choices[0].message.content;
    const result = JSON.parse(aiContent || '{"recommendations": []}');
    const ranked = result.recommendations.sort((a, b) => b.score - a.score);
    res.json({
      success: true,
      note: "Generated via OpenAI",
      recommendations: ranked
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "AI Recommendation failed" });
  }
});
router.post("/discount-anomaly", async (req, res) => {
  const { currentDiscount } = req.body;
  try {
    const aggregates = await prisma.quotationItem.aggregate({
      _avg: { discountGiven: true },
      _count: { id: true }
    });
    const historicalAverage = aggregates._avg.discountGiven || 6;
    const totalRecordsAnalyzed = aggregates._count.id;
    const threshold = 5;
    const isAnomaly = currentDiscount > historicalAverage + threshold;
    res.json({
      success: true,
      historicalAverage: Number(historicalAverage.toFixed(2)),
      dataPointsAnalyzed: totalRecordsAnalyzed,
      currentDiscount,
      isAnomaly,
      alert: isAnomaly ? `\u{1F6A8} Anomaly detected: ${currentDiscount}% is significantly above the historical average of ${historicalAverage.toFixed(2)}%.` : "Normal discount behavior."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Database aggregation failed" });
  }
});
router.post("/deal-health", async (req, res) => {
  const { quoteInactiveDays, customerNegotiation, currentDiscount, deliveryDelayDays } = req.body;
  let riskScore = 0;
  const signals = [];
  if (quoteInactiveDays >= 7) {
    riskScore += 30;
    signals.push("Stalled deal: Quote inactive for 7+ days");
  }
  if (customerNegotiation === "high") {
    riskScore += 20;
    signals.push("High customer negotiation");
  }
  if (currentDiscount > 15) {
    riskScore += 25;
    signals.push("Discount anomaly detected");
  }
  if (deliveryDelayDays > 0) {
    riskScore += 25;
    signals.push("Delivery-promise slippage");
  }
  let health = "\u{1F7E2} Healthy";
  if (riskScore >= 70) {
    health = "\u{1F534} Critical";
  } else if (riskScore >= 40) {
    health = "\u{1F7E1} At Risk";
  }
  let aiSummary = "Deal health is calculated strictly based on quantitative signals.";
  if (process.env.OPENAI_API_KEY) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{
          role: "user",
          content: `Analyze this B2B deal. Overall status: ${health}. Risk Signals: ${signals.join(", ") || "None"}. Write a concise, 2-sentence manager summary advising on the next best action.`
        }]
      });
      aiSummary = completion.choices[0].message.content || aiSummary;
    } catch (e) {
      console.error("LLM summary generation failed", e);
    }
  }
  res.json({
    success: true,
    healthStatus: health,
    riskScore,
    signals,
    aiSummary
  });
});
var smart_logic_default = router;

// server/sales_rep/src/index.ts
var app = (0, import_express2.default)();
var port = process.env.PORT || 3001;
app.use((0, import_cors.default)());
app.use(import_express2.default.json());
app.use("/api/smart-logic", smart_logic_default);
var JWT_SECRET = "hackathon_secret_key_dealflow360";
app.post("/api/login", (req, res) => {
  const { email, password, role } = req.body;
  setTimeout(async () => {
    const token = import_jsonwebtoken.default.sign(
      { email, role, authenticatedAt: (/* @__PURE__ */ new Date()).toISOString() },
      JWT_SECRET,
      { expiresIn: "8h" }
    );
    return res.json({
      success: true,
      message: "Authentication successful",
      token
    });
  }, 800);
});
app.get("/api/dashboard/stats", (req, res) => {
  res.json({
    pendingApprovals: 4,
    openQuotations: 12,
    atRiskDeals: 3,
    recentActivity: [
      { text: "Acme Corp quotation approved by finance", time: "09:42" },
      { text: "Beta Industries requested a discount change", time: "09:10" }
    ]
  });
});
app.post("/api/quotations", async (req, res) => {
  try {
    const { customerName, customerTier, items } = req.body;
    let riskScore = 0;
    let totalAmount = 0;
    for (const item of items) {
      const ceiling = item.product.maxDiscount;
      if (item.discount > ceiling) {
        riskScore += item.discount - ceiling;
      }
      totalAmount += item.product.price * item.qty * (1 - item.discount / 100);
    }
    const status = riskScore > 0 ? "Pending Approval" : "Approved";
    res.json({
      success: true,
      message: status === "Approved" ? "Quotation auto-approved!" : "Quotation requires manager approval.",
      riskScore,
      status,
      totalAmount
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to process quotation" });
  }
});
app.get("/api/approvals", (req, res) => {
  res.json({
    approvals: [
      { id: "1", customer: "Acme Corp", riskScore: 8, status: "Pending Manager" },
      { id: "2", customer: "TechFlow", riskScore: 12, status: "Pending Finance" }
    ]
  });
});
app.post("/api/fulfillment/split", (req, res) => {
  const { items } = req.body;
  const split = {
    "Main Warehouse": items.filter((_, i) => i % 2 === 0),
    "East Depot": items.filter((_, i) => i % 2 !== 0)
  };
  res.json({
    success: true,
    suggestedSplit: split,
    estimatedShipments: Object.keys(split).filter((k) => split[k].length > 0).length
  });
});
app.get("/api/subscriptions/:customerId", (req, res) => {
  res.json({
    activePlans: [
      { product: "DealFlow Pro License (Yearly)", nextBillingDate: "2027-01-01", amount: 1200 }
    ]
  });
});
app.listen(port, () => {
  console.log(`Sales Rep API Server running on port ${port}`);
});
