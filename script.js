// 1. 전국 및 지역별 혜택 데이터 (전국 8도 전 지역 데이터 탑재 완료)
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
    ["🏠 경기 주거지원", "청년 전월세보증금 대출"]
  ],
  "인천": [
    ["🎓 인천 청년정책", "청년 월세지원, 드림체크카드"],
    ["🏠 인천 주거지원", "전세보증금 지원"]
  ],
  "대구": [
    ["🎓 대구 청년정책", "청년희망적금 지원"],
    ["💼 대구 취업지원", "청년 구직활동 지원"]
  ],
  "광주": [
    ["🎓 광주 청년정책", "광주 청년드림수당"],
    ["🏠 광주 주거지원", "청년 월세 특별지원"]
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
  // 🌟 [누락 복구] 자바스크립트 엔진 내 데이터 칩 완벽 납땜
  "충북": [
    ["💼 충북 취업지원", "청년 취업지원 사업 및 직업훈련"]
  ],
  "충남": [
    ["🏠 충남 주거지원", "청년 주거급여 및 월세 특별지원"]
  ],
  "전북": [
    ["🎓 전북 청년정책", "청년수당 및 전북 청년 종합 지원"]
  ],
  "전남": [
    ["🌾 전남 농어촌지원", "귀농어·귀촌 정착 지원금"]
  ],
  "경북": [
    ["💼 경북 취업지원", "청년 일자리 매칭 및 취업 장려금"]
  ],
  "경남": [
    ["🏠 경남 주거지원", "신혼부부 주거 자금 및 주택 지원"]
  ],
  "제주": [
    ["✈️ 제주 청년정책", "청년 정착 지원금 및 제주 한달살이 가이드"]
  ]
};

const select = document.getElementById("region");
const cards = document.getElementById("cards");
const detailContent = document.getElementById("detailContent");
const detailBox = document.getElementById("detailBox");
const searchInput = document.getElementById("searchInput");

function renderCards(region) {
  if (!cards) return;
  cards.innerHTML = "";

  const data = benefitData[region] || benefitData["전국"];

  data.forEach(function(item) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${item[0]}</h3>
      <p>${item[1]}</p>
      <div class="btn-group">
        <button class="detailBtn">자세히 보기</button>
      </div>
    `;

    const button = card.querySelector(".detailBtn");
    button.addEventListener("click", function() {
      const title = item[0];

      if (title.includes("근로장려금")) { location.href = "work-incentive-guide.html"; } 
      else if (title.includes("자녀장려금")) { location.href = "child-tax-credit.html"; } 
      else if (title.includes("문화누리카드")) { location.href = "culture-card-guide.html"; } 
      else if (title.includes("국민내일배움카드")) { location.href = "training-card-guide.html"; } 
      else if (title.includes("에너지바우처")) { location.href = "energy-voucher-guide.html"; } 
      else if (title.includes("장애인")) { location.href = "disability-benefit.html"; } 
      else if (title.includes("국가장학금")) { location.href = "national-scholarship.html"; } 
      else if (title.includes("기초연금")) { location.href = "basic-pension-guide.html"; } 
      else if (title.includes("청년정책") || title.includes("청년정책")) { location.href = "youth-policy-list.html"; } 
      else if (title.includes("주거지원")) { location.href = "housing-benefit.html"; } 
      else if (title.includes("취업지원")) { location.href = "job-support.html"; } 
      else if (title.includes("출산")) { location.href = "birth-child.html"; } 
      else if (title.includes("자동차")) { location.href = "ev-subsidy.html"; } 
      else if (title.includes("노인복지")) { location.href = "elder-benefit.html"; } 
      else if (title.includes("농어촌")) { location.href = "farm-support.html"; }
    });

    cards.appendChild(card);
  });
}

if (searchInput) {
  searchInput.addEventListener("input", function() {
    const keyword = searchInput.value.trim();
    if (!keyword) {
      renderCards(select ? select.value : "전국");
      return;
    }
    
    cards.innerHTML = "";
    const currentRegion = select ? select.value : "전국";
    const data = benefitData[currentRegion] || benefitData["전국"];

    data.forEach(function(item) {
      if (item[0].includes(keyword) || item[1].includes(keyword)) {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>${item[0]}</h3>
          <p>${item[1]}</p>
          <div class="btn-group">
            <button class="detailBtn">자세히 보기</button>
          </div>
        `;

        const button = card.querySelector(".detailBtn");
        button.addEventListener("click", function() {
          const title = item[0];
          if (title.includes("근로장려금")) { location.href = "work-incentive-guide.html"; }
          else if (title.includes("자녀장려금")) { location.href = "child-tax-credit.html"; }
          else if (title.includes("문화누리카드")) { location.href = "culture-card-guide.html"; }
          else if (title.includes("청년")) { location.href = "job-support-guide.html"; }
          else if (title.includes("주거지원")) { location.href = "housing-benefit.html"; }
        });
        cards.appendChild(card);
      }
    });
  });
}

if (select) {
  select.addEventListener("change", function() {
    renderCards(select.value);
  });
}

renderCards("전국");
