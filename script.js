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
