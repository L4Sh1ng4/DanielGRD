const header = document.querySelector('.site-header');
const menu = header.querySelector('.menu-button');
const nav = header.querySelector('.site-nav');
const navLinks = [...nav.querySelectorAll('[data-nav]')];
const sections = [...document.querySelectorAll('[data-section]')];

function closeMenu({ restoreFocus = false } = {}) {
  menu.setAttribute('aria-expanded', 'false');
  if (restoreFocus) menu.focus();
}

menu.addEventListener('click', () => {
  const isOpen = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!isOpen));
});

nav.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link || menu.getAttribute('aria-expanded') === 'false') return;

  const destination = document.getElementById(link.hash.slice(1));
  closeMenu();
  destination.setAttribute('tabindex', '-1');
  destination.focus({ preventScroll: true });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu({ restoreFocus: true });
  }
});
document.addEventListener('click', (event) => {
  if (!header.contains(event.target)) closeMenu();
});
matchMedia('(max-width: 45rem)').addEventListener('change', () => closeMenu());

let activeSection;
let scrollFrame;
function updateNavigation() {
  scrollFrame = undefined;
  const boundary = header.offsetHeight + 36;
  const current = sections.findLast((section) => section.getBoundingClientRect().top <= boundary) ?? sections[0];
  if (activeSection === current) return;

  const previousTheme = activeSection?.dataset.theme;
  activeSection?.classList.remove('universe-enter');
  activeSection = current;
  document.body.dataset.universe = current.dataset.theme;
  if (previousTheme && previousTheme !== current.dataset.theme) {
    current.classList.add('universe-enter');
  }
  navLinks.forEach((link) => {
    if (link.dataset.nav === current.dataset.section) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}
function scheduleNavigationUpdate() {
  scrollFrame ??= requestAnimationFrame(updateNavigation);
}
window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
window.addEventListener('resize', scheduleNavigationUpdate);
window.addEventListener('pageshow', scheduleNavigationUpdate);
scheduleNavigationUpdate();

const workCards = [...document.querySelectorAll('.work-card')];
const filters = [...document.querySelectorAll('[data-filter]')];
const workCount = document.querySelector('.work-count');
function updatePortfolio(activeFilter) {
  filters.forEach((filter) => {
    filter.setAttribute('aria-pressed', String(filter === activeFilter));
  });
  const style = activeFilter.dataset.filter;
  workCards.forEach((card) => {
    card.hidden = style !== 'todos' && !card.dataset.style.split(' ').includes(style);
  });
  const count = workCards.filter((card) => !card.hidden).length;
  workCount.textContent = count === 1 ? '1 pieza' : `${count} piezas`;
}

filters.forEach((filter) => filter.addEventListener('click', () => updatePortfolio(filter)));
updatePortfolio(filters[0]);

const workDialog = document.querySelector('#work-dialog');
const workDialogImage = workDialog.querySelector('img');
const workDialogTitle = workDialog.querySelector('h2');
const workDialogCaption = workDialog.querySelector('p');
const stepButtons = [...workDialog.querySelectorAll('[data-step]')];
let visibleWorks = [];
let workIndex = 0;

function showWork(index) {
  workIndex = (index + visibleWorks.length) % visibleWorks.length;
  const card = visibleWorks[workIndex];
  const image = card.querySelector('img');
  workDialogImage.src = image.currentSrc || image.src;
  workDialogImage.alt = image.alt;
  workDialogTitle.textContent = card.querySelector('.work-name').textContent;
  workDialogCaption.textContent = card.dataset.caption;
}

workCards.forEach((card) => card.addEventListener('click', () => {
  visibleWorks = workCards.filter((item) => !item.hidden);
  stepButtons.forEach((button) => { button.hidden = visibleWorks.length < 2; });
  showWork(visibleWorks.indexOf(card));
  workDialog.showModal();
}));

stepButtons.forEach((button) => button.addEventListener('click', () => {
  showWork(workIndex + Number(button.dataset.step));
}));
workDialog.addEventListener('keydown', (event) => {
  if (visibleWorks.length < 2) return;
  if (event.key === 'ArrowLeft') showWork(workIndex - 1);
  if (event.key === 'ArrowRight') showWork(workIndex + 1);
});

const pangolaViews = {
  mirador: { image: 'assets/pangola-view.webp', alt: 'Vista ilustrativa del paisaje urbano de Medellín desde una terraza', caption: 'Imagen ilustrativa · El mirador' },
  terraza: { image: 'assets/pangola-terrace.webp', alt: 'Vista ilustrativa de una terraza al atardecer, con sillas, una cubierta y luces cálidas', caption: 'Imagen ilustrativa · La terraza' }
};
const pangolaPhoto = document.querySelector('.pangola-photo');
const pangolaImage = pangolaPhoto.querySelector('img');
const pangolaCaption = pangolaPhoto.querySelector('figcaption');
const pangolaControls = [...document.querySelectorAll('[data-view]')];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
pangolaControls.forEach((control) => control.addEventListener('click', () => {
  if (control.getAttribute('aria-pressed') === 'true') return;
  const view = pangolaViews[control.dataset.view];
  pangolaImage.src = view.image;
  pangolaImage.alt = view.alt;
  pangolaCaption.textContent = view.caption;
  pangolaControls.forEach((button) => button.setAttribute('aria-pressed', String(button === control)));
  if (!reduceMotion.matches) {
    pangolaImage.animate([{ opacity: .42 }, { opacity: 1 }], { duration: 300, easing: 'ease-out' });
  }
}));

const orderDialog = document.querySelector('#order-dialog');
const orderTitle = orderDialog.querySelector('h2');
const size = orderDialog.querySelector('select');
const whatsappLink = orderDialog.querySelector('#whatsapp-link');
function updateOrderLink() {
  const whatsapp = new URL('https://wa.me/');
  whatsapp.searchParams.set('text', `Hola, Piraña. Quiero consultar por ${orderTitle.textContent}, talla ${size.value}. Este mensaje es una prueba del prototipo.`);
  whatsappLink.href = whatsapp.href;
}
document.querySelectorAll('[data-product]').forEach((product) => product.addEventListener('click', () => {
  orderTitle.textContent = product.dataset.product;
  size.replaceChildren(...product.dataset.sizes.split(',').map((label) => new Option(label, label)));
  updateOrderLink();
  orderDialog.showModal();
}));
size.addEventListener('change', updateOrderLink);
