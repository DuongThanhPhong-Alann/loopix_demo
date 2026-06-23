(function () {
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav-links');

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', updateHeader);
  updateHeader();

  burger?.addEventListener('click', () => {
    navLinks?.classList.toggle('show');
    burger.setAttribute('aria-expanded', String(navLinks?.classList.contains('show')));
  });

  document.querySelectorAll('.nav-links a').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId?.startsWith('#')) return;
      event.preventDefault();
      navLinks?.classList.remove('show');
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();
