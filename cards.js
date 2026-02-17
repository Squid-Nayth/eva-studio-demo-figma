import * as THREE from 'three';

const codeChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";

class CardStreamController {
    constructor() {
        this.container = document.getElementById("cardStream");
        this.cardLine = document.getElementById("cardLine");
        // Speed indicator removed as it's not in the HTML structure we added
        // this.speedIndicator = document.getElementById("speedValue");

        this.position = 0;
        this.velocity = 60; // Slightly slower for better UX
        this.direction = 1;
        this.isAnimating = true;
        this.isDragging = false;

        this.lastTime = 0;
        this.lastMouseX = 0;
        this.mouseVelocity = 0;
        this.friction = 0.95;
        this.minVelocity = 20;

        this.containerWidth = 0;
        this.cardLineWidth = 0;

        if (this.container && this.cardLine) {
            this.init();
        }
    }

    init() {
        this.populateCardLine();
        this.calculateDimensions();
        // Give an initial offset so the animation is "already in progress"
        this.position = this.cardLineWidth * 0.4;
        this.setupEventListeners();
        this.updateCardPosition();
        this.animate();
        this.startPeriodicUpdates();
    }

    calculateDimensions() {
        this.containerWidth = window.innerWidth;
        const cardWidth = 400;
        const cardGap = 60;
        const cardCount = this.cardLine.children.length;
        this.cardLineWidth = (cardWidth + cardGap) * cardCount;
    }

    setupEventListeners() {
        this.cardLine.addEventListener("mousedown", (e) => this.startDrag(e));
        this.container.addEventListener("mousemove", (e) => this.onDrag(e));
        document.addEventListener("mouseup", () => this.endDrag());

        this.cardLine.addEventListener(
            "touchstart",
            (e) => this.startDrag(e.touches[0]),
            { passive: false }
        );
        this.container.addEventListener("touchmove", (e) => this.onDrag(e.touches[0]), {
            passive: false,
        });
        document.addEventListener("touchend", () => this.endDrag());

        // this.cardLine.addEventListener("wheel", (e) => this.onWheel(e));
        this.cardLine.addEventListener("selectstart", (e) => e.preventDefault());
        this.cardLine.addEventListener("dragstart", (e) => e.preventDefault());

        window.addEventListener("resize", () => this.calculateDimensions());
    }

    startDrag(e) {
        e.preventDefault();

        this.isDragging = true;
        this.isAnimating = false;
        this.lastMouseX = e.clientX;
        this.mouseVelocity = 0;

        const transform = window.getComputedStyle(this.cardLine).transform;
        if (transform !== "none") {
            const matrix = new DOMMatrix(transform);
            this.position = matrix.m41;
        }

        this.cardLine.style.animation = "none";
        this.cardLine.classList.add("dragging");

        document.body.style.userSelect = "none";
        document.body.style.cursor = "grabbing";
    }

    onDrag(e) {
        if (!this.isDragging) return;
        e.preventDefault();

        const deltaX = e.clientX - this.lastMouseX;
        this.position += deltaX;
        this.mouseVelocity = deltaX * 60;
        this.lastMouseX = e.clientX;

        this.cardLine.style.transform = `translateX(${this.position}px)`;
        this.updateCardClipping();
    }

    endDrag() {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.cardLine.classList.remove("dragging");

        if (Math.abs(this.mouseVelocity) > this.minVelocity) {
            this.velocity = Math.abs(this.mouseVelocity);
            this.direction = this.mouseVelocity > 0 ? 1 : -1;
        } else {
            this.velocity = 60;
        }

        this.isAnimating = true;

        document.body.style.userSelect = "";
        document.body.style.cursor = "";
    }

    animate() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        if (this.isAnimating && !this.isDragging) {
            if (this.velocity > this.minVelocity) {
                this.velocity *= this.friction;
            } else {
                this.velocity = Math.max(this.minVelocity, this.velocity);
            }

            this.position -= this.velocity * this.direction * deltaTime;
            this.updateCardPosition();
        }

        requestAnimationFrame(() => this.animate());
    }

    updateCardPosition() {
        const cardWidth = 400;
        const cardGap = 60;

        // This ensures the position stays within a single loop's range
        const totalWidth = this.cardLineWidth;
        const wrappedPos = ((this.position % totalWidth) + totalWidth) % totalWidth;

        this.cardLine.style.transform = `translateX(${-wrappedPos}px)`;
        this.updateCardClipping();
    }

    generateCode(width, height) {
        const randInt = (min, max) =>
            Math.floor(Math.random() * (max - min + 1)) + min;
        const pick = (arr) => arr[randInt(0, arr.length - 1)];

        const header = [
            "// EVA Studio",
            "/* Digital Experiences */",
            "const CREATIVE = true;",
            "const INNOVATION = 100;",
            "/* Paris based */",
        ];

        const library = [...header];
        for (let i = 0; i < 20; i++) library.push(`const v${i} = null;`);

        let flow = library.join(" ");
        flow = flow.replace(/\s+/g, " ").trim();
        const totalChars = width * height;
        while (flow.length < totalChars + width) {
            const extra = pick(library).replace(/\s+/g, " ").trim();
            flow += " " + extra;
        }

        let out = "";
        let offset = 0;
        for (let row = 0; row < height; row++) {
            let line = flow.slice(offset, offset + width);
            if (line.length < width) line = line + " ".repeat(width - line.length);
            out += line + (row < height - 1 ? "\n" : "");
            offset += width;
        }
        return out;
    }

    calculateCodeDimensions(cardWidth, cardHeight) {
        const fontSize = 11;
        const lineHeight = 13;
        const charWidth = 6;
        const width = Math.floor(cardWidth / charWidth);
        const height = Math.floor(cardHeight / lineHeight);
        return { width, height, fontSize, lineHeight };
    }

    createCardWrapper(index) {
        const wrapper = document.createElement("div");
        wrapper.className = "card-wrapper";

        const normalCard = document.createElement("div");
        normalCard.className = "card card-normal";

        const cardImages = [
            "./assets/card-1.png",
            "./assets/card-2.png",
            "./assets/card-3.png",
            "./assets/card-4.png",
            "./assets/card-5.png",
            "./assets/card-6.png",
        ];

        const cardImage = document.createElement("img");
        cardImage.className = "card-image";
        cardImage.src = cardImages[index % cardImages.length];
        cardImage.alt = "EVA Card";

        cardImage.onerror = () => {
            console.error("Failed to load image:", cardImage.src);
            cardImage.style.display = 'none';
            normalCard.style.background = 'linear-gradient(135deg, #172554, #2563eb)';
        };

        normalCard.appendChild(cardImage);

        const asciiCard = document.createElement("div");
        asciiCard.className = "card card-ascii";

        const asciiContent = document.createElement("div");
        asciiContent.className = "ascii-content";

        const { width, height, fontSize, lineHeight } =
            this.calculateCodeDimensions(400, 250);
        asciiContent.style.fontSize = fontSize + "px";
        asciiContent.style.lineHeight = lineHeight + "px";
        asciiContent.textContent = this.generateCode(width, height);

        asciiCard.appendChild(asciiContent);
        wrapper.appendChild(normalCard);
        wrapper.appendChild(asciiCard);

        return wrapper;
    }

    updateCardClipping() {
        const rect = this.container.getBoundingClientRect();
        // Shift scanner closer to the text (55% width)
        const scannerX = rect.left + rect.width * 0.55;
        const scannerWidth = 8;
        const scannerLeft = scannerX - scannerWidth / 2;
        const scannerRight = scannerX + scannerWidth / 2;
        let anyScanningActive = false;

        const containerKids = this.cardLine.children;
        for (let i = 0; i < containerKids.length; i++) {
            const wrapper = containerKids[i];
            const wRect = wrapper.getBoundingClientRect();
            const cardLeft = wRect.left;
            const cardRight = wRect.right;
            const cardWidth = wRect.width;

            const normalCard = wrapper.querySelector(".card-normal");
            const asciiCard = wrapper.querySelector(".card-ascii");

            if (cardLeft < scannerRight && cardRight > scannerLeft) {
                anyScanningActive = true;
                const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0);
                const pct = (scannerIntersectLeft / cardWidth) * 100;

                normalCard.style.setProperty("--clip-right", `${pct}%`);
                asciiCard.style.setProperty("--clip-left", `${pct}%`);
            } else {
                if (cardRight < scannerLeft) {
                    // Left of scanner -> Ascii
                    normalCard.style.setProperty("--clip-right", "100%");
                    asciiCard.style.setProperty("--clip-left", "100%");
                } else if (cardLeft > scannerRight) {
                    // Right of scanner -> Normal
                    normalCard.style.setProperty("--clip-right", "0%");
                    asciiCard.style.setProperty("--clip-left", "0%");
                }
            }
        }

        if (window.setScannerScanning) {
            window.setScannerScanning(anyScanningActive);
        }
    }

    updateAsciiContent() {
        // Disabled random updates as they cause perceived flickering
    }

    populateCardLine() {
        this.cardLine.innerHTML = "";
        const cardsCount = 30;

        // We create enough cards to fill the screen twice to ensure seamless looping
        for (let i = 0; i < cardsCount * 2; i++) {
            const cardWrapper = this.createCardWrapper(i % cardsCount);
            this.cardLine.appendChild(cardWrapper);
        }
    }

    startPeriodicUpdates() {
        setInterval(() => {
            this.updateAsciiContent();
        }, 200);

        const updateClipping = () => {
            this.updateCardClipping();
            requestAnimationFrame(updateClipping);
        };
        updateClipping();
    }
}

class ParticleSystem {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.particleCount = 400;
        this.canvas = document.getElementById("particleCanvas");

        if (this.canvas) {
            this.init();
        }
    }

    init() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.OrthographicCamera(
            -window.innerWidth / 2,
            window.innerWidth / 2,
            125,
            -125,
            1,
            1000
        );
        this.camera.position.z = 100;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
        });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight); // Use canvas size
        this.renderer.setClearColor(0x000000, 0);

        this.createParticles();

        this.animate();

        window.addEventListener("resize", () => this.onWindowResize());
    }

    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        const sizes = new Float32Array(this.particleCount);
        const velocities = new Float32Array(this.particleCount);

        const canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext("2d");

        const half = canvas.width / 2;
        const hue = 217;

        const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);
        gradient.addColorStop(0.025, "#fff");
        gradient.addColorStop(0.1, `hsl(${hue}, 61%, 33%)`);
        gradient.addColorStop(0.25, `hsl(${hue}, 64%, 6%)`);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(half, half, half, 0, Math.PI * 2);
        ctx.fill();

        const texture = new THREE.CanvasTexture(canvas);

        for (let i = 0; i < this.particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * window.innerWidth * 2;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
            positions[i * 3 + 2] = 0;

            colors[i * 3] = 1;
            colors[i * 3 + 1] = 1;
            colors[i * 3 + 2] = 1;

            const orbitRadius = Math.random() * 200 + 100;
            sizes[i] = (Math.random() * (orbitRadius - 60) + 60) / 8;

            velocities[i] = Math.random() * 60 + 30;
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        this.velocities = velocities;

        const alphas = new Float32Array(this.particleCount);
        for (let i = 0; i < this.particleCount; i++) {
            alphas[i] = (Math.random() * 8 + 2) / 10;
        }
        geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
        this.alphas = alphas;

        const material = new THREE.ShaderMaterial({
            uniforms: {
                pointTexture: { value: texture },
                size: { value: 15.0 },
            },
            vertexShader: `
        attribute float alpha;
        varying float vAlpha;
        varying vec3 vColor;
        uniform float size;
        
        void main() {
          vAlpha = alpha;
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
            fragmentShader: `
        uniform sampler2D pointTexture;
        varying float vAlpha;
        varying vec3 vColor;
        
        void main() {
          gl_FragColor = vec4(vColor, vAlpha) * texture2D(pointTexture, gl_PointCoord);
        }
      `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            vertexColors: true,
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            const alphas = this.particles.geometry.attributes.alpha.array;
            const time = Date.now() * 0.001;

            for (let i = 0; i < this.particleCount; i++) {
                positions[i * 3] += this.velocities[i] * 0.016;

                if (positions[i * 3] > window.innerWidth / 2 + 100) {
                    positions[i * 3] = -window.innerWidth / 2 - 100;
                    positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
                }

                positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.5;

                // Twinkle effect
                const twinkle = Math.floor(Math.random() * 10);
                if (twinkle === 1 && alphas[i] > 0) {
                    alphas[i] -= 0.05;
                } else if (twinkle === 2 && alphas[i] < 1) {
                    alphas[i] += 0.05;
                }

                alphas[i] = Math.max(0, Math.min(1, alphas[i]));
            }

            this.particles.geometry.attributes.position.needsUpdate = true;
            this.particles.geometry.attributes.alpha.needsUpdate = true;
        }

        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    onWindowResize() {
        if (!this.camera || !this.renderer) return;
        this.camera.left = -window.innerWidth / 2;
        this.camera.right = window.innerWidth / 2;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, 250);
    }
}

class ParticleScanner {
    constructor() {
        this.canvas = document.getElementById("scannerCanvas");
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext("2d");
        this.animationId = null;

        this.w = this.canvas.offsetWidth;
        this.h = 300;
        this.particles = [];
        this.count = 0;
        this.maxParticles = 1500; // More particles for crackling effect
        this.intensity = 1.2;
        this.lightBarX = this.w * 0.55;
        this.lightBarWidth = 2; // Thinner for a sharp trait
        this.fadeZone = 60;

        this.scanTargetIntensity = 1.8;
        this.scanTargetParticles = 2500;
        this.scanTargetFadeZone = 35;

        this.scanningActive = false;

        this.baseIntensity = this.intensity;
        this.baseMaxParticles = this.maxParticles;
        this.baseFadeZone = this.fadeZone;

        this.currentIntensity = 1.2;
        this.currentMaxParticles = this.maxParticles;
        this.currentFadeZone = this.fadeZone;
        this.transitionSpeed = 0.1;
        this.currentGlowIntensity = 2.5; // Steady high intensity

        this.setupCanvas();
        this.createGradientCache();
        this.initParticles();
        this.animate();

        window.addEventListener("resize", () => this.onResize());
    }

    setupCanvas() {
        this.canvas.width = this.w;
        this.canvas.height = this.h;
        // this.canvas.style.width = this.w + "px"; // Handled by CSS
        // this.canvas.style.height = this.h + "px";
        this.ctx.clearRect(0, 0, this.w, this.h);
    }

    onResize() {
        this.w = window.innerWidth;
        this.lightBarX = this.w * 0.55;
        this.setupCanvas();
    }

    createGradientCache() {
        this.gradientCanvas = document.createElement("canvas");
        this.gradientCtx = this.gradientCanvas.getContext("2d");
        this.gradientCanvas.width = 16;
        this.gradientCanvas.height = 16;

        const half = this.gradientCanvas.width / 2;
        const gradient = this.gradientCtx.createRadialGradient(
            half,
            half,
            0,
            half,
            half,
            half
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.3, "rgba(196, 181, 253, 0.8)");
        gradient.addColorStop(0.7, "rgba(139, 92, 246, 0.4)");
        gradient.addColorStop(1, "transparent");

        this.gradientCtx.fillStyle = gradient;
        this.gradientCtx.beginPath();
        this.gradientCtx.arc(half, half, half, 0, Math.PI * 2);
        this.gradientCtx.fill();
    }

    // Helpers
    random(min, max) { if (arguments.length < 2) { max = min; min = 0; } return Math.floor(Math.random() * (max - min + 1)) + min; }
    randomFloat(min, max) { return Math.random() * (max - min) + min; }

    createParticle() {
        return {
            x: this.lightBarX + this.randomFloat(-1, 1),
            y: this.randomFloat(0, this.h),
            vx: this.randomFloat(-1.5, 3.5), // More directional spread
            vy: this.randomFloat(-0.5, 0.5),
            radius: this.randomFloat(0.2, 0.8), // Minuscule
            alpha: this.randomFloat(0.6, 1),
            decay: this.randomFloat(0.01, 0.05), // Faster decay for "crépitement"
            originalAlpha: 0,
            life: 1.0,
            time: 0,
            startX: 0,
            twinkleSpeed: this.randomFloat(0.1, 0.3),
            twinkleAmount: this.randomFloat(0.2, 0.5),
        };
    }

    initParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            const p = this.createParticle();
            p.originalAlpha = p.alpha;
            p.startX = p.x;
            this.count++;
            this.particles[this.count] = p;
        }
    }

    updateParticle(particle) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.time++;
        particle.alpha = particle.originalAlpha * particle.life + Math.sin(particle.time * particle.twinkleSpeed) * particle.twinkleAmount;
        particle.life -= particle.decay;

        if (particle.x > this.w + 10 || particle.life <= 0) {
            this.resetParticle(particle);
        }
    }

    resetParticle(particle) {
        particle.x = this.lightBarX + this.randomFloat(-1, 1);
        particle.y = this.randomFloat(0, this.h);
        particle.vx = this.randomFloat(-1.5, 3.5);
        particle.vy = this.randomFloat(-0.5, 0.5);
        particle.alpha = this.randomFloat(0.6, 1);
        particle.originalAlpha = particle.alpha;
        particle.life = 1.0;
        particle.time = 0;
        particle.startX = particle.x;
    }

    drawParticle(particle) {
        if (particle.life <= 0) return;
        let fadeAlpha = 1;
        if (particle.y < this.fadeZone) fadeAlpha = particle.y / this.fadeZone;
        else if (particle.y > this.h - this.fadeZone) fadeAlpha = (this.h - particle.y) / this.fadeZone;

        fadeAlpha = Math.max(0, Math.min(1, fadeAlpha));
        this.ctx.globalAlpha = particle.alpha * fadeAlpha;
        this.ctx.drawImage(this.gradientCanvas, particle.x - particle.radius, particle.y - particle.radius, particle.radius * 2, particle.radius * 2);
    }

    drawLightBar() {
        const verticalGradient = this.ctx.createLinearGradient(0, 0, 0, this.h);
        verticalGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        verticalGradient.addColorStop(this.fadeZone / this.h, "rgba(255, 255, 255, 1)");
        verticalGradient.addColorStop(1 - this.fadeZone / this.h, "rgba(255, 255, 255, 1)");
        verticalGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        this.ctx.globalCompositeOperation = "lighter";

        const targetGlowIntensity = this.scanningActive ? 3.5 : 2.5;
        this.currentGlowIntensity += (targetGlowIntensity - this.currentGlowIntensity) * this.transitionSpeed;

        const glowIntensity = this.currentGlowIntensity;
        const lineWidth = this.lightBarWidth;
        const glow1Alpha = this.scanningActive ? 1.0 : 0.8;
        const glow2Alpha = this.scanningActive ? 0.8 : 0.6;

        const coreGradient = this.ctx.createLinearGradient(this.lightBarX - lineWidth / 2, 0, this.lightBarX + lineWidth / 2, 0);
        coreGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        coreGradient.addColorStop(0.3, `rgba(255, 255, 255, ${0.9 * glowIntensity})`);
        coreGradient.addColorStop(0.5, `rgba(255, 255, 255, ${1 * glowIntensity})`);
        coreGradient.addColorStop(0.7, `rgba(255, 255, 255, ${0.9 * glowIntensity})`);
        coreGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = coreGradient;

        const radius = 15;
        this.ctx.beginPath();
        if (this.ctx.roundRect) {
            this.ctx.roundRect(this.lightBarX - lineWidth / 2, 0, lineWidth, this.h, radius);
        } else {
            this.ctx.rect(this.lightBarX - lineWidth / 2, 0, lineWidth, this.h);
        }
        this.ctx.fill();

        const glow1Gradient = this.ctx.createLinearGradient(this.lightBarX - lineWidth * 2, 0, this.lightBarX + lineWidth * 2, 0);
        glow1Gradient.addColorStop(0, "rgba(96, 165, 250, 0)");
        glow1Gradient.addColorStop(0.5, `rgba(191, 219, 254, ${0.8 * glowIntensity * 0.4})`);
        glow1Gradient.addColorStop(1, "rgba(96, 165, 250, 0)");

        this.ctx.globalAlpha = glow1Alpha;
        this.ctx.fillStyle = glow1Gradient;
        if (this.ctx.roundRect) {
            this.ctx.beginPath();
            this.ctx.roundRect(this.lightBarX - lineWidth * 2, 0, lineWidth * 4, this.h, 25);
            this.ctx.fill();
        }

        const glow2Gradient = this.ctx.createLinearGradient(this.lightBarX - lineWidth * 4, 0, this.lightBarX + lineWidth * 4, 0);
        glow2Gradient.addColorStop(0, "rgba(59, 130, 246, 0)");
        glow2Gradient.addColorStop(0.5, `rgba(59, 130, 246, ${0.4 * glowIntensity * 0.4})`);
        glow2Gradient.addColorStop(1, "rgba(59, 130, 246, 0)");

        this.ctx.globalAlpha = glow2Alpha;
        this.ctx.fillStyle = glow2Gradient;
        if (this.ctx.roundRect) {
            this.ctx.beginPath();
            this.ctx.roundRect(this.lightBarX - lineWidth * 4, 0, lineWidth * 8, this.h, 35);
            this.ctx.fill();
        }

        this.ctx.globalCompositeOperation = "destination-in";
        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = verticalGradient;
        this.ctx.fillRect(0, 0, this.w, this.h);
    }

    render() {
        const targetIntensity = this.scanningActive ? this.scanTargetIntensity : this.baseIntensity;
        this.currentIntensity += (targetIntensity - this.currentIntensity) * this.transitionSpeed;
        this.intensity = this.currentIntensity;

        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.clearRect(0, 0, this.w, this.h);

        this.drawLightBar();

        this.ctx.globalCompositeOperation = "lighter";
        for (let i = 1; i <= this.count; i++) {
            if (this.particles[i]) {
                this.updateParticle(this.particles[i]);
                this.drawParticle(this.particles[i]);
            }
        }
    }

    animate() {
        this.render();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    setScanningActive(active) {
        this.scanningActive = active;
    }
}

export function initCardsAnimation() {
    new CardStreamController();
    // new ParticleSystem(); // Removed background particles as per request
    const scanner = new ParticleScanner();

    window.setScannerScanning = (active) => {
        if (scanner) scanner.setScanningActive(active);
    };
}
