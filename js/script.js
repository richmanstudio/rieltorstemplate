// ===============================
// Прелоадер Vision
// ===============================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
  }, 2000);
});

// ===============================
// Бургер-меню
// ===============================
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger?.addEventListener('click', () => {
  navLinks?.classList.toggle('mobile-active');
});

// ===============================
// Scroll-to-top
// ===============================
const scrollBtn = document.createElement('button');
scrollBtn.className = 'scroll-to-top';
scrollBtn.innerHTML = `<img src="https://cdn.jsdelivr.net/gh/tabler/tabler-icons/icons/rocket.svg" alt="Up" />`;
document.body.appendChild(scrollBtn);

window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('show', window.scrollY > 400);
  document.querySelector('header')?.classList.toggle('scrolled', window.scrollY > 50);
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===============================
// Анимации при появлении (IntersectionObserver)
const animatedItems = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

animatedItems.forEach(el => observer.observe(el));

// ===============================
// Ripple-эффект
document.querySelectorAll('.ripple').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.left = `${e.offsetX}px`;
    ripple.style.top = `${e.offsetY}px`;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ===============================
// Фильтрация объектов (properties.html)
const filterButtons = document.querySelectorAll('.filter-btn');
const propertyCards = document.querySelectorAll('.property-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active')?.classList.remove('active');
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    propertyCards.forEach(card => {
      const category = card.dataset.category;
      card.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
    });
  });
});

// ===============================
// Счётчик довольных клиентов (testimonials)
const counter = document.getElementById('client-count');
if (counter) {
  let started = false;
  const countObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      let value = 0;
      const interval = setInterval(() => {
        value += 13;
        counter.textContent = value;
        if (value >= 650) {
          counter.textContent = '650';
          clearInterval(interval);
        }
      }, 50);
    }
  }, { threshold: 0.6 });
  countObserver.observe(counter);
}

// ===============================
// Валидация форм (включая модальные)
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let valid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
        valid = false;
      }
    });

    if (valid) {
      form.reset();
      alert('Спасибо! Ваша заявка отправлена.');
    }
  });
});

// ===============================
// Модальное окно услуги (открытие)
const serviceModal = document.getElementById('service-modal');
const serviceTitle = document.getElementById('service-title');
const serviceDesc = document.getElementById('service-desc');
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    if (!serviceModal) return;
    serviceTitle.textContent = card.dataset.title;
    serviceDesc.textContent = "Подробное описание услуги появится здесь. Индивидуальный подход, прозрачные условия и премиальный уровень сопровождения.";
    serviceModal.classList.add('active');
  });
});

// ===============================
// Закрытие модальных окон
document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.modal')?.classList.remove('active');
  });
});
