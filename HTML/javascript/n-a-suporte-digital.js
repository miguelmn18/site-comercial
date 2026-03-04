// ==================== SCROLL SUAVE ====================
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

document.addEventListener("DOMContentLoaded", () => {

  // ==================== TRANSIÇÃO ENTRE PÁGINAS ====================
  const links = document.querySelectorAll(".link-transicao");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");

      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location = href;
      }, 600);
    });
  });

  // ==================== ANIMAÇÕES ====================
  function criarObserver(classeBase, classeAtiva) {
    const elementos = document.querySelectorAll(classeBase);

    if (!elementos.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(elementos).indexOf(entry.target);
            entry.target.style.setProperty("--delay", `${index * 120}ms`);
            entry.target.classList.add(classeAtiva);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elementos.forEach((el) => observer.observe(el));
  }

  criarObserver(".apresenta", "apresenta--show");
  criarObserver(".apresentacao", "apresentacao--show");
  criarObserver(".explicacao", "explicacao--show");

  // ==================== CARROSSEL ====================
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-track img, .carousel-track video");
  const btnNext = document.querySelector(".carousel-btn-next");
  const btnPrev = document.querySelector(".carousel-btn-prev");

  if (track && slides.length > 0 && btnNext && btnPrev) {

    let currentIndex = 0;

    function controlarVideos(index) {
      slides.forEach((slide, i) => {
        if (slide.tagName === "VIDEO") {
          if (i === index) {
            slide.play().catch(() => {});
          } else {
            slide.pause();
            slide.currentTime = 0;
          }
        }
      });
    }

    function updateCarousel() {
      if (!slides.length) return;

      const slideWidth = slides[0].clientWidth;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
      controlarVideos(currentIndex);
    }

    btnNext.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });

    btnPrev.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    // Ajusta quando redimensionar a tela
    window.addEventListener("resize", updateCarousel);

    // Inicializa posição correta
    updateCarousel();
  }

  // ==================== SUBMENU ====================
  const submenuItem = document.querySelector(".has-submenu");
  const submenuLink = submenuItem?.querySelector("a");

  if (submenuItem && submenuLink) {
    submenuLink.addEventListener("click", (e) => {
      e.preventDefault();
      submenuItem.classList.toggle("active");
    });
  }

  // ==================== CONFIGURAÇÃO GLOBAL CHART ====================
  if (typeof Chart !== "undefined") {
    Chart.defaults.font.family = "Poppins, sans-serif";
    Chart.defaults.color = "#ccc";
  }

  // ==================== FUNÇÃO PADRÃO DE GRÁFICO ====================
  function criarGraficoLinha(id, label, antes, depois, cor) {
    const ctx = document.getElementById(id);
    if (!ctx || typeof Chart === "undefined") return;

    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Antes", "Depois"],
        datasets: [
          {
            label: label,
            data: [antes, depois],
            borderColor: cor,
            backgroundColor: cor.replace("1)", "0.15)"),
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 6,
            pointBackgroundColor: cor,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "#fff",
              font: { weight: "600" },
            },
          },
          datalabels: {
            color: "#fff",
            anchor: "end",
            align: "top",
            font: { weight: "bold" },
            formatter: function (value) {
              return value.toLocaleString("pt-BR");
            },
          },
        },
        scales: {
          x: {
            ticks: { color: "#aaa" },
            grid: { color: "rgba(255,255,255,0.05)" },
          },
          y: {
            ticks: {
              color: "#aaa",
              callback: function (value) {
                return value.toLocaleString("pt-BR");
              },
            },
            grid: { color: "rgba(255,255,255,0.05)" },
          },
        },
      },
      plugins: typeof ChartDataLabels !== "undefined" ? [ChartDataLabels] : [],
    });
  }

  // ==================== DADOS DAS EMPRESAS ====================
  criarGraficoLinha("seguidores1", "Seguidores", 1500, 4085, "rgba(115,43,209,1)");
  criarGraficoLinha("views1", "Visualizações", 300000, 700000, "rgba(0,150,255,1)");
  criarGraficoLinha("seguidores2", "Seguidores", 4200, 14200, "rgba(255,0,150,1)");
  criarGraficoLinha("views2", "Visualizações", 100000, 2000000, "rgba(255,165,0,1)");
  criarGraficoLinha("seguidores3", "Seguidores", 1500, 5200, "rgba(150,0,255,1)");

});