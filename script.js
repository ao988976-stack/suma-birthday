// Birthday Gift Card Interactive Script
// Features: Envelope open, card flip, image carousel, particles, confetti, music

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const envelope = document.getElementById('envelope');
    const giftCardContainer = document.getElementById('giftCard');
    const card = document.getElementById('card');
    const track = document.getElementById('track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const particlesCanvas = document.getElementById('particles');
    const confettiCanvas = document.getElementById('confetti');

    let currentSlide = 0;
    const slideCount = slides.length;

    // Initialize canvases
    initParticles(particlesCanvas);
    initConfetti(confettiCanvas);

    // Envelope click to open
    envelope.addEventListener('click', function() {
        envelope.classList.add('open');
        setTimeout(() => {
            envelope.style.display = 'none';
            giftCardContainer.classList.add('visible');
            launchConfetti();
            playMusic();
        }, 1000);
    });

    // Card flip
    const flipBtns = document.querySelectorAll('.flip-btn, .back-btn');
    flipBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            card.classList.toggle('flipped');
        });
    });

    // Carousel navigation
    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth;
        track.style.transform = `translateX(${-currentSlide * slideWidth}px)`;
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateCarousel();
    });

    // Auto-advance carousel
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateCarousel();
    }, 4000);

    // Particles animation
    function initParticles(canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.save();
                ctx.globalAlpha = p.opacity;
                ctx.fillStyle = '#ff9a9e';
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }

    // Confetti explosion
    function initConfetti(canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Confetti will be launched on events
    }

    function launchConfetti() {
        const ctx = confettiCanvas.getContext('2d');
        const confetti = [];
        for (let i = 0; i < 200; i++) {
            confetti.push({
                x: Math.random() * confettiCanvas.width,
                y: confettiCanvas.height,
                vx: (Math.random() - 0.5) * 10,
                vy: Math.random() * -15 - 10,
                color: ['#ff6b9d', '#ffd700', '#fecfef', '#c44569'][Math.floor(Math.random() * 4)],
                size: Math.random() * 5 + 3,
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 10
            });
        }

        let confettiAnimFrame;
        function animateConfetti() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            let activeConfetti = confetti.filter(c => c.y < confettiCanvas.height);

            activeConfetti.forEach(c => {
                c.y += c.vy;
                c.vy += 0.1; // gravity
                c.x += c.vx;
                c.rotation += c.rotSpeed;

                ctx.save();
                ctx.translate(c.x, c.y);
                ctx.rotate(c.rotation * Math.PI / 180);
                ctx.fillStyle = c.color;
                ctx.fillRect(-c.size/2, -c.size/2, c.size, c.size);
                ctx.restore();
            });

            if (activeConfetti.length > 0) {
                confettiAnimFrame = requestAnimationFrame(animateConfetti);
            } else {
                cancelAnimationFrame(confettiAnimFrame);
            }
        }
        animateConfetti();
    }

    // Background music (optional - user can add audio file)
    function playMusic() {
        // Uncomment and add your music file
        // const audio = new Audio('birthday-song.mp3');
        // audio.loop = true;
        // audio.play().catch(e => console.log('Autoplay blocked'));
    }

    // Responsive resize
    window.addEventListener('resize', () => {
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        updateCarousel();
    });
});
