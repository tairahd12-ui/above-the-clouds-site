// TOPページのヒーロー動画プレイリスト。再生が終わると次の動画に自動で切り替わる。
// 増やす場合はこの配列に { src, poster } を追加するだけでよい。
// ルート相対パス(/から始まる)にしているのは、/en/ 配下のページからも
// 同じ main.js を読み込んでおり、相対パスだとページの階層でずれるため。
// 自然・空・雲を中心に、各作品の元の編集の「間」を残したまま2〜3カットずつ切り出したもの
// (音声なし・軽量化済み)。MVは使わない(Tylerの指示)。
const HERO_CLIPS = [
  { src: "/assets/top/hero-01.mp4", poster: "/assets/top/hero-01.jpg" }, // Yabesian(車内→入道雲→車のドア)
  { src: "/assets/top/hero-02.mp4", poster: "/assets/top/hero-02.jpg" }, // KEBOZ Look Film(屋上を歩く→立ち姿→黄色い花)
  { src: "/assets/top/hero-03.mp4", poster: "/assets/top/hero-03.jpg" }, // KEBOZ Look Film 03(水面に映る雲→枝に触れる手→後ろ姿)
  { src: "/assets/top/hero-04.mp4", poster: "/assets/top/hero-04.jpg" }, // memory of australia 冒頭(一本の木→岩場の足元)
  { src: "/assets/top/hero-09.mp4", poster: "/assets/top/hero-09.jpg" }, // fingerj(窓辺の机→スイカの寄り→夕暮れの道と富士山)
  { src: "/assets/top/hero-05.mp4", poster: "/assets/top/hero-05.jpg" }, // flatmood(草原を歩く→足元→寝転ぶ)
  { src: "/assets/top/hero-06.mp4", poster: "/assets/top/hero-06.jpg" }, // fingerj(夕焼けの富士山と人→富士山→砂の上の手)
  { src: "/assets/top/hero-07.mp4", poster: "/assets/top/hero-07.jpg" }, // KEBOZ Look Film 03(大きな木の下を歩く→ベンチ)
  { src: "/assets/top/hero-08.mp4", poster: "/assets/top/hero-08.jpg" }, // memory of australia(水辺の木→森→海)
];

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.textContent = isOpen ? "×" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.textContent = "☰";
      });
    });
  }

  // Works filter(絞り込みボタンが無いページでは全作品を表示する)
  const filterBtns = document.querySelectorAll(".filter-btn");
  const workItems = document.querySelectorAll(".work-item");
  if (!filterBtns.length) {
    workItems.forEach((item) => item.classList.add("is-visible"));
  } else if (workItems.length) {
    const applyFilter = (category) => {
      workItems.forEach((item) => {
        const match = category === "all" || item.dataset.category === category;
        item.classList.toggle("is-visible", match);
      });
    };
    applyFilter("all");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        applyFilter(btn.dataset.filter);
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    if (!q || !a) return;
    a.style.display = "none";
    q.addEventListener("click", () => {
      const isOpen = a.style.display !== "none";
      a.style.display = isOpen ? "none" : "block";
      const mark = q.querySelector(".mark");
      if (mark) mark.textContent = isOpen ? "+" : "−";
    });
  });

  // Hero video playlist
  const heroVideo = document.querySelector("#hero-video");
  if (heroVideo && HERO_CLIPS.length > 1) {
    let heroIndex = 0;
    heroVideo.addEventListener("ended", () => {
      heroIndex = (heroIndex + 1) % HERO_CLIPS.length;
      const clip = HERO_CLIPS[heroIndex];
      heroVideo.setAttribute("poster", clip.poster);
      heroVideo.src = clip.src;
      heroVideo.play();
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
});
