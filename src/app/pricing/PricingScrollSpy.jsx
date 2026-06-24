'use client';

import { useEffect } from 'react';

const sectionIds = ['hotel-pricing', 'education-pricing', 'addons-pricing'];

export default function PricingScrollSpy() {
  useEffect(() => {
    const links = [...document.querySelectorAll('.pricing-header .nav-links a[href^="#"]')];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    if (!links.length || !sections.length) return undefined;

    const setActive = (id) => {
      links.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    };

    const update = () => {
      const marker = window.innerHeight * 0.38;
      let activeId = sections[0].id;

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= marker) {
          activeId = section.id;
        }
      });

      setActive(activeId);
    };

    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        const id = link.getAttribute('href')?.slice(1);
        const target = id ? document.getElementById(id) : null;
        if (!target) return;

        event.preventDefault();
        setActive(id);
        window.history.replaceState(null, '', `#${id}`);
        window.scrollTo({
          top: target.offsetTop - 88,
          behavior: 'smooth',
        });
      });
    });

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return null;
}
