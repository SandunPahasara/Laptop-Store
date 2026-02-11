const MarqueePromo = () => {
    const promos = [
        "🎉 Free Delivery Island-wide",
        "💳 Easy Installment Plans Available",
        "🛡️ 100% Genuine Products",
        "⚡ Same Day Delivery in Colombo",
        "🎁 Get Free Laptop Bag with Purchase",
        "🔥 Limited Time Offer - 50% OFF",
        "📞 24/7 Customer Support",
        "✨ New 2026 Models Available"
    ];

    // Duplicate for seamless loop
    const duplicatedPromos = [...promos, ...promos];

    return (
        <div className="bg-gray-900 text-white py-3 overflow-hidden border-y border-gray-700">
            <div className="flex animate-marquee whitespace-nowrap">
                {duplicatedPromos.map((promo, index) => (
                    <span
                        key={index}
                        className="mx-8 text-sm font-semibold inline-flex items-center"
                    >
                        {promo}
                        <span className="mx-4 text-secondary">•</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default MarqueePromo;
