const slider = document.querySelector('#confidence');
function updateWeight() {
  const local = Number(slider.value);
  const weight = Math.min(1, .1 / (local + 1e-8));
  document.querySelector('#context-value').value = local.toFixed(2);
  document.querySelector('#weight-value').textContent = weight.toFixed(3);
  document.querySelector('#weight-bar').style.width = `${weight * 100}%`;
}
slider.addEventListener('input', updateWeight);
updateWeight();
const dialog = document.querySelector('#figure-dialog');
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
  const full = document.querySelector('#full-figure');
  full.src = button.dataset.image;
  full.alt = button.querySelector('img').alt;
  document.querySelector('#figure-title').textContent = button.dataset.title;
  dialog.showModal();
}));
document.querySelector('#close-figure').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.querySelector('#copy-citation').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(document.querySelector('#citation').textContent);
    status.textContent = 'Citation copied.';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('#citation'));
    const selection = window.getSelection();
    selection.removeAllRanges(); selection.addRange(range);
    status.textContent = 'Citation selected. Press Ctrl+C or Command+C to copy.';
  }
});
