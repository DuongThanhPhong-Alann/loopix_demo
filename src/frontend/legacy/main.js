(function () {
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav-links');

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', updateHeader);
  updateHeader();

  burger?.addEventListener('click', () => {
    navLinks?.classList.toggle('is-active');
    burger.classList.toggle('is-active');
    document.body.classList.toggle('menu-open', Boolean(navLinks?.classList.contains('is-active')));
    burger.setAttribute('aria-expanded', String(navLinks?.classList.contains('is-active')));
  });

  document.querySelectorAll('.nav-links a').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId?.startsWith('#')) return;
      event.preventDefault();
      navLinks?.classList.remove('is-active');
      burger?.classList.remove('is-active');
      document.body.classList.remove('menu-open');
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();
