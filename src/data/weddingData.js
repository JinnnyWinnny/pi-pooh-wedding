// ✏️ 여기만 수정하면 청첩장 내용이 바뀝니다
import { assetUrl } from "../utils/assetUrl";

const us = (file) => assetUrl(`us/${file}`);
const mem = (file) => assetUrl(`mem/${file}`);

export const weddingData = {
  heroImage: us("IMG_2877.jpg"),
  couple: {
    groom: {
      name: "박석준",
      englishName: "Jun Park",
      shortName: "석준",
      father: "박종철",
      mother: "김묘진",
      relation: "아들",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
      bio: "1997년 02월 15일",
      subbio:
        "샌디에고에서 새로운 꿈을 키우며, 늘 한결같은 마음으로 사랑을 지켜온 사람입니다.",
      tags: ["ENFP", "인간 골댕이"],
    },
    bride: {
      name: "이지은",
      englishName: "Jenny Lee",
      shortName: "지은",
      father: "이상록",
      mother: "명주현",
      relation: "딸",
      photo:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
      bio: "1997년 02월 19일",
      subbio: "호기심을 잃지 않고 꾸준히 배우며 성장하는 사람",
      tags: ["ISTJ", "테니스"],
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
  message: `함께하는 시간 속에서
서로에게 배우고,
서로를 이해하며,
조금씩 더 나은 사람이 되어갈 수 있었습니다.

앞으로도 서로를 존중하고 배려하며,
감사와 겸손을 잃지 않는 부부로 살아가고자 합니다.

소중한 분들을 모시고
저희의 약속을 나누고자 하오니,
귀한 걸음으로 함께해 주시면 감사하겠습니다.`,
  gallery: [
    { src: us("IMG_2376.jpg") },
    { src: us("IMG_2383.JPG") },
    { src: us("IMG_2647.jpg") },
    { src: us("IMG_2876.jpg") },
    { src: us("IMG_2877.jpg") },
    { src: us("IMG_2879.jpg") },
    { src: us("IMG_2880.jpg") },
    { src: us("IMG_2885.jpg") },
    { src: us("IMG_2890.jpg") },
    { src: us("IMG_2917.jpg") },
    { src: us("IMG_2918.jpg") },
    { src: us("IMG_3177.jpg") },
  ],
  accounts: {
    title: "마음 전하실곳",
    message:
      "참석이 어려우신 분들을 위해 계좌번호를 기재하였습니다. 너그러운 마음으로 양해 부탁드립니다.",
    groom: {
      label: "신랑측",
      items: [
        {
          bank: "국민은행",
          number: "123-456-789012",
          holder: "박석준",
        },
        {
          bank: "국민은행",
          number: "123-456-789013",
          holder: "박종철",
        },
      ],
    },
    bride: {
      label: "신부측",
      items: [
        {
          bank: "신한은행",
          number: "110-123-456789",
          holder: "이지은",
        },
        {
          bank: "신한은행",
          number: "110-123-456790",
          holder: "이상록",
        },
      ],
    },
  },
  dogs: {
    names: "Pi & Pooh",
    namesKo: "파이 & 푸",
    breed: "보더콜리",
    tagline: "우리 집의 보물들",
    profiles: [
      {
        name: "Pi",
        nameKo: "파이",
        src: assetUrl("dogs/main_pi.jpg"),
        desc: "동생 지키기 담당",
      },
      {
        name: "Pooh",
        nameKo: "푸",
        src: assetUrl("dogs/pooh_main.jpg"),
        desc: "동생 담당",
      },
    ],
  },
  memories: {
    title: "만남에서 사랑으로",
    subtitle: "우리를 만든 순간들",
    coverImage: us("IMG_2876.jpg"),
    moments: [
      {
        year: 2021,
        title: "처음 데이트 장소",
        body: "같이 한 첫번째 식사",
        image: mem("firstdate.jpg"),
      },
      {
        year: 2022,
        title: "대학교",
        lines: ["같이 학교에서 보낸 30번의 밤"],
        images: [
          mem("school3.jpg"),
          mem("school2.jpg"),

          mem("library.jpg"),
          mem("school.jpg"),
        ],
      },
      {
        year: 2022,
        title: "새 가족",
        lines: ["가족이 둘에서 셋으로. 파이야 환영해!"],
        images: [
          mem("pi4.jpg"),
          mem("pi2.jpg"),
          mem("pi1.jpg"),
          mem("pi3.jpg"),
        ],
      },

      {
        year: 2022,
        title: "대학 졸업",
        lines: ["석준이의 서포트로 무사히 지은이 졸업"],
        image: mem("graduation.jpg"),
      },
      {
        year: 2022,
        title: "크리스마스",
        lines: ["같이 보낸 4번의 크리스마스"],
        image: mem("christmas.jpg"),
      },
      {
        year: 2023,
        title: "새 차",
        lines: ["공동명의 첫번째 새 차"],
        image: mem("new car.jpg"),
      },

      {
        year: 2023,
        title: "여행",
        lines: ["같이 간 150번의 여행"],
        images: [mem("trip1.jpg"), mem("trip2.jpg"), mem("trip3.jpg")],
      },
      {
        year: 2023,
        title: "새가족",
        lines: ["가족이 셋에서 넷으로. 푸야 환영해!"],
        images: [mem("pooh1.jpg"), mem("pooh2.jpg"), mem("pooh3.jpg")],
      },
      {
        year: 2023,
        title: "네가족",
        lines: ["우리가족"],
        // cover: mem("main.jpg"),
        images: [
          mem("four2.jpg"),
          mem("four1.jpg"),
          mem("four3.jpg"),
          mem("main.jpg"),
        ],
      },
      {
        year: 2024,
        title: "혼인신고",
        lines: ["July, 13th 2024"],
        image: mem("mrg.jpg"),
      },
    ],
  },
  interview: [
    {
      interviewer: "Pi",
      question: "형, 누나 처음 만났을 때 제일 기억나는 게 뭐야?",
      groomAnswer: "샌디에고에서 처음 만났는데, 웃는 모습이 아직도 선명해요.",
      brideAnswer: "안경에 학교 후드티,, 너드중의 너드 (이상형)",
    },
    {
      interviewer: "Pooh",
      question: "결혼을 결심하게 된 계기가 뭐야?",
      groomAnswer:
        "함께 있는 일상이 너무 자연스럽고, 이 사람과 앞으로도 같이 가고 싶다는 확신이 들었어요.",
      brideAnswer:
        "배려가 몸에 밴 사람이라 궂은 일도 먼저 맡아 하고, 니일 내일 가릴 것 없이 생색도 내지 않고 바라는 것도 없는 모습",
    },
    {
      interviewer: "Pi",
      question: "서로한테 고마운 점 한 가지만 말해줘!",
      groomAnswer:
        "항상 제 이야기를 끝까지 들어주고, 작은 것도 기억해 준다는 거요.",
      brideAnswer:
        "EVERYTHING, 긍정적으로 뭐든 잘 될거고 할수 있다고 말해주는 마음",
    },
    {
      interviewer: "Pooh",
      question: "둘이서 가장 좋아하는 시간은 언제야?",
      groomAnswer:
        "저녁에 같이 산책할 때요. 말 없이 걸어도 편한 게 제일 좋아요.",
      brideAnswer: "파이 푸랑 가는 Dog Beach & Road Trip! ",
    },
    {
      interviewer: "Pi",
      question: "결혼하고 나면 뭐가 제일 기대돼?",
      groomAnswer: "매일 아침 같이 커피 마시고, 가족으로서의 일상을 쌓는 거요.",
      brideAnswer: "롱디 끝내고 다같이 미국에서 시작하는 일상",
    },
    {
      interviewer: "Pooh",
      question: "마지막으로 하객분들께 한마디!",
      groomAnswer: "바쁘신데도 와 주셔서 정말 감사합니다.",
      brideAnswer:
        "귀중한 시간 내어 와주셔서 감사합니다. 늘 겸손힌 마음으로 베풀고 도우며 사는 부부가 되겠습니다 :)",
    },
  ],
};
