import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 1000,
  once: true,
  offset: 30,
  easing: 'ease-out-cubic',
});

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

const moonSvg = `<svg id="theme-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
const sunSvg = `<svg id="theme-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

if (currentTheme === 'light') {
  document.body.classList.add('light-mode');
  themeToggleBtn.innerHTML = sunSvg;
} else {
  themeToggleBtn.innerHTML = moonSvg;
}

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  let theme = 'dark';
  if (document.body.classList.contains('light-mode')) {
    theme = 'light';
    themeToggleBtn.innerHTML = sunSvg;
  } else {
    themeToggleBtn.innerHTML = moonSvg;
  }
  localStorage.setItem('theme', theme);
});

// Custom Language Switcher Logic
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const currentLangCookie = getCookie('googtrans');
const activeLang = currentLangCookie ? currentLangCookie.split('/').pop() : 'vi';

document.querySelectorAll('.lang-btn').forEach(btn => {
  if (btn.dataset.lang === activeLang) {
    btn.classList.add('active');
  } else {
    btn.classList.remove('active');
  }
  
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    document.cookie = `googtrans=/vi/${lang}; path=/`;
    document.cookie = `googtrans=/vi/${lang}; domain=${location.hostname}; path=/`;
    window.location.reload();
  });
});

// Sticky Header
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile Burger Menu
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  const spans = burger.querySelectorAll('span');
  if (navLinks.classList.contains('show')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Smooth scrolling and Active Link updates
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 150)) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href').substring(1) === current) {
      a.classList.add('active');
    }
  });
});

navItems.forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    navLinks.classList.remove('show');
    const spans = burger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 88,
        behavior: 'smooth'
      });
    }
  });
});

// Lightbox logic
window.openLightbox = function(src) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lb-img');
  lightbox.style.display = "block";
  img.src = src;
}

window.closeLightbox = function() {
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = "none";
}


document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target !== document.getElementById('lb-img')) {
    closeLightbox();
  }
});


document.addEventListener('DOMContentLoaded', async () => {
  const gallery = document.getElementById('projects-gallery');
  if (!gallery) return;

  try {
   
    const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=6');
    if (!response.ok) throw new Error('Network response was not ok');
    

    const apiData = await response.json();
    
   
    const localProjects = [
      { image: '/hero_building.png', fallback: '/hero.png', title: 'Dự án 1', delay: 0 },
      { image: '/villa_interior.png', fallback: '/project1.png', title: 'Dự án 2', delay: 100 },
      { image: '/house_construction.png', fallback: '/hero.png', title: 'Dự án 3', delay: 200 },
      { image: '/road_construction.png', fallback: '/project1.png', title: 'Dự án 4', delay: 300 },
      { image: '/public_building.png', fallback: '/hero.png', title: 'Dự án 5', delay: 400 },
      { image: '/architect_design.png', fallback: '/project1.png', title: 'Dự án 6', delay: 500 }
    ];

    const projects = apiData.map((item, index) => ({
      ...localProjects[index],
      apiTitle: item.title 
    }));
    
    // Render HTML động từ dữ liệu JSON
    gallery.innerHTML = projects.map(p => `
      <div class="g-item" onclick="openLightbox('${p.image}')" data-aos="zoom-in" data-aos-delay="${p.delay}">
        <img src="${p.image}" onerror="this.src='${p.fallback}'" alt="${p.title}" />
        <div class="g-overlay"><span>Xem dự án</span></div>
      </div>
    `).join('');
    
    // Yêu cầu thư viện AOS tính toán lại animation do có phần tử mới thêm vào DOM
    AOS.refresh();
  } catch (error) {
    console.error('Lỗi khi tải danh sách dự án:', error);
    gallery.innerHTML = '<p style="text-align:center; width:100%; grid-column: 1/-1;">Không thể tải danh sách dự án. Vui lòng thử lại sau.</p>';
  }
});
