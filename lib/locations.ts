export interface Branch {
  id: number
  region: string
  region_ru: string
  region_en: string
  name: string
  address: string
  address_ru: string
  lat: number
  lng: number
  hours: string
  phone: string
}

// Company contacts: +998 55 500-22-55 | unex0102@gmail.com
export const companyContact = {
  phone: "+998 55 500-22-55",
  phone_raw: "+998552002255",
  email: "unex0102@gmail.com",
  hours: "Пн–Вс: 7:00 – 23:00",
  address_ru: "г. Ташкент, Узбекистан",
}

export const branches: Branch[] = [
  // Toshkent shahri (10 filial)
  { id: 1, region: "Toshkent shahri", region_ru: "г. Ташкент", region_en: "Tashkent city", name: "Unex — Chilonzor", address: "Chilonzor tumani, 1-mavze", address_ru: "Чиланзарский район, 1-квартал", lat: 41.2995, lng: 69.2401, hours: "09:00–18:00", phone: "+998 55 500-22-55" },
  { id: 2, region: "Toshkent shahri", region_ru: "г. Ташкент", region_en: "Tashkent city", name: "Unex — Yunusobod", address: "Yunusobod tumani, 19-mavze", address_ru: "Юнусабадский район, 19-квартал", lat: 41.3529, lng: 69.2862, hours: "09:00–18:00", phone: "+998 71 100 00 02" },
  { id: 3, region: "Toshkent shahri", region_ru: "г. Ташкент", region_en: "Tashkent city", name: "Unex — Mirobod", address: "Mirobod tumani, Amir Temur ko'chasi", address_ru: "Мирабадский район, ул. Амира Темура", lat: 41.3111, lng: 69.2875, hours: "09:00–19:00", phone: "+998 71 100 00 03" },
  { id: 4, region: "Toshkent shahri", region_ru: "г. Ташкент", region_en: "Tashkent city", name: "Unex — Shayxontohur", address: "Shayxontohur tumani, Beshyog'och bozori", address_ru: "Шайхантахурский район, Бешагач базар", lat: 41.3198, lng: 69.2644, hours: "09:00–18:00", phone: "+998 71 100 00 04" },
  { id: 5, region: "Toshkent shahri", region_ru: "г. Ташкент", region_en: "Tashkent city", name: "Unex — Sergeli", address: "Sergeli tumani, Yangi Sergeli ko'chasi", address_ru: "Сергелийский район, ул. Янги Сергели", lat: 41.2326, lng: 69.2132, hours: "09:00–18:00", phone: "+998 71 100 00 05" },
  { id: 6, region: "Toshkent shahri", region_ru: "г. Ташкент", region_en: "Tashkent city", name: "Unex — Uchtepa", address: "Uchtepa tumani, Ko'yluk bozori yaqini", address_ru: "Учтепинский район, рынок Куйлюк", lat: 41.2943, lng: 69.3245, hours: "09:00–18:00", phone: "+998 71 100 00 06" },
  { id: 7, region: "Toshkent shahri", region_ru: "г. Ташкент", region_en: "Tashkent city", name: "Unex — Yakkasaroy", address: "Yakkasaroy tumani, Bunyodkor yo'li", address_ru: "Яккасарайский район, Бунёдкор", lat: 41.3068, lng: 69.2756, hours: "09:00–18:00", phone: "+998 71 100 00 07" },
  { id: 8, region: "Toshkent shahri", region_ru: "г. Ташкент", region_en: "Tashkent city", name: "Unex — Olmazor", address: "Olmazor tumani, Sebzor ko'chasi", address_ru: "Алмазарский район, ул. Себзор", lat: 41.3421, lng: 69.2543, hours: "09:00–18:00", phone: "+998 71 100 00 08" },
  { id: 9, region: "Toshkent shahri", region_ru: "г. Ташкент", region_en: "Tashkent city", name: "Unex — Bektemir", address: "Bektemir tumani, Yangi hayot ko'chasi", address_ru: "Бектемирский район, ул. Янги Хаёт", lat: 41.2812, lng: 69.3512, hours: "09:00–18:00", phone: "+998 71 100 00 09" },
  { id: 10, region: "Toshkent shahri", region_ru: "г. Ташкент", region_en: "Tashkent city", name: "Unex — Airport", address: "Toshkent xalqaro aeroporti yaqini", address_ru: "Рядом с международным аэропортом", lat: 41.2579, lng: 69.2812, hours: "08:00–20:00", phone: "+998 71 100 00 10" },

  // Toshkent viloyati (5 filial)
  { id: 11, region: "Toshkent viloyati", region_ru: "Ташкентская область", region_en: "Tashkent region", name: "Unex — Angren", address: "Angren shahri, markaziy ko'cha", address_ru: "г. Ангрен, центральная улица", lat: 41.0167, lng: 70.1428, hours: "09:00–18:00", phone: "+998 70 200 01 11" },
  { id: 12, region: "Toshkent viloyati", region_ru: "Ташкентская область", region_en: "Tashkent region", name: "Unex — Olmaliq", address: "Olmaliq shahri, mustaqillik ko'chasi", address_ru: "г. Алмалык, ул. Мустакиллик", lat: 40.8497, lng: 69.5978, hours: "09:00–18:00", phone: "+998 70 200 01 12" },
  { id: 13, region: "Toshkent viloyati", region_ru: "Ташкентская область", region_en: "Tashkent region", name: "Unex — Chirchiq", address: "Chirchiq shahri, bozor yaqini", address_ru: "г. Чирчик, рядом с рынком", lat: 41.4686, lng: 69.5812, hours: "09:00–18:00", phone: "+998 70 200 01 13" },
  { id: 14, region: "Toshkent viloyati", region_ru: "Ташкентская область", region_en: "Tashkent region", name: "Unex — Bekobod", address: "Bekobod shahri, temir yo'l stansiyasi yaqini", address_ru: "г. Бекабад, ж/д станция", lat: 40.2207, lng: 69.2617, hours: "09:00–18:00", phone: "+998 70 200 01 14" },
  { id: 15, region: "Toshkent viloyati", region_ru: "Ташкентская область", region_en: "Tashkent region", name: "Unex — Nurafshon", address: "Nurafshon shahri, markaziy xiyobon", address_ru: "г. Нурафшон, центральный бульвар", lat: 41.5678, lng: 69.4012, hours: "09:00–18:00", phone: "+998 70 200 01 15" },

  // Samarqand viloyati (6 filial)
  { id: 16, region: "Samarqand viloyati", region_ru: "Самаркандская область", region_en: "Samarkand region", name: "Unex — Samarqand markaz", address: "Registon ko'chasi, 12-uy", address_ru: "ул. Регистон, д. 12", lat: 39.6542, lng: 66.9597, hours: "09:00–18:00", phone: "+998 66 300 02 16" },
  { id: 17, region: "Samarqand viloyati", region_ru: "Самаркандская область", region_en: "Samarkand region", name: "Unex — Samarqand logistika", address: "Sanoat yo'li, 45-uy", address_ru: "Промышленная дорога, 45", lat: 39.6200, lng: 66.9100, hours: "09:00–18:00", phone: "+998 66 300 02 17" },
  { id: 18, region: "Samarqand viloyati", region_ru: "Самаркандская область", region_en: "Samarkand region", name: "Unex — Kattaqo'rg'on", address: "Kattaqo'rg'on shahri, bosh ko'cha", address_ru: "г. Каттакурган, главная улица", lat: 39.9031, lng: 66.2589, hours: "09:00–18:00", phone: "+998 66 300 02 18" },
  { id: 19, region: "Samarqand viloyati", region_ru: "Самаркандская область", region_en: "Samarkand region", name: "Unex — Urgut", address: "Urgut tumani markaziy bozori", address_ru: "Центральный рынок Ургута", lat: 39.4018, lng: 67.2572, hours: "09:00–18:00", phone: "+998 66 300 02 19" },
  { id: 20, region: "Samarqand viloyati", region_ru: "Самаркандская область", region_en: "Samarkand region", name: "Unex — Jomboy", address: "Jomboy tumani, temir yo'l stansiyasi", address_ru: "Джомбайский район, ж/д станция", lat: 39.7942, lng: 67.0472, hours: "09:00–17:00", phone: "+998 66 300 02 20" },
  { id: 21, region: "Samarqand viloyati", region_ru: "Самаркандская область", region_en: "Samarkand region", name: "Unex — Ishtixon", address: "Ishtixon tumani, markaziy ko'cha", address_ru: "Иштихонский район, центральная ул.", lat: 39.9753, lng: 66.4781, hours: "09:00–17:00", phone: "+998 66 300 02 21" },

  // Farg'ona viloyati (6 filial)
  { id: 22, region: "Farg'ona viloyati", region_ru: "Ферганская область", region_en: "Fergana region", name: "Unex — Farg'ona markaz", address: "Farg'ona shahri, mustaqillik xiyoboni", address_ru: "г. Фергана, бул. Мустакиллик", lat: 40.3864, lng: 71.7864, hours: "09:00–18:00", phone: "+998 73 400 03 22" },
  { id: 23, region: "Farg'ona viloyati", region_ru: "Ферганская область", region_en: "Fergana region", name: "Unex — Marg'ilon", address: "Marg'ilon shahri, ipak yo'li bozori", address_ru: "г. Маргилан, Шелковый базар", lat: 40.4726, lng: 71.7246, hours: "09:00–18:00", phone: "+998 73 400 03 23" },
  { id: 24, region: "Farg'ona viloyati", region_ru: "Ферганская область", region_en: "Fergana region", name: "Unex — Qo'qon", address: "Qo'qon shahri, sanoat ko'chasi", address_ru: "г. Коканд, ул. Саноат", lat: 40.5286, lng: 70.9425, hours: "09:00–18:00", phone: "+998 73 400 03 24" },
  { id: 25, region: "Farg'ona viloyati", region_ru: "Ферганская область", region_en: "Fergana region", name: "Unex — Oltiariq", address: "Oltiariq tumani, bozor yaqini", address_ru: "Алтыарыкский район, рынок", lat: 40.3142, lng: 71.6178, hours: "09:00–17:00", phone: "+998 73 400 03 25" },
  { id: 26, region: "Farg'ona viloyati", region_ru: "Ферганская область", region_en: "Fergana region", name: "Unex — Rishton", address: "Rishton tumani, markaziy ko'cha", address_ru: "Риштанский район, центральная ул.", lat: 40.3542, lng: 71.2872, hours: "09:00–17:00", phone: "+998 73 400 03 26" },
  { id: 27, region: "Farg'ona viloyati", region_ru: "Ферганская область", region_en: "Fergana region", name: "Unex — Beshariq", address: "Beshariq tumani, avtobeket yaqini", address_ru: "Бешарыкский район, автовокзал", lat: 40.4312, lng: 71.1234, hours: "09:00–17:00", phone: "+998 73 400 03 27" },

  // Andijon viloyati (5 filial)
  { id: 28, region: "Andijon viloyati", region_ru: "Андижанская область", region_en: "Andijan region", name: "Unex — Andijon markaz", address: "Andijon shahri, Bobur xiyoboni", address_ru: "г. Андижан, бул. Бабура", lat: 40.7821, lng: 72.3442, hours: "09:00–18:00", phone: "+998 74 500 04 28" },
  { id: 29, region: "Andijon viloyati", region_ru: "Андижанская область", region_en: "Andijan region", name: "Unex — Asaka", address: "Asaka shahri, GM zavodi yaqini", address_ru: "г. Асака, рядом с заводом GM", lat: 40.6437, lng: 72.2317, hours: "09:00–18:00", phone: "+998 74 500 04 29" },
  { id: 30, region: "Andijon viloyati", region_ru: "Андижанская область", region_en: "Andijan region", name: "Unex — Xonobod", address: "Xonobod shahri, markaziy ko'cha", address_ru: "г. Хонобод, центральная улица", lat: 40.7923, lng: 72.3641, hours: "09:00–18:00", phone: "+998 74 500 04 30" },
  { id: 31, region: "Andijon viloyati", region_ru: "Андижанская область", region_en: "Andijan region", name: "Unex — Shahrixon", address: "Shahrixon tumani, bozor ko'chasi", address_ru: "Шахриханский район, ул. Базарная", lat: 40.7112, lng: 72.0543, hours: "09:00–17:00", phone: "+998 74 500 04 31" },
  { id: 32, region: "Andijon viloyati", region_ru: "Андижанская область", region_en: "Andijan region", name: "Unex — Paxtaobod", address: "Paxtaobod tumani, markaziy ko'cha", address_ru: "Пахтаабадский район, центр", lat: 40.5678, lng: 72.5432, hours: "09:00–17:00", phone: "+998 74 500 04 32" },

  // Namangan viloyati (5 filial)
  { id: 33, region: "Namangan viloyati", region_ru: "Наманганская область", region_en: "Namangan region", name: "Unex — Namangan markaz", address: "Namangan shahri, Uychi ko'chasi", address_ru: "г. Наманган, ул. Уйчи", lat: 41.0011, lng: 71.6719, hours: "09:00–18:00", phone: "+998 69 600 05 33" },
  { id: 34, region: "Namangan viloyati", region_ru: "Наманганская область", region_en: "Namangan region", name: "Unex — Namangan logistika", address: "Sanoat mintaqasi, 23-uy", address_ru: "Промзона, д. 23", lat: 40.9812, lng: 71.6312, hours: "09:00–18:00", phone: "+998 69 600 05 34" },
  { id: 35, region: "Namangan viloyati", region_ru: "Наманганская область", region_en: "Namangan region", name: "Unex — Chortoq", address: "Chortoq tumani, bozor ko'chasi", address_ru: "Чартакский район, базар", lat: 41.0912, lng: 71.8342, hours: "09:00–17:00", phone: "+998 69 600 05 35" },
  { id: 36, region: "Namangan viloyati", region_ru: "Наманганская область", region_en: "Namangan region", name: "Unex — Chust", address: "Chust shahri, temir yo'l yaqini", address_ru: "г. Чуст, рядом с ж/д", lat: 41.1278, lng: 71.2156, hours: "09:00–17:00", phone: "+998 69 600 05 36" },
  { id: 37, region: "Namangan viloyati", region_ru: "Наманганская область", region_en: "Namangan region", name: "Unex — Pop", address: "Pop tumani, markaziy ko'cha", address_ru: "Папский район, центральная ул.", lat: 40.8634, lng: 71.1023, hours: "09:00–17:00", phone: "+998 69 600 05 37" },

  // Buxoro viloyati (5 filial)
  { id: 38, region: "Buxoro viloyati", region_ru: "Бухарская область", region_en: "Bukhara region", name: "Unex — Buxoro markaz", address: "Buxoro shahri, Kalon ko'chasi", address_ru: "г. Бухара, ул. Калон", lat: 39.7747, lng: 64.4286, hours: "09:00–18:00", phone: "+998 65 700 06 38" },
  { id: 39, region: "Buxoro viloyati", region_ru: "Бухарская область", region_en: "Bukhara region", name: "Unex — Kogon", address: "Kogon shahri, stansiya yaqini", address_ru: "г. Каган, рядом со станцией", lat: 39.7242, lng: 64.5456, hours: "09:00–18:00", phone: "+998 65 700 06 39" },
  { id: 40, region: "Buxoro viloyati", region_ru: "Бухарская область", region_en: "Bukhara region", name: "Unex — G'ijduvon", address: "G'ijduvon tumani, markaziy ko'cha", address_ru: "Гиждуванский район, центр", lat: 40.1042, lng: 64.6931, hours: "09:00–17:00", phone: "+998 65 700 06 40" },
  { id: 41, region: "Buxoro viloyati", region_ru: "Бухарская область", region_en: "Bukhara region", name: "Unex — Shofirkon", address: "Shofirkon tumani, yo'l bo'yi", address_ru: "Шафиркан, придорожный", lat: 40.1232, lng: 64.2931, hours: "09:00–17:00", phone: "+998 65 700 06 41" },
  { id: 42, region: "Buxoro viloyati", region_ru: "Бухарская область", region_en: "Bukhara region", name: "Unex — Qorovulbozor", address: "Qorovulbozor tumani, bozor ko'chasi", address_ru: "Каравулбазарский район", lat: 39.4912, lng: 63.8534, hours: "09:00–17:00", phone: "+998 65 700 06 42" },

  // Qashqadaryo viloyati (5 filial)
  { id: 43, region: "Qashqadaryo viloyati", region_ru: "Кашкадарьинская область", region_en: "Kashkadarya region", name: "Unex — Qarshi markaz", address: "Qarshi shahri, Mustaqillik xiyoboni", address_ru: "г. Карши, бул. Мустакиллик", lat: 38.8602, lng: 65.7880, hours: "09:00–18:00", phone: "+998 75 800 07 43" },
  { id: 44, region: "Qashqadaryo viloyati", region_ru: "Кашкадарьинская область", region_en: "Kashkadarya region", name: "Unex — Shahrisabz", address: "Shahrisabz shahri, Amir Temur ko'chasi", address_ru: "г. Шахрисабз, ул. Амира Темура", lat: 39.0564, lng: 66.8356, hours: "09:00–18:00", phone: "+998 75 800 07 44" },
  { id: 45, region: "Qashqadaryo viloyati", region_ru: "Кашкадарьинская область", region_en: "Kashkadarya region", name: "Unex — Muborak", address: "Muborak shahri, sanoat ko'chasi", address_ru: "г. Мубарек, промышленная ул.", lat: 39.2712, lng: 65.1534, hours: "09:00–17:00", phone: "+998 75 800 07 45" },
  { id: 46, region: "Qashqadaryo viloyati", region_ru: "Кашкадарьинская область", region_en: "Kashkadarya region", name: "Unex — Kitob", address: "Kitob shahri, markaziy bozor", address_ru: "г. Китаб, центральный рынок", lat: 39.1328, lng: 66.8456, hours: "09:00–17:00", phone: "+998 75 800 07 46" },
  { id: 47, region: "Qashqadaryo viloyati", region_ru: "Кашкадарьинская область", region_en: "Kashkadarya region", name: "Unex — Chiroqchi", address: "Chiroqchi tumani, markaziy ko'cha", address_ru: "Чиракчинский район, центр", lat: 38.6312, lng: 66.5621, hours: "09:00–17:00", phone: "+998 75 800 07 47" },

  // Surxondaryo viloyati (4 filial)
  { id: 48, region: "Surxondaryo viloyati", region_ru: "Сурхандарьинская область", region_en: "Surkhandarya region", name: "Unex — Termiz markaz", address: "Termiz shahri, Al-Hakim at-Termiziy ko'chasi", address_ru: "г. Термез, ул. Аль-Хаким", lat: 37.2333, lng: 67.2833, hours: "09:00–18:00", phone: "+998 76 900 08 48" },
  { id: 49, region: "Surxondaryo viloyati", region_ru: "Сурхандарьинская область", region_en: "Surkhandarya region", name: "Unex — Denov", address: "Denov shahri, bozor ko'chasi", address_ru: "г. Денау, рынок", lat: 38.2712, lng: 67.8934, hours: "09:00–18:00", phone: "+998 76 900 08 49" },
  { id: 50, region: "Surxondaryo viloyati", region_ru: "Сурхандарьинская область", region_en: "Surkhandarya region", name: "Unex — Sho'rchi", address: "Sho'rchi tumani, yo'l bo'yi", address_ru: "Шурчинский район, придорожный", lat: 37.9612, lng: 67.6234, hours: "09:00–17:00", phone: "+998 76 900 08 50" },
  { id: 51, region: "Surxondaryo viloyati", region_ru: "Сурхандарьинская область", region_en: "Surkhandarya region", name: "Unex — Uzun", address: "Uzun tumani, markaziy ko'cha", address_ru: "Узунский район, центр", lat: 37.5812, lng: 67.6534, hours: "09:00–17:00", phone: "+998 76 900 08 51" },

  // Xorazm viloyati (4 filial)
  { id: 52, region: "Xorazm viloyati", region_ru: "Хорезмская область", region_en: "Khorezm region", name: "Unex — Urganch markaz", address: "Urganch shahri, Al-Xorazmiy ko'chasi", address_ru: "г. Ургенч, ул. Аль-Хорезми", lat: 41.5531, lng: 60.6349, hours: "09:00–18:00", phone: "+998 62 010 09 52" },
  { id: 53, region: "Xorazm viloyati", region_ru: "Хорезмская область", region_en: "Khorezm region", name: "Unex — Xiva", address: "Xiva shahri, ichon qal'a yaqini", address_ru: "г. Хива, рядом с Ичан-Кала", lat: 41.3777, lng: 60.3611, hours: "09:00–18:00", phone: "+998 62 010 09 53" },
  { id: 54, region: "Xorazm viloyati", region_ru: "Хорезмская область", region_en: "Khorezm region", name: "Unex — Hazorasp", address: "Hazorasp tumani, markaziy ko'cha", address_ru: "Хазараспский район, центр", lat: 41.3112, lng: 61.0734, hours: "09:00–17:00", phone: "+998 62 010 09 54" },
  { id: 55, region: "Xorazm viloyati", region_ru: "Хорезмская область", region_en: "Khorezm region", name: "Unex — Tuproqqal'a", address: "Tuproqqal'a tumani, yo'l bo'yi", address_ru: "Турткульский район, дорога", lat: 41.5312, lng: 60.9534, hours: "09:00–17:00", phone: "+998 62 010 09 55" },

  // Navoiy viloyati (3 filial)
  { id: 56, region: "Navoiy viloyati", region_ru: "Навоийская область", region_en: "Navoi region", name: "Unex — Navoiy markaz", address: "Navoiy shahri, Mustaqillik ko'chasi", address_ru: "г. Навои, ул. Мустакиллик", lat: 40.0961, lng: 65.3792, hours: "09:00–18:00", phone: "+998 79 011 10 56" },
  { id: 57, region: "Navoiy viloyati", region_ru: "Навоийская область", region_en: "Navoi region", name: "Unex — Zarafshon", address: "Zarafshon shahri, oltin bozori yaqini", address_ru: "г. Зарафшон, рядом с рынком", lat: 41.5797, lng: 64.2167, hours: "09:00–17:00", phone: "+998 79 011 10 57" },
  { id: 58, region: "Navoiy viloyati", region_ru: "Навоийская область", region_en: "Navoi region", name: "Unex — Nurota", address: "Nurota tumani, markaziy ko'cha", address_ru: "Нуратинский район, центр", lat: 40.5614, lng: 65.6823, hours: "09:00–17:00", phone: "+998 79 011 10 58" },

  // Jizzax viloyati (2 filial)
  { id: 59, region: "Jizzax viloyati", region_ru: "Джизакская область", region_en: "Jizzakh region", name: "Unex — Jizzax markaz", address: "Jizzax shahri, sharq bozori yaqini", address_ru: "г. Джизак, Шарк базар", lat: 40.1158, lng: 67.8422, hours: "09:00–18:00", phone: "+998 72 020 11 59" },
  { id: 60, region: "Jizzax viloyati", region_ru: "Джизакская область", region_en: "Jizzakh region", name: "Unex — G'allaorol", address: "G'allaorol tumani, markaziy ko'cha", address_ru: "Галлаоральский район, центр", lat: 40.3112, lng: 67.5823, hours: "09:00–17:00", phone: "+998 72 020 11 60" },
]

export const regions = [...new Set(branches.map((b) => b.region))]
export const regionsRu = [...new Set(branches.map((b) => b.region_ru))]
