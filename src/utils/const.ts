const OVERSEAS_CITIES = [
  { city: '紐約', city_id: '1' },
  { city: '倫敦', city_id: '2' },
  { city: '巴黎', city_id: '3' },
  { city: '東京', city_id: '4' },
  { city: '柏林', city_id: '5' },
  { city: '羅馬', city_id: '6' },
  { city: '雪梨', city_id: '7' },
  { city: '馬德里', city_id: '8' },
  { city: '多倫多', city_id: '9' },
  { city: '莫斯科', city_id: '10' },
  { city: '洛杉磯', city_id: '11' },
  { city: '香港', city_id: '12' },
  { city: '新加坡', city_id: '13' },
  { city: '首爾', city_id: '14' },
  { city: '悉尼', city_id: '15' },
  { city: '阿姆斯特丹', city_id: '16' },
  { city: '布魯塞爾', city_id: '17' },
  { city: '華盛頓', city_id: '18' },
  { city: '馬尼拉', city_id: '19' },
  { city: '雅加達', city_id: '20' }
];

const OVERSEAS_DISTRICTS: {
  [key: string]: { dist: string; dist_id: string }[];
} = {
  '1': [
    // 紐約
    { dist: '曼哈頓', dist_id: '1' },
    { dist: '布魯克林', dist_id: '2' },
    { dist: '皇后區', dist_id: '3' },
    { dist: '布朗克斯', dist_id: '4' },
    { dist: '史泰登島', dist_id: '5' }
  ],
  '2': [
    // 倫敦
    { dist: '西敏市', dist_id: '1' },
    { dist: '肯辛頓', dist_id: '2' },
    { dist: '切爾西', dist_id: '3' },
    { dist: '倫敦橋', dist_id: '4' },
    { dist: '諾丁山', dist_id: '5' }
  ],
  '3': [
    // 巴黎
    { dist: '巴黎市', dist_id: '1' },
    { dist: '塞納河畔左岸', dist_id: '2' },
    { dist: '塞納河畔右岸', dist_id: '3' },
    { dist: '香榭麗舍', dist_id: '4' },
    { dist: '蒙馬特', dist_id: '5' }
  ],
  '4': [
    // 東京
    { dist: '新宿區', dist_id: '1' },
    { dist: '渋谷區', dist_id: '2' },
    { dist: '銀座區', dist_id: '3' },
    { dist: '池袋區', dist_id: '4' },
    { dist: '上野區', dist_id: '5' }
  ],
  '5': [
    // 柏林
    { dist: '米特區', dist_id: '1' },
    { dist: '克羅伊茨貝格', dist_id: '2' },
    { dist: '弗里德里希斯海恩', dist_id: '3' },
    { dist: '內克蘭茨', dist_id: '4' },
    { dist: '潘科', dist_id: '5' }
  ],
  '6': [
    // 羅馬
    { dist: '梵蒂岡', dist_id: '1' },
    { dist: '羅馬市', dist_id: '2' },
    { dist: '特拉斯提弗列', dist_id: '3' },
    { dist: '奧斯提恩斯', dist_id: '4' },
    { dist: '卡拉卡拉', dist_id: '5' }
  ],
  '7': [
    // 雪梨
    { dist: '悉尼市', dist_id: '1' },
    { dist: '悉尼港', dist_id: '2' },
    { dist: '悉尼中央商務區', dist_id: '3' },
    { dist: '悉尼機場', dist_id: '4' },
    { dist: '悉尼奧林匹克公園', dist_id: '5' }
  ],
  '8': [
    // 馬德里
    { dist: '馬德里市', dist_id: '1' },
    { dist: '索拉亞', dist_id: '2' },
    { dist: '薩拉曼卡', dist_id: '3' },
    { dist: '馬德里機場', dist_id: '4' },
    { dist: '普拉多博物館', dist_id: '5' }
  ],
  '9': [
    // 多倫多
    { dist: '多倫多市中心', dist_id: '1' },
    { dist: '多倫多港', dist_id: '2' },
    { dist: '多倫多島', dist_id: '3' },
    { dist: '多倫多機場', dist_id: '4' },
    { dist: '多倫多大學', dist_id: '5' }
  ],
  '10': [
    // 莫斯科
    { dist: '紅場', dist_id: '1' },
    { dist: '克里姆林宮', dist_id: '2' },
    { dist: '莫斯科地鐵', dist_id: '3' },
    { dist: '莫斯科國際機場', dist_id: '4' },
    { dist: '聖瓦西里大教堂', dist_id: '5' }
  ],
  '11': [
    // 洛杉磯
    { dist: '好萊塢', dist_id: '1' },
    { dist: '洛杉磯市中心', dist_id: '2' },
    { dist: '比佛利山莊', dist_id: '3' },
    { dist: '洛杉磯國際機場', dist_id: '4' },
    { dist: '聖塔莫尼卡', dist_id: '5' }
  ],
  '12': [
    // 香港
    { dist: '中環', dist_id: '1' },
    { dist: '尖沙咀', dist_id: '2' },
    { dist: '灣仔', dist_id: '3' },
    { dist: '香港國際機場', dist_id: '4' },
    { dist: '迪士尼樂園', dist_id: '5' }
  ],
  '13': [
    // 新加坡
    { dist: '濱海灣', dist_id: '1' },
    { dist: '烏節路', dist_id: '2' },
    { dist: '牛車水', dist_id: '3' },
    { dist: '新加坡機場', dist_id: '4' },
    { dist: '園區', dist_id: '5' }
  ],
  '14': [
    // 首爾
    { dist: '明洞', dist_id: '1' },
    { dist: '弘大', dist_id: '2' },
    { dist: '江南', dist_id: '3' },
    { dist: '仁川機場', dist_id: '4' },
    { dist: '首爾塔', dist_id: '5' }
  ],
  '15': [
    // 悉尼
    { dist: '悉尼市', dist_id: '1' },
    { dist: '悉尼港', dist_id: '2' },
    { dist: '悉尼中央商務區', dist_id: '3' },
    { dist: '悉尼機場', dist_id: '4' },
    { dist: '悉尼奧林匹克公園', dist_id: '5' }
  ],
  '16': [
    // 阿姆斯特丹
    { dist: '阿姆斯特丹市中心', dist_id: '1' },
    { dist: '紅燈區', dist_id: '2' },
    { dist: '安妮之家', dist_id: '3' },
    { dist: '阿姆斯特丹機場', dist_id: '4' },
    { dist: '茵德霍芬公園', dist_id: '5' }
  ],
  '17': [
    // 布魯塞爾
    { dist: '大廣場', dist_id: '1' },
    { dist: '歐洲區', dist_id: '2' },
    { dist: '皇家美術館', dist_id: '3' },
    { dist: '布魯塞爾機場', dist_id: '4' },
    { dist: '阿托姆館', dist_id: '5' }
  ],
  '18': [
    // 華盛頓
    { dist: '國會山', dist_id: '1' },
    { dist: '白宮', dist_id: '2' },
    { dist: '華盛頓紀念碑', dist_id: '3' },
    { dist: '華盛頓杜勒斯機場', dist_id: '4' },
    { dist: '史密森尼學會', dist_id: '5' }
  ],
  '19': [
    // 馬尼拉
    { dist: '馬尼拉市', dist_id: '1' },
    { dist: '馬卡蒂', dist_id: '2' },
    { dist: '帕賽', dist_id: '3' },
    { dist: '馬尼拉機場', dist_id: '4' },
    { dist: '馬尼拉灣', dist_id: '5' }
  ],
  '20': [
    // 雅加達
    { dist: '雅加達市', dist_id: '1' },
    { dist: '中央雅加達', dist_id: '2' },
    { dist: '南雅加達', dist_id: '3' },
    { dist: '雅加達機場', dist_id: '4' },
    { dist: '國家紀念館', dist_id: '5' }
  ]
};

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

const TAIWAN_DISTRICTS: {
  [key: string]: { dist: string; dist_id: string }[];
} = {
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

const DONATION_UNIT = [
  { unit: '台灣癌症基金會', unit_id: 1 },
  { unit: '台灣愛滋基金會', unit_id: 2 },
  { unit: '台灣兒童暨家庭扶助基金會', unit_id: 3 },
  { unit: '台灣動物保護協會', unit_id: 4 },
  { unit: '台灣紅十字會', unit_id: 5 },
  { unit: '台灣關懷之家', unit_id: 6 },
  { unit: '台灣弱勢兒童關懷協會', unit_id: 7 },
  { unit: '台灣老人福利協會', unit_id: 8 },
  { unit: '台灣身心障礙者協會', unit_id: 9 },
  { unit: '台灣環境保護協會', unit_id: 10 },
  { unit: '台灣國際救援協會', unit_id: 11 },
  { unit: '台灣社會福利聯合勸募協會', unit_id: 12 },
  { unit: '台灣愛心陪伴協會', unit_id: 13 },
  { unit: '台灣偏鄉教育協會', unit_id: 14 },
  { unit: '台灣自然保育協會', unit_id: 15 },
  { unit: '台灣婦女救援基金會', unit_id: 16 },
  { unit: '台灣青少年發展協會', unit_id: 17 },
  { unit: '台灣家庭扶助協會', unit_id: 18 },
  { unit: '台灣聾人協會', unit_id: 19 },
  { unit: '台灣視障者協會', unit_id: 20 }
];

export {
  TAIWAN_CITIES,
  TAIWAN_DISTRICTS,
  OVERSEAS_CITIES,
  OVERSEAS_DISTRICTS,
  DONATION_UNIT
};
