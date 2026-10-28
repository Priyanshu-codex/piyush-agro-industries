export type VehicleCategoryKey = 
  | 'all'
  | 'trucks'
  | 'lcv'
  | 'passenger-buses'
  | 'school-buses'
  | 'staff-buses'
  | 'special-cv';

export interface VehicleSpecSheet {
  gvwOrCapacity: { label: string; valueEn: string; valueHi: string };
  engine: { label: string; valueEn: string; valueHi: string };
  power: { label: string; valueEn: string; valueHi: string };
  torque: { label: string; valueEn: string; valueHi: string };
  wheelbase: { label: string; valueEn: string; valueHi: string };
  brakes: { label: string; valueEn: string; valueHi: string };
  fuelSystem: { label: string; valueEn: string; valueHi: string };
  deckOrInterior: { label: string; valueEn: string; valueHi: string };
}

export interface SMLVehicleItem {
  id: string;
  nameEn: string;
  nameHi: string;
  category: VehicleCategoryKey;
  categoryLabelEn: string;
  categoryLabelHi: string;
  fuelType: 'Diesel' | 'CNG';
  taglineEn: string;
  taglineHi: string;
  descriptionEn: string;
  descriptionHi: string;
  primaryImage: string;
  gallery: string[];
  specs: VehicleSpecSheet;
  highlightsEn: string[];
  highlightsHi: string[];
  maintenanceAvailable: boolean;
  featured?: boolean;
}

export const SML_CATEGORIES: { key: VehicleCategoryKey; labelEn: string; labelHi: string; count?: number }[] = [
  { key: 'all', labelEn: 'All Vehicles', labelHi: 'सभी वाहन' },
  { key: 'trucks', labelEn: 'Trucks & Cargo Vehicles', labelHi: 'ट्रक एवं भारी कार्गो' },
  { key: 'lcv', labelEn: 'Light & Medium Commercial', labelHi: 'लाइट व मीडियम कमर्शियल (LCV)' },
  { key: 'passenger-buses', labelEn: 'Passenger Buses', labelHi: 'पैसेंजर एवं टूरिस्ट बसें' },
  { key: 'school-buses', labelEn: 'School Buses', labelHi: 'स्कूल बसें' },
  { key: 'staff-buses', labelEn: 'Staff & Employee Transport', labelHi: 'स्टाफ एवं एम्प्लॉई बसें' },
  { key: 'special-cv', labelEn: 'Special Commercial & Tippers', labelHi: 'विशेष वाहन एवं टिपर' },
];

export const SML_VEHICLES: SMLVehicleItem[] = [
  // ── TRUCKS & HEAVY CARGO ──
  {
    id: 'sml-samrat-gs',
    nameEn: 'SML Samrat GS Cargo Truck',
    nameHi: 'एसएमएल सम्राट जीएस कार्गो ट्रक',
    category: 'trucks',
    categoryLabelEn: 'Trucks & Cargo Vehicles',
    categoryLabelHi: 'ट्रक एवं भारी कार्गो',
    fuelType: 'Diesel',
    taglineEn: 'Heavy Duty 6-Tyre Commercial Workhorse for Regional & Interstate Freight',
    taglineHi: 'रीजनल एवं इंटरस्टेट फ्रेट के लिए हैवी ड्यूटी 6-टायर कमर्शियल वर्कहॉर्स',
    descriptionEn: 'The SML Samrat GS is engineered for high-tonnage cargo transport with class-leading payload efficiency, robust ladder chassis, and proven SLT4 turbocharged engine for demanding logistics.',
    descriptionHi: 'एसएमएल सम्राट जीएस उच्च टन भार वाले कार्गो परिवहन के लिए उच्च पेलोड दक्षता, मजबूत लैडर चेसिस और विश्वसनीय एसएलटी4 टर्बोचार्ज्ड इंजन के साथ निर्मित है।',
    primaryImage: '/images/sml-mahindra/sml-samrat-gs.png',
    gallery: [
      '/images/sml-mahindra/sml-samrat-gs.png',
      '/images/sml-mahindra/sml-samrat-gs-banner.png',
      '/images/sml-mahindra/sml-mahindra-truck.webp'
    ],
    specs: {
      gvwOrCapacity: { label: 'Gross Vehicle Weight (GVW)', valueEn: '10,250 kg', valueHi: '10,250 कि.ग्रा.' },
      engine: { label: 'Engine Type', valueEn: 'SLT4 4-Cylinder In-line Turbocharged Intercooled Diesel (3455 cc)', valueHi: 'एसएलटी4 4-सिलेंडर इन-लाइन टर्बोचार्ज्ड इंटरकूल्ड डीजल (3455 सीसी)' },
      power: { label: 'Max Engine Power', valueEn: '75 kW (100 HP) @ 2800 RPM', valueHi: '75 kW (100 HP) @ 2800 RPM' },
      torque: { label: 'Peak Torque', valueEn: '315 Nm @ 1400 - 1600 RPM', valueHi: '315 Nm @ 1400 - 1600 RPM' },
      wheelbase: { label: 'Wheelbase Options', valueEn: '2815 mm / 3335 mm / 4760 mm', valueHi: '2815 मिमी / 3335 मिमी / 4760 मिमी' },
      brakes: { label: 'Braking System', valueEn: 'Dual-Circuit S-Cam Full Air Brakes with ABS', valueHi: 'ड्यूल-सर्किट एस-कैम फुल एयर ब्रेक्स ABS सहित' },
      fuelSystem: { label: 'Fuel Tank Capacity', valueEn: '90 Litres Heavy Duty Metallic Tank', valueHi: '90 लीटर हैवी ड्यूटी मेटल टैंक' },
      deckOrInterior: { label: 'Cargo Deck Length', valueEn: '14.2 ft to 21.6 ft High-Strength Steel Cargo Bed', valueHi: '14.2 फीट से 21.6 फीट हाई-स्ट्रेंथ स्टील कार्गो बेड' },
    },
    highlightsEn: [
      'High payload capacity with rugged heavy-duty front and rear axles',
      'Full S-cam air brakes for maximum stopping security on steep gradients',
      'Optimized driveline delivering exceptional fuel economy over long hauls',
      'Full authorized servicing & genuine spare parts supported by Piyush Agro Industries'
    ],
    highlightsHi: [
      'मजबूत फ्रंट और रियर एक्सल के साथ उच्च पेलोड वहन क्षमता',
      'ढलानों और हाईवे पर अधिकतम सुरक्षा हेतु फुल एस-कैम एयर ब्रेकिंग',
      'लंबी दूरी के परिवहन में असाधारण माइलेज देने वाला आधुनिक ड्राइवट्रेन',
      'पियूष एग्रो इंडस्ट्रीज द्वारा अधिकृत सर्विसिंग एवं वास्तविक स्पेयर पार्ट्स सुविधा'
    ],
    maintenanceAvailable: true
  },
  {
    id: 'sml-samrat-gs-xt',
    nameEn: 'SML Samrat GS XT Long Haul',
    nameHi: 'एसएमएल सम्राट जीएस एक्सटी लॉन्ग हॉल',
    category: 'trucks',
    categoryLabelEn: 'Trucks & Cargo Vehicles',
    categoryLabelHi: 'ट्रक एवं भारी कार्गो',
    fuelType: 'Diesel',
    taglineEn: 'Extended Chassis Commercial Truck Engineered for Voluminous Cargo & FMCG Distribution',
    taglineHi: 'बड़े आयतन वाले कार्गो व एफएमसीजी वितरण हेतु एक्सटेंडेड चेसिस कमर्शियल ट्रक',
    descriptionEn: 'Featuring an extended wheel-base and extra-long cargo deck, the Samrat GS XT delivers superior volumetric capacity for parcel services, industrial supplies, and nationwide freight haulage.',
    descriptionHi: 'विस्तारित व्हीलबेस और अतिरिक्त लंबे कार्गो डेक के साथ सम्राट जीएस एक्सटी पार्सल, औद्योगिक सामान और लंबी दूरी की ढुलाई हेतु बेहतरीन क्षमता प्रदान करता है।',
    primaryImage: '/images/sml-mahindra/sml-samrat-gs-xt.png',
    gallery: [
      '/images/sml-mahindra/sml-samrat-gs-xt.png',
      '/images/sml-mahindra/sml-samrat-gs-banner.png'
    ],
    specs: {
      gvwOrCapacity: { label: 'Gross Vehicle Weight (GVW)', valueEn: '11,120 kg', valueHi: '11,120 कि.ग्रा.' },
      engine: { label: 'Engine Type', valueEn: 'SLT4 In-Line Turbo Diesel 3.5L Intercooled', valueHi: 'एसएलटी4 इन-लाइन टर्बो डीजल 3.5L इंटरकूल्ड' },
      power: { label: 'Max Engine Power', valueEn: '75 kW (100 HP) @ 2800 RPM', valueHi: '75 kW (100 HP) @ 2800 RPM' },
      torque: { label: 'Peak Torque', valueEn: '315 Nm @ 1400 - 1600 RPM', valueHi: '315 Nm @ 1400 - 1600 RPM' },
      wheelbase: { label: 'Wheelbase Options', valueEn: '4760 mm Extended Wheelbase', valueHi: '4760 मिमी एक्सटेंडेड व्हीलबेस' },
      brakes: { label: 'Braking System', valueEn: 'Dual-Circuit Air Brakes + Exhaust Brake', valueHi: 'ड्यूल-सर्किट एयर ब्रेक्स + एग्जॉस्ट ब्रेक' },
      fuelSystem: { label: 'Fuel Tank Capacity', valueEn: '90 Litres', valueHi: '90 लीटर' },
      deckOrInterior: { label: 'Cargo Deck Length', valueEn: '21.6 ft High-Volume Cargo Body', valueHi: '21.6 फीट हाई-वॉल्यूम कार्गो बॉडी' },
    },
    highlightsEn: [
      '21.6 ft longest cargo deck in class for bulk, agricultural, and container loads',
      'Heavy-gauge pressed-steel chassis frame designed for Indian highway stresses',
      'High ground clearance suitable for rural access roads and loading docks',
      'Complete diagnostic, suspension, and driveline maintenance at our workshop'
    ],
    highlightsHi: [
      'कृषि व औद्योगिक सामान हेतु 21.6 फीट लंबा विशाल कार्गो डेक',
      'भारतीय सड़कों की परिस्थितियों के अनुकूल मजबूत प्रेस्ड-स्टील चेसिस',
      'ग्रामीण मार्गों और लोडिंग यार्ड्स के लिए उच्च ग्राउंड क्लीयरेंस',
      'हमारे वर्कशॉप पर पूर्ण डायग्नोस्टिक, सस्पेंशन और ड्राइवट्रेन सर्विसिंग'
    ],
    maintenanceAvailable: true
  },
  {
    id: 'sml-supreme-gs',
    nameEn: 'SML Supreme GS 6-Tyre',
    nameHi: 'एसएमएल सुप्रीम जीएस 6-टायर',
    category: 'trucks',
    categoryLabelEn: 'Trucks & Cargo Vehicles',
    categoryLabelHi: 'ट्रक एवं भारी कार्गो',
    fuelType: 'Diesel',
    taglineEn: 'Proven Intermediate Commercial Truck with Superior Payload to Weight Ratio',
    taglineHi: 'उच्च पेलोड दक्षता व मजबूत चेसिस वाला प्रमाणित इंटरमीडिएट कमर्शियल ट्रक',
    descriptionEn: 'The SML Supreme GS bridges city distribution with regional haulage, providing unbeatable reliability, low operating cost, and heavy-duty mechanicals for agricultural and retail trade.',
    descriptionHi: 'एसएमएल सुप्रीम जीएस सिटी वितरण और रीजनल ढुलाई के लिए अद्वितीय विश्वसनीयता, कम परिचालन लागत और टिकाऊ मैकेनिकल सिस्टम प्रदान करता है।',
    primaryImage: '/images/sml-mahindra/sml-supreme-gs.png',
    gallery: [
      '/images/sml-mahindra/sml-supreme-gs.png',
      '/images/sml-mahindra/sml-supreme-truck.webp'
    ],
    specs: {
      gvwOrCapacity: { label: 'Gross Vehicle Weight (GVW)', valueEn: '8,500 kg', valueHi: '8,500 कि.ग्रा.' },
      engine: { label: 'Engine Type', valueEn: 'SLT4 Turbocharged Intercooled Diesel Engine', valueHi: 'एसएलटी4 टर्बोचार्ज्ड इंटरकूल्ड डीजल इंजन' },
      power: { label: 'Max Engine Power', valueEn: '75 kW (100 HP) @ 2800 RPM', valueHi: '75 kW (100 HP) @ 2800 RPM' },
      torque: { label: 'Peak Torque', valueEn: '315 Nm @ 1400 - 1600 RPM', valueHi: '315 Nm @ 1400 - 1600 RPM' },
      wheelbase: { label: 'Wheelbase Options', valueEn: '3335 mm / 3940 mm', valueHi: '3335 मिमी / 3940 मिमी' },
      brakes: { label: 'Braking System', valueEn: 'Hydraulic Vacuum Assisted / Dual Circuit Air Brakes', valueHi: 'हाइड्रोलिक वैक्यूम असिस्टेड / ड्यूल सर्किट एयर ब्रेक्स' },
      fuelSystem: { label: 'Fuel Tank Capacity', valueEn: '90 Litres', valueHi: '90 लीटर' },
      deckOrInterior: { label: 'Cargo Deck Length', valueEn: '14.2 ft to 17.2 ft Cargo Deck', valueHi: '14.2 फीट से 17.2 फीट कार्गो डेक' },
    },
    highlightsEn: [
      'Versatile 8.5 Ton GVW category perfect for wholesale grain and produce transit',
      'Ergonomically tuned driver cabin with power steering for reduced fatigue',
      'Low total cost of ownership with long service intervals',
      'Authorized preventive maintenance, brake overhaul, and oil service support'
    ],
    highlightsHi: [
      'अनाज, कृषि उपज व थोक व्यापार के लिए उपयुक्त 8.5 टन जीसीडब्ल्यू वर्ग',
      'पावर स्टीयरिंग युक्त आरामदायक केबिन जो लंबी यात्रा में थकान कम करे',
      'कम रखरखाव खर्च और लंबे सर्विस अंतराल के साथ बेहतर बचत',
      'अधिकृत प्रिवेंटिव मेंटेनेंस, ब्रेक ओवरहाल और ऑयल सर्विस सुविधा'
    ],
    maintenanceAvailable: true
  },

  // ── LIGHT & MEDIUM COMMERCIAL VEHICLES (LCV) ──
  {
    id: 'sml-sartaj-5252',
    nameEn: 'SML Sartaj 5252 XM',
    nameHi: 'एसएमएल सरताज 5252 एक्सएम',
    category: 'lcv',
    categoryLabelEn: 'Light & Medium Commercial',
    categoryLabelHi: 'लाइट व मीडियम कमर्शियल (LCV)',
    fuelType: 'Diesel',
    taglineEn: 'Agile 4-Tyre Light Commercial Truck for Express Urban & Rural Logistics',
    taglineHi: 'शहरी व ग्रामीण एक्सप्रेस डिलीवरी के लिए फुर्तीला 4-टायर लाइट कमर्शियल ट्रक',
    descriptionEn: 'The SML Sartaj 5252 XM is designed for tight urban streets, wholesale markets, and quick intra-city turnaround. Featuring excellent gradeability and fuel economy.',
    descriptionHi: 'एसएमएल सरताज 5252 एक्सएम संकरी शहरी सड़कों, थोक मंडियों और त्वरित परिवहन के लिए उत्कृष्ट माइलेज व सुगम मोड़ क्षमता के साथ तैयार किया गया है।',
    primaryImage: '/images/sml-mahindra/sml-sartaj-5252.webp',
    gallery: [
      '/images/sml-mahindra/sml-sartaj-5252.webp',
      '/images/sml-mahindra/sml-sartaj-5252-banner.png'
    ],
    specs: {
      gvwOrCapacity: { label: 'Gross Vehicle Weight (GVW)', valueEn: '5,200 kg', valueHi: '5,200 कि.ग्रा.' },
      engine: { label: 'Engine Type', valueEn: 'SLT4 Turbocharged 4-Cylinder Diesel (3455 cc)', valueHi: 'एसएलटी4 टर्बोचार्ज्ड 4-सिलेंडर डीजल (3455 सीसी)' },
      power: { label: 'Max Engine Power', valueEn: '75 kW (100 HP) @ 2800 RPM', valueHi: '75 kW (100 HP) @ 2800 RPM' },
      torque: { label: 'Peak Torque', valueEn: '315 Nm @ 1400 - 1600 RPM', valueHi: '315 Nm @ 1400 - 1600 RPM' },
      wheelbase: { label: 'Wheelbase Options', valueEn: '2515 mm / 2815 mm', valueHi: '2515 मिमी / 2815 मिमी' },
      brakes: { label: 'Braking System', valueEn: 'Hydraulic Vacuum Assisted Dual Circuit Brakes', valueHi: 'हाइड्रोलिक वैक्यूम असिस्टेड ड्यूल सर्किट ब्रेक्स' },
      fuelSystem: { label: 'Fuel Tank Capacity', valueEn: '90 Litres', valueHi: '90 लीटर' },
      deckOrInterior: { label: 'Cargo Deck Length', valueEn: '10.2 ft to 12.3 ft Cargo Body', valueHi: '10.2 फीट से 12.3 फीट कार्गो बॉडी' },
    },
    highlightsEn: [
      'Tight turning radius ideal for navigating busy agricultural APMC grain mandis',
      '4-tyre configuration exempt from several urban entry restrictions',
      'Sturdy front parabolic suspension providing smooth ride even under full load',
      'Complete clutch overhaul, engine tuning, and filter replacements available'
    ],
    highlightsHi: [
      'अनाज मंडियों व व्यस्त बाजारों में आसानी से मुड़ने वाला टाइट टर्निंग रेडियस',
      '4-टायर फॉर्मेट जो कई शहरी नो-एंट्री प्रतिबंधों से राहत प्रदान करता है',
      'फुल लोड पर भी सुगम ड्राइविंग हेतु मजबूत फ्रंट पैराबोलिक सस्पेंशन',
      'क्लच ओवरहाल, इंजन ट्यूनिंग और वास्तविक फिल्टर रिप्लेसमेंट उपलब्ध'
    ],
    maintenanceAvailable: true
  },
  {
    id: 'sml-sartaj-hg75',
    nameEn: 'SML Sartaj HG 75 High Deck',
    nameHi: 'एसएमएल सरताज एचजी 75 हाई डेक',
    category: 'lcv',
    categoryLabelEn: 'Light & Medium Commercial',
    categoryLabelHi: 'लाइट व मीडियम कमर्शियल (LCV)',
    fuelType: 'Diesel',
    taglineEn: 'High Payload 4-Tyre Light Commercial Carrier for Heavy Agricultural Haulage',
    taglineHi: 'कृषि उपज व भारी भार के लिए हाई पेलोड 4-टायर लाइट कमर्शियल कैरियर',
    descriptionEn: 'The Sartaj HG 75 combines the maneuverability of a 4-tyre chassis with a heavy-duty 7,490 kg GVW rating, delivering maximum legal payload for agricultural yields and industrial distribution.',
    descriptionHi: 'सरताज एचजी 75 चार-टायर चेसिस की सहजता और 7,490 कि.ग्रा. मजबूत जीसीडब्ल्यू का बेहतरीन संयोजन है, जो अधिक कानूनी पेलोड प्रदान करता है।',
    primaryImage: '/images/sml-mahindra/sml-sartaj-hg75.png',
    gallery: [
      '/images/sml-mahindra/sml-sartaj-hg75.png',
      '/images/sml-mahindra/sml-sartaj-5252-banner.png'
    ],
    specs: {
      gvwOrCapacity: { label: 'Gross Vehicle Weight (GVW)', valueEn: '7,490 kg', valueHi: '7,490 कि.ग्रा.' },
      engine: { label: 'Engine Type', valueEn: 'SLT4 3.5L Turbo Diesel Intercooled', valueHi: 'एसएलटी4 3.5L टर्बो डीजल इंटरकूल्ड' },
      power: { label: 'Max Engine Power', valueEn: '75 kW (100 HP) @ 2800 RPM', valueHi: '75 kW (100 HP) @ 2800 RPM' },
      torque: { label: 'Peak Torque', valueEn: '315 Nm @ 1400 - 1600 RPM', valueHi: '315 Nm @ 1400 - 1600 RPM' },
      wheelbase: { label: 'Wheelbase Options', valueEn: '3335 mm', valueHi: '3335 मिमी' },
      brakes: { label: 'Braking System', valueEn: 'Dual-Circuit Hydraulic Vacuum Assisted / Air Brake options', valueHi: 'ड्यूल-सर्किट वैक्यूम असिस्टेड / एयर ब्रेक विकल्प' },
      fuelSystem: { label: 'Fuel Tank Capacity', valueEn: '90 Litres', valueHi: '90 लीटर' },
      deckOrInterior: { label: 'Cargo Deck Length', valueEn: '14.2 ft High-Side Cargo Deck', valueHi: '14.2 फीट हाई-साइड कार्गो डेक' },
    },
    highlightsEn: [
      'Highest legal payload in the 4-tyre light commercial transport segment',
      'Heavy-duty reinforced chassis flanges designed to prevent chassis flexing',
      'Excellent fuel mileage with low maintenance driveline components',
      'Authorized servicing, brake shoe relining, and suspension maintenance'
    ],
    highlightsHi: [
      '4-टायर लाइट कमर्शियल ट्रांसपोर्ट वर्ग में सर्वाधिक कानूनी पेलोड',
      'चेसिस को झुकने से बचाने हेतु रीइन्फोर्स्ड हैवी-ड्यूटी स्टील फ्लैंज',
      'कम रखरखाव लागत के साथ उत्कृष्ट माइलेज',
      'अधिकृत सर्विसिंग, ब्रेक शू रीलाइनिंग और सस्पेंशन मेंटेनेंस'
    ],
    maintenanceAvailable: true
  },
  {
    id: 'sml-sartaj-gs59',
    nameEn: 'SML Sartaj GS 59',
    nameHi: 'एसएमएल सरताज जीएस 59',
    category: 'lcv',
    categoryLabelEn: 'Light & Medium Commercial',
    categoryLabelHi: 'लाइट व मीडियम कमर्शियल (LCV)',
    fuelType: 'Diesel',
    taglineEn: 'Optimum Tonnage Distribution Truck for Dairy, Produce & Parcel Delivery',
    taglineHi: 'डेयरी, कृषि उपज व पार्सल डिलीवरी हेतु संतुलित टनभार वितरण ट्रक',
    descriptionEn: 'The Sartaj GS 59 features an optimized 5,990 kg GVW tailored for perishable food logistics, beverage delivery, and regional agricultural marketing with unmatched reliability.',
    descriptionHi: 'सरताज जीएस 59 का 5,990 कि.ग्रा. जीसीडब्ल्यू डेयरी, फल-सब्जी और स्थानीय व्यापारिक आपूर्ति के लिए सर्वाधिक उपयुक्त और भरोसेमंद है।',
    primaryImage: '/images/sml-mahindra/sml-sartaj-gs59.png',
    gallery: [
      '/images/sml-mahindra/sml-sartaj-gs59.png',
      '/images/sml-mahindra/sml-sartaj-5252.webp'
    ],
    specs: {
      gvwOrCapacity: { label: 'Gross Vehicle Weight (GVW)', valueEn: '5,990 kg', valueHi: '5,990 कि.ग्रा.' },
      engine: { label: 'Engine Type', valueEn: 'SLT4 In-Line 4-Cylinder Turbocharged', valueHi: 'एसएलटी4 इन-लाइन 4-सिलेंडर टर्बोचार्ज्ड' },
      power: { label: 'Max Engine Power', valueEn: '75 kW (100 HP) @ 2800 RPM', valueHi: '75 kW (100 HP) @ 2800 RPM' },
      torque: { label: 'Peak Torque', valueEn: '315 Nm @ 1400 - 1600 RPM', valueHi: '315 Nm @ 1400 - 1600 RPM' },
      wheelbase: { label: 'Wheelbase Options', valueEn: '2815 mm / 3335 mm', valueHi: '2815 मिमी / 3335 मिमी' },
      brakes: { label: 'Braking System', valueEn: 'Hydraulic Vacuum Assisted Dual Circuit', valueHi: 'हाइड्रोलिक वैक्यूम असिस्टेड ड्यूल सर्किट' },
      fuelSystem: { label: 'Fuel Tank Capacity', valueEn: '90 Litres', valueHi: '90 लीटर' },
      deckOrInterior: { label: 'Cargo Deck Length', valueEn: '12.3 ft to 14.2 ft Steel Deck', valueHi: '12.3 फीट से 14.2 फीट स्टील डेक' },
    },
    highlightsEn: [
      'Balanced payload capacity that maximizes fuel savings on inter-district routes',
      'Low floor height for rapid manual loading and unloading',
      'Wide windshield and large side mirrors for superior visibility and safety',
      'Comprehensive fleet servicing and genuine SML spare parts available'
    ],
    highlightsHi: [
      'संतुलित पेलोड क्षमता जो जिला स्तरीय मार्गों पर माइलेज की अधिकतम बचत करे',
      'तेजी से सामान चढ़ाने व उतारने हेतु सुगम फ्लोर ऊंचाई',
      'उत्कृष्ट दृश्यता और ड्राइविंग सुरक्षा हेतु चौड़ा विंडशील्ड व साइड मिरर्स',
      'संपूर्ण फ्लीट सर्विसिंग और वास्तविक एसएमएल स्पेयर पार्ट्स की उपलब्धता'
    ],
    maintenanceAvailable: true
  },

  // ── PASSENGER BUSES ──
  {
    id: 'sml-executive-lx-coach',
    nameEn: 'SML Executive LX Luxury Coach',
    nameHi: 'एसएमएल एक्जीक्यूटिव एलएक्स लक्जरी कोच',
    category: 'passenger-buses',
    categoryLabelEn: 'Passenger Buses',
    categoryLabelHi: 'पैसेंजर एवं टूरिस्ट बसें',
    fuelType: 'Diesel',
    taglineEn: 'Flagship Air-Conditioned Commercial Coach for Intercity Tourism & Luxury Travel',
    taglineHi: 'इंटरसिटी पर्यटन व उच्च स्तरीय यात्रा हेतु फ्लैगशिप वातानुकूलित कमर्शियल कोच',
    descriptionEn: 'The SML Executive LX Coach provides an elite travel experience with push-back ergonomic seating, integrated roof-mounted air conditioning, ambient LED lighting, and whisper-quiet cabin acoustics.',
    descriptionHi: 'एसएमएल एक्जीक्यूटिव एलएक्स कोच पुश-बैक आरामदायक सीटों, रूफ-माउंटेड एसी, आकर्षक एलईडी लाइटिंग और शांत केबिन के साथ उत्कृष्ट यात्रा अनुभव देता है।',
    primaryImage: '/images/sml-mahindra/sml-executive-bus.webp',
    gallery: [
      '/images/sml-mahindra/sml-executive-bus.webp',
      '/images/sml-mahindra/sml-executive-lx-banner.png'
    ],
    specs: {
      gvwOrCapacity: { label: 'Seating Capacity', valueEn: '28 to 36 Luxury Pushback Seats (2x2)', valueHi: '28 से 36 लक्जरी पुशबैक सीटें (2x2)' },
      engine: { label: 'Engine Type', valueEn: 'SLT4 Turbocharged Intercooled Diesel Engine', valueHi: 'एसएलटी4 टर्बोचार्ज्ड इंटरकूल्ड डीजल इंजन' },
      power: { label: 'Max Engine Power', valueEn: '75 kW (100 HP) @ 2800 RPM', valueHi: '75 kW (100 HP) @ 2800 RPM' },
      torque: { label: 'Peak Torque', valueEn: '315 Nm @ 1400 - 1600 RPM', valueHi: '315 Nm @ 1400 - 1600 RPM' },
      wheelbase: { label: 'Wheelbase Options', valueEn: '3940 mm / 4270 mm / 5100 mm', valueHi: '3940 मिमी / 4270 मिमी / 5100 मिमी' },
      brakes: { label: 'Braking System', valueEn: 'Full Air S-Cam Brakes with ABS', valueHi: 'फुल एयर एस-कैम ब्रेक्स ABS सहित' },
      fuelSystem: { label: 'Fuel Tank Capacity', valueEn: '90 Litres / Optional High Range Tank', valueHi: '90 लीटर / वैकल्पिक हाई रेंज टैंक' },
      deckOrInterior: { label: 'Interior Comfort', valueEn: 'High-Roof AC Cabin with Individual Reading Lamps & USB Chargers', valueHi: 'हाई-रूफ एसी केबिन, व्यक्तिगत रीडिंग लैंप व यूएसबी चार्जिंग' },
    },
    highlightsEn: [
      'Plush reclining seats with armrests, magazine pouches, and wide footrests',
      'Advanced roof-mounted climate control maintaining uniform cabin temperatures',
      'Low NVH (Noise, Vibration, Harshness) for fatigue-free long-distance journeys',
      'Air-conditioner servicing, suspension tuning, and complete mechanical care'
    ],
    highlightsHi: [
      'आर्मरेस्ट, मैगजीन पाउच व फुटरेस्ट के साथ आरामदायक पुशबैक सीटें',
      'समान ठंडक बनाए रखने वाला अत्याधुनिक रूफ-माउंटेड क्लाइमेट कंट्रोल सिस्टम',
      'लंबी दूरी की यात्रा में शांतिपूर्ण अनुभव हेतु शांत एवं कंपन-रहित केबिन',
      'एसी सर्विसिंग, सस्पेंशन ट्यूनिंग और पूर्ण मैकेनिकल मेंटेनेंस सहायता'
    ],
    maintenanceAvailable: true
  },
  {
    id: 'sml-hiroi-luxury-coach',
    nameEn: 'SML Hiroi Tour Coach',
    nameHi: 'एसएमएल हिरोई टूर कोच',
    category: 'passenger-buses',
    categoryLabelEn: 'Passenger Buses',
    categoryLabelHi: 'पैसेंजर एवं टूरिस्ट बसें',
    fuelType: 'Diesel',
    taglineEn: 'Heavy-Duty Sightseeing & Regional Passenger Coach for Demanding Terrains',
    taglineHi: 'कठिन मार्गों व क्षेत्रीय परिवहन हेतु मजबूत दर्शनीय स्थल एवं पैसेंजर कोच',
    descriptionEn: 'The SML Hiroi is renowned for its rugged undercarriage, panoramic bonded glass windows, and exceptional hill-climbing torque, making it the premier choice for pilgrimage routes and tour operators.',
    descriptionHi: 'एसएमएल हिरोई अपने बेहद मजबूत चेसिस, मनोरम ग्लास खिड़कियों और उत्कृष्ट चढ़ाई क्षमता के लिए जाना जाता है, जो तीर्थ व पर्यटन के लिए सर्वोत्तम है।',
    primaryImage: '/images/sml-mahindra/sml-hiroi-bus.webp',
    gallery: [
      '/images/sml-mahindra/sml-hiroi-bus.webp',
      '/images/sml-mahindra/sml-hiroi-banner.png'
    ],
    specs: {
      gvwOrCapacity: { label: 'Seating Capacity', valueEn: '32 to 40 High-Back Commuter Seats', valueHi: '32 से 40 हाई-बैक पैसेंजर सीटें' },
      engine: { label: 'Engine Type', valueEn: 'SLT4 In-Line 4-Cylinder Turbo Diesel Intercooled', valueHi: 'एसएलटी4 इन-लाइन 4-सिलेंडर टर्बो डीजल इंटरकूल्ड' },
      power: { label: 'Max Engine Power', valueEn: '75 kW (100 HP) @ 2800 RPM', valueHi: '75 kW (100 HP) @ 2800 RPM' },
      torque: { label: 'Peak Torque', valueEn: '315 Nm @ 1400 - 1600 RPM', valueHi: '315 Nm @ 1400 - 1600 RPM' },
      wheelbase: { label: 'Wheelbase Options', valueEn: '4270 mm / 5100 mm', valueHi: '4270 मिमी / 5100 मिमी' },
      brakes: { label: 'Braking System', valueEn: 'Air Brakes with Automatic Slack Adjusters & ABS', valueHi: 'ऑटोमैटिक स्लैक एडजस्टर्स व ABS युक्त एयर ब्रेक्स' },
      fuelSystem: { label: 'Fuel Tank Capacity', valueEn: '90 Litres', valueHi: '90 लीटर' },
      deckOrInterior: { label: 'Passenger Amenities', valueEn: 'Spacious Luggage Boot & Overhead Hat Racks', valueHi: 'बड़ा लगेज बूट और ओवरहेड हैट रैक' },
    },
    highlightsEn: [
      'High ground clearance and rugged leaf springs engineered for uneven terrain',
      'Generous underfloor luggage compartments for heavy tourist baggage',
      'Wide passenger entrance door with illuminated low-height footsteps',
      'Certified transmission overhaul, differential servicing, and alignment'
    ],
    highlightsHi: [
      'खराब सड़कों और ढलानों के लिए उपयुक्त हाई ग्राउंड क्लीयरेंस व मजबूत सस्पेंशन',
      'पर्यटकों के भारी सामान हेतु विशाल अंडरफ्लोर लगेज कम्पार्टमेंट',
      'रोशनी युक्त कम ऊंचाई वाले पायदानों के साथ सुरक्षित प्रवेश द्वार',
      'प्रमाणित ट्रांसमिशन ओवरहाल, डिफरेंशियल सर्विसिंग और व्हील अलाइनमेंट'
    ],
    maintenanceAvailable: true
  },

  // ── SCHOOL BUSES ──
  {
    id: 'sml-s7-school-bus',
    nameEn: 'SML S7 School Bus',
    nameHi: 'एसएमएल एस7 स्कूल बस',
    category: 'school-buses',
    categoryLabelEn: 'School Buses',
    categoryLabelHi: 'स्कूल बसें',
    fuelType: 'Diesel',
    taglineEn: 'AIS 063 Child-Safety Compliant School Bus Trusted by Premier Institutions',
    taglineHi: 'अग्रणी शैक्षणिक संस्थानों द्वारा भरोसेमंद AIS 063 बाल-सुरक्षा प्रमाणित स्कूल बस',
    descriptionEn: 'The SML S7 School Bus sets the benchmark for student transit in India, fully complying with AIS 063 safety norms, equipped with low emergency steps, stop signals, roll-over protection, and tamper-proof speed limiter.',
    descriptionHi: 'एसएमएल एस7 स्कूल बस छात्र सुरक्षा के सभी AIS 063 मानकों का पालन करती है। इसमें निम्न पायदान, स्टॉप सिग्नल आर्म, रोल-ओवर सुरक्षा व स्पीड लिमिटर शामिल हैं।',
    primaryImage: '/images/sml-mahindra/sml-s7-school-bus.png',
    gallery: [
      '/images/sml-mahindra/sml-s7-school-bus.png',
      '/images/sml-mahindra/sml-s7-school-bus-banner.png',
      '/images/sml-mahindra/sml-s7-school-bus.webp'
    ],
    specs: {
      gvwOrCapacity: { label: 'Student Capacity', valueEn: '24 to 52 School Children Seating (3x2 / 3x3)', valueHi: '24 से 52 स्कूली बच्चे (3x2 / 3x3)' },
      engine: { label: 'Engine Type', valueEn: 'SLT4 In-Line 4-Cylinder Turbocharged Diesel', valueHi: 'एसएलटी4 इन-लाइन 4-सिलेंडर टर्बोचार्ज्ड डीजल' },
      power: { label: 'Max Engine Power', valueEn: '75 kW (100 HP) @ 2800 RPM', valueHi: '75 kW (100 HP) @ 2800 RPM' },
      torque: { label: 'Peak Torque', valueEn: '315 Nm @ 1400 - 1600 RPM', valueHi: '315 Nm @ 1400 - 1600 RPM' },
      wheelbase: { label: 'Wheelbase Options', valueEn: '2815 mm / 3335 mm / 4270 mm / 5100 mm', valueHi: '2815 मिमी / 3335 मिमी / 4270 मिमी / 5100 मिमी' },
      brakes: { label: 'Braking System', valueEn: 'Full S-Cam Air Brakes with ABS & Speed Limiter', valueHi: 'फुल एस-कैम एयर ब्रेक्स ABS व स्पीड लिमिटर सहित' },
      fuelSystem: { label: 'Fuel Tank Capacity', valueEn: '90 Litres', valueHi: '90 लीटर' },
      deckOrInterior: { label: 'Safety Compliance', valueEn: 'AIS 063 Safety Body Code, Emergency Door, Stop Arm, First Aid Kit', valueHi: 'AIS 063 सुरक्षा कोड, आपातकालीन द्वार, स्टॉप आर्म, प्राथमिक उपचार' },
    },
    highlightsEn: [
      'Ultra-low entry footstep height tailored specifically for young primary students',
      'Padded anti-injury guard rails, bag storage racks, and anti-skid safety vinyl flooring',
      'Factory installed GPS tracking, CCTV camera mounting provisions, and buzzer',
      'Priority school fleet safety inspections, fitness renewals, and mechanical service'
    ],
    highlightsHi: [
      'प्राथमिक स्कूली बच्चों के सुगम चढ़ने हेतु अत्यंत कम ऊंचाई वाला सुरक्षित पायदान',
      'चोट से सुरक्षा देने वाली पैडेड रेलिंग, स्कूल बैग रैक और एंटी-स्किड फ्लोरिंग',
      'जीपीएस ट्रैकिंग, सीसीटीवी कैमरा माउंटिंग और रिवर्स बजर की फैक्ट्री व्यवस्था',
      'स्कूल फ्लीट हेतु प्राथमिकता के आधार पर सुरक्षा जांच, फिटनेस व पूर्ण सर्विसिंग'
    ],
    maintenanceAvailable: true
  },
  {
    id: 'sml-executive-lx-school-bus',
    nameEn: 'SML Executive LX School Bus (AC)',
    nameHi: 'एसएमएल एक्जीक्यूटिव एलएक्स स्कूल बस (एसी)',
    category: 'school-buses',
    categoryLabelEn: 'School Buses',
    categoryLabelHi: 'स्कूल बसें',
    fuelType: 'Diesel',
    taglineEn: 'Premium Fully Air-Conditioned Safe School Bus for Modern Day-Boarding Schools',
    taglineHi: 'आधुनिक डे-बोर्डिंग व इंटरनेशनल स्कूलों हेतु प्रीमियम वातानुकूलित स्कूल बस',
    descriptionEn: 'The Executive LX School Bus provides temperature-controlled comfort with high-back ergonomic child-safe seats, UV-filtered panoramic windows, and comprehensive safety monitoring systems.',
    descriptionHi: 'एक्जीक्यूटिव एलएक्स स्कूल बस तापमान-नियंत्रित आरामदायक सफर, हाई-बैक सुरक्षित सीटों, यूवी-फिल्टर्ड खिड़कियों और आधुनिक सुरक्षा प्रणालियों से सुसज्जित है।',
    primaryImage: '/images/sml-mahindra/sml-executive-lx-school-bus.png',
    gallery: [
      '/images/sml-mahindra/sml-executive-lx-school-bus.png',
      '/images/sml-mahindra/sml-executive-lx-banner.png'
    ],
    specs: {
      gvwOrCapacity: { label: 'Student Capacity', valueEn: '28 to 44 High-Back Padded Seats with Seatbelts', valueHi: '28 से 44 हाई-बैक पैडेड सीटें सीटबेल्ट सहित' },
      engine: { label: 'Engine Type', valueEn: 'SLT4 Turbocharged Diesel Engine', valueHi: 'एसएलटी4 टर्बोचार्ज्ड डीजल इंजन' },
      power: { label: 'Max Engine Power', valueEn: '75 kW (100 HP) @ 2800 RPM', valueHi: '75 kW (100 HP) @ 2800 RPM' },
      torque: { label: 'Peak Torque', valueEn: '315 Nm @ 1400 - 1600 RPM', valueHi: '315 Nm @ 1400 - 1600 RPM' },
      wheelbase: { label: 'Wheelbase Options', valueEn: '3940 mm / 4270 mm / 5100 mm', valueHi: '3940 मिमी / 4270 मिमी / 5100 मिमी' },
      brakes: { label: 'Braking System', valueEn: 'Dual-Circuit Air Brakes with ABS', valueHi: 'ड्यूल-सर्किट एयर ब्रेक्स ABS सहित' },
      fuelSystem: { label: 'Fuel Tank Capacity', valueEn: '90 Litres', valueHi: '90 लीटर' },
      deckOrInterior: { label: 'Climate & Interior', valueEn: 'Full Integrated Roof AC with Antimicrobial Ducting', valueHi: 'एंटीमाइक्रोबियल डक्टिंग युक्त रूफ एसी' },
    },
    highlightsEn: [
      'High-back cushioned seats equipped with lap safety belts for every student',
      'Integrated roof-mounted AC maintaining refreshing cabin climate during peak summer',
      'Panoramic tinted toughened safety windows preventing solar heat ingress',
      'Complete school AC maintenance, brake testing, and emergency exit servicing'
    ],
    highlightsHi: [
      'प्रत्येक छात्र की सुरक्षा हेतु सीटबेल्ट युक्त आरामदायक हाई-बैक कुशन सीटें',
      'भीषण गर्मी में भी केबिन को ठंडा व सुरक्षित रखने वाला प्रभावी रूफ एसी',
      'धूप की तपिश को रोकने वाली टिंटेड टफन्ड सेफ्टी खिड़कियां',
      'स्कूल बस एसी मेंटेनेंस, ब्रेक टेस्टिंग और आपातकालीन द्वार की संपूर्ण सर्विसिंग'
    ],
    maintenanceAvailable: true
  },
  {
    id: 'sml-s7-school-bus-cng',
    nameEn: 'SML S7 School Bus CNG',
    nameHi: 'एसएमएल एस7 स्कूल बस सीएनजी',
    category: 'school-buses',
    categoryLabelEn: 'School Buses',
    categoryLabelHi: 'स्कूल बसें',
    fuelType: 'CNG',
    taglineEn: 'Clean Green Energy Child-Safe School Bus with Factory-Fitted Multi-Cylinder Cascade',
    taglineHi: 'फैक्ट्री-फिटेड मल्टी-सिलेंडर कैस्केड युक्त पर्यावरण-अनुकूल स्वच्छ ऊर्जा स्कूल बस',
    descriptionEn: 'The SML S7 CNG School Bus blends green emissions with unmatched student safety. Powered by an advanced CNG engine with burst-proof valves and electronic gas monitoring.',
    descriptionHi: 'एसएमएल एस7 सीएनजी स्कूल बस प्रदूषण-मुक्त संचालन और सर्वोत्तम बाल-सुरक्षा का संगम है। इसमें बर्स्ट-प्रूफ वाल्व और इलेक्ट्रॉनिक गैस मॉनिटरिंग दी गई है।',
    primaryImage: '/images/sml-mahindra/sml-s7-cng-bus.png',
    gallery: [
      '/images/sml-mahindra/sml-s7-cng-bus.png',
      '/images/sml-mahindra/sml-s7-school-bus-banner.png'
    ],
    specs: {
      gvwOrCapacity: { label: 'Student Capacity', valueEn: '32 to 50 Student Seating Options', valueHi: '32 से 50 छात्र बैठने की क्षमता' },
      engine: { label: 'Engine Type', valueEn: 'SLT4 Multi-Point Gas Injection (MPGI) CNG Engine', valueHi: 'एसएलटी4 मल्टी-पॉइंट गैस इंजेक्शन (MPGI) सीएनजी इंजन' },
      power: { label: 'Max Engine Power', valueEn: '65 kW (87 HP) @ 2800 RPM', valueHi: '65 kW (87 HP) @ 2800 RPM' },
      torque: { label: 'Peak Torque', valueEn: '270 Nm @ 1400 - 1600 RPM', valueHi: '270 Nm @ 1400 - 1600 RPM' },
      wheelbase: { label: 'Wheelbase Options', valueEn: '3335 mm / 4270 mm', valueHi: '3335 मिमी / 4270 मिमी' },
      brakes: { label: 'Braking System', valueEn: 'Dual-Circuit Air Brakes with ABS', valueHi: 'ड्यूल-सर्किट एयर ब्रेक्स ABS सहित' },
      fuelSystem: { label: 'CNG Tank Capacity', valueEn: '180 Litres Water Capacity (Dual Cascades)', valueHi: '180 लीटर वाटर कैपेसिटी (ड्यूल कैस्केड्स)' },
      deckOrInterior: { label: 'Safety Devices', valueEn: 'Gas Leakage Detector, Micro-Switch Interlock, Fire Extinguisher', valueHi: 'गैस लीकेज डिटेक्टर, माइक्रो-स्विच इंटरलॉक, अग्निशामक' },
    },
    highlightsEn: [
      'Eco-friendly low-emission operation meeting municipal green transit guidelines',
      'Dual safety valves with emergency automatic fuel cut-off mechanism',
      'Substantial operating cost reduction compared to conventional diesel fleets',
      'Specialized CNG system inspection, filter replacement, and pressure calibration'
    ],
    highlightsHi: [
      'हरित मानकों के अनुरूप पर्यावरण-अनुकूल और अत्यंत किफायती संचालन',
      'आपातकालीन ऑटोमैटिक गैस कट-ऑफ युक्त ड्यूल सेफ्टी बर्स्ट वाल्व',
      'पारंपरिक डीजल फ्लीट की तुलना में ईंधन खर्च में भारी बचत',
      'विशेषज्ञ सीएनजी सिस्टम निरीक्षण, फिल्टर रिप्लेसमेंट और प्रेशर टेस्टिंग'
    ],
    maintenanceAvailable: true
  },

  // ── STAFF & EMPLOYEE TRANSPORT BUSES ──
  {
    id: 'sml-s7-staff-bus',
    nameEn: 'SML S7 Staff & Commuter Bus',
    nameHi: 'एसएमएल एस7 स्टाफ एवं कम्यूटर बस',
    category: 'staff-buses',
    categoryLabelEn: 'Staff & Employee Transport',
    categoryLabelHi: 'स्टाफ एवं एम्प्लॉई बसें',
    fuelType: 'Diesel',
    taglineEn: 'Reliable Daily Commute Workhorse for Factories, IT Parks & Corporate Fleets',
    taglineHi: 'फैक्ट्री, औद्योगिक पार्कों व कॉरपोरेट फ्लीट हेतु भरोसेमंद दैनिक स्टाफ बस',
    descriptionEn: 'The SML S7 Staff Bus delivers uninterrupted reliability for shift-based employee transport. Featuring durable high-back seats, wide walkways, and rugged suspension built for high daily mileage.',
    descriptionHi: 'एसएमएल एस7 स्टाफ बस कर्मचारियों के दैनिक आवागमन हेतु उच्च विश्वसनीयता प्रदान करती है। इसमें टिकाऊ हाई-बैक सीटें और चौड़ा गलियारा दिया गया है।',
    primaryImage: '/images/sml-mahindra/sml-mahindra-bus.webp',
    gallery: [
      '/images/sml-mahindra/sml-mahindra-bus.webp',
      '/images/sml-mahindra/sml-s7-school-bus-banner.png'
    ],
    specs: {
      gvwOrCapacity: { label: 'Passenger Capacity', valueEn: '28 to 42 High-Back Commuter Seats (2x2 / 3x2)', valueHi: '28 से 42 हाई-बैक सीटें (2x2 / 3x2)' },
      engine: { label: 'Engine Type', valueEn: 'SLT4 Turbocharged 4-Cylinder Intercooled Diesel', valueHi: 'एसएलटी4 टर्बोचार्ज्ड 4-सिलेंडर इंटरकूल्ड डीजल' },
      power: { label: 'Max Engine Power', valueEn: '75 kW (100 HP) @ 2800 RPM', valueHi: '75 kW (100 HP) @ 2800 RPM' },
      torque: { label: 'Peak Torque', valueEn: '315 Nm @ 1400 - 1600 RPM', valueHi: '315 Nm @ 1400 - 1600 RPM' },
      wheelbase: { label: 'Wheelbase Options', valueEn: '3335 mm / 4270 mm / 5100 mm', valueHi: '3335 मिमी / 4270 मिमी / 5100 मिमी' },
      brakes: { label: 'Braking System', valueEn: 'Full S-Cam Air Brakes with ABS', valueHi: 'फुल एस-कैम एयर ब्रेक्स ABS सहित' },
      fuelSystem: { label: 'Fuel Tank Capacity', valueEn: '90 Litres', valueHi: '90 लीटर' },
      deckOrInterior: { label: 'Cabin Layout', valueEn: 'Wide Gangway Aisle with Overhead Parcel Racks', valueHi: 'चौड़ा गलियारा और ओवरहेड पार्सल रैक' },
    },
    highlightsEn: [
      'High daily availability with minimal unscheduled downtime for industrial shift routes',
      'Wide gangway enabling quick boarding and alighting at plant gates and office stops',
      'Long-life leaf spring suspension engineered for heavy commuter load',
      'Scheduled preventive maintenance, hub greasing, and fleet health audits'
    ],
    highlightsHi: [
      'औद्योगिक शिफ्ट ड्यूटी के लिए बिना रुकावट 24x7 फ्लीट उपलब्धता',
      'प्लांट गेट और स्टॉप्स पर त्वरित आवागमन हेतु चौड़ा सेंट्रल गैंगवे',
      'अधिक भार को सहजता से संभालने वाला मजबूत व टिकाऊ लीफ स्प्रिंग सस्पेंशन',
      'नियमित प्रिवेंटिव मेंटेनेंस, हब ग्रीसिंग और फ्लीट हेल्थ ऑडिट सेवा'
    ],
    maintenanceAvailable: true
  },
  {
    id: 'sml-executive-lx-staff-bus',
    nameEn: 'SML Executive LX Staff Shuttle (AC)',
    nameHi: 'एसएमएल एक्जीक्यूटिव एलएक्स स्टाफ शटल (एसी)',
    category: 'staff-buses',
    categoryLabelEn: 'Staff & Employee Transport',
    categoryLabelHi: 'स्टाफ एवं एम्प्लॉई बसें',
    fuelType: 'Diesel',
    taglineEn: 'Executive Corporate Transit with Climate Control & Pushback Recliners',
    taglineHi: 'क्लाइमेट कंट्रोल व पुशबैक रिक्लाइनर युक्त एक्जीक्यूटिव कॉरपोरेट शटल',
    descriptionEn: 'The Executive LX Staff Shuttle elevates managerial and corporate commuting with quiet air-conditioned cabin ambience, individual air vents, and superior ride comfort.',
    descriptionHi: 'एक्जीक्यूटिव एलएक्स स्टाफ शटल शांत वातानुकूलित केबिन, व्यक्तिगत एसी वेंट्स और आरामदायक सफर के साथ कॉरपोरेट यात्रा को प्रीमियम बनाती है।',
    primaryImage: '/images/sml-mahindra/sml-executive-cng-bus.png',
    gallery: [
      '/images/sml-mahindra/sml-executive-cng-bus.png',
      '/images/sml-mahindra/sml-executive-bus.webp'
    ],
    specs: {
      gvwOrCapacity: { label: 'Passenger Capacity', valueEn: '20 to 32 Pushback Recliner Seats (2x2)', valueHi: '20 से 32 पुशबैक रिक्लाइनर सीटें (2x2)' },
      engine: { label: 'Engine Type', valueEn: 'SLT4 Turbocharged Intercooled Diesel Engine', valueHi: 'एसएलटी4 टर्बोचार्ज्ड इंटरकूल्ड डीजल इंजन' },
      power: { label: 'Max Engine Power', valueEn: '75 kW (100 HP) @ 2800 RPM', valueHi: '75 kW (100 HP) @ 2800 RPM' },
      torque: { label: 'Peak Torque', valueEn: '315 Nm @ 1400 - 1600 RPM', valueHi: '315 Nm @ 1400 - 1600 RPM' },
      wheelbase: { label: 'Wheelbase Options', valueEn: '3940 mm / 4270 mm', valueHi: '3940 मिमी / 4270 मिमी' },
      brakes: { label: 'Braking System', valueEn: 'Dual-Circuit Air Brakes with ABS', valueHi: 'ड्यूल-सर्किट एयर ब्रेक्स ABS सहित' },
      fuelSystem: { label: 'Fuel Tank Capacity', valueEn: '90 Litres', valueHi: '90 लीटर' },
      deckOrInterior: { label: 'Executive Features', valueEn: 'Individual AC Louvers, USB Mobile Charging, Soft Touch Fabrics', valueHi: 'व्यक्तिगत एसी वेंट, मोबाइल चार्जिंग, सॉफ्ट टच फैब्रिक' },
    },
    highlightsEn: [
      'Luxury pushback seating designed for executive and managerial commuting',
      'Whisper-quiet acoustic insulation allowing productivity on the move',
      'Tinted heat-reflective glass reducing thermal load and air conditioning stress',
      'Complete workshop support with genuine SML parts and priority turnaround'
    ],
    highlightsHi: [
      'अधिकारियों व प्रबंधकों के आरामदायक सफर हेतु लक्जरी पुशबैक सीटें',
      'यात्रा के दौरान शांत माहौल बनाए रखने वाला आधुनिक साउंड इंसुलेशन',
      'एसी की ठंडक को बरकरार रखने वाली हीट-रिफ्लेक्टिव टिंटेड खिड़कियां',
      'वास्तविक एसएमएल पार्ट्स के साथ पूर्ण वर्कशॉप व त्वरित सर्विस सहायता'
    ],
    maintenanceAvailable: true
  },

  // ── SPECIAL COMMERCIAL & TIPPERS ──
  {
    id: 'sml-samrat-tipper',
    nameEn: 'SML Samrat GS Tipper',
    nameHi: 'एसएमएल सम्राट जीएस टिपर',
    category: 'special-cv',
    categoryLabelEn: 'Special Commercial & Tippers',
    categoryLabelHi: 'विशेष वाहन एवं टिपर',
    fuelType: 'Diesel',
    taglineEn: 'Rugged Hydraulic Dumper for Stone Quarries, Sand Hauling & Construction Infrastructure',
    taglineHi: 'खदानों, रेत ढुलाई व निर्माण अवसंरचना हेतु मजबूत हाइड्रोलिक डम्पर',
    descriptionEn: 'The SML Samrat GS Tipper is purpose-built for heavy aggregates, earthwork, and road construction. Featuring a high-tensile steel tipping body, fast hydraulic tipping cycle, and heavy-duty frame.',
    descriptionHi: 'एसएमएल सम्राट जीएस टिपर भारी गिट्टी, रेत और सड़क निर्माण सामग्री के लिए तैयार किया गया है। इसमें हाई-टेन्साइल स्टील टिपर बॉडी व तीव्र हाइड्रोलिक लिफ्ट दी गई है।',
    primaryImage: '/images/sml-mahindra/sml-samrat-tipper.png',
    gallery: [
      '/images/sml-mahindra/sml-samrat-tipper.png',
      '/images/sml-mahindra/sml-samrat-tipper-banner.png',
      '/images/sml-mahindra/sml-samrat-tipper.webp'
    ],
    specs: {
      gvwOrCapacity: { label: 'Gross Vehicle Weight (GVW)', valueEn: '10,250 kg Heavy Duty Tipper', valueHi: '10,250 कि.ग्रा. हैवी ड्यूटी टिपर' },
      engine: { label: 'Engine Type', valueEn: 'SLT4 In-Line 4-Cylinder Turbocharged Diesel (3455 cc)', valueHi: 'एसएलटी4 इन-लाइन 4-सिलेंडर टर्बोचार्ज्ड डीजल (3455 सीसी)' },
      power: { label: 'Max Engine Power', valueEn: '75 kW (100 HP) @ 2800 RPM', valueHi: '75 kW (100 HP) @ 2800 RPM' },
      torque: { label: 'Peak Torque', valueEn: '315 Nm @ 1400 - 1600 RPM', valueHi: '315 Nm @ 1400 - 1600 RPM' },
      wheelbase: { label: 'Wheelbase Options', valueEn: '2815 mm Short Tipper Wheelbase', valueHi: '2815 मिमी कॉम्पैक्ट टिपर व्हीलबेस' },
      brakes: { label: 'Braking System', valueEn: 'Full S-Cam Air Brakes with ABS for Steep Quarry Grades', valueHi: 'खदानों की ढलानों हेतु फुल एस-कैम एयर ब्रेक्स ABS सहित' },
      fuelSystem: { label: 'Fuel Tank Capacity', valueEn: '90 Litres Metallic Protected Tank', valueHi: '90 लीटर सुरक्षित मेटल टैंक' },
      deckOrInterior: { label: 'Tipper Body Box', valueEn: '4.5 Cu.M / 6.0 Cu.M High-Tensile Heavy Steel Box', valueHi: '4.5 घन मीटर / 6.0 घन मीटर हाई-टेन्साइल स्टील बॉक्स' },
    },
    highlightsEn: [
      'High-grade underbody hydraulic ram providing lightning fast tipping cycles',
      'Heavy-duty rear tipper hinge brackets built to withstand rock dumping impacts',
      'Short 2815 mm wheelbase providing extreme agility in tight quarry mining pits',
      'Authorized tipper hydraulic servicing, seal replacements, and mechanical overhauls'
    ],
    highlightsHi: [
      'तीव्र गति से सामान खाली करने वाला उच्च कोटि का अंडरबॉडी हाइड्रोलिक रैम',
      'पत्थर व गिट्टी के भारी आघात को झेलने वाले मजबूत हिंज ब्रैकेट्स',
      'संकीर्ण खदानों और निर्माण स्थलों में आसानी से मुड़ने वाला 2815 मिमी व्हीलबेस',
      'अधिकृत टिपर हाइड्रोलिक सर्विसिंग, सील रिप्लेसमेंट और पूर्ण ओवरहाल'
    ],
    maintenanceAvailable: true
  },
  {
    id: 'sml-super-tipper',
    nameEn: 'SML Super Tipper',
    nameHi: 'एसएमएल सुपर टिपर',
    category: 'special-cv',
    categoryLabelEn: 'Special Commercial & Tippers',
    categoryLabelHi: 'विशेष वाहन एवं टिपर',
    fuelType: 'Diesel',
    taglineEn: 'Mid-Weight Infrastructure Dumper for Municipal, Canal & Earthmoving Projects',
    taglineHi: 'नगर निगम, नहर व मिट्टी भराई परियोजनाओं हेतु मिड-वेट इंफ्रास्ट्रक्चर डम्पर',
    descriptionEn: 'The SML Super Tipper offers an agile 8,500 kg GVW tipping solution for contractors, urban infrastructure, and flyash / sand handling with optimal fuel consumption and quick payload discharge.',
    descriptionHi: 'एसएमएल सुपर टिपर ठेकेदारों, शहरी बुनियादी ढांचे और रेत-मिट्टी परिवहन हेतु 8,500 कि.ग्रा. जीसीडब्ल्यू में किफायती व तीव्र डम्पिंग समाधान प्रस्तुत करता है।',
    primaryImage: '/images/sml-mahindra/sml-super-tipper.jpg',
    gallery: [
      '/images/sml-mahindra/sml-super-tipper.jpg',
      '/images/sml-mahindra/sml-samrat-tipper-banner.png'
    ],
    specs: {
      gvwOrCapacity: { label: 'Gross Vehicle Weight (GVW)', valueEn: '8,500 kg Intermediate Tipper', valueHi: '8,500 कि.ग्रा. इंटरमीडिएट टिपर' },
      engine: { label: 'Engine Type', valueEn: 'SLT4 Turbocharged Diesel Engine', valueHi: 'एसएलटी4 टर्बोचार्ज्ड डीजल इंजन' },
      power: { label: 'Max Engine Power', valueEn: '75 kW (100 HP) @ 2800 RPM', valueHi: '75 kW (100 HP) @ 2800 RPM' },
      torque: { label: 'Peak Torque', valueEn: '315 Nm @ 1400 - 1600 RPM', valueHi: '315 Nm @ 1400 - 1600 RPM' },
      wheelbase: { label: 'Wheelbase Options', valueEn: '2815 mm', valueHi: '2815 मिमी' },
      brakes: { label: 'Braking System', valueEn: 'Air Brakes with ABS', valueHi: 'एयर ब्रेक्स ABS सहित' },
      fuelSystem: { label: 'Fuel Tank Capacity', valueEn: '90 Litres', valueHi: '90 लीटर' },
      deckOrInterior: { label: 'Tipper Body Box', valueEn: '3.5 Cu.M to 4.5 Cu.M Reinforced All-Steel Scoop Box', valueHi: '3.5 से 4.5 घन मीटर रीइन्फोर्स्ड ऑल-स्टील स्कूप बॉक्स' },
    },
    highlightsEn: [
      'Optimized gross weight delivering superior fuel economy on continuous shuttle runs',
      'Reinforced cabin guard preventing aggregate spillage over driver canopy',
      'Dual circuit air braking delivering absolute safety on steep embankment descents',
      'Complete tipper cylinder overhaul, valve servicing, and chassis grease checks'
    ],
    highlightsHi: [
      'लगातार शटल फेरों में ईंधन की बचत कराने वाला संतुलित सकल वाहन भार',
      'चालक केबिन पर गिट्टी गिरने से रोकने हेतु रीइन्फोर्स्ड केबिन प्रोटेक्शन गार्ड',
      'नहरों और ढलानों पर पूर्ण सुरक्षा सुनिश्चित करने वाला ड्यूल सर्किट एयर ब्रेक',
      'टिपर सिलेंडर ओवरहाल, वाल्व सर्विसिंग और चेसिस ग्रीसिंग की पूरी सुविधा'
    ],
    maintenanceAvailable: true
  }
];

export function findVehicle(slugOrId: string): SMLVehicleItem | undefined {
  if (!slugOrId) return undefined;
  const normalized = decodeURIComponent(slugOrId).toLowerCase().trim();
  return SML_VEHICLES.find(
    (v) => v.id.toLowerCase() === normalized || 
           v.id.replace(/^sml-/, '').toLowerCase() === normalized
  );
}

export function getRelatedVehicles(currentId: string, limit: number = 3): SMLVehicleItem[] {
  const current = SML_VEHICLES.find((v) => v.id === currentId);
  if (!current) return SML_VEHICLES.slice(0, limit);

  // First prioritize same category, then other commercial vehicles
  const sameCategory = SML_VEHICLES.filter((v) => v.id !== currentId && v.category === current.category);
  const others = SML_VEHICLES.filter((v) => v.id !== currentId && v.category !== current.category);

  return [...sameCategory, ...others].slice(0, limit);
}

