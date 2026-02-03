import './style.css'

// Reusing background texture logic
function generateTexture() {
    const chars = '0123456789ABCDEF+/*-.,:;[]{}<>=?@#';
    let texture = '';
    for (let i = 0; i < 100; i++) {
        texture += chars.charAt(Math.floor(Math.random() * chars.length)) + '<br>';
    }
    return texture;
}

document.querySelector('#app').innerHTML = `
  <div class="bg-texture">
    <div class="texture-column" style="animation-duration: 20s;">${generateTexture()}</div>
    <div class="texture-column" style="margin-top: 50px; animation-duration: 25s; animation-name: scrollTextureReverse;">${generateTexture()}</div>
    <div class="texture-column" style="animation-duration: 18s;">${generateTexture()}</div>
    <div class="texture-column" style="margin-top: 100px; animation-duration: 30s; animation-name: scrollTextureReverse;">${generateTexture()}</div>
    <div class="texture-column" style="animation-duration: 22s;">${generateTexture()}</div>
  </div>

  <main class="hero-content" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh;">
    <h1 class="main-title" style="font-size: 10rem; margin: 0; line-height: 1;">404</h1>
    <p style="font-size: 1.5rem; color: var(--color-text-muted); margin-bottom: 2rem;">Cette page est introuvable ou en cours de développement.</p>
    <a href="/" class="btn btn-primary">Retour à l'accueil</a>
  </main>
`
