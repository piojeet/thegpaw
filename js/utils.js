gsap.registerPlugin(ScrollTrigger);

const counterEl = document.querySelector(".counter .count");
const greenLine = document.querySelector(".green-line");
const main = document.querySelector(".container-loader");
const heroSection = document.querySelector(".hero__images");


// **📌 Step 1: Disable Scroll but Preserve Scrollbar Width**
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
document.body.style.overflow = "hidden";
document.body.style.paddingRight = `${scrollbarWidth}px`; // Prevent width shift

let counter = { value: 1 };

// **📌 Step 2: Counter Animation**
gsap.to(counter, {
  value: 100,
  duration: 2,
  onUpdate: () => {
    counterEl.textContent = Math.round(counter.value);
  },
  onComplete: () => {
    gsap.to(greenLine, { width: "100%", duration: 1, ease: "power2.out" });

    gsap.to(greenLine, {
      height: "100%",
      duration: 1,
      delay: 1,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(main, {
          left: "100%",
          duration: 1,
          ease: "power2.out",
          onComplete: enableScroll
        });
      }
    });
  }
});

// **📌 Step 3: Enable Scroll Without Flicker**
function enableScroll() {
  document.body.style.overflow = "auto";
  document.body.style.paddingRight = "";

  gsap.to(heroSection, { opacity: 1, duration: 1 });

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  gsap.set(".hero__images img", { y: 100, opacity: 0 });

  gsap.timeline({
    scrollTrigger: {
      trigger: ".hero__images",
      start: "top 80%",
      end: "bottom 50%",
    }
  })
    .to(".hero__image1", { opacity: 1, y: 0, duration: 0.8 })
    .to(".hero__image2", { opacity: 1, y: 0, duration: 0.6 }, "+=0.3")
    .to(".hero__image3", { opacity: 1, y: 0, duration: 0.6 }, "+=0.3");
}



if (window.innerWidth > 425) {
  gsap.set(".music__item", { y: 100, opacity: 0 });

  gsap.to(".music__item", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out",
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".music__item",
      start: "top 80%",
      end: "top 50%",
      // toggleActions: "play none none reverse"
    }
  });
} else {
  gsap.utils.toArray(".music__item").forEach((item, index) => {
    gsap.fromTo(item, 
      { opacity: 0, y: 100 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out", 
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          end: "top 50%",
          // toggleActions: "play none none reverse"
        }
      }
    );
  });
}







let text = document.querySelector(".music__title");
let words = text.innerHTML.split(" ").map(word => `<span class='word'>${word}</span>`).join(" ");
text.innerHTML = words; // हर word को wrap करना

gsap.set(".word", {
  opacity: 0,
  y: 100,
  rotateX: 40,
  scale: 1.5,
  filter: "blur(10px)"
});

gsap.to(".word", {
  opacity: 1,
  y: 0,
  rotateX: 0,
  scale: 1,
  filter: "blur(0px)",
  duration: 0.8,
  stagger: 0.05,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".music__title",
    start: "top 90%",
    end: "top 50%",
    //   toggleActions: "play none none reverse" 
  }
});


let navLinks = document.querySelectorAll('.header__nav-item');
let navList = document.querySelector('.header__nav');
let menuItems = document.querySelectorAll('.hamburger__menu');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('hamburger__menu--active');

    if (item.classList.contains('hamburger__menu--active')) {
      gsap.to(navList, {
        right: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          gsap.fromTo(navLinks, {
            opacity: 0,
            y: 20,
          }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
          });
        }
      });
    } else {
      gsap.to(navLinks, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(navList, {
            right: "-100%",
            duration: 0.5,
            ease: "power2.in"
          });
        }
      });
    }
  });
});
