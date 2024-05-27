const TAIWAN_CITIES = [
  { city: '台北市', city_id: '1' },
  { city: '新北市', city_id: '2' },
  { city: '桃園市', city_id: '3' },
  { city: '台中市', city_id: '4' },
  { city: '台南市', city_id: '5' },
  { city: '高雄市', city_id: '6' },
  { city: '基隆市', city_id: '7' },
  { city: '新竹市', city_id: '8' },
  { city: '新竹縣', city_id: '9' },
  { city: '苗栗縣', city_id: '10' },
  { city: '彰化縣', city_id: '11' },
  { city: '南投縣', city_id: '12' },
  { city: '雲林縣', city_id: '13' },
  { city: '嘉義市', city_id: '14' },
  { city: '嘉義縣', city_id: '15' },
  { city: '屏東縣', city_id: '16' },
  { city: '宜蘭縣', city_id: '17' },
  { city: '花蓮縣', city_id: '18' },
  { city: '台東縣', city_id: '19' },
  { city: '澎湖縣', city_id: '20' },
  { city: '金門縣', city_id: '21' },
  { city: '連江縣', city_id: '22' }
];

const TAIWAN_DISTRICTS = {
  '1': [
    // 台北市
    { dist: '中正區', dist_id: '1' },
    { dist: '大同區', dist_id: '2' },
    { dist: '中山區', dist_id: '3' },
    { dist: '松山區', dist_id: '4' },
    { dist: '大安區', dist_id: '5' }
  ],
  '2': [
    // 新北市
    { dist: '板橋區', dist_id: '1' },
    { dist: '三重區', dist_id: '2' },
    { dist: '中和區', dist_id: '3' },
    { dist: '永和區', dist_id: '4' },
    { dist: '新莊區', dist_id: '5' }
  ],
  '3': [
    // 桃園市
    { dist: '桃園區', dist_id: '1' },
    { dist: '中壢區', dist_id: '2' },
    { dist: '大溪區', dist_id: '3' },
    { dist: '楊梅區', dist_id: '4' },
    { dist: '蘆竹區', dist_id: '5' }
  ],
  '4': [
    // 台中市
    { dist: '北區', dist_id: '1' },
    { dist: '中區', dist_id: '2' },
    { dist: '南區', dist_id: '3' },
    { dist: '西區', dist_id: '4' },
    { dist: '東區', dist_id: '5' }
  ],
  '5': [
    // 台南市
    { dist: '中西區', dist_id: '1' },
    { dist: '東區', dist_id: '2' },
    { dist: '南區', dist_id: '3' },
    { dist: '北區', dist_id: '4' },
    { dist: '安平區', dist_id: '5' }
  ],
  '6': [
    // 高雄市
    { dist: '前金區', dist_id: '1' },
    { dist: '苓雅區', dist_id: '2' },
    { dist: '前鎮區', dist_id: '3' },
    { dist: '鹽埕區', dist_id: '4' },
    { dist: '鼓山區', dist_id: '5' }
  ],
  '7': [
    // 基隆市
    { dist: '仁愛區', dist_id: '1' },
    { dist: '信義區', dist_id: '2' },
    { dist: '中正區', dist_id: '3' },
    { dist: '中山區', dist_id: '4' },
    { dist: '安樂區', dist_id: '5' }
  ],
  '8': [
    // 新竹市
    { dist: '東區', dist_id: '1' },
    { dist: '北區', dist_id: '2' },
    { dist: '香山區', dist_id: '3' }
  ],
  '9': [
    // 新竹縣
    { dist: '竹北市', dist_id: '1' },
    { dist: '湖口鄉', dist_id: '2' },
    { dist: '新豐鄉', dist_id: '3' },
    { dist: '新埔鎮', dist_id: '4' },
    { dist: '關西鎮', dist_id: '5' }
  ],
  '10': [
    // 苗栗縣
    { dist: '苗栗市', dist_id: '1' },
    { dist: '頭份市', dist_id: '2' },
    { dist: '竹南鎮', dist_id: '3' },
    { dist: '後龍鎮', dist_id: '4' },
    { dist: '通霄鎮', dist_id: '5' }
  ],
  '11': [
    // 彰化縣
    { dist: '彰化市', dist_id: '1' },
    { dist: '員林市', dist_id: '2' },
    { dist: '和美鎮', dist_id: '3' },
    { dist: '鹿港鎮', dist_id: '4' },
    { dist: '溪湖鎮', dist_id: '5' }
  ],
  '12': [
    // 南投縣
    { dist: '南投市', dist_id: '1' },
    { dist: '草屯鎮', dist_id: '2' },
    { dist: '埔里鎮', dist_id: '3' },
    { dist: '竹山鎮', dist_id: '4' },
    { dist: '集集鎮', dist_id: '5' }
  ],
  '13': [
    // 雲林縣
    { dist: '斗六市', dist_id: '1' },
    { dist: '虎尾鎮', dist_id: '2' },
    { dist: '西螺鎮', dist_id: '3' },
    { dist: '北港鎮', dist_id: '4' },
    { dist: '斗南鎮', dist_id: '5' }
  ],
  '14': [
    // 嘉義市
    { dist: '東區', dist_id: '1' },
    { dist: '西區', dist_id: '2' }
  ],
  '15': [
    // 嘉義縣
    { dist: '朴子市', dist_id: '1' },
    { dist: '布袋鎮', dist_id: '2' },
    { dist: '大林鎮', dist_id: '3' },
    { dist: '民雄鄉', dist_id: '4' },
    { dist: '溪口鄉', dist_id: '5' }
  ],
  '16': [
    // 屏東縣
    { dist: '屏東市', dist_id: '1' },
    { dist: '潮州鎮', dist_id: '2' },
    { dist: '東港鎮', dist_id: '3' },
    { dist: '恆春鎮', dist_id: '4' },
    { dist: '萬丹鄉', dist_id: '5' }
  ],
  '17': [
    // 宜蘭縣
    { dist: '宜蘭市', dist_id: '1' },
    { dist: '羅東鎮', dist_id: '2' },
    { dist: '蘇澳鎮', dist_id: '3' },
    { dist: '頭城鎮', dist_id: '4' },
    { dist: '礁溪鄉', dist_id: '5' }
  ],
  '18': [
    // 花蓮縣
    { dist: '花蓮市', dist_id: '1' },
    { dist: '鳳林鎮', dist_id: '2' },
    { dist: '玉里鎮', dist_id: '3' },
    { dist: '新城鄉', dist_id: '4' },
    { dist: '吉安鄉', dist_id: '5' }
  ],
  '19': [
    // 台東縣
    { dist: '台東市', dist_id: '1' },
    { dist: '關山鎮', dist_id: '2' },
    { dist: '成功鎮', dist_id: '3' },
    { dist: '長濱鄉', dist_id: '4' },
    { dist: '太麻里鄉', dist_id: '5' }
  ],
  '20': [
    // 澎湖縣
    { dist: '馬公市', dist_id: '1' },
    { dist: '湖西鄉', dist_id: '2' },
    { dist: '白沙鄉', dist_id: '3' },
    { dist: '西嶼鄉', dist_id: '4' },
    { dist: '望安鄉', dist_id: '5' }
  ],
  '21': [
    // 金門縣
    { dist: '金城鎮', dist_id: '1' },
    { dist: '金湖鎮', dist_id: '2' },
    { dist: '金沙鎮', dist_id: '3' },
    { dist: '金寧鄉', dist_id: '4' },
    { dist: '烈嶼鄉', dist_id: '5' }
  ],
  '22': [
    // 連江縣
    { dist: '南竿鄉', dist_id: '1' },
    { dist: '北竿鄉', dist_id: '2' },
    { dist: '莒光鄉', dist_id: '3' },
    { dist: '東引鄉', dist_id: '4' }
  ]
};

export { TAIWAN_CITIES, TAIWAN_DISTRICTS };
