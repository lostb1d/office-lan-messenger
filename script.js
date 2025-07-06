// Section reveal on scroll
const sections = document.querySelectorAll('section');
function revealSections() {
    const trigger = window.innerHeight * 0.85;
    sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < trigger) sec.classList.add('visible');
    });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('DOMContentLoaded', revealSections);

// Screenshot carousel logic
const images = document.querySelectorAll('.carousel-images img');
const indicators = document.querySelectorAll('.carousel-indicators span');
let current = 0;
function showImage(idx) {
    images.forEach((img, i) => {
        img.classList.toggle('active', i === idx);
        indicators[i].classList.toggle('active', i === idx);
    });
    current = idx;
}
document.getElementById('prevBtn').onclick = () => {
    showImage((current - 1 + images.length) % images.length);
};
document.getElementById('nextBtn').onclick = () => {
    showImage((current + 1) % images.length);
};
indicators.forEach((dot, i) => {
    dot.onclick = () => showImage(i);
});

// Optional: Auto-advance carousel every 6 seconds
setInterval(() => {
    showImage((current + 1) % images.length);
}, 6000);



// Fetch and display total download count from JSON
fetch('data/downloads.json')
  .then(response => response.json())
  .then(data => {
    let total = 0;
    data.forEach((item, idx) => {
      total += item.download_count;
    });
    document.getElementById('total-download-count').textContent = total;
  });

// Simulate download count update (demo only, does NOT update server file)
document.querySelectorAll('.download-link').forEach(link => {
  link.addEventListener('click', function (e) {
    // For demo: increment total in localStorage
    let total = parseInt(localStorage.getItem('total-download-count') || '0', 10);
    total++;
    localStorage.setItem('total-download-count', total);
    document.getElementById('total-download-count').textContent = total;
    // Allow download to proceed
  });
});

// On page load, restore total from localStorage (for demo)
document.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('total-download-count');
  if (stored) document.getElementById('total-download-count').textContent = stored;
});
