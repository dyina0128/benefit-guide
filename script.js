// 1. 전국 및 지역별 혜택 데이터 (16개 핵심 카드 포함)
const benefitData = {
  "전국": [
    ["🎓 청년정책", "청년 월세지원, 청년도약계좌, 국민취업지원제도"],
    ["🏠 주거지원", "주거급여, 전세자금대출, 신혼부부 주거지원"],
    ["👶 출산·육아", "부모급여, 아동수당, 첫만남 이용권"],
    ["💼 취업지원", "국민취업지원제도, 내일배움카드"],
    ["👴 노인복지", "기초연금, 노인일자리 사업"],
    ["🚜 농어촌 지원", "귀농귀촌 지원, 청년농업인 지원"],
    ["🚗 자동차 지원", "전기차 보조금, 조기폐차 지원금, 자동차세 감면"],
    ["💰 근로장려금", "근로장려금 신청방법, 지급조건"],
    ["👨‍👩‍👧 자녀장려금", "자녀 양육 가구 지원금 신청방법"],
    ["🎭 문화누리카드", "문화생활 지원"],
    ["🎓 국민내일배움카드", "직업훈련 및 자격증 교육 지원"],
    ["🔥 에너지바우처", "전기·가스·난방비 지원"],
    ["👨‍👧 한부모가정 지원", "아동양육비, 교육비, 주거지원"],
    ["♿ 장애인 복지", "장애인연금, 활동지원, 의료비 지원"],
    ["🎓 국가장학금", "대학생 등록금 지원, 소득구간별 장학금"],
    ["👴 기초연금", "만 65세 이상 기초연금 지원"]
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

// HTML 엘리먼트 연결
const select = document.getElementById("region");
const cards = document.getElementById("cards");
const detailContent = document.getElementById("detailContent");
const searchInput = document.getElementById("searchInput");
const darkModeBtn = document.getElementById("darkModeBtn");

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const favoritesBox = document.getElementById("favorites");

// 2. 카드 렌더링 함수 (디자인 클래스 card 주입 및 버튼 레이아웃 완벽 연동)
function renderCards(region) {
  if (!cards) return;
  cards.innerHTML = "";

  benefitData[region].forEach(function(item) {
    const card = document.createElement("div");
    card.className = "card"; // ⭐ 네모나고 커다란 카드 스타일(style.css) 강제 연결
    card.innerHTML = `
      <h3>${item[0]}</h3>
      <p>${item[1]}</p>
      <div class="btn-group" style="margin-top: 15px; display: flex; gap: 8px; justify-content: center;">
        <button class="detailBtn" style="background-color: #0076c0; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: bold;">자세히 보기</button>
        <button class="favBtn" style="background-color: #f0f0f0; border: 1px solid #ccc; padding: 8px 12px; border-radius: 4px; cursor: pointer;">⭐ 저장</button>
      </div>
    `;

    // 즐겨찾기 기능
    const favBtn = card.querySelector(".favBtn");
    favBtn.addEventListener("click", function() {
      if (!favorites.includes(item[0])) {
        favorites.push(item[0]);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateFavoritesUI();
    });

    // 버튼 클릭 시 개별 문서 연동
    const button = card.querySelector(".detailBtn");
    button.addEventListener("click", function() {
      if (item[0].includes("근로장려금")) { location.href = "./posts/earned-income-tax-credit.html"; return; }
      if (item[0].includes("청년")) { location.href = "./posts/youth-account.html"; return; }
      if (item[0].includes("주거지원")) { location.href = "./posts/housing-benefit.html"; return; }
      if (item[0].includes("취업지원")) { location.href = "./posts/job-support.html"; return; }
      if (item[0].includes("출산")) { location.href = "./posts/birth-child.html"; return; }
      if (item[0].includes("자동차")) { location.href = "./posts/ev-subsidy.html"; return; }
      if (item[0].includes("노인복지")) { location.href = "./posts/elder-benefit.html"; return; }
      if (item[0].includes("농어촌")) { location.href = "./posts/farm-support.html"; return; }
      if (item[0].includes("자녀장려금")) { location.href = "./posts/child-tax-credit.html"; return; }
      if (item[0].includes("문화누리카드")) { location.href = "./posts/culture-card-guide.html"; return; }
      if (item[0].includes("국민내일배움카드")) { location.href = "./posts/training-card-guide.html"; return; }
      if (item[0].includes("에너지바우처")) { location.href = "./posts/energy-voucher-guide.html"; return; }
      if (item[0].includes("한부모")) { location.href = "./posts/single-parent-support.html"; return; }
      if (item[0].includes("장애인")) { location.href = "./posts/disability-benefit.html"; return; }
      if (item[0].includes("국가장학금")) { location.href = "./posts/national-scholarship.html"; return; }
      if (item[0].includes("기초연금")) { location.href = "./posts/basic-pension-guide.html"; return; }
    });

    cards.appendChild(card);
  });
}

// 3. 즐겨찾기 UI 업데이트
function updateFavoritesUI() {
  if (!favoritesBox) return;
  favoritesBox.innerHTML = "";
  favorites.forEach(function(title) {
    const favCard = document.createElement("div");
    favCard.className = "card";
    favCard.innerHTML = `
      <h3>${title}</h3>
      <button class="deleteBtn" style="background-color: #ff4d4d; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer;">삭제</button>
    `;
    
    const deleteBtn = favCard.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", function() {
      const index = favorites.indexOf(title);
      if (index > -1) {
        favorites.splice(index, 1);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateFavoritesUI();
    });
    favoritesBox.appendChild(favCard);
  });
}

// 4. 이벤트 바인딩
if (select) {
  select.addEventListener("change", function() {
    renderCards(select.value);
  });
}

if (darkModeBtn) {
  darkModeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  });
}

// 5. 검색창에서도 큼직한 네모 카드로 나오도록 조립
if (searchInput) {
  searchInput.addEventListener("input", function() {
    const keyword = searchInput.value;
    cards.innerHTML = "";
    const currentRegion = select ? select.value : "전국";

    benefitData[currentRegion].forEach(function(item) {
      const title = item[0];
      const desc = item[1];

      if (title.includes(keyword) || desc.includes(keyword)) {
        const card = document.createElement("div");
        card.className = "card"; // ⭐ 여기도 똑같이 큰 카드 모양 주입
        card.innerHTML = `
          <h3>${title}</h3>
          <p>${desc}</p>
          <div class="btn-group" style="margin-top: 15px; display: flex; gap: 8px; justify-content: center;">
            <button class="detailBtn" style="background-color: #0076c0; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: bold;">자세히 보기</button>
          </div>
        `;

        const button = card.querySelector(".detailBtn");
        button.addEventListener("click", function() {
          if (title.includes("근로장려금")) { location.href = "./posts/earned-income-tax-credit.html"; return; }
          if (title.includes("청년")) { location.href = "./posts/youth-account.html"; return; }
          if (title.includes("주거지원")) { location.href = "./posts/housing-benefit.html"; return; }
          if (title.includes("취업지원")) { location.href = "./posts/job-support.html"; return; }
          if (title.includes("출산")) { location.href = "./posts/birth-child.html"; return; }
          if (title.includes("자동차")) { location.href = "./posts/ev-subsidy.html"; return; }
          if (title.includes("노인복지")) { location.href = "./posts/elder-benefit.html"; return; }
          if (title.includes("농어촌")) { location.href = "./posts/farm-support.html"; return; }
          if (title.includes("자녀장려금")) { location.href = "./posts/child-tax-credit.html"; return; }
          if (title.includes("문화누리카드")) { location.href = "./posts/culture-card-guide.html"; return; }
          if (title.includes("국민내일배움카드")) { location.href = "./posts/training-card-guide.html"; return; }
          if (title.includes("에너지바우처")) { location.href = "./posts/energy-voucher-guide.html"; return; }
          if (title.includes("한부모")) { location.href = "./posts/single-parent-support.html"; return; }
          if (title.includes("장애인")) { location.href = "./posts/disability-benefit.html"; return; }
          if (title.includes("국가장학금")) { location.href = "./posts/national-scholarship.html"; return; }
          if (title.includes("기초연금")) { location.href = "./posts/basic-pension-guide.html"; return; }
        });

        cards.appendChild(card);
      }
    });
  });
}

// 초기 가동
updateFavoritesUI();
if (select) {
  renderCards(select.value);
} else {
  renderCards("전국");
}