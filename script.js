// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor (Simple Follower)
const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1,
    ease: "power2.out",
  });
});

// Hover states for cursor
const links = document.querySelectorAll(
  "a, button, .group, .swiper-button-next-custom, .swiper-button-prev-custom"
);
links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      scale: 2,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid white",
      mixBlendMode: "difference",
      duration: 0.3,
    });
  });
  link.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      scale: 1,
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      border: "none",
      mixBlendMode: "screen",
      duration: 0.3,
    });
  });
});

// Simple Loader Animation
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (loader) {
    setTimeout(() => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          loader.style.display = "none";
          initAnimations();
        },
      });
    }, 1500); // Wait for the fill animation
  } else {
    // If loader is removed/commented out, start animations immediately
    initAnimations();
  }
});

// Initialize Swiper
const swiper = new Swiper(".hero-swiper", {
  loop: true,
  effect: "fade",
  speed: 1000,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next-custom",
    prevEl: ".swiper-button-prev-custom",
  },
  on: {
    slideChangeTransitionStart: function () {
      // Reset animations for next slide
      gsap.set(".swiper-slide-active .hero-text", { y: 50, opacity: 0 });
    },
    slideChangeTransitionEnd: function () {
      // Animate text in active slide
      gsap.to(".swiper-slide-active .hero-text", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      });
    },
  },
});

function initAnimations() {
  // Initial Hero Text Animation
  gsap.set(".swiper-slide-active .hero-text", { y: 50, opacity: 0 });
  gsap.to(".swiper-slide-active .hero-text", {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    delay: 0.2,
  });

  // Animate Section Titles with Split Text Effect
  const sectionTitles = document.querySelectorAll(".section-title");
  sectionTitles.forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      x: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    });
  });

  // Services Grid - Advanced Stagger Animation
  gsap.from("#services .group", {
    scrollTrigger: {
      trigger: "#services",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 100,
    opacity: 0,
    rotationX: -15,
    duration: 1,
    stagger: {
      amount: 0.6,
      from: "start",
    },
    ease: "power3.out",
  });

  // Work Section - Horizontal Slide Animation
  gsap.from("#work .snap-center", {
    scrollTrigger: {
      trigger: "#work",
      start: "top 75%",
    },
    x: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out",
  });

  // Stats Counter Animation
  const statBoxes = document.querySelectorAll(".bg-zinc-900.p-6");
  statBoxes.forEach((box, index) => {
    gsap.from(box, {
      scrollTrigger: {
        trigger: box,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: index * 0.1,
      ease: "power3.out",
    });
  });

  // Gallery Grid - Masonry Animation
  gsap.from("#gallery img", {
    scrollTrigger: {
      trigger: "#gallery",
      start: "top 80%",
    },
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    stagger: {
      amount: 0.8,
      from: "random",
    },
    ease: "power2.out",
  });

  // Premium Services Cards - 3D Flip Effect
  const serviceCards = document.querySelectorAll(
    ".group.relative.overflow-hidden.bg-zinc-900"
  );
  serviceCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 80,
      opacity: 0,
      rotationY: -15,
      duration: 1,
      delay: index * 0.15,
      ease: "power3.out",
    });

    // Animate card content separately
    const cardTitle = card.querySelector("h3");
    const cardText = card.querySelector("p");
    const cardList = card.querySelectorAll("li");

    if (cardTitle) {
      gsap.from(cardTitle, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.15 + 0.3,
        ease: "power2.out",
      });
    }

    if (cardText) {
      gsap.from(cardText, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.15 + 0.4,
        ease: "power2.out",
      });
    }

    if (cardList.length > 0) {
      gsap.from(cardList, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: index * 0.15 + 0.5,
        ease: "power2.out",
      });
    }
  });

  // Why Choose Us Section
  const whyChooseContent = document.querySelector(
    ".lg\\:grid-cols-2 .space-y-8"
  );
  if (whyChooseContent) {
    const heading = whyChooseContent.querySelector("h2");
    const paragraph = whyChooseContent.querySelector("p");
    const statGrid = whyChooseContent.querySelector(".grid.grid-cols-2");

    if (heading) {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
        },
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }

    if (paragraph) {
      gsap.from(paragraph, {
        scrollTrigger: {
          trigger: paragraph,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      });
    }

    if (statGrid) {
      const stats = statGrid.querySelectorAll(".bg-zinc-900");
      gsap.from(stats, {
        scrollTrigger: {
          trigger: statGrid,
          start: "top 85%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.5,
        ease: "back.out(1.2)",
      });
    }
  }

  // Image Grid Animation (Right Side)
  const imageGrids = document.querySelectorAll(
    ".lg\\:grid-cols-2 .grid.grid-cols-2 img"
  );
  imageGrids.forEach((img, index) => {
    gsap.from(img, {
      scrollTrigger: {
        trigger: img,
        start: "top 85%",
      },
      scale: 0.7,
      opacity: 0,
      rotation: 5,
      duration: 1,
      delay: index * 0.1,
      ease: "power3.out",
    });
  });

  // Marquee Section
  const marqueeSection = document.querySelector(".animate-marquee");
  if (marqueeSection) {
    gsap.from(marqueeSection.parentElement, {
      scrollTrigger: {
        trigger: marqueeSection.parentElement,
        start: "top 85%",
      },
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  }

  // Reviews Section
  const reviewCards = document.querySelectorAll("#reviews .bg-zinc-900");
  reviewCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 60,
      opacity: 0,
      duration: 0.9,
      delay: index * 0.2,
      ease: "power3.out",
    });
  });

  // Instagram Section Animation
  const instaCards = document.querySelectorAll(".instagram-embed");
  instaCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      y: 80,
      opacity: 0,
      scale: 0.9,
      duration: 1,
      delay: index * 0.15,
      ease: "power3.out",
    });
  });

  // Footer Animation
  gsap.from("footer .grid > div", {
    scrollTrigger: {
      trigger: "footer",
      start: "top 90%",
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out",
  });

  // Parallax Effect for Hero Images
  const heroImages = document.querySelectorAll(".swiper-slide img");
  heroImages.forEach((img) => {
    gsap.to(img, {
      scrollTrigger: {
        trigger: img,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: 100,
      ease: "none",
    });
  });

  // Add floating animation to badges
  const badges = document.querySelectorAll(".inline-block.px-3.py-1");
  badges.forEach((badge) => {
    gsap.from(badge, {
      scrollTrigger: {
        trigger: badge,
        start: "top 85%",
      },
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: "bounce.out",
    });
  });
}

// Engine Start Button Interaction
const engineBtn = document.getElementById("engineStart");
const engineSound = document.getElementById("engineSound");
let isRunning = false;

if (engineBtn) {
  engineBtn.addEventListener("click", () => {
    if (!isRunning) {
      // Start
      engineSound.volume = 0.5;
      engineSound
        .play()
        .catch((e) => console.log("Audio play failed interaction required"));

      gsap.to(engineBtn, {
        scale: 1.1,
        borderColor: "#fff",
        duration: 0.1,
        yoyo: true,
        repeat: 3,
      });

      // Shake effect on body slightly
      gsap.to("body", {
        x: "random(-2, 2)",
        y: "random(-2, 2)",
        duration: 0.05,
        repeat: 20,
        onComplete: () => {
          gsap.set("body", { x: 0, y: 0 });
        },
      });

      engineBtn.querySelector("span").textContent = "STOP";
      isRunning = true;
    } else {
      // Stop
      engineSound.pause();
      engineSound.currentTime = 0;
      engineBtn.querySelector("span").textContent = "START";
      isRunning = false;
    }
  });
}

// Instagram Lazy Loading
const instagramEmbeds = document.querySelectorAll(".instagram-embed");

instagramEmbeds.forEach((embed) => {
  const thumbnail = embed.querySelector(".instagram-thumbnail-container");
  const instagramUrl = embed.dataset.instagramUrl;

  if (thumbnail && instagramUrl) {
    thumbnail.addEventListener("click", function () {
      // Create iframe
      const iframe = document.createElement("iframe");
      iframe.className = "w-full h-full instagram-iframe-loaded";
      iframe.src = instagramUrl;
      iframe.frameBorder = "0";
      iframe.scrolling = "no";
      iframe.allowTransparency = true;

      // Fade out thumbnail with GSAP
      gsap.to(thumbnail, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          // Replace thumbnail with iframe
          thumbnail.parentElement.innerHTML = "";
          const container = document.createElement("div");
          container.className =
            "relative aspect-[9/16] overflow-hidden bg-zinc-950";
          container.appendChild(iframe);

          // Add loading indicator
          const loadingDiv = document.createElement("div");
          loadingDiv.className =
            "absolute inset-0 bg-zinc-950 flex items-center justify-center loading-overlay";
          loadingDiv.innerHTML = `
            <div class="text-center">
              <i class="fa-brands fa-instagram text-pink-500 text-4xl mb-4 animate-pulse"></i>
              <p class="text-zinc-400 text-sm">Loading...</p>
            </div>
          `;
          container.appendChild(loadingDiv);

          thumbnail.parentElement.appendChild(container);

          // Fade in iframe and remove loading overlay
          gsap.from(iframe, {
            opacity: 0,
            duration: 0.5,
            delay: 0.5,
          });

          setTimeout(() => {
            gsap.to(loadingDiv, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                loadingDiv.remove();
              },
            });
          }, 1500);
        },
      });
    });
  }
});

// Work Horizontal Scroll Buttons
const workScroller = document.getElementById("workScroller");
const prevWork = document.getElementById("prevWork");
const nextWork = document.getElementById("nextWork");

if (nextWork && prevWork) {
  nextWork.addEventListener("click", () => {
    workScroller.scrollBy({ left: 400, behavior: "smooth" });
  });

  prevWork.addEventListener("click", () => {
    workScroller.scrollBy({ left: -400, behavior: "smooth" });
  });
}
