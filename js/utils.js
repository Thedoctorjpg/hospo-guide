const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function showToast(msg) {
  const toast = $('#toast');
  toast.textContent = msg;
  toast.hidden = false;
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.hidden = true;
  }, 2800);
}

function priorityLabel(p) {
  const labels = {
    required: 'Required',
    conditional: 'Conditional',
    planning: 'Planning',
    support: 'Support',
    reference: 'Reference',
  };
  return labels[p] || p;
}

function typeLabel(t) {
  const labels = {
    'food-truck': 'Food truck',
    cafe: 'Cafe / restaurant',
    restaurant: 'Restaurant',
    stall: 'Market stall',
    'home-based': 'Home-based',
    event: 'Events',
    marketing: 'Marketing',
  };
  return labels[t] || t;
}