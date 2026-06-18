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

// 2. 외부 바로가기 링크 설정
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

// HTML 엘리먼트 연결
const select = document.getElementById("region");
const cards = document.getElementById("cards");
const detailContent = document.getElementById("detailContent");
const searchInput = document.getElementById("searchInput");
const darkModeBtn = document.getElementById("darkModeBtn");

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const favoritesBox = document.getElementById("favorites");

// 3. 카드 생성 및 클릭 시 개별 html 문서 연동 (애드센스 정적 주소 세팅)
function renderCards(region) {
  cards.innerHTML = "";
  if (detailContent) detailContent.innerHTML = "카드를 선택해주세요.";

  benefitData[region].forEach(function(item) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${item[0]}</h3>
      <p>${item[1]}</p>
      <button class="detailBtn">자세히 보기</button>
      <button class="favBtn">⭐ 저장</button>
    `;

    // 즐겨찾기 저장 기능
    const favBtn = card.querySelector(".favBtn");
    favBtn.addEventListener("click", function() {
      if (!favorites.includes(item[0])) {
        favorites.push(item[0]);
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateFavoritesUI();
    });

    // 자세히 보기 클릭 시 정적 html 주소 이동 (핵심 포스팅 16개 연동)
    const button = card.querySelector(".detailBtn");
    button.addEventListener("click", function() {
      
      if (item[0].includes("근로장려금")) {
        location.href = "./posts/earned-income-tax-credit.html";
        return;
      }
      if (item[0].includes("청년")) {
        location.href = "./posts/youth-account.html";
        return;
      }
      if (item[0].includes("주거지원")) {
        location.href = "./posts/housing-benefit.html";
        return;
      }
      if (item[0].includes("취업지원")) {
        location.href = "./posts/job-support.html";
        return;
      }
      if (item[0].includes("출산")) {
        location.href = "./posts/birth-child.html";
        return;
      }
      if (item[0].includes("자동차")) {
        location.href = "./posts/ev-subsidy.html";
        return;
      }
      if (item[0].includes("노인복지")) {
        location.href = "./posts/elder-benefit.html";
        return;
      }
      if (item[0].includes("농어촌")) {
        location.href = "./posts/farm-support.html";
        return;
      }
      if (item[0].includes("자녀장려금")) {
        location.href = "./posts/child-tax-credit.html";
        return;
      }
      if (item[0].includes("문화누리카드")) {
        location.href = "./posts/culture-card-guide.html";
        return;
      }
      if (item[0].includes("국민내일배움카드")) {
        location.href = "./posts/training-card-guide.html";
        return;
      }
      if (item[0].includes("에너지바우처")) {
        location.href = "./posts/energy-voucher-guide.html";
        return;
      }
      if (item[0].includes("한부모")) {
        location.href = "./posts/single-parent-support.html";
        return;
      }
      if (item[0].includes("장애인")) {
        location.href = "./posts/disability-benefit.html";
        return;
      }
      if (item[0].includes("국가장학금")) {
        location.href = "./posts/national-scholarship.html";
        return;
      }
      if (item[0].includes("기초연금")) {
        location.href = "./posts/basic-pension-guide.html";
        return;
      }

      // 예외 기본값 폴백 (SPA 하단 상세 박스 유지)
      if (detailContent) {
        detailContent.innerHTML = `
          <h3>${item[0]}</h3>
          <p>${item[1]}</p>
          <p><strong>신청 방법:</strong> 정부24 또는 복지로 홈페이지 확인</p>
          <p><strong>준비 서류:</strong> 신분증, 소득증빙서류, 주민등록등본</p>
          <a href="${benefitLinks[item[0]] || 'https://www.gov.kr'}" target="_blank">정부24 바로가기</a>
        `;
      }

      const detailBox = document.getElementById("detailBox");
      if (detailBox) {
        detailBox.scrollIntoView({ behavior: "smooth" });
      }
    });

    cards.appendChild(card);
  });
}

// 4. 즐겨찾기 UI 업데이트 헬퍼 함수
function updateFavoritesUI() {
  if (!favoritesBox) return;
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
      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateFavoritesUI();
    });
    favoritesBox.appendChild(favCard);
  });
}

// 5. 지역 선택 변경 및 다크모드 이벤트 바인딩
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

// 6. [중요 복구] 실시간 검색 기능 및 검색 결과 연동 로직 완벽 조립
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
        card.className = "card";
        card.innerHTML = `
          <h3>${title}</h3>
          <p>${desc}</p>
          <button class="detailBtn">자세히 보기</button>
        `;

        const button = card.querySelector(".detailBtn");
        button.addEventListener("click", function() {
          // 검색 결과창에서도 동일하게 개별 글(html) 링크로 튕겨주는 분기 적용
          if (title.includes("근로장려금")) {
            location.href = "./posts/earned-income-tax-credit.html";
            return;
          }
          if (title.includes("청년")) {
            location.href = "./posts/youth-account.html";
            return;
          }
          if (title.includes("주거지원")) {
            location.href = "./posts/housing-benefit.html";
            return;
          }
          if (title.includes("취업지원")) {
            location.href = "./posts/job-support.html";
            return;
          }
          if (title.includes("출산")) {
            location.href = "./posts/birth-child.html";
            return;
          }
          if (title.includes("자동차")) {
            location.href = "./posts/ev-subsidy.html";
            return;
          }
          if (title.includes("노인복지")) {
            location.href = "./posts/elder-benefit.html";
            return;
          }
          if (title.includes("농어촌")) {
            location.href = "./posts/farm-support.html";
            return;
          }
          if (title.includes("자녀장려금")) {
            location.href = "./posts/child-tax-credit.html";
            return;
          }
          if (title.includes("문화누리카드")) {
            location.href = "./posts/culture-card-guide.html";
            return;
          }
          if (title.includes("국민내일배움카드")) {
            location.href = "./posts/training-card-guide.html";
            return;
          }
          if (title.includes("에너지바우처")) {
            location.href = "./posts/energy-voucher-guide.html";
            return;
          }
          if (title.includes("한부모")) {
            location.href = "./posts/single-parent-support.html";
            return;
          }
          if (title.includes("장애인")) {
            location.href = "./posts/disability-benefit.html";
            return;
          }
          if (title.includes("국가장학금")) {
            location.href = "./posts/national-scholarship.html";
            return;
          }
          if (title.includes("기초연금")) {
            location.href = "./posts/basic-pension-guide.html";
            return;
          }
          
          if (detailContent) {
            detailContent.innerHTML = `
              <h3>${title}</h3>
              <p>${desc}</p>
              <p><strong>신청 방법:</strong> 정부24 또는 복지로 홈페이지 확인</p>
              <p><strong>준비 서류:</strong> 신분증, 소득증빙서류, 주민등록등본</p>
              <a href="https://www.gov.kr" target="_blank">정부24 바로가기</a>
            `;
          }
          const detailBox = document.getElementById("detailBox");
          if (detailBox) detailBox.scrollIntoView({ behavior: "smooth" });
        });

        cards.appendChild(card);
      }
    });
  });
}

// 7. 초기화 구동 엔진 가동
updateFavoritesUI();
if (select) {
  renderCards(select.value);
} else {
  renderCards("전국");
}