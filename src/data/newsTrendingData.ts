import { NewsItem } from "../types";

export interface TrendingCategoryNews {
  categoryId: string;
  categoryNameEn: string;
  categoryNameHi: string;
  query: string;
  articles: NewsItem[];
}

export const TOP_TRENDING_NEWS_BY_CATEGORY: Record<string, NewsItem[]> = {
  all: [
    {
      id: "news_trend_1",
      title: "India AI Mission: 10,000 Sovereign GPUs Cluster Launched for Tech Ecosystem",
      titleHi: "भारत एआई मिशन: 10,000 संप्रभु जीपीयू सुपर क्लस्टर राष्ट्र को समर्पित",
      summary:
        "Ministry of Electronics & IT expands sovereign compute infrastructure, enabling startups and researchers to train foundational multilingual LLMs locally.",
      summaryHi:
        "इलेक्ट्रॉनिक्स एवं आईटी मंत्रालय ने संप्रभु कंप्यूट क्लस्टर का शुभारंभ किया, जिससे भारतीय स्टार्टअप्स को अपनी भाषाओं में अत्याधुनिक AI मॉडल बनाने की शक्ति मिलेगी।",
      source: "Google News / PIB Digital",
      category: "headlines",
      publishedAt: "Today · 20 mins ago",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
      readTime: "3 min read",
    },
    {
      id: "news_trend_2",
      title: "ISRO Gaganyaan Crew Module Thermal Vacuum Trials Successfully Completed",
      titleHi: "इसरो गगनयान क्रू मॉड्यूल के थर्मल वैक्यूम ट्रायल्स सफलतापूर्वक संपन्न",
      summary:
        "ISRO scientists validate environmental life-support systems under simulated extreme outer-space temperatures for the upcoming 2026 crewed spaceflight.",
      summaryHi:
        "इसरो के वैज्ञानिकों ने आगामी मानवयुक्त अंतरिक्ष उड़ान के लिए क्रू मॉड्यूल की लाइफ सपोर्ट प्रणाली को अत्यधिक बाह्य अंतरिक्ष तापमान में सफलतापूर्वक परखा।",
      source: "Google News / Space Desk",
      category: "headlines",
      publishedAt: "Today · 1 hour ago",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
      readTime: "4 min read",
    },
    {
      id: "news_trend_3",
      title: "BSE Sensex Surges Past 84,200 as Tech and Infrastructure Stocks Rally",
      titleHi: "सेंसेक्स 84,200 के पार: आईटी और इंफ्रास्ट्रक्चर शेयरों में भारी उछाल",
      summary:
        "Robust macro indicators, steady corporate earnings, and strong domestic mutual fund inflows push Indian equity indices to fresh historic highs.",
      summaryHi:
        "मजबूत आर्थिक बुनियादी ढांचे और घरेलू संस्थागत निवेशकों के निरंतर निवेश से भारतीय शेयर बाजार रिकॉर्ड स्तरों पर पहुंच गया।",
      source: "Google News / Economic Times",
      category: "headlines",
      publishedAt: "Today · 2 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80",
      readTime: "3 min read",
    },
    {
      id: "news_trend_4",
      title: "Digital Rupee (e₹) Offline Sound-Box Payments Unveiled Across 50 Cities",
      titleHi: "डिजिटल रुपया (e₹): बिना इंटरनेट 50 शहरों में ऑफलाइन साउंड-बॉक्स भुगतान शुरू",
      summary:
        "RBI and NPCI introduce seamless NFC and ultrasonic sound-wave based offline retail settlement, eliminating network dropouts in transit and bazaars.",
      summaryHi:
        "आरबीआई और एनपीसीआई ने इंटरनेट न होने पर भी अल्ट्रासोनिक ध्वनि तरंगों से सीधे डिजिटल रुपया भुगतान का देशव्यापी विस्तार किया।",
      source: "Google News / Mint",
      category: "headlines",
      publishedAt: "Today · 3 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80",
      readTime: "2 min read",
    },
    {
      id: "news_trend_5",
      title: "National Renewable Grid Crosses 52% Milestone Ahead of 2030 Roadmap",
      titleHi: "राष्ट्रीय हरित ऊर्जा ग्रिड में नवीकरणीय ऊर्जा की हिस्सेदारी 52% के पार",
      summary:
        "Massive ultra-mega solar parks in Rajasthan and Gujarat offshore wind installations deliver historic green electricity output to the northern power grid.",
      summaryHi:
        "राजस्थान के विशाल सोलर पार्क और गुजरात के समुद्री पवन ऊर्जा संयंत्रों से देश ने 2030 के लक्ष्य को समय से पहले ही पार कर लिया।",
      source: "Google News / Energy Daily",
      category: "headlines",
      publishedAt: "Today · 4 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80",
      readTime: "4 min read",
    },
  ],

  tech: [
    {
      id: "news_tech_1",
      title: "Cursor & Next-Gen AI Code Editors Redefine Software Development in 2026",
      titleHi: "Cursor और नेक्स्ट-जेन एआई कोड एडिटर्स: सॉफ्टवेयर विकास की नई क्रांति",
      summary:
        "Multi-file context awareness, intelligent diff generation, and instant terminal command synthesis transform developer productivity by 300%.",
      summaryHi:
        "मल्टी-फाइल संदर्भ समझ, इंटेलिजेंट डिफ जनरेशन और स्वचालित टर्मिनल डिबगिंग ने प्रोग्रामर्स की उत्पादकता तीन गुना बढ़ा दी है।",
      source: "Google News / TechCrunch",
      category: "tech",
      publishedAt: "Today · 35 mins ago",
      imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
      readTime: "4 min read",
    },
    {
      id: "news_tech_2",
      title: "Google Gemini 3.8 Flash Unleashes Sub-100ms Multimodal Reasoning",
      titleHi: "Google Gemini 3.8 Flash: 100 मिलीसेकंड से कम में उच्च-स्तरीय मल्टीमॉडल तर्क",
      summary:
        "New breakthrough low-latency architecture handles live visual streaming, code synthesis, and deep reasoning across millions of context tokens simultaneously.",
      summaryHi:
        "गूगल का नया सुपर-फास्ट मॉडल लाइव वीडियो विश्लेषण, कोडिंग और लाखों टोकन के संदर्भ को पलक झपकते संसाधित करने में सक्षम।",
      source: "Google News / AI Research Hub",
      category: "tech",
      publishedAt: "Today · 1 hour ago",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
      readTime: "5 min read",
    },
    {
      id: "news_tech_3",
      title: "Quantum Chip 'PARAM-Q' Demonstrates Fault-Tolerant Cryptographic Entanglement",
      titleHi: "स्वदेशी क्वांटम चिप 'PARAM-Q' का सफल परीक्षण: अटूट साइबर सुरक्षा की दिशा में कदम",
      summary:
        "Indian Institute of Science and C-DAC report successful execution of Shor's quantum algorithm on a 64-qubit topological semiconductor platform.",
      summaryHi:
        "आईआईएससी और सी-डैक ने 64-क्यूबिट टोपोलॉजिकल सेमीकंडक्टर पर क्वांटम सुरक्षा परीक्षण सफलतापूर्वक पूरे किए।",
      source: "Google News / Science Wire",
      category: "tech",
      publishedAt: "Today · 2 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80",
      readTime: "3 min read",
    },
    {
      id: "news_tech_4",
      title: "Open-Source Indian LLM 'BharatGen' Added to Global AI Leaderboards",
      titleHi: "ओपन-सोर्स भारतीय भाषा मॉडल 'BharatGen' ने वैश्विक एआई बेंचमार्क में बनाई जगह",
      summary:
        "Trained on 22 scheduled Indian languages with deep cultural context, BharatGen outperforms major international models in Indic reasoning tasks.",
      summaryHi:
        "22 भारतीय भाषाओं और समृद्ध सांस्कृतिक संदर्भ पर प्रशिक्षित BharatGen मॉडल ने बहुभाषी अनुवाद में विश्व स्तर पर शीर्ष स्थान पाया।",
      source: "Google News / Indic AI Forum",
      category: "tech",
      publishedAt: "Today · 4 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
      readTime: "4 min read",
    },
    {
      id: "news_tech_5",
      title: "Solid-State Battery Tech Breakthrough Doubles Electric Vehicle Range",
      titleHi: "सॉलिड-स्टेट बैटरी का नया आविष्कार: इलेक्ट्रिक वाहनों की रेंज होगी दोगुनी",
      summary:
        "Next-generation silicon-graphene solid-state cells charge in 9 minutes while operating safely up to 70°C without liquid electrolyte degradation.",
      summaryHi:
        "सिलिकॉन-ग्राफीन आधारित नई सॉलिड-स्टेट बैटरी केवल 9 मिनट में 80% चार्ज होकर 800 किमी की अविश्वसनीय ड्राइविंग रेंज देगी।",
      source: "Google News / CleanTech",
      category: "tech",
      publishedAt: "Today · 5 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1558441719-8b449c6ff673?w=600&auto=format&fit=crop&q=80",
      readTime: "3 min read",
    },
  ],

  india: [
    {
      id: "news_ind_1",
      title: "NavIC Satellite Constellation Upgraded with Atomic Clocks for Millimeter Precision",
      titleHi: "नाविक (NavIC) उपग्रह समूह में नई रुबीडियम परमाणु घड़ियां सक्रिय, मिलीमीटर स्तर की सटीकता",
      summary:
        "ISRO successfully commissions second-generation NVS navigational satellites providing civilian positioning accuracy under 2 meters across South Asia.",
      summaryHi:
        "इसरो ने नाविक प्रणाली में स्वदेशी रुबीडियम परमाणु घड़ियों से युक्त दूसरी पीढ़ी के उपग्रह सक्रिय किए, जिससे जीपीएस से भी अधिक सटीक स्थिति मिलेगी।",
      source: "Google News / ISRO Bureau",
      category: "india",
      publishedAt: "Today · 45 mins ago",
      imageUrl: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=600&auto=format&fit=crop&q=80",
      readTime: "4 min read",
    },
    {
      id: "news_ind_2",
      title: "Vande Bharat Sleeper Express Network Expands Across 14 New Interstate Corridors",
      titleHi: "वंदे भारत स्लीपर एक्सप्रेस: 14 नए राज्यों के बीच रात्रि तेज रेल सेवा का विस्तार",
      summary:
        "Modern aerodynamic 160 km/h trainsets feature soundproof sleeper cabins, bio-vacuum toilets, and automatic anti-collision Kavach 4.0 protection.",
      summaryHi:
        "160 किमी/घंटे की रफ्तार, आधुनिक स्लीपर केबिन और कवच 4.0 स्वचालित टक्कर रोधी सुरक्षा से लैस नई वंदे भारत स्लीपर ट्रेनों का शुभारंभ।",
      source: "Google News / Rail Ministry",
      category: "india",
      publishedAt: "Today · 1 hour ago",
      imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&auto=format&fit=crop&q=80",
      readTime: "3 min read",
    },
    {
      id: "news_ind_3",
      title: "Ayodhya & Kashi Pilgrimage Corridors Attract Record 85 Million Visitors in 2026",
      titleHi: "अयोध्या व काशी कॉरिडोर: 2026 में 8.5 करोड़ श्रद्धालुओं का ऐतिहासिक आगमन",
      summary:
        "Digital queue management, electric river water ferries, and multi-lingual audio guides power seamless cultural tourism across Uttar Pradesh.",
      summaryHi:
        "आधुनिक डिजिटल कतार प्रबंधन, इलेक्ट्रिक क्रूज बोट्स और भव्य विरासत कॉरिडोर ने उत्तर प्रदेश के तीर्थाटन को वैश्विक स्तर पर प्रतिष्ठित किया।",
      source: "Google News / Tourism Wire",
      category: "india",
      publishedAt: "Today · 2 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&auto=format&fit=crop&q=80",
      readTime: "3 min read",
    },
    {
      id: "news_ind_4",
      title: "Semiconductor Fabrication Plant in Dholera Produces First Commercial Silicon Wafers",
      titleHi: "धोलेरा सेमीकंडक्टर फैब प्लांट से पहले स्वदेशी सिलिकॉन वेफर्स का सफल उत्पादन",
      summary:
        "India's premier 28nm fabrication hub achieves yield qualification, marking a historic leap in sovereign electronics and chip manufacturing.",
      summaryHi:
        "भारत के पहले 28 नैनोमीटर सेमीकंडक्टर फैब प्लांट ने सफलतापूर्वक वाणिज्यिक चिप्स का उत्पादन शुरू कर तकनीकी आत्मनिर्भरता दर्ज की।",
      source: "Google News / Industrial Express",
      category: "india",
      publishedAt: "Today · 3 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
      readTime: "4 min read",
    },
    {
      id: "news_ind_5",
      title: "National Jal Jeevan Mission Reaches 100% Tap Water Saturation in 250 Districts",
      titleHi: "जल जीवन मिशन: 250 जिलों में हर घर नल से शुद्ध जल पहुंचाने का ऐतिहासिक लक्ष्य पूरा",
      summary:
        "Smart IoT water-quality sensors and solar-powered pumping stations guarantee uninterrupted potable water in remote rural households.",
      summaryHi:
        "स्मार्ट आईओटी सेंसर और सौर ऊर्जा संचालित पंपों से देश के दूरदराज गांवों में स्वच्छ पेयजल की निर्बाध आपूर्ति सुनिश्चित की गई।",
      source: "Google News / PIB India",
      category: "india",
      publishedAt: "Today · 5 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?w=600&auto=format&fit=crop&q=80",
      readTime: "3 min read",
    },
  ],

  business: [
    {
      id: "news_biz_1",
      title: "India Overtakes Japan as World's 4th Largest Economy Reaching $4.8 Trillion GDP",
      titleHi: "भारतीय अर्थव्यवस्था $4.8 ट्रिलियन: जापान को पछाड़कर बनी दुनिया की चौथी सबसे बड़ी अर्थव्यवस्था",
      summary:
        "Surging electronics manufacturing, services exports, and deep capital expenditure push annual GDP growth rate to a resilient 7.4%.",
      summaryHi:
        "इलेक्ट्रॉनिक्स विनिर्माण, वैश्विक सेवा निर्यात और सशक्त घरेलू मांग के दम पर भारत 7.4% की तीव्र वृद्धि दर से आगे बढ़ा।",
      source: "Google News / Bloomberg & RBI",
      category: "business",
      publishedAt: "Today · 30 mins ago",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80",
      readTime: "4 min read",
    },
    {
      id: "news_biz_2",
      title: "UPI Global Transactions Cross 20 Billion Monthly Volume Across 18 Nations",
      titleHi: "यूपीआई का विश्व में परचम: 18 देशों में मासिक लेन-देन 20 अरब के पार",
      summary:
        "France, UAE, Singapore, Sri Lanka, and Mauritius see record tourist and merchant UPI settlements, eliminating high currency conversion charges.",
      summaryHi:
        "फ्रांस, यूएई, सिंगापुर और मॉरीशस सहित 18 देशों में भारतीय पर्यटकों और व्यापारियों द्वारा बिना मुद्रा विनिमय शुल्क के त्वरित यूपीआई भुगतान।",
      source: "Google News / NPCI International",
      category: "business",
      publishedAt: "Today · 1 hour ago",
      imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80",
      readTime: "3 min read",
    },
    {
      id: "news_biz_3",
      title: "India's Tech Startup Funding Rebounds to $18 Billion in H1 2026",
      titleHi: "भारतीय तकनीकी स्टार्टअप्स में निवेश लौटा: पहली छमाही में $18 बिलियन का विदेशी निवेश",
      summary:
        "Venture capital firms heavily allocate capital into sovereign AI, climate tech, defense drones, and semiconductor design companies.",
      summaryHi:
        "संप्रभु एआई, क्लाइमेट टेक, रक्षा ड्रोन और सेमीकंडक्टर डिजाइनिंग के क्षेत्र में वैश्विक वेंचर कैपिटलिस्ट्स ने बड़े पैमाने पर निवेश किया।",
      source: "Google News / Inc42",
      category: "business",
      publishedAt: "Today · 2 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&auto=format&fit=crop&q=80",
      readTime: "3 min read",
    },
    {
      id: "news_biz_4",
      title: "Gold Prices Stabilize at MCX as Sovereign Gold Bonds Distribute Record Yields",
      titleHi: "एमसीएक्स पर सोने के भाव स्थिर: सॉवरेन गोल्ड बॉन्ड धारकों को मिला रिकॉर्ड रिटर्न",
      summary:
        "Central banks rebalance forex reserves with gold while domestic retail buyers embrace digital gold wallets on sovereign platforms.",
      summaryHi:
        "केंद्रीय बैंकों द्वारा स्वर्ण भंडार मजबूत करने और डिजिटल गोल्ड वॉलेट की लोकप्रियता से सोने में स्थिरता और सुरक्षित निवेश जारी।",
      source: "Google News / Business Standard",
      category: "business",
      publishedAt: "Today · 4 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&auto=format&fit=crop&q=80",
      readTime: "3 min read",
    },
    {
      id: "news_biz_5",
      title: "Automobile Exports from Chennai & Pune Surge 28% Driven by Hybrid Models",
      titleHi: "भारतीय ऑटोमोबाइल निर्यात में 28% का बड़ा उछाल: चेन्नई व पुणे से हाइब्रिड कारों की भारी मांग",
      summary:
        "European and Southeast Asian markets snap up Made-in-India compact electric and plug-in hybrid SUVs built to stringent global safety standards.",
      summaryHi:
        "भारत में निर्मित हाई-सेफ्टी इलेक्ट्रिक और हाइब्रिड एसयूवी कारों को यूरोप और दक्षिण-पूर्व एशिया में व्यापक सराहना और मांग मिली।",
      source: "Google News / Auto Monitor",
      category: "business",
      publishedAt: "Today · 5 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80",
      readTime: "3 min read",
    },
  ],

  sports: [
    {
      id: "news_sports_1",
      title: "India Sweeps Champions Trophy Group Stage with Record Unbeaten Streak",
      titleHi: "चैंपियंस ट्रॉफी में भारत का दबदबा: ग्रुप स्टेज में लगातार जीत का नया रिकॉर्ड",
      summary:
        "Stellar centuries and a lethal pace bowling spell of 5 for 22 guarantee Team India a dominant top-seed entry into the semi-finals.",
      summaryHi:
        "शानदार शतकीय पारियों और तेज गेंदबाजों के घातक प्रदर्शन के दम पर भारतीय क्रिकेट टीम ने शीर्ष स्थान के साथ सेमीफाइनल में प्रवेश किया।",
      source: "Google News / ESPNcricinfo",
      category: "sports",
      publishedAt: "Today · 20 mins ago",
      imageUrl: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=80",
      readTime: "3 min read",
    },
    {
      id: "news_sports_2",
      title: "Indian Grandmaster Secures World Chess Championship Candidates Lead",
      titleHi: "विश्व शतरंज चैंपियनशिप: भारतीय ग्रैंडमास्टर ने कैंडिडेट्स टूर्नामेंट में बनाई मजबूत बढ़त",
      summary:
        "Masterful endgame technique against world #2 elevates India's 19-year-old prodigy to the threshold of the historic World Championship match.",
      summaryHi:
        "विश्व के नंबर-2 खिलाड़ी को मात देकर 19 वर्षीय भारतीय ग्रैंडमास्टर ने इतिहास रचते हुए कैंडिडेट्स में शीर्ष बढ़त हासिल की।",
      source: "Google News / FIDE & ChessBase",
      category: "sports",
      publishedAt: "Today · 1 hour ago",
      imageUrl: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&auto=format&fit=crop&q=80",
      readTime: "4 min read",
    },
    {
      id: "news_sports_3",
      title: "National Athletics Stadium Unveiled for Upcoming 2036 Olympic Bid",
      titleHi: "2036 ओलंपिक दावेदारी: 110,000 दर्शक क्षमता वाले आधुनिक राष्ट्रीय एथलेटिक्स स्टेडियम का लोकार्पण",
      summary:
        "State-of-the-art synthetic track, climate-controlled acoustic dome, and robotic sprint timing cameras establish world-class sporting infrastructure.",
      summaryHi:
        "अत्याधुनिक सिंथेटिक ट्रैक और ओलंपिक मानकों वाले 1.1 लाख दर्शक क्षमता वाले भव्य खेल परिसर का औपचारिक उद्घाटन।",
      source: "Google News / Sports Authority of India",
      category: "sports",
      publishedAt: "Today · 2 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=600&auto=format&fit=crop&q=80",
      readTime: "3 min read",
    },
    {
      id: "news_sports_4",
      title: "Badminton Super 1000: Indian Duo Captures Historic Men's Doubles Crown",
      titleHi: "बैडमिंटन सुपर 1000: भारतीय जोड़ी ने पुरुष युगल का ऐतिहासिक खिताब जीता",
      summary:
        "Thrilling 21-19, 23-21 victory over the Olympic champions cements India's doubles pair as the undisputed world ranking number 1.",
      summaryHi:
        "रोमांचक फाइनल में ओलंपिक चैंपियन जोड़ी को 21-19, 23-21 से हराकर भारतीय स्टार जोड़ी विश्व में नंबर-1 पर विराजमान हुई।",
      source: "Google News / BWF World Tour",
      category: "sports",
      publishedAt: "Today · 3 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop&q=80",
      readTime: "3 min read",
    },
    {
      id: "news_sports_5",
      title: "Pro Kabaddi League 2026 Finals Draw Record 120 Million TV and Digital Viewers",
      titleHi: "प्रो कबड्डी लीग 2026: फाइनल मुकाबले को मिले रिकॉर्ड 12 करोड़ दर्शक",
      summary:
        "Last-second raid turnaround secures dramatic maiden championship title in front of an electric packed arena.",
      summaryHi:
        "अंतिम सेकंड की सांस रोक देने वाली रेड में रोमांचक जीत दर्ज कर टीम ने पहली बार प्रो कबड्डी का चमचमाता कप उठाया।",
      source: "Google News / Star Sports",
      category: "sports",
      publishedAt: "Today · 4 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=600&auto=format&fit=crop&q=80",
      readTime: "2 min read",
    },
  ],
};
