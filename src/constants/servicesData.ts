import type { TText } from '@/types';

export interface ServiceItem {
  id: string;
  slug: string;
  icon: string;
  title: TText;
  shortDesc: TText;
  fullDesc: TText;
  offerings: { en: string; hi: string }[];
  process: { step: number; title: TText; desc: TText }[];
  benefits: { title: TText; desc: TText }[];
  applications: { en: string; hi: string }[];
  relevantProducts: string[]; // Slugs
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'vehicle-fabrication',
    slug: 'vehicle-fabrication',
    icon: '🏭',
    title: { en: 'Vehicle Fabrication', hi: 'वाहन फेब्रिकेशन' },
    shortDesc: {
      en: 'Heavy-duty agricultural and commercial vehicle body building, chassis reinforcement, and hydraulic tipper fabrication.',
      hi: 'भारी-भरकम कृषि और वाणिज्यिक वाहन बॉडी निर्माण, चेसिस सुदृढ़ीकरण और हाइड्रोलिक टिपर फेब्रिकेशन।',
    },
    fullDesc: {
      en: 'Piyush Agro Industries provides specialized commercial and agricultural vehicle fabrication in Rajnandgaon, Chhattisgarh. Built with premium IS 2062 grade mild steel, our vehicle bodies and chassis are designed to handle demanding rural and industrial hauling without structural fatigue.',
      hi: 'पियूष एग्रो इंडस्ट्रीज राजनांदगांव, छत्तीसगढ़ में विशेष वाणिज्यिक और कृषि वाहन फेब्रिकेशन प्रदान करता है। प्रीमियम IS 2062 माइल्ड स्टील से निर्मित हमारी वाहन बॉडी और चेसिस ग्रामीण और औद्योगिक परिस्थितियों में भारी भार वहन के लिए डिज़ाइन की गई हैं।',
    },
    offerings: [
      { en: 'Tractor trolley and trailer body fabrication with heavy channel frames', hi: 'मजबूत चैनल फ्रेम के साथ ट्रैक्टर ट्रॉली और ट्रेलर बॉडी फेब्रिकेशन' },
      { en: 'Hydraulic tipping trailer beds with reinforced sub-frames', hi: 'मजबूत सब-फ्रेम के साथ हाइड्रोलिक टिपिंग ट्रेलर बेड' },
      { en: 'Utility vehicle bodies (garbage collection, medical & custom municipal bodies)', hi: 'उपयोगिता वाहन बॉडी (कचरा संग्रह, मेडिकल व कस्टम नगर निकाय वाहन)' },
      { en: 'Water tanker trailer fabrication from 2000L to 5000L capacity', hi: '2000L से 5000L क्षमता के वाटर टैंकर ट्रेलर फेब्रिकेशन' },
      { en: 'Chassis reinforcement and heavy-duty load distribution mounting', hi: 'चेसिस सुदृढ़ीकरण और उच्च भार वितरण माउंटिंग' },
    ],
    process: [
      {
        step: 1,
        title: { en: 'Requirement & Dimension Survey', hi: 'आवश्यकता एवं माप समीक्षा' },
        desc: { en: 'We assess your vehicle chassis specifications, intended payload, and usage requirements.', hi: 'हम आपके वाहन चेसिस माप, लक्षित भार और उपयोग आवश्यकताओं का विश्लेषण करते हैं।' },
      },
      {
        step: 2,
        title: { en: 'Structural Planning & Material Selection', hi: 'संरचनात्मक योजना एवं सामग्री चयन' },
        desc: { en: 'Selecting certified IS 2062 mild steel channels, angles, and thick gauge sheet plates.', hi: 'प्रमाणित IS 2062 माइल्ड स्टील चैनल, एंगल और मजबूत शीट प्लेटों का चयन।' },
      },
      {
        step: 3,
        title: { en: 'Precision Cutting & Heavy-Duty Welding', hi: 'सटीक कटिंग एवं मजबूत वेल्डिंग' },
        desc: { en: 'Precision assembly with multi-pass MIG and ARC welding ensuring maximum joint strength.', hi: 'अधिकतम मजबूती सुनिश्चित करने के लिए मल्टी-पास MIG और ARC वेल्डिंग के साथ सटीक निर्माण।' },
      },
      {
        step: 4,
        title: { en: 'Hydraulic & Quality Testing', hi: 'हाइड्रोलिक एवं गुणवत्ता परीक्षण' },
        desc: { en: 'Rigorous load testing, tipping mechanism verification, and weld seam inspection.', hi: 'कठोर लोड परीक्षण, टिपिंग तंत्र सत्यापन और वेल्ड सीम निरीक्षण।' },
      },
      {
        step: 5,
        title: { en: 'Surface Treatment & Delivery', hi: 'सतह उपचार एवं सुरक्षित डिलीवरी' },
        desc: { en: 'Anti-corrosive primer coating and durable synthetic enamel paint before handover.', hi: 'एंटी-जंग प्राइमर कोटिंग और टिकाऊ पेंट के बाद सुरक्षित डिलीवरी।' },
      },
    ],
    benefits: [
      {
        title: { en: 'High Payload Durability', hi: 'उच्च भार वहन क्षमता' },
        desc: { en: 'Engineered with heavy-duty structural steel to withstand rigorous rural roads and quarry transport.', hi: 'कच्चे ग्रामीण रास्तों और भारी परिवहन को झेलने के लिए मजबूत स्टील निर्माण।' },
      },
      {
        title: { en: 'Tailored Chassis Fitment', hi: 'कस्टम चेसिस फिटमेंट' },
        desc: { en: 'Customized precisely to match your tractor or commercial vehicle specifications.', hi: 'आपके ट्रैक्टर या वाहन विनिर्देशों के अनुसार सटीक कस्टमाइजेशन।' },
      },
      {
        title: { en: 'Long Service Life', hi: 'दीर्घकालिक सेवा जीवन' },
        desc: { en: 'High-resistance paint and robust joints provide years of trouble-free operation.', hi: 'जंग प्रतिरोधी पेंट और मजबूत जोड़ वर्षों तक निर्बाध संचालन प्रदान करते हैं।' },
      },
    ],
    applications: [
      { en: 'Agricultural produce hauling (paddy, wheat, sugarcane)', hi: 'कृषि उपज परिवहन (धान, गेहूं, गन्ना)' },
      { en: 'Construction material transport (sand, aggregate, bricks)', hi: 'निर्माण सामग्री परिवहन (रेत, गिट्टी, ईंट)' },
      { en: 'Municipal waste and civic maintenance operations', hi: 'नगरपालिका कचरा व सार्वजनिक सेवाएं' },
      { en: 'Commercial logistics across Chhattisgarh', hi: 'छत्तीसगढ़ में वाणिज्यिक लॉजिस्टिक्स' },
    ],
    relevantProducts: ['tractor-trolley', 'hydraulic-tractor-trolley', 'tractor-tipping-trailer', 'water-tanker-trailer'],
  },
  {
    id: 'vehicle-repairing',
    slug: 'vehicle-repairing',
    icon: '🔩',
    title: { en: 'Vehicle Repairing & Maintenance', hi: 'वाहन मरम्मत एवं रखरखाव' },
    shortDesc: {
      en: 'Complete repair, chassis alignment, hydraulic cylinder overhaul, and maintenance for agricultural trolleys and commercial transport.',
      hi: 'कृषि ट्रॉली और वाणिज्यिक वाहनों के लिए पूर्ण मरम्मत, चेसिस अलाइनमेंट, हाइड्रोलिक सिलेंडर ओवरहाल और रखरखाव।',
    },
    fullDesc: {
      en: 'Our workshop in Thelkadih, Rajnandgaon offers complete repair and maintenance services for agricultural and commercial transport equipment. From leaky hydraulic cylinders to cracked chassis and worn hub bearings, our experienced technicians restore your machinery to factory strength quickly and cost-effectively.',
      hi: 'ठेलकाडीह, राजनांदगांव में हमारी कार्यशाला कृषि और वाणिज्यिक परिवहन उपकरणों के लिए पूर्ण मरम्मत और रखरखाव सेवाएं प्रदान करती है। हाइड्रोलिक सिलेंडर रिसाव से लेकर क्रैक चेसिस और बेयरिंग तक, हमारे कुशल तकनीशियन आपकी मशीनरी को शीघ्र और किफायती दर पर दुरुस्त करते हैं।',
    },
    offerings: [
      { en: 'Hydraulic tipping cylinder overhaul, seal replacement, and pressure restoration', hi: 'हाइड्रोलिक टिपिंग सिलेंडर ओवरहाल, सील रिप्लेसमेंट और प्रेशर रिपेयर' },
      { en: 'Chassis straightening, reinforcement gusset welding, and crack repair', hi: 'चेसिस सीधा करना, सुदृढ़ीकरण वेल्डिंग और क्रैक मरम्मत' },
      { en: 'Hub, bearing, and axle shaft servicing and replacement', hi: 'हब, बेयरिंग और एक्सल शाफ्ट सर्विसिंग व रिप्लेसमेंट' },
      { en: 'Bed floor plate replacement and side sheet renewal', hi: 'बेड फ्लोर प्लेट बदलना और साइड शीट नवीनीकरण' },
      { en: 'Complete rust removal, structural restoration, and repainting', hi: 'जंग हटाना, संरचनात्मक सुधार और पुनः रंगाई' },
    ],
    process: [
      {
        step: 1,
        title: { en: 'Damage Assessment', hi: 'क्षति विश्लेषण' },
        desc: { en: 'Detailed structural and hydraulic evaluation to identify cracks, bends, and leaks.', hi: 'क्रैक, झुकाव और रिसाव की पहचान के लिए विस्तृत संरचनात्मक व हाइड्रोलिक जांच।' },
      },
      {
        step: 2,
        title: { en: 'Transparent Estimate', hi: 'पारदर्शी लागत अनुमान' },
        desc: { en: 'Clear consultation on parts replacement vs repair before initiating any work.', hi: 'कार्य शुरू करने से पहले पार्ट्स बदलने व मरम्मत पर स्पष्ट परामर्श।' },
      },
      {
        step: 3,
        title: { en: 'Dismantling & Mechanical Repair', hi: 'डिसमेंटलिंग एवं मरम्मत' },
        desc: { en: 'Hydraulic cylinder overhaul, axle realignment, and structural welding.', hi: 'हाइड्रोलिक सिलेंडर ओवरहाल, एक्सल अलाइनमेंट और संरचनात्मक वेल्डिंग।' },
      },
      {
        step: 4,
        title: { en: 'Pressure & Load Testing', hi: 'प्रेशर एवं लोड टेस्ट' },
        desc: { en: 'Testing under full hydraulic pressure to guarantee safety and leak-free lifting.', hi: 'सुरक्षा और रिसाव-मुक्त लिफ्टिंग सुनिश्चित करने के लिए पूर्ण प्रेशर टेस्ट।' },
      },
      {
        step: 5,
        title: { en: 'Final Inspection & Delivery', hi: 'अंतिम निरीक्षण एवं सुपुर्दगी' },
        desc: { en: 'Protective finishing and handover with operational maintenance guidance.', hi: 'फिनिशिंग टच और रखरखाव मार्गदर्शन के साथ सुरक्षित हैंडओवर।' },
      },
    ],
    benefits: [
      {
        title: { en: 'Fast Turnaround', hi: 'तेज़ सर्विस डिलीवरी' },
        desc: { en: 'We understand farming and transport deadlines, completing standard repairs swiftly.', hi: 'हम खेती और व्यापार की समयसीमा समझते हैं और कार्य तेजी से पूरा करते हैं।' },
      },
      {
        title: { en: 'Affordable Cost Savings', hi: 'किफायती लागत बचत' },
        desc: { en: 'Extends equipment lifespan by years at a fraction of the cost of new equipment.', hi: 'नए उपकरण की तुलना में बहुत कम लागत में वर्षों तक उपकरण का जीवन बढ़ाता है।' },
      },
      {
        title: { en: 'Genuine Heavy Materials', hi: 'असली टिकाऊ सामग्री' },
        desc: { en: 'Only high-grade steel plates and heavy-duty hydraulic seals are used.', hi: 'केवल उच्च श्रेणी की स्टील प्लेटें और भारी हाइड्रोलिक सील इस्तेमाल की जाती हैं।' },
      },
    ],
    applications: [
      { en: 'Farm tractor trolleys experiencing cylinder or hitch failure', hi: 'खेत की ट्रैक्टर ट्रॉली जिनके सिलेंडर या हिच में खराबी हो' },
      { en: 'Commercial trailers with bent chassis or cracked beds', hi: 'मुड़ी हुई चेसिस या क्रैक बेड वाले वाणिज्यिक ट्रेलर' },
      { en: 'Water tanker trailers with valve or tank leaks', hi: 'वाल्व या टैंक रिसाव वाले वाटर टैंकर ट्रेलर' },
      { en: 'Preventative pre-harvest machinery maintenance', hi: 'कटाई से पहले कृषि उपकरणों का निवारक रखरखाव' },
    ],
    relevantProducts: ['hydraulic-tractor-trolley', '4-wheel-hydraulic-trolley', '2-wheel-hydraulic-trolley', 'hydraulic-dumper'],
  },
  {
    id: 'welding-services',
    slug: 'welding-services',
    icon: '⚡',
    title: { en: 'Welding Services', hi: 'वेल्डिंग सेवाएं' },
    shortDesc: {
      en: 'High-strength ARC and MIG welding services for agricultural equipment, commercial chassis, and heavy metal fabrications.',
      hi: 'कृषि उपकरण, वाणिज्यिक चेसिस और भारी मेटल फेब्रिकेशन के लिए उच्च-शक्ति ARC और MIG वेल्डिंग सेवाएं।',
    },
    fullDesc: {
      en: 'Piyush Agro Industries provides certified, heavy-duty welding services for machinery, structural frames, and vehicles. Utilizing modern MIG and ARC welding equipment, our skilled welders achieve deep penetration welds with flawless structural strength, crucial for high-vibration agricultural and hauling equipment.',
      hi: 'पियूष एग्रो इंडस्ट्रीज मशीनरी, संरचनात्मक फ्रेम और वाहनों के लिए प्रमाणित, भारी-भरकम वेल्डिंग सेवाएं प्रदान करता है। आधुनिक MIG और ARC वेल्डिंग उपकरणों के साथ हमारे कुशल वेल्डर सटीक और मजबूत जोड़ तैयार करते हैं जो कृषि और परिवहन में टिकाऊ रहते हैं।',
    },
    offerings: [
      { en: 'High-strength MIG and multi-pass ARC structural welding', hi: 'उच्च-शक्ति MIG और मल्टी-पास ARC संरचनात्मक वेल्डिंग' },
      { en: 'Heavy-duty cross-member and joint reinforcement welding', hi: 'क्रॉस-मेंबर और जोड़ों के लिए सुदृढ़ीकरण वेल्डिंग' },
      { en: 'Wear plate, gusset, and high-stress bracket welding', hi: 'वेयर प्लेट, गसेट और हाई-स्ट्रेस ब्रैकेट वेल्डिंग' },
      { en: 'Agricultural implement frame repairs and tyne welding', hi: 'कृषि उपकरण फ्रेम मरम्मत और टाइन वेल्डिंग' },
      { en: 'Structural beam, channel, and angle joint fabrication', hi: 'संरचनात्मक बीम, चैनल और एंगल फेब्रिकेशन' },
    ],
    process: [
      {
        step: 1,
        title: { en: 'Joint Preparation & Beveling', hi: 'जोड़ की तैयारी व बेवलिंग' },
        desc: { en: 'Grinding and cleaning joint surfaces to remove rust, paint, and impurities for deep penetration.', hi: 'गहरी वेल्डिंग के लिए जंग, पेंट और अशुद्धियों को साफ करना।' },
      },
      {
        step: 2,
        title: { en: 'Clamping & Structural Alignment', hi: 'क्लैंपिंग एवं संरचनात्मक सीध' },
        desc: { en: 'Rigid fixture clamping ensuring zero distortion or warping during high-temperature welding.', hi: 'वेल्डिंग के दौरान संरचना को मुड़ने से बचाने के लिए मजबूत क्लैंपिंग।' },
      },
      {
        step: 3,
        title: { en: 'Multi-Pass Welding', hi: 'मल्टी-पास वेल्डिंग' },
        desc: { en: 'Root pass followed by filler passes with certified high-tensile welding electrodes.', hi: 'प्रमाणित उच्च-तन्यता वेल्डिंग इलेक्ट्रोड के साथ मजबूत वेल्डिंग।' },
      },
      {
        step: 4,
        title: { en: 'Slag Removal & Visual Quality Check', hi: 'स्लैग हटाना एवं गुणवत्ता जांच' },
        desc: { en: 'Thorough inspection for porosity, undercuts, and complete weld penetration.', hi: 'वेल्डिंग की संपूर्ण मजबूती और फिनिशिंग की विस्तृत जांच।' },
      },
      {
        step: 5,
        title: { en: 'Protective Primer Coating', hi: 'सुरक्षात्मक प्राइमर कोटिंग' },
        desc: { en: 'Immediate anti-rust priming over weld joints to seal against oxidation.', hi: 'जंग से बचाने के लिए वेल्ड जोड़ों पर तुरंत एंटी-रस्ट प्राइमर लगाना।' },
      },
    ],
    benefits: [
      {
        title: { en: 'Vibration-Resistant Strength', hi: 'वाइब्रेशन प्रतिरोधी मजबूती' },
        desc: { en: 'Joints that will not crack under heavy shock loads on unpaved village roads.', hi: 'कच्ची सड़कों पर भारी झटके लगने पर भी जोड़ कभी क्रैक नहीं होते।' },
      },
      {
        title: { en: 'Certified Craftsmanship', hi: 'अनुभवी कारीगरी' },
        desc: { en: 'Decades of metalworking expertise in Rajnandgaon fabrication workshops.', hi: 'राजनांदगांव फेब्रिकेशन कार्यशाला में दशकों का धातु निर्माण अनुभव।' },
      },
      {
        title: { en: 'On-Site & Workshop Support', hi: 'कार्यशाला व स्थल सहयोग' },
        desc: { en: 'Comprehensive facilities equipped with heavy power tools and welding gear.', hi: 'भारी बिजली उपकरणों और वेल्डिंग गियर से सुसज्जित संपूर्ण सुविधाएं।' },
      },
    ],
    applications: [
      { en: 'Tractor trolley frame building and restoration', hi: 'ट्रैक्टर ट्रॉली फ्रेम निर्माण और नवीनीकरण' },
      { en: 'Heavy industrial vehicle reinforcements', hi: 'भारी औद्योगिक वाहनों का सुदृढ़ीकरण' },
      { en: 'Agricultural cultivators and implements fabrication', hi: 'कृषि कल्टीवेटर और उपकरणों का निर्माण' },
      { en: 'Custom architectural gates and security barriers', hi: 'कस्टम गेट और सुरक्षात्मक बैरियर' },
    ],
    relevantProducts: ['cultivators', 'agri-equipment', 'steel-gates', 'railings'],
  },
  {
    id: 'vehicle-modification',
    slug: 'vehicle-modification',
    icon: '⚙️',
    title: { en: 'Vehicle Modification', hi: 'वाहन संशोधन एवं कस्टमाइजेशन' },
    shortDesc: {
      en: 'Specialized vehicle body modifications, height adjustments, side-wall extensions, and hydraulic conversions.',
      hi: 'विशेष वाहन बॉडी संशोधन, ऊंचाई समायोजन, साइड-दीवार विस्तार और हाइड्रोलिक रूपांतरण।',
    },
    fullDesc: {
      en: 'Need higher carrying capacity or hydraulic tipping capabilities on your existing trolley? Piyush Agro Industries specializes in customized vehicle modifications. We convert standard trolleys to tipping trailers, build custom side walls for light/high-volume produce like cotton or paddy husk, and reinforce chassis for extreme hauling requirements.',
      hi: 'क्या आपको अपनी मौजूदा ट्रॉली पर अधिक माल ले जाने की क्षमता या हाइड्रोलिक टिपिंग की आवश्यकता है? पियूष एग्रो इंडस्ट्रीज कस्टम वाहन संशोधनों में माहिर है। हम सामान्य ट्रॉली को टिपिंग ट्रेलर में बदलते हैं, भूसे या कपास के लिए ऊंची साइड-दीवारें बनाते हैं और चेसिस को मजबूत करते हैं।',
    },
    offerings: [
      { en: 'Standard trolley to hydraulic tipping trailer conversion', hi: 'साधारण ट्रॉली को हाइड्रोलिक टिपिंग ट्रेलर में बदलना' },
      { en: 'Side-wall height extensions and collapsible mesh cages for volumetric cargo', hi: 'ऊंचाई विस्तार और बंधने योग्य जालीदार पिंजरे' },
      { en: 'Low-bed modifications for easy equipment roll-on/roll-off', hi: 'उपकरणों को आसानी से चढ़ाने के लिए लो-बेड संशोधन' },
      { en: 'Heavy-duty hitch attachment and heavy drawbar installation', hi: 'मजबूत हिच अटैचमेंट और ड्रॉबार स्थापना' },
      { en: 'Tandem axle and dual-wheel capacity upgrades', hi: 'टैंडम एक्सल और डुअल-व्हील क्षमता अपग्रेड' },
    ],
    process: [
      {
        step: 1,
        title: { en: 'Usage Needs Analysis', hi: 'उपयोग आवश्यकता विश्लेषण' },
        desc: { en: 'Understanding the target commodity, volume requirements, and tractor horsepower.', hi: 'लक्षित सामग्री, आयतन आवश्यकता और ट्रैक्टर हॉर्सपावर को समझना।' },
      },
      {
        step: 2,
        title: { en: 'Engineering & Weight Balance', hi: 'इंजीनियरिंग एवं वजन संतुलन' },
        desc: { en: 'Calculating load center and structural reinforcements needed for modification.', hi: 'संशोधन के लिए आवश्यक लोड सेंटर और सुदृढ़ीकरण की गणना।' },
      },
      {
        step: 3,
        title: { en: 'Fabrication & Integration', hi: 'फेब्रिकेशन एवं संयोजन' },
        desc: { en: 'Cutting, adding extensions, installing hydraulic cylinders, and welding reinforcements.', hi: 'कटिंग, एक्सटेंशन जोड़ना, हाइड्रोलिक सिलेंडर लगाना और वेल्डिंग।' },
      },
      {
        step: 4,
        title: { en: 'Functional Testing', hi: 'कार्यात्मक परीक्षण' },
        desc: { en: 'Testing tipping angle, gate release mechanisms, and locking stability.', hi: 'टिपिंग कोण, गेट खोलने के तंत्र और लॉकिंग स्थिरता की जांच।' },
      },
      {
        step: 5,
        title: { en: 'Finishing & Handover', hi: 'फिनिशिंग एवं सुपुर्दगी' },
        desc: { en: 'Color matching with existing paintwork, anti-corrosive primer, and final delivery.', hi: 'मौजूदा रंग से मेल खाता पेंट, एंटी-रस्ट प्राइमर और डिलीवरी।' },
      },
    ],
    benefits: [
      {
        title: { en: 'Maximized Hauling Efficiency', hi: 'अधिकतम परिवहन दक्षता' },
        desc: { en: 'Carry more volume per trip, reducing fuel costs and travel time substantially.', hi: 'प्रति ट्रिप अधिक माल ले जाएं, जिससे डीजल और समय दोनों की बचत होती है।' },
      },
      {
        title: { en: 'Fraction of New Equipment Cost', hi: 'नए उपकरण की तुलना में भारी बचत' },
        desc: { en: 'Upgrade capabilities on existing machinery without investing in a full replacement.', hi: 'नई ट्रॉली खरीदे बिना मौजूदा मशीनरी को अपग्रेड करने का किफायती तरीका।' },
      },
      {
        title: { en: 'Engineered for Safety', hi: 'सुरक्षित संचालन' },
        desc: { en: 'Center of gravity calculations prevent overturning and dangerous tipping instability.', hi: 'सेंटर ऑफ ग्रेविटी संतुलन टिपिंग के दौरान पलटने के जोखिम को रोकता है।' },
      },
    ],
    applications: [
      { en: 'Bulky agricultural crops (cotton, paddy straw, sugarcane fodder)', hi: 'आयतन वाली कृषि फसलें (कपास, पुआल, गन्ना चारा)' },
      { en: 'Converting manual dump trailers to hydraulic operation', hi: 'मैन्युअल अनलोडिंग ट्रेलर को हाइड्रोलिक टिपिंग में बदलना' },
      { en: 'Low-bed transport for mini excavators, rollers, and farm implements', hi: 'मिनी एक्सकेवेटर और कृषि उपकरणों के लिए लो-बेड परिवहन' },
      { en: 'Industrial internal factory material moving', hi: 'कारखानों के भीतर सामग्री परिवहन' },
    ],
    relevantProducts: ['customize-low-bed-trailer', 'customize-low-bed-trolley', 'special-tractor-trolley', 'hydraulic-tractor-trailer'],
  },
  {
    id: 'custom-fabrication',
    slug: 'custom-fabrication',
    icon: '🔨',
    title: { en: 'Custom Metal Fabrication', hi: 'कस्टम फेब्रिकेशन' },
    shortDesc: {
      en: 'Architectural, commercial, and industrial custom steel fabrication including gates, railings, sheds, and special frames.',
      hi: 'वास्तुकला, वाणिज्यिक और औद्योगिक कस्टम स्टील फेब्रिकेशन जिसमें गेट, रेलिंग, शेड और विशेष फ्रेम शामिल हैं।',
    },
    fullDesc: {
      en: 'Beyond agricultural trailers, Piyush Agro Industries delivers premium custom metal fabrication in Rajnandgaon. We design and construct heavy steel gates, decorative and safety railings, structural steel sheds, generator bases, and custom hoppers tailored to exact architectural and industrial drawings.',
      hi: 'कृषि ट्रेलरों के अलावा, पियूष एग्रो इंडस्ट्रीज राजनांदगांव में प्रीमियम कस्टम मेटल फेब्रिकेशन प्रदान करता है। हम वास्तुशिल्प और औद्योगिक आवश्यकताओं के अनुसार मजबूत स्टील गेट, सुरक्षा रेलिंग, शेड स्ट्रक्चर, जनरेटर बेस और कस्टम हॉपर बनाते हैं।',
    },
    offerings: [
      { en: 'Heavy-duty commercial and residential steel entry gates', hi: 'मजबूत वाणिज्यिक और आवासीय स्टील प्रवेश द्वार' },
      { en: 'Decorative and protective MS and stainless-steel railings', hi: 'सजावटी और सुरक्षात्मक एमएस व स्टील रेलिंग' },
      { en: 'Mobile generator trolley bases and soundproof enclosures', hi: 'मोबाइल जनरेटर ट्रॉली बेस और सुरक्षा बाड़े' },
      { en: 'Industrial material handling carts and factory trolleys', hi: 'औद्योगिक मटेरियल हैंडलिंग कार्ट और कार्यशाला ट्रॉलियां' },
      { en: 'Structural shed frames, roof trusses, and customized brackets', hi: 'स्ट्रक्चरल शेड फ्रेम, रूफ ट्रस और कस्टम ब्रैकेट' },
    ],
    process: [
      {
        step: 1,
        title: { en: 'Design & Site Consultation', hi: 'डिज़ाइन एवं माप परामर्श' },
        desc: { en: 'Detailed review of site dimensions, architectural drawings, and load specs.', hi: 'साइट के माप, रेखाचित्र और भार विनिर्देशों की विस्तृत समीक्षा।' },
      },
      {
        step: 2,
        title: { en: 'Material Selection', hi: 'गुणवत्ता सामग्री चयन' },
        desc: { en: 'Selection of optimal steel gauges, pipes, solid bars, and sheets.', hi: 'उचित स्टील गेज, पाइप, ठोस छड़ और शीट का चयन।' },
      },
      {
        step: 3,
        title: { en: 'In-House Fabrication', hi: 'इन-हाउस सटीक निर्माण' },
        desc: { en: 'Precision shearing, bending, fitting, and clean weld joint assembly.', hi: 'सटीक कटिंग, बेंडिंग, फिटिंग और साफ-सुथरी वेल्डिंग।' },
      },
      {
        step: 4,
        title: { en: 'Finishing & Grinding', hi: 'ग्राइंडिंग एवं फिनिशिंग' },
        desc: { en: 'Seamless weld finishing, edge de-burring, and anti-corrosive undercoat.', hi: 'वेल्ड जोड़ों की स्मूथ ग्राइंडिंग और जंग-रोधी अंडरकोट।' },
      },
      {
        step: 5,
        title: { en: 'Delivery & Fitment Support', hi: 'डिलीवरी एवं फिटमेंट' },
        desc: { en: 'On-schedule transport and coordination for hassle-free installation.', hi: 'समय पर सुरक्षित परिवहन और आसान इंस्टॉलेशन में सहयोग।' },
      },
    ],
    benefits: [
      {
        title: { en: 'Precise Dimension Matching', hi: 'सटीक माप निर्माण' },
        desc: { en: 'Fabricated exactly to your specified measurements without tolerances issues.', hi: 'बिना किसी त्रुटि के आपके दिए गए सटीक माप पर निर्माण।' },
      },
      {
        title: { en: 'High Architectural Appeal', hi: 'आकर्षक और मजबूत' },
        desc: { en: 'Blends structural strength with clean, modern aesthetics.', hi: 'मजबूती के साथ आधुनिक सौंदर्य का बेहतरीन संतुलन।' },
      },
      {
        title: { en: 'Weather-Resistant Coating', hi: 'मौसम प्रतिरोधी कोटिंग' },
        desc: { en: 'Thorough primer treatment prevents monsoon rusting and wear.', hi: 'प्रीमियम प्राइमर बारिश और नमी से जंग लगने से बचाता है।' },
      },
    ],
    applications: [
      { en: 'Commercial warehouses, mills, and agro-processing facilities', hi: 'वाणिज्यिक गोदाम, राइस मिल और कृषि प्रसंस्करण केंद्र' },
      { en: 'Farm houses, residential villas, and campus boundary barriers', hi: 'फार्म हाउस, आवासीय परिसर और बाउंड्री गेट' },
      { en: 'Industrial genset mobile mounting and maintenance carts', hi: 'औद्योगिक जनरेटर माउंटिंग और वर्कशॉप कार्ट' },
      { en: 'Custom machinery frames and hoppers', hi: 'कस्टम मशीनरी फ्रेम और हॉपर' },
    ],
    relevantProducts: ['steel-gates', 'railings', 'generator-trolley', 'wheeled-cart', 'ugpu-trolley-4-wheel'],
  },
  {
    id: 'agricultural-equipment',
    slug: 'agricultural-equipment',
    icon: '🌾',
    title: { en: 'Agricultural Equipment Fabrication', hi: 'कृषि उपकरण निर्माण' },
    shortDesc: {
      en: 'Manufacturing and customization of cultivators, land preparation blades, agricultural implements, and tractor attachments.',
      hi: 'कल्टीवेटर, भूमि समतलीकरण ब्लेड, कृषि औजार और ट्रैक्टर अटैचमेंट का निर्माण व कस्टमाइजेशन।',
    },
    fullDesc: {
      en: 'Piyush Agro Industries manufactures rugged, high-performance agricultural implements designed specifically for the heavy soil conditions of Chhattisgarh and Central India. From multi-tyne spring-loaded cultivators to heavy levellers and custom hitches, our equipment helps farmers maximize crop yields with minimum tractor strain.',
      hi: 'पियूष एग्रो इंडस्ट्रीज छत्तीसगढ़ और मध्य भारत की मिट्टी की परिस्थितियों के लिए विशेष रूप से डिज़ाइन किए गए टिकाऊ, उच्च-प्रदर्शन वाले कृषि उपकरणों का निर्माण करता है। मल्टी-टाइन कल्टीवेटर से लेकर भारी समतलीकरण ब्लेड तक, हमारे उपकरण ट्रैक्टर पर कम दबाव डालते हुए पैदावार बढ़ाने में मदद करते हैं।',
    },
    offerings: [
      { en: 'Heavy-duty 7, 9, and 11-tyne cultivators with hardened steel points', hi: 'कठोर स्टील पॉइंट्स के साथ 7, 9 और 11 टाइन कल्टीवेटर' },
      { en: 'Spring-loaded and rigid tiller implements for rocky terrain', hi: 'पथरीली जमीन के लिए स्प्रिंग-लोडेड और मजबूत टिलर' },
      { en: 'Land levelers, bund formers, and soil preparation blades', hi: 'भूमि समतल करने वाले ब्लेड, मेड़ बनाने वाले उपकरण' },
      { en: 'Heavy 3-point linkage hitches and tow bar attachments', hi: 'मजबूत 3-पॉइंट लिंकेज हिच और टो बार अटैचमेंट' },
      { en: 'Custom agricultural accessories and implement replacements', hi: 'कस्टम कृषि सहायक उपकरण और पार्ट्स रिप्लेसमेंट' },
    ],
    process: [
      {
        step: 1,
        title: { en: 'Soil Type & Horsepower Assessment', hi: 'मिट्टी का प्रकार व हॉर्सपावर जांच' },
        desc: { en: 'Matching the implement size and weight with tractor HP and local soil hardness.', hi: 'ट्रैक्टर क्षमता और स्थानीय मिट्टी के अनुसार सही उपकरण का चयन।' },
      },
      {
        step: 2,
        title: { en: 'High-Tensile Steel Framing', hi: 'मजबूत स्टील फ्रेमिंग' },
        desc: { en: 'Welding heavy box-section frames designed to resist bending forces.', hi: 'झुकने और मुड़ने से बचाने के लिए भारी बॉक्स-सेक्शन फ्रेम का निर्माण।' },
      },
      {
        step: 3,
        title: { en: 'Tyne & Spring Mechanism Fitting', hi: 'टाइन व स्प्रिंग मैकेनिज्म फिटिंग' },
        desc: { en: 'Mounting wear-resistant tynes and heavy compression springs.', hi: 'घिसाव-रोधी टाइन और मजबूत स्प्रिंग की सटीक फिटिंग।' },
      },
      {
        step: 4,
        title: { en: 'Linkage Alignment & Balance Test', hi: 'लिंकेज अलाइनमेंट एवं संतुलन जांच' },
        desc: { en: 'Ensuring balanced center of pull for uniform furrow depth and low fuel burn.', hi: 'समान जुताई गहराई और कम डीजल खपत के लिए सही खिंचाव संतुलन।' },
      },
      {
        step: 5,
        title: { en: 'Corrosion-Resistant Coating', hi: 'जंग-रोधी पेंटिंग' },
        desc: { en: 'High-durability paint coat protecting against field mud and weather.', hi: 'कीचड़ और मौसम से बचाने वाला टिकाऊ पेंट कोट।' },
      },
    ],
    benefits: [
      {
        title: { en: 'Fuel Efficiency for Tractors', hi: 'डीजल की बचत' },
        desc: { en: 'Aerodynamically designed angles slice through dense soil with minimum tractor drag.', hi: 'सटीक कोण मिट्टी को आसानी से चीरते हैं जिससे ट्रैक्टर पर जोर कम पड़ता है।' },
      },
      {
        title: { en: 'Wear-Resistant Tynes', hi: 'घिसाव प्रतिरोधी टाइन' },
        desc: { en: 'Heat-treated points last multiple seasons without frequent sharpening or replacement.', hi: 'हीट-ट्रीटेड पॉइंट्स बिना जल्दी घिसे कई सीज़न तक काम करते हैं।' },
      },
      {
        title: { en: 'Local Service & Parts', hi: 'स्थानीय सेवा व पार्ट्स' },
        desc: { en: 'Readily available replacement tynes, springs, and pins directly from our workshop.', hi: 'हमारी वर्कशॉप से सीधे आसानी से उपलब्ध रिप्लेसमेंट पार्ट्स।' },
      },
    ],
    applications: [
      { en: 'Pre-monsoon deep ploughing and field aeration', hi: 'मानसून पूर्व गहरी जुताई और खेत की तैयारी' },
      { en: 'Weed eradication and clod breaking in paddy/soybean fields', hi: 'धान और सोयाबीन के खेतों में खरपतवार हटाना और ढेले तोड़ना' },
      { en: 'Seed bed preparation for rabi and kharif crops', hi: 'रबी और खरीफ फसलों के लिए बीज क्यारी तैयार करना' },
      { en: 'Post-harvest stubble management', hi: 'फसल कटाई के बाद खेत की सफाई' },
    ],
    relevantProducts: ['cultivators', 'agri-equipment', 'tractor-trolley', '2-ton-tractor-trailer'],
  },
];

export function findService(slugOrId: string): ServiceItem | undefined {
  if (!slugOrId) return undefined;
  const target = slugOrId.toLowerCase().trim();
  return SERVICES_LIST.find(
    (s) => s.slug.toLowerCase() === target || s.id.toLowerCase() === target
  );
}
