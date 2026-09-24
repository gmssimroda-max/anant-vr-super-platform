import React, { useState } from "react";
import {
  ShoppingBag,
  Star,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  Tag,
  CreditCard,
  X,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  QrCode,
  Truck,
  Package,
  Clock,
  ExternalLink,
  ChevronRight,
  Eye,
  RotateCw,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { ProductItem } from "../types";
import { sampleProducts } from "../data/mockData";

export const ShopModule: React.FC = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    t,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [couponCode, setCouponCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [orderConfirmedId, setOrderConfirmedId] = useState<string | null>(null);
  const [inspectProduct, setInspectProduct] = useState<ProductItem | null>(null);
  const [inspectAngle, setInspectAngle] = useState<number>(0);

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "ANANT2026") {
      setDiscountPercent(15);
      setCouponApplied(true);
      setCouponError(null);
    } else {
      setCouponError(t("Invalid coupon. Try ANANT2026", "अमान्य कूपन। ANANT2026 का प्रयास करें"));
      setTimeout(() => setCouponError(null), 3000);
    }
  };

  const finalTotal = Math.round(cartTotal * (1 - discountPercent / 100));

  const handleCompleteOrder = () => {
    const orderId = `ANT-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderConfirmedId(orderId);
    clearCart();
  };

  const filteredProducts =
    selectedCategory === "all"
      ? sampleProducts
      : sampleProducts.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in">
      {/* Shop Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-base text-slate-900">
              {t("ANANT Sovereign Shop", "ANANT स्वदेशी शॉपिंग")}
            </h2>
            <p className="text-xs text-slate-500">
              {t("Artisan Indian handlooms, tech gadgets, and smart home in ₹", "हथकरघा, एआई गैजेट्स एवं प्रामाणिक स्वदेशी उत्पाद")}
            </p>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
          {[
            { id: "all", labelEn: "All Products", labelHi: "सभी" },
            { id: "electronics", labelEn: "Tech & Audio", labelHi: "इलेक्ट्रॉनिक्स" },
            { id: "wearables", labelEn: "Wearables", labelHi: "घड़ियां" },
            { id: "crafts", labelEn: "Handloom & Khadi", labelHi: "खादी व कला" },
            { id: "home", labelEn: "Home & Eco", labelHi: "घरेलू" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl cursor-pointer transition shrink-0 ${
                selectedCategory === cat.id
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t(cat.labelEn, cat.labelHi)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
            >
              <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                {prod.tag && (
                  <span className="absolute top-2 left-2 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                    {prod.tag}
                  </span>
                )}
                {/* 3D Rotate / Preview Badge */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setInspectProduct(prod);
                    setInspectAngle(0);
                  }}
                  id={`inspect-btn-${prod.id}`}
                  className="absolute bottom-2 right-2 p-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md text-white text-xs hover:bg-amber-600 transition shadow cursor-pointer flex items-center gap-1 opacity-90 group-hover:opacity-100"
                  title={t("3D 360° Inspect Product", "3D उत्पाद 360° देखें")}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold pr-1">3D View</span>
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition line-clamp-1">
                    {t(prod.name, prod.nameHi)}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                    <span>{prod.rating}</span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      ({prod.reviewsCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-base font-extrabold text-slate-900">
                      ₹{prod.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-slate-400 line-through ml-2">
                      ₹{prod.originalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(prod)}
                    id={`add-to-cart-${prod.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t("Add to Cart", "खरीदें")}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shopping Cart Drawer */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm h-fit space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <h3 className="font-extrabold text-sm text-slate-800">
                {t("Your Shopping Cart", "आपकी टोकरी")}
              </h3>
            </div>
            <span className="text-xs font-bold text-amber-600">
              {cart.reduce((s, i) => s + i.quantity, 0)} {t("Items", "आइटम")}
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="py-8 text-center text-slate-400 space-y-2">
              <ShoppingBag className="w-10 h-10 mx-auto opacity-30" />
              <p className="text-xs">
                {t("Your cart is empty. Add products above!", "आपकी टोकरी खाली है। उत्पाद जोड़ें!")}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-800 truncate">
                        {t(item.product.name, item.product.nameHi)}
                      </div>
                      <div className="text-slate-500 font-semibold mt-0.5">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, -1)}
                        className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, 1)}
                        className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-slate-400 hover:text-red-600 transition cursor-pointer ml-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Coupon */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon (e.g. ANANT2026)"
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-300 outline-none uppercase font-mono"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-900 transition cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Coupon ANANT2026 applied (-15%)</span>
                  </div>
                )}
                {couponError && (
                  <div className="text-[11px] text-rose-600 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{couponError}</span>
                  </div>
                )}
              </div>

              {/* Total Summary */}
              <div className="p-3 bg-amber-50/50 rounded-2xl border border-amber-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>{t("Subtotal", "कुल मूल्य")}</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>{t("Discount (15%)", "छूट (15%)")}</span>
                    <span>-₹{Math.round(cartTotal * 0.15).toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>{t("Shipping & Handling", "डिलीवरी शुल्क")}</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="pt-2 border-t border-amber-200/60 flex justify-between font-extrabold text-sm text-slate-900">
                  <span>{t("Total", "अंतिम राशि")}</span>
                  <span>₹{finalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                id="checkout-btn"
                className="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>{t("1-Click Instant Checkout", "तुरंत चेकआउट करें")}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-800">
                {t("ANANT Instant Checkout", "सुरक्षित चेकआउट")}
              </h3>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {orderConfirmedId ? (
              <div className="py-4 space-y-4">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">
                    {t("Order Placed Successfully!", "आदेश सफलतापूर्वक दर्ज हुआ!")}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {t("Tracking Ref:", "ट्रैकिंग संदर्भ:")} <strong className="font-mono text-slate-800">{orderConfirmedId}</strong>
                  </p>
                </div>

                {/* 4-Step Interactive Order Tracking Timeline */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-amber-600" />
                      <span>{t("Live Delivery Status", "लाइव डिलीवरी स्थिति")}</span>
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Speed Post ⚡
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {[
                      { stepEn: "Order Confirmed & Payment Verified", stepHi: "आदेश सत्यापित व भुगतान स्वीकृत", done: true, time: "Just now" },
                      { stepEn: "Artisan Packaging & Quality Inspection", stepHi: "कारीगर द्वारा पैकेजिंग व गुणवत्ता जांच", done: true, time: "Today 10:30 AM" },
                      { stepEn: "Dispatched via Bharat National Postal Logistics", stepHi: "भारतीय डाक लॉजिस्टिक्स द्वारा प्रेषित", done: false, active: true, time: "Estimated Tomorrow" },
                      { stepEn: "Doorstep Delivery by Certified Agent", stepHi: "सुरक्षित द्वार पर आपूर्ति", done: false, time: "2 Days" },
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs">
                        <div className="mt-0.5">
                          {step.done ? (
                            <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">✓</div>
                          ) : step.active ? (
                            <div className="w-4 h-4 rounded-full bg-amber-500 animate-pulse text-white flex items-center justify-center text-[10px]">●</div>
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-300 bg-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-semibold ${step.done || step.active ? "text-slate-800" : "text-slate-400"}`}>
                            {t(step.stepEn, step.stepHi)}
                          </div>
                          <div className="text-[10px] text-slate-400">{step.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setOrderConfirmedId(null);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
                >
                  {t("Track More in Dashboard", "डैशबोर्ड में ट्रैक करें")}
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t("Delivery Address", "डिलीवरी का पता")}
                  </label>
                  <input
                    type="text"
                    defaultValue="Mukesh Chouhan, Ring Road Sector 4, New Delhi - 110001"
                    className="w-full p-2.5 rounded-xl border border-slate-300 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t("Payment Method", "भुगतान विधि")}
                  </label>
                  <div className="space-y-2">
                    {/* Live UPI Option with Dynamic QR Code Preview */}
                    <div className="p-3 rounded-2xl border border-amber-300 bg-amber-50/60 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 font-bold text-slate-800 cursor-pointer">
                          <input type="radio" name="pay" defaultChecked />
                          <span>⚡ ANANT Pay / Bharat UPI QR</span>
                        </label>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                          Zero Fee
                        </span>
                      </div>

                      <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-amber-200">
                        <div className="w-16 h-16 bg-slate-900 rounded-lg p-1 shrink-0 flex items-center justify-center text-white">
                          <QrCode className="w-14 h-14" />
                        </div>
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <div className="font-bold text-slate-800 text-xs">
                            UPI ID: <span className="font-mono text-amber-700">pay@anant.bharat</span>
                          </div>
                          <p className="text-[10px] text-slate-500">
                            {t("Scan with PhonePe, Google Pay, BHIM or Paytm", "PhonePe, GPay, BHIM या Paytm से स्कैन करें")}
                          </p>
                          <div className="text-[11px] font-extrabold text-slate-900">
                            ₹{finalTotal.toLocaleString("en-IN")}
                          </div>
                        </div>
                      </div>
                    </div>

                    <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                      <input type="radio" name="pay" />
                      <span>Credit / Debit Card / RuPay Banking</span>
                    </label>
                    <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
                      <input type="radio" name="pay" />
                      <span>Cash on Delivery (COD)</span>
                    </label>
                  </div>
                </div>

                <div className="pt-2 flex justify-between font-extrabold text-sm text-slate-900 border-t border-slate-100">
                  <span>{t("Payable Amount:", "देय राशि:")}</span>
                  <span className="text-amber-600">₹{finalTotal.toLocaleString("en-IN")}</span>
                </div>

                <button
                  onClick={handleCompleteOrder}
                  id="confirm-payment-btn"
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md cursor-pointer transition flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t("Pay & Confirm Order", "भुगतान करें एवं आदेश दर्ज करें")}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3D 360° Interactive Product Inspection Modal */}
      {inspectProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                  <RotateCw className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">
                    {t("3D Virtual Product Studio", "3D आभासी उत्पाद स्टूडियो")}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {t("Rotate & inspect craftsmanship details in 360°", "360° में उत्पाद कारीगरी व फिनिशिंग देखें")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setInspectProduct(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 3D Rotatable Stage */}
            <div className="relative aspect-4/3 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center overflow-hidden border border-slate-800 p-6 select-none">
              <div
                className="transition-transform duration-100 ease-out cursor-grab active:cursor-grabbing flex items-center justify-center"
                style={{
                  transform: `perspective(600px) rotateY(${inspectAngle}deg) scale(1.08)`,
                }}
              >
                <img
                  src={inspectProduct.image}
                  alt={inspectProduct.name}
                  className="max-h-56 max-w-xs object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.7)]"
                  draggable={false}
                />
              </div>

              {/* Angle Readout Overlay */}
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-[10px] font-mono text-amber-400 font-bold">
                Orientation: {Math.round((inspectAngle % 360 + 360) % 360)}°
              </div>

              {/* Handcrafted ODOP Stamp */}
              <div className="absolute top-3 right-3 bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-600/50 text-[10px] text-emerald-300 font-bold">
                100% Authentic ODOP
              </div>

              {/* Quick Rotation Buttons */}
              <div className="absolute bottom-3 inset-x-4 flex justify-between items-center text-xs">
                <button
                  onClick={() => setInspectAngle((prev) => prev - 45)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold transition cursor-pointer flex items-center gap-1"
                >
                  <span>↺ -45°</span>
                </button>
                <span className="text-[11px] text-slate-400">
                  {t("Use slider or buttons to rotate", "घुमाने के लिए स्लाइडर या बटन का उपयोग करें")}
                </span>
                <button
                  onClick={() => setInspectAngle((prev) => prev + 45)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold transition cursor-pointer flex items-center gap-1"
                >
                  <span>+45° ↻</span>
                </button>
              </div>
            </div>

            {/* Slider Control */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-600 font-medium">
                <span>{t("Rotate Angle", "घुमाव कोण")}</span>
                <span className="font-mono">{inspectAngle}°</span>
              </div>
              <input
                type="range"
                min="-180"
                max="180"
                value={inspectAngle}
                onChange={(e) => setInspectAngle(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">
                  {t(inspectProduct.name, inspectProduct.nameHi)}
                </h4>
                <div className="text-sm font-extrabold text-amber-600 mt-0.5">
                  ₹{inspectProduct.price.toLocaleString("en-IN")}
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(inspectProduct);
                  setInspectProduct(null);
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{t("Add to Cart", "टोकरी में जोड़ें")}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
