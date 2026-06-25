import type { TText, Product, GalleryItem, FAQItem, Testimonial, Feature, ProcessStep } from '@/types';

export const t = {
  // NAV
  nav: {
    home:     { en: 'Home',     hi: 'होम' },
    about:    { en: 'About',    hi: 'परिचय' },
    products: { en: 'Products', hi: 'उत्पाद' },
    services: { en: 'Services', hi: 'सेवाएं' },
    gallery:  { en: 'Gallery',  hi: 'गैलरी' },
    contact:  { en: 'Contact',  hi: 'संपर्क' },
    callNow:  { en: 'Call Now', hi: 'कॉल करें' },
  },

  // HERO
  hero: {
    badge:      { en: 'Trusted Manufacturer Since Establishment', hi: 'विश्वसनीय निर्माता' },
    titleHi:    { en: 'पियूष एग्रो इंडस्ट्रीज', hi: 'पियूष एग्रो इंडस्ट्रीज' },
    titleEn:    { en: 'Piyush Agro Industries', hi: 'राजनांदगांव, छत्तीसगढ़' },
    subtitle:   {
      en: 'Trusted Manufacturer of Hydraulic Trolleys, Agricultural Equipment, Vehicle Fabrication & Repair Services in Rajnandgaon, Chhattisgarh',
      hi: 'राजनांदगांव, छत्तीसगढ़ में हाइड्रोलिक ट्रॉली, कृषि उपकरण, वाहन फेब्रिकेशन और मरम्मत सेवाओं के विश्वसनीय निर्माता',
    },
    cta1:        { en: 'Call Now',       hi: 'अभी कॉल करें' },
    cta2:        { en: 'WhatsApp',       hi: 'व्हाट्सएप' },
    cta3:        { en: 'Get Free Quote', hi: 'मुफ्त कोटेशन' },
    cta4:        { en: 'View Products',  hi: 'उत्पाद देखें' },
    stat1Num:    { en: '500+', hi: '500+' },
    stat1Label:  { en: 'Products Delivered', hi: 'उत्पाद डिलीवर' },
    stat2Num:    { en: '13+', hi: '13+' },
    stat2Label:  { en: 'Product Types', hi: 'उत्पाद प्रकार' },
    stat3Num:    { en: 'CG', hi: 'CG' },
    stat3Label:  { en: 'Serving Chhattisgarh', hi: 'छत्तीसगढ़ में सेवा' },
  },

  // TRUST BAR
  trust: {
    q1: { en: 'High Quality Manufacturing', hi: 'उच्च गुणवत्ता निर्माण' },
    q2: { en: 'Expert Fabrication Team',    hi: 'विशेषज्ञ टीम' },
    q3: { en: 'Timely Delivery',            hi: 'समय पर डिलीवरी' },
    q4: { en: 'Affordable Pricing',         hi: 'किफायती मूल्य' },
    q5: { en: 'After-Sales Support',        hi: 'बिक्री उपरांत सहायता' },
    q6: { en: 'Custom Solutions',           hi: 'कस्टम समाधान' },
  },

  // ABOUT
  about: {
    badge:    { en: 'About Us',                         hi: 'हमारे बारे में' },
    title:    { en: 'About Piyush Agro Industries',     hi: 'पियूष एग्रो इंडस्ट्रीज के बारे में' },
    p1:       {
      en: 'Piyush Agro Industries is a trusted manufacturing and fabrication company located in Rajnandgaon, Chhattisgarh. We specialize in designing, manufacturing, repairing, and customizing agricultural and commercial transport solutions.',
      hi: 'पियूष एग्रो इंडस्ट्रीज राजनांदगांव, छत्तीसगढ़ में स्थित एक विश्वसनीय निर्माण और फेब्रिकेशन कंपनी है। हम कृषि और व्यावसायिक परिवहन समाधानों के डिज़ाइन, निर्माण, मरम्मत और कस्टमाइज़ेशन में विशेषज्ञ हैं।',
    },
    p2:       {
      en: 'Our products are known for durability, strength, reliability, and affordable pricing. We serve farmers, contractors, transport businesses, municipal bodies, and commercial vehicle owners across Chhattisgarh.',
      hi: 'हमारे उत्पाद टिकाऊपन, मजबूती, विश्वसनीयता और किफायती मूल्य के लिए जाने जाते हैं। हम पूरे छत्तीसगढ़ में किसानों, ठेकेदारों, परिवहन व्यवसायों, नगर निकायों और वाहन मालिकों की सेवा करते हैं।',
    },
    serve1:  { en: 'Farmers',             hi: 'किसान' },
    serve2:  { en: 'Contractors',         hi: 'ठेकेदार' },
    serve3:  { en: 'Transport Businesses', hi: 'परिवहन व्यवसाय' },
    serve4:  { en: 'Municipal Bodies',    hi: 'नगर निकाय' },
    serve5:  { en: 'Vehicle Owners',      hi: 'वाहन मालिक' },
    serve6:  { en: 'Industries',          hi: 'उद्योग' },
    stat1:   { en: '500+',  hi: '500+' },
    stat1L:  { en: 'Products Made',   hi: 'उत्पाद बने' },
    stat2:   { en: '13+',   hi: '13+' },
    stat2L:  { en: 'Product Types',   hi: 'उत्पाद प्रकार' },
    stat3:   { en: '100%',  hi: '100%' },
    stat3L:  { en: 'Satisfaction',    hi: 'संतुष्टि' },
    cta:     { en: 'Get Free Quote',  hi: 'मुफ्त कोटेशन पाएं' },
    trusted: { en: 'Trusted in Chhattisgarh', hi: 'छत्तीसगढ़ में विश्वसनीय' },
  },

  // PRODUCTS
  products: {
    badge:    { en: 'Our Products',  hi: 'हमारे उत्पाद' },
    title:    { en: 'Products &',    hi: 'उत्पाद और' },
    titleHL:  { en: 'Services',      hi: 'सेवाएं' },
    subtitle: {
      en: 'Explore our complete range of agricultural equipment, hydraulic trolleys, and fabrication services',
      hi: 'हमारे कृषि उपकरण, हाइड्रोलिक ट्रॉली और फेब्रिकेशन सेवाओं की पूरी रेंज देखें',
    },
    quote: { en: 'Get Quote', hi: 'कोटेशन' },
  },

  // SERVICES
  services: {
    badge:      { en: 'Special Services',    hi: 'विशेष सेवाएं' },
    title:      { en: 'What We',             hi: 'हम क्या' },
    titleHL:    { en: 'Manufacture',         hi: 'बनाते हैं' },
    mfgTitle:   { en: 'We Manufacture',      hi: 'हम बनाते हैं' },
    agriTitle:  { en: 'Agricultural Equipment', hi: 'कृषि उपकरण' },
    addTitle:   { en: 'Additional Services', hi: 'अतिरिक्त सेवाएं' },
  },

  // WHY US
  whyUs: {
    badge:    { en: 'Why Choose Us', hi: 'हमें क्यों चुनें' },
    title:    { en: 'Why Choose',    hi: 'क्यों चुनें' },
    titleHL:  { en: 'Piyush Agro',   hi: 'पियूष एग्रो' },
  },

  // PROCESS
  process: {
    badge:    { en: 'How We Work',  hi: 'हम कैसे काम करते हैं' },
    title:    { en: 'Our Work',     hi: 'हमारी कार्य' },
    titleHL:  { en: 'Process',      hi: 'प्रक्रिया' },
  },

  // GALLERY
  gallery: {
    badge:    { en: 'Gallery',         hi: 'गैलरी' },
    title:    { en: 'Our',             hi: 'हमारी' },
    titleHL:  { en: 'Product Gallery', hi: 'उत्पाद गैलरी' },
    filterAll: { en: 'All',            hi: 'सभी' },
    f1:       { en: 'Hydraulic',       hi: 'हाइड्रोलिक' },
    f2:       { en: 'Tractor',         hi: 'ट्रैक्टर' },
    f3:       { en: 'Water Tankers',   hi: 'वाटर टैंकर' },
    f4:       { en: 'Agri Equipment',  hi: 'कृषि उपकरण' },
    f5:       { en: 'Fabrication',     hi: 'फेब्रिकेशन' },
  },

  // TESTIMONIALS
  testimonials: {
    badge:   { en: 'Customer Reviews',    hi: 'ग्राहक समीक्षाएं' },
    title:   { en: 'What Our',            hi: 'हमारे' },
    titleHL: { en: 'Customers Say',       hi: 'ग्राहक क्या कहते हैं' },
  },

  // CTA BANNER
  cta: {
    title:    { en: 'Ready to Order Your Custom Product?', hi: 'अपना कस्टम उत्पाद ऑर्डर करने के लिए तैयार हैं?' },
    subtitle: {
      en: 'Contact us today for a free consultation and quote. Serving farmers, contractors, and businesses across Chhattisgarh.',
      hi: 'मुफ्त परामर्श और कोटेशन के लिए आज हमसे संपर्क करें। छत्तीसगढ़ में किसानों, ठेकेदारों और व्यवसायों की सेवा।',
    },
    btn1: { en: 'WhatsApp Now', hi: 'व्हाट्सएप करें' },
    btn2: { en: 'Send Inquiry', hi: 'पूछताछ भेजें' },
  },

  // FAQ
  faq: {
    badge:    { en: 'FAQ',                            hi: 'अक्सर पूछे जाने वाले प्रश्न' },
    title:    { en: 'Frequently Asked',               hi: 'अक्सर पूछे जाने वाले' },
    titleHL:  { en: 'Questions',                      hi: 'प्रश्न' },
  },

  // CONTACT
  contact: {
    badge:       { en: 'Contact Us',              hi: 'संपर्क करें' },
    title:       { en: 'Get In',                  hi: 'हमसे' },
    titleHL:     { en: 'Touch',                   hi: 'संपर्क करें' },
    desc:        {
      en: "We're here to help with all your agricultural and commercial vehicle fabrication needs. Reach us via phone, WhatsApp, or the form.",
      hi: 'हम आपकी सभी कृषि और वाहन फेब्रिकेशन आवश्यकताओं में मदद के लिए यहां हैं। फोन, व्हाट्सएप या फॉर्म के माध्यम से संपर्क करें।',
    },
    addrLabel:   { en: 'Address',     hi: 'पता' },
    phone1Label: { en: 'Phone 1',     hi: 'फोन 1' },
    phone2Label: { en: 'Phone 2',     hi: 'फोन 2' },
    waLabel:     { en: 'WhatsApp',    hi: 'व्हाट्सएप' },
    waText:      { en: 'Chat with us on WhatsApp', hi: 'व्हाट्सएप पर चैट करें' },
    formTitle:   { en: 'Send an Inquiry', hi: 'पूछताछ भेजें' },
    formSub:     { en: "Fill out the form and we'll get back to you shortly.", hi: 'फॉर्म भरें, हम जल्द संपर्क करेंगे।' },
    nameLabel:   { en: 'Your Name *',      hi: 'आपका नाम *' },
    namePH:      { en: 'Enter your name',  hi: 'नाम दर्ज करें' },
    phoneLabel:  { en: 'Phone Number *',   hi: 'फोन नंबर *' },
    phonePH:     { en: 'Enter phone number', hi: 'फोन नंबर दर्ज करें' },
    emailLabel:  { en: 'Email (optional)', hi: 'ईमेल (वैकल्पिक)' },
    emailPH:     { en: 'Enter email',      hi: 'ईमेल दर्ज करें' },
    serviceLabel:{ en: 'Product / Service *', hi: 'उत्पाद / सेवा *' },
    servicePH:   { en: 'Select a product or service', hi: 'उत्पाद या सेवा चुनें' },
    msgLabel:    { en: 'Your Message',     hi: 'आपका संदेश' },
    msgPH:       { en: 'Describe your requirements...', hi: 'अपनी आवश्यकताएं बताएं...' },
    submitBtn:   { en: 'Send Inquiry',     hi: 'पूछताछ भेजें' },
    sending:     { en: 'Sending...',       hi: 'भेजा जा रहा है...' },
    successMsg:  {
      en: '✅ Your inquiry has been submitted! We will contact you soon.',
      hi: '✅ आपकी पूछताछ सफलतापूर्वक सबमिट हुई! हम जल्द संपर्क करेंगे।',
    },
    errName:    { en: 'Name is required',              hi: 'नाम आवश्यक है' },
    errPhone:   { en: 'Valid phone number is required', hi: 'वैध फोन नंबर आवश्यक है' },
    errService: { en: 'Please select a product/service', hi: 'कृपया उत्पाद/सेवा चुनें' },
    errSubmit:  { en: 'Failed to submit. Please try again or call us directly.', hi: 'सबमिट विफल। कृपया पुनः प्रयास करें या सीधे कॉल करें।' },
  },

  // FOOTER
  footer: {
    desc:      { en: 'Trusted manufacturer of hydraulic trolleys, agricultural equipment, and vehicle fabrication services in Rajnandgaon, Chhattisgarh.', hi: 'राजनांदगांव, छत्तीसगढ़ में हाइड्रोलिक ट्रॉली, कृषि उपकरण और वाहन फेब्रिकेशन सेवाओं के विश्वसनीय निर्माता।' },
    links:     { en: 'Quick Links',  hi: 'त्वरित लिंक' },
    products:  { en: 'Our Products', hi: 'हमारे उत्पाद' },
    servicesH: { en: 'Services',     hi: 'सेवाएं' },
    copyright: { en: '© 2026 Piyush Agro Industries. All Rights Reserved.', hi: '© 2026 पियूष एग्रो इंडस्ट्रीज। सर्वाधिकार सुरक्षित।' },
    location:  { en: 'Rajnandgaon, Chhattisgarh, India', hi: 'राजनांदगांव, छत्तीसगढ़, भारत' },
  },
} satisfies Record<string, Record<string, TText>>;

// ─── Data arrays ──────────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  { id: 'tractor-trolley',  icon: '🚜', gradient: 'from-[#065F2E] to-[#0B7A3B]', title: { en: 'Tractor Trolley', hi: 'ट्रैक्टर ट्रॉली' }, desc: { en: 'Heavy-duty agricultural transportation trolley for farms and construction.', hi: 'खेतों और निर्माण के लिए भारी-भरकम कृषि ट्रॉली।' }, category: 'tractor', specs: { nameOfPart: 'Tractor Trolley', capacity: '3–10 Ton', size: '10 × 6 × 2 Feet (L × B × H)' } },
  { id: '4w-hydraulic',     icon: '🔧', gradient: 'from-[#1a2f6f] to-[#243B8F]', title: { en: '4-Wheel Hydraulic Trolley', hi: 'चार पहिया हाइड्रोलिक ट्रॉली' }, desc: { en: 'Strong hydraulic lifting system for heavy commercial loads.', hi: 'भारी व्यावसायिक भार के लिए मजबूत हाइड्रोलिक लिफ्टिंग।' }, category: 'hydraulic', specs: { nameOfPart: '4-Wheel Hydraulic Trolley', capacity: '10–20 Ton', size: '14 × 7 × 3 Feet (L × B × H)' } },
  { id: '2w-hydraulic',     icon: '⚙️', gradient: 'from-[#0d6471] to-[#0e9aad]', title: { en: '2-Wheel Hydraulic Trolley', hi: 'दो पहिया हाइड्रोलिक ट्रॉली' }, desc: { en: 'Cost-effective hydraulic transport solution for farmers.', hi: 'किसानों के लिए किफायती हाइड्रोलिक परिवहन समाधान।' }, category: 'hydraulic', specs: { nameOfPart: '2-Wheel Hydraulic Trolley', capacity: '5–10 Ton', size: '12 × 6 × 2.5 Feet (L × B × H)' } },
  { id: 'hydraulic-dumper', icon: '🚛', gradient: 'from-[#b45309] to-[#d97706]', title: { en: 'Hydraulic Dumper', hi: 'हाइड्रोलिक डम्पर' }, desc: { en: 'High-capacity hydraulic dumper for farming and construction.', hi: 'खेती और निर्माण के लिए उच्च क्षमता हाइड्रोलिक डम्पर।' }, category: 'hydraulic', specs: { nameOfPart: 'Hydraulic Dumper', capacity: '10–25 Ton', size: '16 × 7 × 4 Feet (L × B × H)' } },
  { id: 'water-tanker',     icon: '💧', gradient: 'from-[#0c4a6e] to-[#0ea5e9]', title: { en: 'Water Tanker Trailer', hi: 'वाटर टैंकर ट्रेलर' }, desc: { en: 'Reliable water transportation tanker for various uses.', hi: 'विभिन्न उपयोगों के लिए विश्वसनीय जल टैंकर ट्रेलर।' }, category: 'water', specs: { nameOfPart: 'Water Tanker Trailer', capacity: '3000–5000 Liters', size: '10 × 5 × 5 Feet (L × B × H)' } },
  { id: 'medical-vehicle',  icon: '🚑', gradient: 'from-[#991b1b] to-[#dc2626]', title: { en: 'Medical Vehicle', hi: 'मेडिकल वाहन' }, desc: { en: 'Customized medical and utility vehicles for healthcare.', hi: 'स्वास्थ्य सेवा के लिए कस्टमाइज़ मेडिकल वाहन।' }, category: 'fabrication', specs: { nameOfPart: 'Medical Vehicle', capacity: 'As per chassis', size: 'Custom Built' } },
  { id: 'garbage-vehicle',  icon: '🗑️', gradient: 'from-[#374151] to-[#4b5563]', title: { en: 'Garbage Collection Vehicle', hi: 'कचरा संग्रह वाहन' }, desc: { en: 'Municipal and commercial garbage collection with durable build.', hi: 'टिकाऊ निर्माण के साथ नगर व व्यावसायिक कचरा वाहन।' }, category: 'fabrication', specs: { nameOfPart: 'Garbage Collection Vehicle', capacity: '2–5 Ton / 3–6 CBM', size: 'Custom Built' } },
  { id: 'agri-equipment',   icon: '🌾', gradient: 'from-[#365314] to-[#4d7c0f]', title: { en: 'Agricultural Equipment', hi: 'कृषि उपकरण' }, desc: { en: 'Complete range of farming equipment for modern agriculture.', hi: 'आधुनिक खेती के लिए कृषि उपकरणों की पूरी रेंज।' }, category: 'agri', specs: { nameOfPart: 'Agricultural Implements', capacity: 'Varies', size: 'Various Sizes' } },
  { id: 'gates',            icon: '🚪', gradient: 'from-[#1e3a5f] to-[#374151]', title: { en: 'Gates', hi: 'गेट' }, desc: { en: 'Custom fabricated steel gates for residential and commercial use.', hi: 'आवासीय और व्यावसायिक उपयोग के लिए कस्टम स्टील गेट।' }, category: 'fabrication', specs: { nameOfPart: 'Steel Gate', capacity: 'N/A', size: 'Custom Dimensions' } },
  { id: 'railings',         icon: '🛡️', gradient: 'from-[#111827] to-[#1f2937]', title: { en: 'Railings', hi: 'रेलिंग' }, desc: { en: 'Strong and decorative railings for safety and aesthetics.', hi: 'सुरक्षा और सौंदर्य के लिए मजबूत और सजावटी रेलिंग।' }, category: 'fabrication', specs: { nameOfPart: 'Steel/Iron Railing', capacity: 'N/A', size: 'Custom Dimensions' } },
  { id: 'cultivators',      icon: '🌱', gradient: 'from-[#78350f] to-[#92400e]', title: { en: 'Cultivators', hi: 'कल्टीवेटर' }, desc: { en: 'Durable cultivators for modern and efficient farming.', hi: 'आधुनिक और कुशल खेती के लिए टिकाऊ कल्टीवेटर।' }, category: 'agri', specs: { nameOfPart: 'Cultivator', capacity: '7-11 Tynes', size: 'Standard' } },
  { id: 'custom-fab',       icon: '🔨', gradient: 'from-[#4c1d95] to-[#6d28d9]', title: { en: 'Custom Fabrication', hi: 'कस्टम फेब्रिकेशन' }, desc: { en: 'Tailor-made fabrication as per customer requirements.', hi: 'ग्राहकों की आवश्यकताओं के अनुसार कस्टम फेब्रिकेशन।' }, category: 'fabrication', specs: { nameOfPart: 'Custom Structure', capacity: 'As Required', size: 'As Required' } },
  { id: 'vehicle-repair',   icon: '🔩', gradient: 'from-[#7f1d1d] to-[#b91c1c]', title: { en: 'Vehicle Repairing', hi: 'वाहन मरम्मत' }, desc: { en: 'Repair and maintenance of all agricultural and commercial vehicles.', hi: 'सभी प्रकार के कृषि और व्यावसायिक वाहनों की मरम्मत।' }, category: 'fabrication', specs: { nameOfPart: 'Repair Service', capacity: 'All Vehicles', size: 'N/A' } },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', icon: '🔧', gradient: 'from-[#1a2f6f] to-[#243B8F]', label: { en: '4-Wheel Hydraulic Trolley', hi: 'चार पहिया हाइड्रोलिक ट्रॉली' }, category: 'hydraulic' },
  { id: 'g2', icon: '⚙️', gradient: 'from-[#0d6471] to-[#0e9aad]', label: { en: '2-Wheel Hydraulic Trolley', hi: 'दो पहिया हाइड्रोलिक ट्रॉली' }, category: 'hydraulic' },
  { id: 'g3', icon: '🚜', gradient: 'from-[#065F2E] to-[#0B7A3B]', label: { en: 'Tractor Trolley', hi: 'ट्रैक्टर ट्रॉली' }, category: 'tractor' },
  { id: 'g4', icon: '🌾', gradient: 'from-[#365314] to-[#4d7c0f]', label: { en: 'Agricultural Trolley', hi: 'कृषि ट्रॉली' }, category: 'tractor' },
  { id: 'g5', icon: '💧', gradient: 'from-[#0c4a6e] to-[#0ea5e9]', label: { en: 'Water Tanker Trailer', hi: 'वाटर टैंकर ट्रेलर' }, category: 'water' },
  { id: 'g6', icon: '🚛', gradient: 'from-[#b45309] to-[#d97706]', label: { en: 'Hydraulic Dumper', hi: 'हाइड्रोलिक डम्पर' }, category: 'hydraulic' },
  { id: 'g7', icon: '🌱', gradient: 'from-[#78350f] to-[#92400e]', label: { en: 'Cultivator', hi: 'कल्टीवेटर' }, category: 'agri' },
  { id: 'g8', icon: '🔨', gradient: 'from-[#4c1d95] to-[#6d28d9]', label: { en: 'Custom Fabrication', hi: 'कस्टम फेब्रिकेशन' }, category: 'fabrication' },
  { id: 'g9', icon: '🚪', gradient: 'from-[#1e3a5f] to-[#374151]', label: { en: 'Steel Gate', hi: 'स्टील गेट' }, category: 'fabrication' },
  { id: 'g10',icon: '🛡️', gradient: 'from-[#111827] to-[#1f2937]', label: { en: 'Railings', hi: 'रेलिंग' }, category: 'fabrication' },
  { id: 'g11',icon: '⚙️', gradient: 'from-[#065F2E] to-[#14a050]', label: { en: 'Agricultural Equipment', hi: 'कृषि उपकरण' }, category: 'agri' },
  { id: 'g12',icon: '🔩', gradient: 'from-[#7f1d1d] to-[#b91c1c]', label: { en: 'Workshop / Repair', hi: 'कार्यशाला / मरम्मत' }, category: 'fabrication' },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: { en: 'Do you manufacture custom hydraulic trolleys?', hi: 'क्या आप कस्टम हाइड्रोलिक ट्रॉली बनाते हैं?' },
    answer:   { en: 'Yes, we manufacture custom hydraulic trolleys (2-wheel and 4-wheel) as per your load capacity, dimensions, and specifications.', hi: 'हां, आपकी लोड क्षमता, आयाम और विशिष्टताओं के अनुसार 2-पहिया और 4-पहिया हाइड्रोलिक ट्रॉली बनाते हैं।' },
  },
  {
    question: { en: 'Do you repair all types of vehicles?', hi: 'क्या आप सभी प्रकार के वाहनों की मरम्मत करते हैं?' },
    answer:   { en: 'Yes, we offer comprehensive vehicle repairing and fabrication services for all agricultural and commercial vehicles including tractors, trolleys, and dumpers.', hi: 'हां, ट्रैक्टर, ट्रॉली और डम्पर सहित सभी कृषि और व्यावसायिक वाहनों के लिए व्यापक मरम्मत और फेब्रिकेशन सेवाएं।' },
  },
  {
    question: { en: 'Do you provide agricultural equipment?', hi: 'क्या आप कृषि उपकरण प्रदान करते हैं?' },
    answer:   { en: 'Yes, we manufacture and supply a wide range of agricultural equipment including tractor trolleys, cultivators, agricultural tools, and accessories.', hi: 'हां, ट्रैक्टर ट्रॉली, कल्टीवेटर, कृषि उपकरण और सहायक सामग्री की विस्तृत श्रृंखला निर्मित और आपूर्ति करते हैं।' },
  },
  {
    question: { en: 'Can I place bulk orders?', hi: 'क्या मैं बल्क ऑर्डर दे सकता हूं?' },
    answer:   { en: 'Yes, we welcome bulk orders and can handle large-scale manufacturing efficiently. Contact us to discuss bulk pricing and delivery timelines.', hi: 'हां, बल्क ऑर्डर का स्वागत है। बल्क मूल्य और डिलीवरी के बारे में चर्चा के लिए हमसे संपर्क करें।' },
  },
  {
    question: { en: 'Do you serve outside Rajnandgaon?', hi: 'क्या आप राजनांदगांव के बाहर सेवा देते हैं?' },
    answer:   { en: 'Yes, we serve customers across Chhattisgarh and neighboring states. Products delivered to Raipur, Durg, Bilaspur, Jagdalpur, and many more locations.', hi: 'हां, हम छत्तीसगढ़ और पड़ोसी राज्यों में सेवा देते हैं। रायपुर, दुर्ग, बिलासपुर, जगदलपुर और कई स्थानों पर उत्पाद पहुंचाए हैं।' },
  },
  {
    question: { en: 'What is the typical manufacturing time?', hi: 'निर्माण का सामान्य समय क्या है?' },
    answer:   { en: 'Standard products take 7–15 working days. Custom fabrication projects may take longer. We provide a specific timeline when you place your order.', hi: 'मानक उत्पाद 7-15 कार्य दिवस में तैयार होते हैं। कस्टम प्रोजेक्ट में अधिक समय लग सकता है।' },
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name:     { en: 'Ramesh Patel',   hi: 'रमेश पटेल' },
    role:     { en: 'Farmer, Rajnandgaon', hi: 'किसान, राजनांदगांव' },
    text:     { en: 'Excellent quality hydraulic trolley. The construction is very strong and durable. I have been using it for over a year on my farm and it works perfectly. Highly recommend!', hi: 'बहुत बढ़िया गुणवत्ता की हाइड्रोलिक ट्रॉली। निर्माण बहुत मजबूत और टिकाऊ है। एक साल से अधिक खेत में उपयोग कर रहा हूं, बिल्कुल सही काम करती है। सिफारिश करता हूं!' },
    avatar:   'R',
    gradient: 'from-[#065F2E] to-[#0B7A3B]',
    rating:   5,
  },
  {
    name:     { en: 'Suresh Kumar',    hi: 'सुरेश कुमार' },
    role:     { en: 'Contractor, Durg', hi: 'ठेकेदार, दुर्ग' },
    text:     { en: 'Reliable fabrication work and timely delivery. The team understood our requirements perfectly and delivered exactly what we needed. Great customer service!', hi: 'विश्वसनीय फेब्रिकेशन कार्य और समय पर डिलीवरी। टीम ने आवश्यकताओं को पूरी तरह समझा। बेहतरीन ग्राहक सेवा!' },
    avatar:   'S',
    gradient: 'from-[#1a2f6f] to-[#243B8F]',
    rating:   5,
  },
  {
    name:     { en: 'Mahesh Yadav',    hi: 'महेश यादव' },
    role:     { en: 'Transport Owner, Raipur', hi: 'परिवहन मालिक, रायपुर' },
    text:     { en: 'Professional team and very affordable pricing. We ordered custom water tanker trailers and dumpers for our business. Quality is excellent and price competitive. Will order again!', hi: 'प्रोफेशनल टीम और किफायती मूल्य। कस्टम वाटर टैंकर और डम्पर ऑर्डर किए। गुणवत्ता उत्कृष्ट और मूल्य प्रतिस्पर्धी। फिर ऑर्डर करेंगे!' },
    avatar:   'M',
    gradient: 'from-[#b45309] to-[#d97706]',
    rating:   5,
  },
];

export const WHY_FEATURES: Feature[] = [
  { icon: '🏅', title: { en: 'High Quality Manufacturing', hi: 'उच्च गुणवत्ता निर्माण' }, desc: { en: 'Premium materials and precision craftsmanship in every product.', hi: 'हर उत्पाद में प्रीमियम सामग्री और सटीक कारीगरी।' } },
  { icon: '💪', title: { en: 'Heavy Duty Construction', hi: 'भारी-भरकम निर्माण' }, desc: { en: 'Built to withstand tough agricultural and industrial conditions.', hi: 'कठिन कृषि और औद्योगिक परिस्थितियों को झेलने के लिए।' } },
  { icon: '🏷️', title: { en: 'Affordable Pricing', hi: 'किफायती मूल्य' }, desc: { en: 'Best value for money with competitive prices for all products.', hi: 'सभी उत्पादों के लिए प्रतिस्पर्धी मूल्य के साथ पैसे का मूल्य।' } },
  { icon: '👷', title: { en: 'Expert Fabrication Team', hi: 'विशेषज्ञ फेब्रिकेशन टीम' }, desc: { en: 'Highly skilled and experienced professionals in metal fabrication.', hi: 'धातु फेब्रिकेशन में अत्यधिक कुशल और अनुभवी पेशेवर।' } },
  { icon: '⏰', title: { en: 'Timely Delivery', hi: 'समय पर डिलीवरी' }, desc: { en: 'We respect your time and commit to on-time project completion.', hi: 'हम आपका समय सम्मान करते हैं और समय पर पूरा करते हैं।' } },
  { icon: '📞', title: { en: 'After-Sales Support', hi: 'बिक्री उपरांत सहायता' }, desc: { en: 'Dedicated support team for maintenance and repair assistance.', hi: 'रखरखाव और मरम्मत के लिए समर्पित सहायता टीम।' } },
  { icon: '🎯', title: { en: 'Customized Solutions', hi: 'कस्टमाइज़ समाधान' }, desc: { en: 'Tailor-made products designed specifically for your requirements.', hi: 'आपकी आवश्यकताओं के लिए विशेष रूप से डिज़ाइन उत्पाद।' } },
  { icon: '📍', title: { en: 'Trusted Local Business', hi: 'विश्वसनीय स्थानीय व्यवसाय' }, desc: { en: 'Established business serving Chhattisgarh with pride and trust.', hi: 'गर्व और विश्वास के साथ छत्तीसगढ़ की सेवा करने वाला व्यवसाय।' } },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { num: 1, icon: '💬', title: { en: 'Requirement Discussion', hi: 'आवश्यकता चर्चा' }, desc: { en: 'We understand your specific needs and requirements.', hi: 'हम आपकी विशिष्ट जरूरतों को विस्तार से समझते हैं।' } },
  { num: 2, icon: '📐', title: { en: 'Design & Planning', hi: 'डिज़ाइन और योजना' }, desc: { en: 'Our team creates detailed designs for your product.', hi: 'हमारी टीम आपके उत्पाद के लिए विस्तृत डिज़ाइन बनाती है।' } },
  { num: 3, icon: '🔨', title: { en: 'Fabrication & Manufacturing', hi: 'फेब्रिकेशन और निर्माण' }, desc: { en: 'Expert craftsmen manufacture with precision.', hi: 'विशेषज्ञ कारीगर सटीकता से निर्माण करते हैं।' } },
  { num: 4, icon: '🔍', title: { en: 'Quality Inspection', hi: 'गुणवत्ता निरीक्षण' }, desc: { en: 'Thorough quality check for every product.', hi: 'हर उत्पाद की संपूर्ण गुणवत्ता जांच।' } },
  { num: 5, icon: '🚚', title: { en: 'Delivery & Support', hi: 'डिलीवरी और सहायता' }, desc: { en: 'Safe delivery with ongoing after-sales support.', hi: 'बिक्री के बाद सहायता के साथ सुरक्षित डिलीवरी।' } },
];

export const SERVICE_OPTIONS = [
  { value: 'tractor-trolley',   label: 'Tractor Trolley / ट्रैक्टर ट्रॉली' },
  { value: '4w-hydraulic',      label: '4-Wheel Hydraulic Trolley' },
  { value: '2w-hydraulic',      label: '2-Wheel Hydraulic Trolley' },
  { value: 'hydraulic-dumper',  label: 'Hydraulic Dumper / हाइड्रोलिक डम्पर' },
  { value: 'water-tanker',      label: 'Water Tanker / वाटर टैंकर' },
  { value: 'medical-vehicle',   label: 'Medical Vehicle / मेडिकल वाहन' },
  { value: 'garbage-vehicle',   label: 'Garbage Vehicle / कचरा वाहन' },
  { value: 'agri-equipment',    label: 'Agricultural Equipment / कृषि उपकरण' },
  { value: 'gates-railings',    label: 'Gates & Railings / गेट और रेलिंग' },
  { value: 'cultivator',        label: 'Cultivator / कल्टीवेटर' },
  { value: 'custom-fabrication',label: 'Custom Fabrication / कस्टम फेब्रिकेशन' },
  { value: 'vehicle-repair',    label: 'Vehicle Repairing / वाहन मरम्मत' },
  { value: 'other',             label: 'Other / अन्य' },
];

export const MEGA_MENU = [
  {
    title: { en: 'Tractor Trailers', hi: 'ट्रैक्टर ट्रेलर' },
    items: [
      { en: 'Hydraulic Tractor Trailer', hi: 'हाइड्रोलिक ट्रैक्टर ट्रेलर' },
      { en: 'Tractor Tipping Trailer', hi: 'ट्रैक्टर टिपिंग ट्रेलर' },
      { en: '5 Ton Agricultural Tractor Trailer', hi: '5 टन कृषि ट्रैक्टर ट्रेलर' },
      { en: '2 Ton Agriculture Tractor Trailer', hi: '2 टन कृषि ट्रैक्टर ट्रेलर' },
      { en: 'Non Tipping Tractor Trailers', hi: 'नॉन टिपिंग ट्रैक्टर ट्रेलर' },
    ]
  },
  {
    title: { en: 'Hydraulic Tractor Trolley', hi: 'हाइड्रोलिक ट्रैक्टर ट्रॉली' },
    items: [
      { en: 'Hydraulic Tractor Trolley', hi: 'हाइड्रोलिक ट्रैक्टर ट्रॉली' },
      { en: 'Special Tractor Trolley', hi: 'स्पेशल ट्रैक्टर ट्रॉली' },
      { en: 'Mini Water Tank Trolley', hi: 'मिनी वाटर टैंक ट्रॉली' },
    ]
  },
  {
    title: { en: 'Generator Trolley', hi: 'जनरेटर ट्रॉली' },
    items: [
      { en: '4 Wheel Generator Trolley', hi: '4 व्हील जनरेटर ट्रॉली' },
      { en: 'Generator Set Trolley', hi: 'जनरेटर सेट ट्रॉली' },
      { en: '2 Wheeler Trolley', hi: '2 व्हीलर ट्रॉली' },
      { en: 'Generator Trolley', hi: 'जनरेटर ट्रॉली' },
    ]
  },
  {
    title: { en: 'Material Handling Equipment', hi: 'मटेरियल हैंडलिंग उपकरण' },
    items: [
      { en: 'UGPU Trolley 4 Wheel', hi: 'UGPU ट्रॉली 4 व्हील' },
      { en: 'Customize Low Bed Trailer', hi: 'कस्टमाइज लो बेड ट्रेलर' },
      { en: 'Customize Low Bed Trolley', hi: 'कस्टमाइज लो बेड ट्रॉली' },
      { en: 'Wheeled Cart', hi: 'पहिएदार गाड़ी' },
    ]
  }
];

export const MEGA_MENU_CTA = { en: 'View All Products', hi: 'सभी उत्पाद देखें' };

export const EXTENDED_PRODUCTS: Product[] = [
  // Tractor Trailers
  { id: 'tt-hydraulic', icon: '🚜', gradient: 'from-[#065F2E] to-[#0B7A3B]', category: 'Tractor Trailers', title: { en: 'Hydraulic Tractor Trailer', hi: 'हाइड्रोलिक ट्रैक्टर ट्रेलर' }, desc: { en: 'Heavy-duty hydraulic trailer for agricultural transport.', hi: 'कृषि परिवहन के लिए भारी हाइड्रोलिक ट्रेलर।' }, specs: { nameOfPart: 'Hydraulic Trailer', capacity: '5–15 Ton', size: '12 × 6 × 3 Feet' } },
  { id: 'tt-tipping', icon: '🚜', gradient: 'from-[#0d6471] to-[#0e9aad]', category: 'Tractor Trailers', title: { en: 'Tractor Tipping Trailer', hi: 'ट्रैक्टर टिपिंग ट्रेलर' }, desc: { en: 'Tipping mechanism for easy unloading of materials.', hi: 'सामग्री आसानी से उतारने के लिए टिपिंग तंत्र।' }, specs: { nameOfPart: 'Tipping Trailer', capacity: '3–10 Ton', size: '10 × 6 × 2.5 Feet' } },
  { id: 'tt-5ton', icon: '🚜', gradient: 'from-[#1a2f6f] to-[#243B8F]', category: 'Tractor Trailers', title: { en: '5 Ton Agricultural Tractor Trailer', hi: '5 टन कृषि ट्रैक्टर ट्रेलर' }, desc: { en: 'Standard 5 ton capacity trailer for general farming needs.', hi: 'सामान्य खेती के लिए मानक 5 टन क्षमता ट्रेलर।' }, specs: { nameOfPart: 'Agri Trailer', capacity: '5 Ton', size: '11 × 6 × 2 Feet' } },
  { id: 'tt-2ton', icon: '🚜', gradient: 'from-[#b45309] to-[#d97706]', category: 'Tractor Trailers', title: { en: '2 Ton Agriculture Tractor Trailer', hi: '2 टन कृषि ट्रैक्टर ट्रेलर' }, desc: { en: 'Lightweight trailer for small farms and narrow paths.', hi: 'छोटे खेतों और संकरे रास्तों के लिए हल्का ट्रेलर।' }, specs: { nameOfPart: 'Mini Trailer', capacity: '2 Ton', size: '8 × 5 × 1.5 Feet' } },
  { id: 'tt-nontipping', icon: '🚜', gradient: 'from-[#374151] to-[#4b5563]', category: 'Tractor Trailers', title: { en: 'Non Tipping Tractor Trailers', hi: 'नॉन टिपिंग ट्रैक्टर ट्रेलर' }, desc: { en: 'Fixed bed tractor trailers for stable transport.', hi: 'स्थिर परिवहन के लिए फिक्स्ड बेड ट्रैक्टर ट्रेलर।' }, specs: { nameOfPart: 'Fixed Trailer', capacity: '5–12 Ton', size: '12 × 6 × 2 Feet' } },

  // Hydraulic Tractor Trolley
  { id: 'ht-trolley', icon: '🔧', gradient: 'from-[#065F2E] to-[#0B7A3B]', category: 'Hydraulic Tractor Trolley', title: { en: 'Hydraulic Tractor Trolley', hi: 'हाइड्रोलिक ट्रैक्टर ट्रॉली' }, desc: { en: 'Classic hydraulic trolley for multi-purpose farming use.', hi: 'बहुउद्देशीय खेती के उपयोग के लिए क्लासिक हाइड्रोलिक ट्रॉली।' }, specs: { nameOfPart: 'Hydraulic Trolley', capacity: '5–10 Ton', size: '10 × 6 × 2.5 Feet' } },
  { id: 'ht-special', icon: '⚙️', gradient: 'from-[#1e3a5f] to-[#374151]', category: 'Hydraulic Tractor Trolley', title: { en: 'Special Tractor Trolley', hi: 'स्पेशल ट्रैक्टर ट्रॉली' }, desc: { en: 'Customized trolley with enhanced heavy-duty chassis.', hi: 'उन्नत भारी-भरकम चेसिस के साथ कस्टमाइज़ ट्रॉली।' }, specs: { nameOfPart: 'Special Trolley', capacity: '10–15 Ton', size: '12 × 6 × 3 Feet' } },
  { id: 'ht-water', icon: '💧', gradient: 'from-[#0c4a6e] to-[#0ea5e9]', category: 'Hydraulic Tractor Trolley', title: { en: 'Mini Water Tank Trolley', hi: 'मिनी वाटर टैंक ट्रॉली' }, desc: { en: 'Compact water tank trolley for agricultural irrigation.', hi: 'कृषि सिंचाई के लिए मिनी वाटर टैंक ट्रॉली।' }, specs: { nameOfPart: 'Water Trolley', capacity: '2000 Liters', size: '8 × 4 × 4 Feet' } },

  // Generator Trolley
  { id: 'gt-4wheel', icon: '⚡', gradient: 'from-[#1a2f6f] to-[#243B8F]', category: 'Generator Trolley', title: { en: '4 Wheel Generator Trolley', hi: '4 व्हील जनरेटर ट्रॉली' }, desc: { en: 'Stable 4-wheel base for heavy generator sets.', hi: 'भारी जनरेटर सेट के लिए स्थिर 4-व्हील बेस।' }, specs: { nameOfPart: '4W Gen Trolley', capacity: '1–5 Ton', size: 'Custom Built' } },
  { id: 'gt-set', icon: '⚡', gradient: 'from-[#78350f] to-[#92400e]', category: 'Generator Trolley', title: { en: 'Generator Set Trolley', hi: 'जनरेटर सेट ट्रॉली' }, desc: { en: 'Enclosed trolley designed for protecting generator sets.', hi: 'जनरेटर सेट की सुरक्षा के लिए डिज़ाइन की गई ट्रॉली।' }, specs: { nameOfPart: 'Gen Set Trolley', capacity: 'Varies', size: 'Custom Built' } },
  { id: 'gt-2wheel', icon: '⚡', gradient: 'from-[#b45309] to-[#d97706]', category: 'Generator Trolley', title: { en: '2 Wheeler Trolley', hi: '2 व्हीलर ट्रॉली' }, desc: { en: 'Compact 2-wheel trolley for portable generators.', hi: 'पोर्टेबल जनरेटर के लिए कॉम्पैक्ट 2-व्हील ट्रॉली।' }, specs: { nameOfPart: '2W Gen Trolley', capacity: '0.5–1.5 Ton', size: 'Custom Built' } },
  { id: 'gt-standard', icon: '⚡', gradient: 'from-[#374151] to-[#4b5563]', category: 'Generator Trolley', title: { en: 'Generator Trolley', hi: 'जनरेटर ट्रॉली' }, desc: { en: 'Standard trolley for medium size generator transport.', hi: 'मध्यम आकार के जनरेटर परिवहन के लिए मानक ट्रॉली।' }, specs: { nameOfPart: 'Gen Trolley', capacity: '1–3 Ton', size: 'Custom Built' } },

  // Material Handling Equipment
  { id: 'mh-ugpu', icon: '🏗️', gradient: 'from-[#991b1b] to-[#dc2626]', category: 'Material Handling Equipment', title: { en: 'UGPU Trolley 4 Wheel', hi: 'UGPU ट्रॉली 4 व्हील' }, desc: { en: 'Specialized 4-wheel material handling trolley for industrial use.', hi: 'औद्योगिक उपयोग के लिए विशेष सामग्री हैंडलिंग ट्रॉली।' }, specs: { nameOfPart: 'UGPU Trolley', capacity: '2–5 Ton', size: 'Custom Built' } },
  { id: 'mh-lowbed', icon: '🏗️', gradient: 'from-[#4c1d95] to-[#6d28d9]', category: 'Material Handling Equipment', title: { en: 'Customize Low Bed Trailer', hi: 'कस्टमाइज लो बेड ट्रेलर' }, desc: { en: 'Low bed trailer for easy loading of heavy machinery.', hi: 'भारी मशीनरी को आसानी से लादने के लिए लो बेड ट्रेलर।' }, specs: { nameOfPart: 'Low Bed Trailer', capacity: '10–30 Ton', size: 'Custom Dimensions' } },
  { id: 'mh-lowbedtrolley', icon: '🏗️', gradient: 'from-[#0d6471] to-[#0e9aad]', category: 'Material Handling Equipment', title: { en: 'Customize Low Bed Trolley', hi: 'कस्टमाइज लो बेड ट्रॉली' }, desc: { en: 'Low height trolley for versatile material handling.', hi: 'बहुमुखी सामग्री हैंडलिंग के लिए कम ऊंचाई वाली ट्रॉली।' }, specs: { nameOfPart: 'Low Bed Trolley', capacity: '5–15 Ton', size: 'Custom Dimensions' } },
  { id: 'mh-cart', icon: '🛒', gradient: 'from-[#365314] to-[#4d7c0f]', category: 'Material Handling Equipment', title: { en: 'Wheeled Cart', hi: 'पहिएदार गाड़ी' }, desc: { en: 'Heavy-duty wheeled cart for warehouse and factory floor.', hi: 'गोदाम और कारखाने के लिए भारी पहिएदार गाड़ी।' }, specs: { nameOfPart: 'Wheeled Cart', capacity: '0.5–2 Ton', size: '4 × 3 × 3 Feet' } },
];
