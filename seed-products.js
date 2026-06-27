const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://dnjcgjmpfgfilnbsdekz.supabase.co',
  'sb_publishable_SH2BrV-uzwbJOCMrS4SLVA_PxA5kbpz'
);

const PRODUCTS = [
  { id: 'tractor-trolley',  icon: '🚜', gradient: 'from-[#065F2E] to-[#0B7A3B]', title: { en: 'Tractor Trolley', hi: 'ट्रैक्टर ट्रॉली' }, desc: { en: 'Heavy-duty agricultural transportation trolley for farms and construction.', hi: 'खेतों और निर्माण के लिए भारी-भरकम कृषि ट्रॉली।' }, category: 'tractor', specs: { nameOfPart: 'Tractor Trolley', capacity: '3–10 Ton', size: '10 × 6 × 2 Feet (L × B × H)' }, featured: true },
  { id: '4w-hydraulic',     icon: '🔧', gradient: 'from-[#1a2f6f] to-[#243B8F]', title: { en: '4-Wheel Hydraulic Trolley', hi: 'चार पहिया हाइड्रोलिक ट्रॉली' }, desc: { en: 'Strong hydraulic lifting system for heavy commercial loads.', hi: 'भारी व्यावसायिक भार के लिए मजबूत हाइड्रोलिक लिफ्टिंग।' }, category: 'hydraulic', specs: { nameOfPart: '4-Wheel Hydraulic Trolley', capacity: '10–20 Ton', size: '14 × 7 × 3 Feet (L × B × H)' }, featured: true },
  { id: '2w-hydraulic',     icon: '⚙️', gradient: 'from-[#0d6471] to-[#0e9aad]', title: { en: '2-Wheel Hydraulic Trolley', hi: 'दो पहिया हाइड्रोलिक ट्रॉली' }, desc: { en: 'Cost-effective hydraulic transport solution for farmers.', hi: 'किसानों के लिए किफायती हाइड्रोलिक परिवहन समाधान।' }, category: 'hydraulic', specs: { nameOfPart: '2-Wheel Hydraulic Trolley', capacity: '5–10 Ton', size: '12 × 6 × 2.5 Feet (L × B × H)' }, featured: true },
  { id: 'hydraulic-dumper', icon: '🚛', gradient: 'from-[#b45309] to-[#d97706]', title: { en: 'Hydraulic Dumper', hi: 'हाइड्रोलिक डम्पर' }, desc: { en: 'High-capacity hydraulic dumper for farming and construction.', hi: 'खेती और निर्माण के लिए उच्च क्षमता हाइड्रोलिक डम्पर।' }, category: 'hydraulic', specs: { nameOfPart: 'Hydraulic Dumper', capacity: '10–25 Ton', size: '16 × 7 × 4 Feet (L × B × H)' }, featured: true },
  { id: 'water-tanker',     icon: '💧', gradient: 'from-[#0c4a6e] to-[#0ea5e9]', title: { en: 'Water Tanker Trailer', hi: 'वाटर टैंकर ट्रेलर' }, desc: { en: 'Reliable water transportation tanker for various uses.', hi: 'विभिन्न उपयोगों के लिए विश्वसनीय जल टैंकर ट्रेलर।' }, category: 'water', specs: { nameOfPart: 'Water Tanker Trailer', capacity: '3000–5000 Liters', size: '10 × 5 × 5 Feet (L × B × H)' }, featured: true },
  { id: 'medical-vehicle',  icon: '🚑', gradient: 'from-[#991b1b] to-[#dc2626]', title: { en: 'Medical Vehicle', hi: 'मेडिकल वाहन' }, desc: { en: 'Customized medical and utility vehicles for healthcare.', hi: 'स्वास्थ्य सेवा के लिए कस्टमाइज़ मेडिकल वाहन।' }, category: 'fabrication', specs: { nameOfPart: 'Medical Vehicle', capacity: 'As per chassis', size: 'Custom Built' }, featured: true },
  { id: 'garbage-vehicle',  icon: '🗑️', gradient: 'from-[#374151] to-[#4b5563]', title: { en: 'Garbage Collection Vehicle', hi: 'कचरा संग्रह वाहन' }, desc: { en: 'Municipal and commercial garbage collection with durable build.', hi: 'टिकाऊ निर्माण के साथ नगर व व्यावसायिक कचरा वाहन।' }, category: 'fabrication', specs: { nameOfPart: 'Garbage Collection Vehicle', capacity: '2–5 Ton / 3–6 CBM', size: 'Custom Built' }, featured: true },
  { id: 'agri-equipment',   icon: '🌾', gradient: 'from-[#365314] to-[#4d7c0f]', title: { en: 'Agricultural Equipment', hi: 'कृषि उपकरण' }, desc: { en: 'Complete range of farming equipment for modern agriculture.', hi: 'आधुनिक खेती के लिए कृषि उपकरणों की पूरी रेंज।' }, category: 'agri', specs: { nameOfPart: 'Agricultural Implements', capacity: 'Varies', size: 'Various Sizes' }, featured: true },
  { id: 'gates',            icon: '🚪', gradient: 'from-[#1e3a5f] to-[#374151]', title: { en: 'Gates', hi: 'गेट' }, desc: { en: 'Custom fabricated steel gates for residential and commercial use.', hi: 'आवासीय और व्यावसायिक उपयोग के लिए कस्टम स्टील गेट।' }, category: 'fabrication', specs: { nameOfPart: 'Steel Gate', capacity: 'N/A', size: 'Custom Dimensions' }, featured: true },
  { id: 'railings',         icon: '🛡️', gradient: 'from-[#111827] to-[#1f2937]', title: { en: 'Railings', hi: 'रेलिंग' }, desc: { en: 'Strong and decorative railings for safety and aesthetics.', hi: 'सुरक्षा and सौंदर्य के लिए मजबूत और सजावटी रेलिंग।' }, category: 'fabrication', specs: { nameOfPart: 'Steel/Iron Railing', capacity: 'N/A', size: 'Custom Dimensions' }, featured: true },
  { id: 'cultivators',      icon: '🌱', gradient: 'from-[#78350f] to-[#92400e]', title: { en: 'Cultivators', hi: 'कल्टीवेटर' }, desc: { en: 'Durable cultivators for modern and efficient farming.', hi: 'आधुनिक और कुशल खेती के लिए टिकाऊ कल्टीवेटर।' }, category: 'agri', specs: { nameOfPart: 'Cultivator', capacity: '7-11 Tynes', size: 'Standard' }, featured: true },
  { id: 'custom-fab',       icon: '🔨', gradient: 'from-[#4c1d95] to-[#6d28d9]', title: { en: 'Custom Fabrication', hi: 'कस्टम फेब्रिकेशन' }, desc: { en: 'Tailor-made fabrication as per customer requirements.', hi: 'ग्राहकों की आवश्यकताओं के अनुसार कस्टम फेब्रिकेशन।' }, category: 'fabrication', specs: { nameOfPart: 'Custom Structure', capacity: 'As Required', size: 'As Required' }, featured: true },
  { id: 'vehicle-repair',   icon: '🔩', gradient: 'from-[#7f1d1d] to-[#b91c1c]', title: { en: 'Vehicle Repairing', hi: 'वाहन मरम्मत' }, desc: { en: 'Repair and maintenance of all agricultural and commercial vehicles.', hi: 'सभी प्रकार के कृषि और व्यावसायिक वाहनों की मरम्मत।' }, category: 'fabrication', specs: { nameOfPart: 'Repair Service', capacity: 'All Vehicles', size: 'N/A' }, featured: true },
];

async function seed() {
  console.log('Seeding products...');
  for (const p of PRODUCTS) {
    const payload = {
      slug: p.id,
      title: p.title,
      desc: p.desc,
      icon: p.icon,
      gradient: p.gradient,
      specs: p.specs,
      category_id: null,
      status: 'active',
      featured: p.featured,
      images: []
    };
    const { error } = await supabase.from('products').upsert([payload], { onConflict: 'slug' });
    if (error) console.error('Error on', p.id, error.message);
  }
  console.log('Done!');
}
seed();
