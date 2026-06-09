const benefitData = {
  "전국": [
    ["🎓 청년정책", "청년 월세지원, 청년도약계좌, 국민취업지원제도"],
    ["🏠 주거지원", "주거급여, 전세자금대출, 신혼부부 주거지원"],
    ["👶 출산·육아", "부모급여, 아동수당, 첫만남 이용권"],
    ["💼 취업지원", "국민취업지원제도, 내일배움카드"],
    ["👵 노인복지", "기초연금, 노인일자리 사업"],
    ["🚜 농어촌 지원", "귀농귀촌 지원, 청년농업인 지원"]
    ["🚗 자동차 지원", "전기차 보조금, 조기폐차 지원금, 자동차세 감면"]
  ],

  "서울": [
    ["🎓 서울 청년정책", "서울 청년수당, 청년월세지원"],
    ["🏠 서울 주거지원", "신혼부부 임차보증금 지원"]
  ],

  "부산": [
    ["🎓 부산 청년정책", "부산 청년 디딤돌카드"],
    ["🏠 부산 주거지원", "부산형 전세자금 지원"]
  ],

  "경기": [
  ["🎓 경기 청년정책", "청년기본소득, 청년면접수당"],
  ["🏠 경기 주거지원", "청년 전월세보증금 대출"],
  ["💼 경기 취업지원", "경기도일자리재단 취업지원"]
  ],

"광주": [
  ["🎓 광주 청년정책", "광주 청년드림수당"],
  ["🏠 광주 주거지원", "청년 월세 특별지원"],
  ["💼 광주 취업지원", "청년 취업성공패키지"]
],

"인천": [
  ["🎓 인천 청년정책", "청년 월세지원, 드림체크카드"],
  ["🏠 인천 주거지원", "전세보증금 지원"]
],

"대구": [
  ["🎓 대구 청년정책", "청년희망적금 지원"],
  ["💼 대구 취업지원", "청년 구직활동 지원"]
],

"대전": [
  ["🎓 대전 청년정책", "청년 주거비 지원"],
  ["🏠 대전 주거지원", "신혼부부 전세자금 지원"]
],

"울산": [
  ["💼 울산 취업지원", "청년 취업성공패키지"]
],

"강원": [
  ["🌾 강원 농어촌지원", "귀농귀촌 지원"]
],

"충북": [
  ["💼 충북 취업지원", "청년 취업지원 사업"]
],

"충남": [
  ["🏠 충남 주거지원", "청년 주거급여"]
],

"전북": [
  ["🎓 전북 청년정책", "청년수당"]
],

"전남": [
  ["🌾 전남 농어촌지원", "귀농 지원"]
],

"경북": [
  ["💼 경북 취업지원", "청년 취업 지원"]
],

"경남": [
  ["🏠 경남 주거지원", "신혼부부 주거지원"]
],

"제주": [
  ["✈️ 제주 청년정책", "청년 정착 지원금"]
]
};

const benefitLinks = {
  "청년정책": "https://www.gov.kr/portal/service/serviceInfo",
  "주거지원": "https://www.gov.kr/portal/main",
  "출산·육아": "https://www.gov.kr/portal/service/serviceInfo",
  "취업지원": "https://www.work24.go.kr",
  "노인복지": "https://www.bokjiro.go.kr",
  "농어촌 지원": "https://www.mafra.go.kr",

  "서울 청년정책": "https://youth.seoul.go.kr",
  "서울 주거지원": "https://housing.seoul.go.kr",

  "인천 청년정책": "https://www.incheon.go.kr",
  "인천 주거지원": "https://www.incheon.go.kr"
};

const select = document.getElementById("region");
const cards = document.getElementById("cards");
const detailContent = document.getElementById("detailContent");
const searchInput = document.getElementById("searchInput");
const darkModeBtn = document.getElementById("darkModeBtn");

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const favoritesBox = document.getElementById("favorites");

function renderCards(region) {

  cards.innerHTML = "";

  detailContent.innerHTML = "카드를 선택해주세요.";

  benefitData[region].forEach(function(item) {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
  <h3>${item[0]}</h3>
  <p>${item[1]}</p>
  <button class="detailBtn">자세히 보기</button>
  <button class="favBtn">⭐ 저장</button>
`;

const favBtn = card.querySelector(".favBtn");

favBtn.addEventListener("click", function() {

  if (!favorites.includes(item[0])) {
    favorites.push(item[0]);
  }

  localStorage.setItem(
  "favorites",
  JSON.stringify(favorites)
);

  favoritesBox.innerHTML = "";

favorites.forEach(function(title) {
  const favCard = document.createElement("div");
  favCard.className = "card";
  favCard.innerHTML = `
<h3>${title}</h3>
<button class="deleteBtn">삭제</button>
`;
const deleteBtn = favCard.querySelector(".deleteBtn");

deleteBtn.addEventListener("click", function() {

    const index = favorites.indexOf(title);

    if (index > -1) {
        favorites.splice(index, 1);
    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    location.reload();

});
  favoritesBox.appendChild(favCard);
});

});

    const button = card.querySelector(".detailBtn");

    button.addEventListener("click", function() {

      if (item[0].includes("청년")) {
  location.href = "youth-account.html";
  return;
}

if (item[0].includes("주거지원")) {
    location.href = "housing-benefit.html";
    return;
}

if (item[0].includes("취업지원")) {
    location.href = "job-support.html";
    return;
}

if (item[0].includes("전기차")) {
    location.href = "ev-subsidy.html";
    return;
}
      detailContent.innerHTML = `
        <h3>${item[0]}</h3>
        <p>${item[1]}</p>

        <p><strong>신청 방법:</strong> 정부24 또는 복지로 홈페이지 확인</p>

        <p><strong>준비 서류:</strong> 신분증, 소득증빙서류, 주민등록등본</p>

        <a href="${benefitLinks[item[0]] || 'https://www.gov.kr'}" target="_blank">
          정부24 바로가기
        </a>
      `;

      document.getElementById("detailBox").scrollIntoView({
        behavior: "smooth"
      });

    });

    cards.appendChild(card);

  });

}

select.addEventListener("change", function() {
  renderCards(select.value);
});

favoritesBox.innerHTML = "";

favorites.forEach(function(title) {
  const favCard = document.createElement("div");
  favCard.className = "card";
  favCard.innerHTML = `<h3>${title}</h3>`;
  favoritesBox.appendChild(favCard);
});

renderCards("전국");

darkModeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode")
    );

});

searchInput.addEventListener("input", function() {
    const keyword = searchInput.value;

    cards.innerHTML = "";

    benefitData[select.value].forEach(function(item) {
        const title = item[0];
        const desc = item[1];

        if (title.includes(keyword) || desc.includes(keyword)) {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${title}</h3>
                <p>${desc}</p>
                <button class="detailBtn">자세히 보기</button>
            `;

            const button = card.querySelector(".detailBtn");

            button.addEventListener("click", function() {
                detailContent.innerHTML = `
                    <h3>${title}</h3>
                    <p>${desc}</p>
                    <p><strong>신청 방법:</strong> 정부24 또는 복지로 홈페이지 확인</p>
                    <p><strong>준비 서류:</strong> 신분증, 소득증빙서류, 주민등록등본</p>
                    <a href="https://www.gov.kr" target="_blank">정부24 바로가기</a>
                `;

                document.getElementById("detailBox").scrollIntoView({
                    behavior: "smooth"
                });
            });

            cards.appendChild(card);
        }
    });
});