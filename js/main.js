// TOPページのヒーロー動画プレイリスト。再生が終わると次の動画に自動で切り替わる。
// 増やす場合はこの配列に { src, poster } を追加するだけでよい。
// ルート相対パス(/から始まる)にしているのは、/en/ 配下のページからも
// 同じ main.js を読み込んでおり、相対パスだとページの階層でずれるため。
const HERO_CLIPS = [
  { src: "/assets/top/hero.mp4", poster: "/assets/top/hero.jpg" },
  { src: "/assets/works/timberland-1.mp4", poster: "/assets/works/timberland-1.jpg" },
  { src: "/assets/works/gshock-rei.mp4", poster: "/assets/works/gshock-rei.jpg" },
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

  // Works filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const workItems = document.querySelectorAll(".work-item");
  if (filterBtns.length && workItems.length) {
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

  // Contact form (mailto fallback — no backend required)
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    const CONTACT_EMAIL = "tairahd12@icloud.com";
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const service = data.get("service") || "";
      const name = data.get("name") || "";
      const email = data.get("email") || "";
      const company = data.get("company") || "";
      const message = data.get("message") || "";

      const subject = `【お問い合わせ】${service || "above the clouds"} - ${name}`;
      const body = [
        `お問い合わせ内容: ${service}`,
        `お名前: ${name}`,
        `メールアドレス: ${email}`,
        `会社名・屋号: ${company}`,
        "",
        "お問い合わせ内容詳細:",
        message,
      ].join("\n");

      const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }

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
