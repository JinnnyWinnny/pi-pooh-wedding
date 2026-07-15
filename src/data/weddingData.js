// ✏️ 여기만 수정하면 청첩장 내용이 바뀝니다
import { assetUrl } from "../utils/assetUrl";

const us = (file) => assetUrl(`us/${file}`);
const mem = (file) => assetUrl(`mem/${file}`);

// public/us 폴더 사진 — 파일명 숫자·가나다 순
const galleryFiles = [
  "1.jpg",
  "2.jpg",
  "2.5.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "i.jpg",
  "ii.jpg",
  "IMG_2879.jpg",
  "IMG_2890.jpg",
  "IMG_3177.jpg",
  "IMG_4146.JPG",
  "IMG_4147.JPG",
  "IMG_4148.JPG",
  "IMG_4149.JPG",
  "IMG_4151.JPG",
  "IMG_4152.JPG",
  "IMG_4153.JPG",
  "IMG_4154.JPG",
  "j.jpg",
  "jj9.jpg",
  "jj11.jpg",
  "jj12.jpg",
  "k.jpg",
  "k1.jpg",
  "k2.jpg",
  "KakaoTalk_20260714_130949910_01.jpg",
  "KakaoTalk_20260714_130949910_02.jpg",
  "KakaoTalk_20260714_130949910_03.jpg",
  "KakaoTalk_20260714_130949910_07.jpg",
  "KakaoTalk_20260714_130949910_09.jpg",
  "KakaoTalk_20260714_130949910_10.jpg",
  "KakaoTalk_20260714_130949910_11.jpg",
  "KakaoTalk_20260714_130949910_13.jpg",
  "KakaoTalk_20260714_130949910_14.jpg",
  "KakaoTalk_20260714_130949910_18.jpg",
  "KakaoTalk_20260714_152810311.jpg",
  "q.jpg",
  "z.jpg",
];

export const weddingData = {
  heroImage: us("3.jpg"),
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
      subbio: "언제나 긍정적인 에너지로 우리 가족을 웃게 만드는 사람",
      tags: ["ENFP", "인간 골댕이", "축구", "테니스"],
    },
    bride: {
      name: "이지은",
      englishName: "Jenny Lee",
      shortName: "지은",
      father: "이상록",
      mother: "명주현",
      relation: "딸",
      photo: mem("jenny_baby.jpg"),
      bio: "1997년 02월 19일",
      subbio: "",
      tags: ["ISTJ", "테니스", "영화", "운동"],
    },
  },
  // About Us — 같이 찍은 사진 + 서로가 본 태그
  aboutUs: {
    photo: us("j.jpg"),
    sees: [
      {
        from: "지은",
        of: "석준",
        tags: ["배려", "긍정", "든든", "인간골댕이", "지은밖에 모름"],
      },
      {
        from: "석준",
        of: "지은",
        tags: ["이쁨", "멋짐", "사랑", "테니스여신", "내옆에 없으면 안됨"],
      },
    ],
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
    hall: "안양 더파티움 7층",
    address: "경기도 안양시 동안구 시민대로 311 금강스마트빌딩",
    mapUrl: "https://place.map.kakao.com/138147430",
    naverMapUrl: "https://naver.me/IFgdHqLz",
    // 카카오맵 정적 미리보기 좌표 (WCONGNAMUL)
    mapPreview: { x: 491920, y: 1082045, scale: 2.5 },
    parking: [
      {
        label: "제 1주차장",
        name: "본 건물 지하주차장",
        address: "안양시 동안구 시민대로 311",
      },
      {
        label: "제 2주차장",
        name: "지아이에스 (구 네온테크) 지하주차장",
        address: "안양시 동안구 부림로 146",
      },
      {
        label: "제 3주차장",
        name: "이마트 평촌점",
        address: "안양시 동안구 시민대로 300",
      },
      {
        label: "제 4주차장",
        name: "평촌칼라힐 주차빌딩 (2층이상)",
        address: "안양시 동안구 시민대로 312",
      },
    ],
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
  gallery: galleryFiles.map((file) => ({ src: us(file) })),
  accounts: {
    title: "마음 전하실곳",
    message:
      "참석이 어려우신 분들을 위해 계좌번호를 기재하였습니다. 너그러운 마음으로 양해 부탁드립니다.",
    groom: {
      label: "신랑측",
      items: [
        {
          bank: "국민은행",
          number: "35880204359124",
          holder: "박석준",
        },
        {
          bank: "국민은행",
          number: "60310101280292",
          holder: "박종철",
        },
        {
          bank: "국민은행",
          number: "47452501036446",
          holder: "김묘진",
        },
      ],
    },
    bride: {
      label: "신부측",
      items: [
        {
          bank: "카카오뱅크",
          number: "3333326953920",
          holder: "이지은",
        },
        {
          bank: "하나은행",
          number: "71381038084307",
          holder: "이상록",
        },
        {
          bank: "전북은행",
          number: "1021011686567",
          holder: "명주현",
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
  interview: [
    {
      interviewer: "Pi",
      question: "형, 누나 처음 만났을 때 제일 기억나는 게 뭐야?",
      groomAnswer: "세련되고 예쁜 똑부러지는 꼬북이 (반함)",
      brideAnswer: "안경에 학교 후드티,, 너드중의 너드 (이상형)",
    },
    {
      interviewer: "Pooh",
      question: "결혼을 결심하게 된 계기가 뭐야?",
      groomAnswer:
        "혼자 야무지게 궂은 일을 해내는 모습을 보면서, 대신 궂은 일을 다 해주고 싶다는 생각이 들었어",
      brideAnswer:
        "아침잠이 많고 잠귀가 밝은 나를 위해서 화장실도 멀리 있는걸 쓰고 살금살금 문도 조용히 닫고, 이사람이다 싶었지",
    },
    {
      interviewer: "Pi",
      question: "서로한테 고마운 점 한 가지만 말해줘!",
      groomAnswer: "EVERYTHING, 못나고 부족해도 나를 믿어주는 마음",
      brideAnswer:
        "EVERYTHING, 긍정적으로 뭐든 잘 될거고 할수 있다고 말해주는 마음",
    },
    {
      interviewer: "Pooh",
      question: "둘이서 가장 좋아하는 시간은 언제야?",
      groomAnswer:
        "파이 푸가 행복하게 뛰는 모습을 보면서 같이 공원에서 산책하고 공놀이 할 때",
      brideAnswer: "파이 푸랑 공원에서 공놀이와 Dog beach! ",
    },
    {
      interviewer: "Pi",
      question: "결혼하고 나면 뭐가 제일 기대돼?",
      groomAnswer: "특별한 날을 기다리지 않아도 같이 보내는 매일매일",
      brideAnswer: "롱디 끝내고 다같이 미국에서 시작하는 일상",
    },
    {
      interviewer: "Pooh",
      question: "마지막으로 하객분들께 한마디!",
      groomAnswer:
        "소중한 시간 저희에게 할애해주셔서 감사합니다. 감사하고 베풀며 언제나 겸손한 부부가 되겠습니다 :)",
      brideAnswer:
        "귀중한 시간 내어 와주셔서 감사합니다. 늘 겸손한 마음으로 베풀고 도우며 사는 부부가 되겠습니다 :)",
    },
  ],
};
