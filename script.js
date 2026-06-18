// 1. 전국 및 지역별 혜택 데이터
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
  ]
};

// 2. 외부 공식 홈페이지 바로가기 링크
const benefitLinks = {
  "청년정책": "https://www.gov.kr/portal/service/serviceInfo",
  "주거지원": "https://www.gov.kr/portal/main",
  "출산·육아": "https://www.gov.kr/portal/service/serviceInfo",
  "취업지원": "https://www.work24.go.kr",
  "노인복지": "https://www.bokjiro.go.kr",
  "농어촌 지원": "https://www.mafra.go.kr"
};

const select = document.getElementById("region");
const cards = document.getElementById("cards");
const detailContent = document.getElementById("detailContent");
const detailBox = document.getElementById("detailBox");
const searchInput = document.getElementById("searchInput");

// 3. 카드 렌더링 및 클릭 이벤트 엔진
function renderCards(region) {
  if (!cards) return;
  cards.innerHTML = "";
  if (detailContent) detailContent.innerHTML = "카드를 선택해주세요.";

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

    // 🌟 [핵심 수리] /posts/ 경로를 제거하고, 사진 속 실제 html 파일명과 1:1로 매칭 유도
    const button = card.querySelector(".detailBtn");
    button.addEventListener("click", function() {
      const title = item[0];
      const desc = item[1];

      // 하단 상세 정보 박스 내용 반영
      if (detailContent) {
        detailContent.innerHTML = `
          <h3 style="margin-top:0; color:#0076c0;">${title} 상세 안내</h3>
          <p><strong>주요 내용:</strong> ${desc}</p>
          <p><strong>신청 방법:</strong> 정부24 또는 복지로 홈페이지를 통해 온라인/오프라인 신청 가능</p>
          <p><strong>준비 서류:</strong> 신분증, 소득증빙서류, 주민등록등본 등 관련 서류</p>
          <a href="${benefitLinks[title] || 'https://www.gov.kr'}" target="_blank" style="display:inline-block; margin-top:10px; color:#0076c0; font-weight:bold;">정부24 공식 홈페이지 바로가기 →</a>
        `;
      }

      if (detailBox) {
        detailBox.style.display = "block";
        detailBox.scrollIntoView({ behavior: "smooth" });
      }

      // 🌟 1초 뒤에 진짜 사장님 파일 주소로 다이렉트 이동 (중간에 /posts/ 제거!)
      setTimeout(function() {
        if (title.includes("근로장려금")) { location.href = "work-incentive-guide.html"; } 
        else if (title.includes("자녀장려금")) { location.href = "child-tax-credit.html"; } 
        else if (title.includes("문화누리카드")) { location.href = "culture-card-guide.html"; } 
        else if (title.includes("국민내일배움카드")) { location.href = "training-card-guide.html"; } 
        else if (title.includes("에너지바우처")) { location.href = "energy-voucher-guide.html"; } 
        else if (title.includes("장애인")) { location.href = "disability-benefit.html"; } 
        else if (title.includes("국가장학금")) { location.href = "national-scholarship.html"; } 
        else if (title.includes("기초연금")) { location.href = "basic-pension-guide.html"; } 
        else if (title.includes("청년정책") || title.includes("청년정책")) { location.href = "job-support-guide.html"; } 
        else if (title.includes("주거지원")) { location.href = "housing-benefit.html"; } 
        else if (title.includes("취업지원")) { location.href = "job-support.html"; } 
        else if (title.includes("출산")) { location.href = "birth-child.html"; } 
        else if (title.includes("자동차")) { location.href = "ev-subsidy.html"; } 
        else if (title.includes("노인복지")) { location.href = "elder-benefit.html"; } 
        else if (title.includes("농어촌")) { location.href = "farm-support.html"; }
        else if (title.includes("about")) { location.href = "about.html"; }
      }, 1000); 
    });

    cards.appendChild(card);
  });
}

// 4. 검색창 입력 시 작동 로직
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

// 5. 이벤트 설정 및 구동
if (select) {
  select.addEventListener("change", function() {
    renderCards(select.value);
  });
}

renderCards("전국");