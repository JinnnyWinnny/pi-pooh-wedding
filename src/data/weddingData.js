// ✏️ 여기만 수정하면 청첩장 내용이 바뀝니다
export const weddingData = {
  couple: {
    groom: {
      name: "박석준",
      shortName: "석준",
      father: "박종철",
      mother: "김묘진",
      relation: "아들",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
      bio: "샌디에고에서 새로운 꿈을 키우며, 늘 한결같은 마음으로 사랑을 지켜온 사람입니다.",
    },
    bride: {
      name: "이지은",
      shortName: "지은",
      father: "이상록",
      mother: "명주현",
      relation: "딸",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
      bio: "따뜻한 미소로 일상을 밝히고, 함께 걸어온 길마다 진심을 담아온 사람입니다.",
    },
  },
  date: {
    year: 2026,
    month: 9,
    day: 13,
    weekday: "일",
    time: "오후 3시",
    hour: 15,
    minute: 0,
    lunar: "음력 8월 2일",
  },
  venue: {
    name: "라포레홀",
    hall: "더파티움 안양 7층",
    address: "서울특별시 강남구 테헤란로 123",
    tel: "02-1234-5678",
    mapUrl: "https://map.kakao.com",
    naverMapUrl: "https://map.naver.com",
  },
  message: `Home is wherever I'm with you.
함께라서 더 나은 사람이 되어갑니다.

바쁘시겠지만 귀한 걸음 하시어
저희의 새로운 출발을
축복해 주시면 감사하겠습니다.`,
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      caption: "첫 만남, 샌디에고",
    },
    {
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
      caption: "함께한 하늘길",
    },
    {
      src: "https://images.unsplash.com/photo-1465495976277-4387d47b8925?w=800&q=80",
      caption: "서울에서의 약속",
    },
    {
      src: "https://images.unsplash.com/photo-1520854221256-17451ed9affb?w=800&q=80",
      caption: "우리의 오늘",
    },
  ],
  accounts: [
    {
      label: "신랑",
      bank: "국민은행",
      number: "123-456-789012",
      holder: "박석준",
    },
    {
      label: "신부",
      bank: "신한은행",
      number: "110-123-456789",
      holder: "이지은",
    },
  ],
  dogs: {
    names: "Pi & Pooh",
    namesKo: "파이 & 푸",
    breed: "보더콜리",
    tagline: "우리 가족의 첫 번째 안내견",
    profiles: [
      {
        name: "Pi",
        nameKo: "파이",
        src: "/dogs/main_pi.jpg",
        desc: "길 안내 담당",
      },
      {
        name: "Pooh",
        nameKo: "푸",
        src: "/dogs/pooh_main.jpg",
        desc: "분위기 담당",
      },
    ],
  },
};
