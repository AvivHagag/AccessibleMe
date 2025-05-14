export interface Review {
  id: string;
  placeName: string;
  placeType: string;
  overallRating: number;
  description: string;
  author: string;
  date: Date;
  accessibilityFeatures: {
    wheelchairAccess: boolean;
    disabledParking: boolean;
    clearSignage: boolean;
    audioSystems: boolean;
    adaptedServices: boolean;
    accessibleLocation: boolean;
  };
}

export type PlaceDetails = {
  id: string;
  name: string;
  address: string;
  types: string[];
  image: string | null;
  description?: string | null;
  accessibilityFeatures: {
    wheelchairAccess: boolean;
    disabledParking: boolean;
    clearSignage: boolean;
    audioSystems: boolean;
    adaptedServices: boolean;
    accessibleLocation: boolean;
  };
};

export interface Category {
  id: string;
  label: string;
}

export const TYPE_TRANSLATIONS: Record<string, string> = {
  accounting: "הנהלת חשבון",
  airport: "שדה תעופה",
  amusement_park: "פארק שעשועים",
  aquarium: "אקווריום",
  art_gallery: "גלריה לאמנות",
  atm: "כספומט",
  bakery: "מאפייה",
  bank: "בנק",
  bar: "בר",
  beauty_salon: "סלון יופי",
  bicycle_store: "חנות אופניים",
  book_store: "חנות ספרים",
  bowling_alley: "אולם באולינג",
  bus_station: "תחנת אוטובוס",
  cafe: "בית קפה",
  campground: "אתר קמפינג",
  car_dealer: "סוכנות רכב",
  car_rental: "השכרת רכב",
  car_repair: "מוסך",
  car_wash: "שטיפת רכב",
  casino: "קזינו",
  cemetery: "בית קברות",
  church: "כנסייה",
  city_hall: "עירייה",
  clothing_store: "חנות בגדים",
  convenience_store: "מכולת",
  courthouse: "בית משפט",
  dentist: "מרפאת שיניים",
  department_store: "חנות כלבו",
  doctor: "מרפאה/רופא",
  drugstore: "בית מרקחת",
  electrician: "חשמלאי",
  electronics_store: "חנות אלקטרוניקה",
  embassy: "שגרירות",
  fire_station: "תחנת כיבוי אש",
  florist: "חנות פרחים",
  funeral_home: "בית אבלים",
  furniture_store: "חנות רהיטים",
  gas_station: "תחנת דלק",
  gym: "מכון כושר",
  hair_care: "מספרה",
  hardware_store: "חנות כלי עבודה",
  hindu_temple: "מקדש הינדי",
  home_goods_store: "חנות מוצרי בית",
  hospital: "בית חולים",
  insurance_agency: "סוכנות ביטוח",
  jewelry_store: "חנות תכשיטים",
  laundry: "מכבסה",
  lawyer: "עורך דין",
  library: "ספרייה",
  light_rail_station: "תחנת רכבת קלה",
  liquor_store: "חנות אלכוהול",
  local_government_office: "משרד ממשלתי מקומי",
  locksmith: "מנעולן",
  lodging: "לינה",
  meal_delivery: "משלוחי אוכל",
  meal_takeaway: "אוכל לאיסוף",
  mosque: "מסגד",
  movie_rental: "השכרת סרטים",
  movie_theater: "קולנוע",
  moving_company: "חברת הובלות",
  museum: "מוזיאון",
  night_club: "מועדון לילה",
  painter: "צבעי",
  park: "פארק",
  parking: "חנייה",
  pet_store: "חנות חיות מחמד",
  pharmacy: "בית מרקחת",
  physiotherapist: "פיזיותרפיסט",
  plumber: "אינסטלטור",
  police: "משטרה",
  post_office: "דואר",
  primary_school: "בית ספר יסודי",
  real_estate_agency: 'סוכנות נדל"ן',
  restaurant: "מסעדה",
  roofing_contractor: "קבלן גגות",
  rv_park: "אתר קרוואנים",
  school: "בית ספר",
  secondary_school: "בית ספר תיכון",
  shoe_store: "חנות נעליים",
  shopping_mall: "קניון",
  spa: "ספא",
  stadium: "אצטדיון",
  storage: "מחסן",
  store: "חנות",
  subway_station: "תחנת רכבת תחתית",
  supermarket: "סופרמרקט",
  synagogue: "בית כנסת",
  taxi_stand: "תחנת מוניות",
  tourist_attraction: "אטרקציה תיירותית",
  train_station: "תחנת רכבת",
  transit_station: "תחנת מעבר",
  travel_agency: "סוכנות נסיעות",
  university: "אוניברסיטה",
  veterinary_care: "וטרינריה/קליניקה וטרינרית",
  zoo: "גן חיות",
  establishment: "מקום",
  point_of_interest: "אטרקציה",
  food: "אוכל",
};
