// Fetch and display total download count from JSON
fetch('../data/downloads.json')
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
