import { VRDestination } from "../types";

export const sampleVRDestinations: VRDestination[] = [
  {
    id: "isro_gaganyaan",
    title: "ISRO Gaganyaan 2026 Orbital Cockpit",
    titleHi: "इसरो गगनयान 2026 ऑर्बिटल कॉकपिट",
    subtitle: "Low Earth Orbit (400 km) Astronaut Mission Module",
    subtitleHi: "400 किमी पृथ्वी की निचली कक्षा अंतरिक्ष यात्री मिशन मॉड्यूल",
    category: "space",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    backgroundSky: "radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)",
    ambientAudioType: "space",
    description: "Experience the pressurized crew module of India's indigenous human spaceflight program. Inspect navigation telemetry, cryogenic thrust telemetry, and look out the Cupola window at the Indian subcontinent rotating below.",
    descriptionHi: "भारत के स्वदेशी मानव अंतरिक्ष उड़ान कार्यक्रम के प्रेशराइज्ड क्रू मॉड्यूल का 360° अनुभव करें। नेविगेशन टेलीमेट्री, क्रायोजेनिक थ्रस्टर्स और क्यूपोला खिड़की से नीचे घूमते भारत को देखें।",
    hotspots: [
      {
        id: "nav_console",
        label: "NavIC Flight Computer",
        labelHi: "नाविक अंतरिक्ष उड़ान कंप्यूटर",
        x: 48,
        y: 52,
        details: "Redundant triple-redundant NavIC satellite positioning computer calculating orbital insertion speed of 7.8 km/s.",
        detailsHi: "ट्रिपल-रिडंडेंट नाविक उपग्रह पोजीशनिंग कंप्यूटर जो 7.8 किमी/सेकंड की कक्षीय गति को नियंत्रित करता है।"
      },
      {
        id: "life_support",
        label: "ECLSS Life Support Panel",
        labelHi: "ईसीएलएसएस जीवन रक्षक प्रणाली",
        x: 25,
        y: 40,
        details: "Environmental Control & Life Support System regulating 21% O2, cabin pressure at 101.3 kPa, and cabin temperature at 22°C.",
        detailsHi: "पर्यावरण नियंत्रण व जीवन समर्थन प्रणाली जो 21% ऑक्सीजन, केबिन दबाव और 22°C तापमान नियंत्रित रखती है।"
      },
      {
        id: "cupola_window",
        label: "Earth Observation Cupola",
        labelHi: "पृथ्वी दर्शन क्यूपोला खिड़की",
        x: 75,
        y: 35,
        details: "Four-layered fused silica panoramic observation viewport looking directly at the Himalayas and the Indian Ocean coastline.",
        detailsHi: "चार-परतीय क्वार्ट्ज ग्लास युक्त मनोरम खिड़की जिससे हिमालय और हिंद महासागर का अद्भुत दृश्य दिखाई देता है।"
      }
    ],
    facts: [
      { label: "Altitude", value: "400 km LEO" },
      { label: "Orbital Speed", value: "28,000 km/h" },
      { label: "Crew Capacity", value: "3 Vyomanauts" },
      { label: "Mission Life", value: "7 Days" }
    ]
  },
  {
    id: "ayodhya_ram_mandir",
    title: "Shri Ram Janmabhoomi 3D Sanctorum",
    titleHi: "श्री राम जन्मभूमि 3D गर्भगृह",
    subtitle: "Sacred Nagara Architecture & Carved Sandstone Mandapams",
    subtitleHi: "पवित्र नागर शैली वास्तु एवं उत्कीर्ण बंसी पहाड़पुर बलुआ पत्थर",
    category: "heritage",
    thumbnail: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80",
    backgroundSky: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    ambientAudioType: "temple",
    description: "Step into the sanctum sanctorum (Garbhagriha) of Shri Ram Janmabhoomi Mandir in Ayodhya. Marvel at the intricate Nagara-style stone carvings, brass temple bells, and the golden Kalash pinnacle.",
    descriptionHi: "अयोध्या के श्री राम जन्मभूमि मंदिर के गर्भगृह में 360° वर्चुअल परिक्रमा करें। नागर शैली के नक्काशीदार स्तंभों, पीतल के घंटनाद और स्वर्ण कलश की भव्यता का अनुभव करें।",
    hotspots: [
      {
        id: "garbhagriha_core",
        label: "Maha Mandapam Pillar Art",
        labelHi: "महा मंडपम स्तंभ शिल्प",
        x: 50,
        y: 60,
        details: "Carved from pink Bansi Paharpur sandstone with 392 pillars depicting avatars, devatas, and sacred motifs without structural iron or steel.",
        detailsHi: "बिना किसी लोहे या सीमेंट के गुलाबी बंसी पहाड़पुर पत्थरों से तराशे गए 392 स्तंभ।"
      },
      {
        id: "shikhara_apex",
        label: "Nagara Shikhara & Dhwaja",
        labelHi: "नागर शिखर व स्वर्ण ध्वज",
        x: 50,
        y: 18,
        details: "161-foot towering traditional Nagara spire topped with a brass amalak, golden kalash, and consecrated saffron flag.",
        detailsHi: "161 फीट ऊंचा नागर शैली शिखर जिस पर पवित्र स्वर्ण कलश और केसरिया ध्वज स्थापित है।"
      },
      {
        id: "surya_tilak",
        label: "Surya Tilak Optomechanical Path",
        labelHi: "सूर्य तिलक ऑप्टोमैकेनिकल मार्ग",
        x: 65,
        y: 42,
        details: "CBRI Roorkee engineered brass mirror-lens apparatus that focuses the direct rays of the sun onto the forehead of Ram Lalla on Ram Navami.",
        detailsHi: "सीबीआरआई रुड़की द्वारा निर्मित दर्पण-लेंस तंत्र जो रामनवमी पर सूर्य की किरणों को ललाट पर केंद्रित करता है।"
      }
    ],
    facts: [
      { label: "Architecture", value: "Nagara Traditional" },
      { label: "Pillars", value: "392 Carved Stone" },
      { label: "Height", value: "161 Feet" },
      { label: "Designed Lifespan", value: "1,000+ Years" }
    ]
  },
  {
    id: "taj_mahal_sunset",
    title: "Taj Mahal 360° Sunset Panorama",
    titleHi: "ताजमहल सूर्यास्त 360° वॉकथ्रू",
    subtitle: "UNESCO World Heritage Ivory-White Marble Mausoleum",
    subtitleHi: "यूनेस्को विश्व धरोहर मकराना संगमरमर स्मारक व यमुना तट",
    category: "heritage",
    thumbnail: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop&q=80",
    backgroundSky: "linear-gradient(to top, #e14fad 0%, #f9d423 100%)",
    ambientAudioType: "cosmic",
    description: "Explore the symmetric gardens, reflective charbagh pools, and the grand central dome of the Taj Mahal during golden sunset. Observe delicate pietra dura semi-precious stone inlays.",
    descriptionHi: "सूर्यास्त के स्वर्णिम प्रकाश में ताजमहल के चारबाग बगीचों, जल कुंडों और केंद्रीय गुंबद का 360° भ्रमण करें। मकराना संगमरमर पर पिएट्रा ड्यूरा रत्नजड़ित नक्काशी को करीब से देखें।",
    hotspots: [
      {
        id: "central_dome",
        label: "Double Onion Dome",
        labelHi: "केंद्रीय भव्य गुंबद",
        x: 50,
        y: 30,
        details: "73-meter tall onion dome engineered with inner acoustic resonance chamber and lotus decorative motif.",
        detailsHi: "73 मीटर ऊंचा भव्य गुंबद जिसमें भीतरी ध्वनि अनुनाद और कमल की पंखुड़ियों की सजावट है।"
      },
      {
        id: "pietra_dura",
        label: "Pietra Dura Inlay Floral Work",
        labelHi: "पिएट्रा ड्यूरा रत्न जड़ाई",
        x: 35,
        y: 65,
        details: "Lapis lazuli, jade, turquoise, and jasper finely inlaid into translucent Makrana marble panels.",
        detailsHi: "दूधिया मकराना संगमरमर में जड़े हुए लाजवर्त, फिरोजा और जेड के बारीक पुष्प डिजाइन।"
      }
    ],
    facts: [
      { label: "Material", value: "Makrana Marble" },
      { label: "Recognition", value: "UNESCO World Heritage" },
      { label: "Symmetry", value: "Bilateral Axially Perfect" },
      { label: "Location", value: "Agra, Yamuna Riverbank" }
    ]
  },
  {
    id: "varanasi_ghats",
    title: "Varanasi Dashashwamedh Ghat Ganga Aarti",
    titleHi: "वाराणसी दशाश्वमेध घाट गंगा आरती",
    subtitle: "Ancient Spiritual Riverfront & Evening Chanting Ambiance",
    subtitleHi: "प्राचीनतम आध्यात्मिक गंगा तट व संध्या महाआरती",
    category: "culture",
    thumbnail: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=80",
    backgroundSky: "linear-gradient(180deg, #101820 0%, #cf4d17 100%)",
    ambientAudioType: "river",
    description: "Immerse in the timeless energy of the oldest living city. Watch priests perform the synchronized Maha Aarti with brass multi-tiered deepam lamps to the rhythm of conches, bells, and river waves.",
    descriptionHi: "संसार की सबसे प्राचीन नगरी काशी के दशाश्वमेध घाट पर संध्या महाआरती का 360° अलौकिक अनुभव। शंखध्वनि, पीतल के सहस्त्र दीयों और गंगा की लहरों की लय में डूबें।",
    hotspots: [
      {
        id: "aarti_dais",
        label: "Priests Aarti Dais & Brass Deepams",
        labelHi: "अर्चक वेदी व महादीपक",
        x: 52,
        y: 58,
        details: "Multi-tiered heavy brass lamps with camphor flames offered rhythmically to sacred Maa Ganga.",
        detailsHi: "कपूर और घी की ज्योति से प्रज्वलित भारी पीतल के सहस्त्र-मुखी दीप जिन्हें लयबद्ध रूप से समर्पित किया जाता है।"
      },
      {
        id: "floating_lamps",
        label: "Ganga Flow & Floating Clay Diyas",
        labelHi: "गंगा धारा व प्रवाहित दीप",
        x: 70,
        y: 75,
        details: "Hundreds of marigold flowers and clay lamps floating along the slow holy current under the moonlit sky.",
        detailsHi: "चांदनी रात में गेंदे के फूलों और मिट्टी के दीपकों की बहती सुंदर लड़ियां।"
      }
    ],
    facts: [
      { label: "City Age", value: "5,000+ Years" },
      { label: "Ghats Count", value: "84 Historic Ghats" },
      { label: "Aarti Tradition", value: "Daily Perpetual" },
      { label: "Location", value: "Kashi, Uttar Pradesh" }
    ]
  },
  {
    id: "konark_sun_temple",
    title: "Konark Sun Temple 3D Chariot Wheel",
    titleHi: "कोणार्क सूर्य मंदिर 3D खगोलीय पहिया",
    subtitle: "13th-Century Kalinga Astronomical Sundial Masterpiece",
    subtitleHi: "13वीं शताब्दी की कलिंग खगोलीय सूर्य घड़ी व वास्तु चमत्कार",
    category: "heritage",
    thumbnail: "https://images.unsplash.com/photo-1600100397608-f010f4439c28?w=800&auto=format&fit=crop&q=80",
    backgroundSky: "linear-gradient(to top, #ffe259 0%, #ffa751 100%)",
    ambientAudioType: "cosmic",
    description: "Explore the gigantic stone chariot of Surya with 24 elaborately carved wheels functioning as exact sundials calculating time to the exact minute from the shadow of the central axle.",
    descriptionHi: "भगवान सूर्य के 24 चक्रों वाले विशाल पाषाण रथ की 360° पड़ताल करें। प्रत्येक पहिया एक अत्यंत सटीक सूर्य घड़ी है जो केंद्रीय धुरी की छाया से मिनट तक का समय बताता है।",
    hotspots: [
      {
        id: "sundial_spokes",
        label: "Major & Minor Spokes (Timekeepers)",
        labelHi: "मुख्य व गौण आरे (काल मापक)",
        x: 50,
        y: 50,
        details: "8 major spokes divide 24 hours into 8 prahars (3 hours each), while minor spokes measure 15-minute intervals.",
        detailsHi: "8 मुख्य आरे 24 घंटों को 8 प्रहरों में बांटते हैं, जबकि पतले आरे 15-15 मिनट के सूक्ष्म समय को दर्शाते हैं।"
      },
      {
        id: "carved_beadwork",
        label: "Micro-Bead Stone Carvings",
        labelHi: "बारीक मणिका पाषाण शिल्प",
        x: 30,
        y: 65,
        details: "Intricate depictions of musicians, celestial nymphs, and wildlife carved with mathematical precision into chlorite stone.",
        detailsHi: "क्लोराइट पत्थर पर गणितीय सटीकता से उकेरी गई संगीतकारों और अप्सराओं की जीवंत आकृतियां।"
      }
    ],
    facts: [
      { label: "Built By", value: "King Narasimhadeva I (1250 CE)" },
      { label: "Sundial Precision", value: "Accurate to 1 Minute" },
      { label: "Chariot Wheels", value: "24 Carved Wheels" },
      { label: "Heritage", value: "UNESCO World Heritage" }
    ]
  },
  {
    id: "bharat_metaverse_lab",
    title: "Bharat Metaverse Virtual Science & AI Lab",
    titleHi: "भारत मेटावर्स वर्चुअल साइंस व स्पेस लैब",
    subtitle: "Interactive 3D Quantum Computing & Genomic Visualizer",
    subtitleHi: "इंटरएक्टिव 3D क्वांटम कंप्यूटिंग व जीनोमिक सिम्युलेटर",
    category: "metaverse",
    thumbnail: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop&q=80",
    backgroundSky: "radial-gradient(circle at 50% 50%, #1e1b4b 0%, #030712 100%)",
    ambientAudioType: "cosmic",
    description: "An interactive spatial classroom where students can manipulate 3D holographic atomic structures, inspect superconducting qubit arrays, and interact with the ANANT AI spatial tutor.",
    descriptionHi: "एक अत्याधुनिक 3D वर्चुअल विज्ञान प्रयोगशाला जहाँ विद्यार्थी क्वांटम क्यूबिट्स, डीएनए हेलिक्स संरचना और एआई वर्चुअल ट्यूटर के साथ सीधे संवाद कर सकते हैं।",
    hotspots: [
      {
        id: "qubit_stage",
        label: "Superconducting Qubit Chamber",
        labelHi: "सुपरकंडक्टिंग क्यूबिट कक्ष",
        x: 48,
        y: 45,
        details: "Cryogenic dilution refrigerator chamber cooling quantum processor to 15 millikelvin for zero decoherence.",
        detailsHi: "क्रायोजेनिक प्रशीतन कक्ष जो प्रोसेसर को 15 मिलीकेल्विन तक ठंडा रखकर शून्य-विकृति क्वांटम गणना संभव बनाता है।"
      },
      {
        id: "dna_hologram",
        label: "CRISPR-Cas9 3D Molecular Model",
        labelHi: "सीआरआईएसपीआर 3D आणविक मॉडल",
        x: 70,
        y: 35,
        details: "Manipulable double-helix genetic structure demonstrating gene editing mechanisms in real-time stereoscopic depth.",
        detailsHi: "त्रिविमीय डीएनए डबल-हेलिक्स मॉडल जिस पर जीन-संपादन की क्रियाविधि को 3D में समझा जा सकता है।"
      }
    ],
    facts: [
      { label: "Spatial Engine", value: "ANANT WebXR WebGL 2.0" },
      { label: "Frame Rate", value: "90 FPS Low Latency" },
      { label: "Resolution", value: "4K Spatial Fidelity" },
      { label: "AI Integration", value: "Sovereign Multilingual" }
    ]
  }
];
