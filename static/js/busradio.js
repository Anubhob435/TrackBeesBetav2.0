const playPauseBtn = document.getElementById('play-pause');
let isPlaying = false;

playPauseBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playPauseBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
});

// Add hover effect to all buttons
document.querySelectorAll('.control-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.1)';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
    });
});