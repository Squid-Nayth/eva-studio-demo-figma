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

  <nav class="nav">
    <div class="menu-icon">
      <a href="/" style="text-decoration:none;">
        <span class="nav-logo-text">
            <span>&gt;</span><span style="color: #60a5fa; -webkit-text-fill-color: #60a5fa;">EVA</span><span style="color: #60a5fa; -webkit-text-fill-color: #60a5fa;">|</span>
        </span>
      </a>
    </div>
    <div class="user-actions">
      <a href="/404.html" style="margin-right: 0; cursor: pointer; text-decoration: none; color: inherit;">À propos</a>
      <a href="/message.html" style="text-decoration:none;"><button class="subscribe-btn">Contact</button></a>
      <div class="lang-switch">
        <span class="lang-option active">FR</span>
        <span class="lang-option">EN</span>
      </div>
    </div>
  </nav>

  <main class="hero-content" style="max-width: 800px; text-align: left; padding-top: 5rem;">
    
    <div class="back-btn-wrapper" style="position: absolute; left: -100px; top: 0; z-index: 100;">
         <a href="/" class="back-link">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
         </a>
    </div>

    <h1 style="font-size: 3rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">Contactez-nous !</h1>
    <p style="color: var(--color-text-muted); font-size: 1.1rem; margin-bottom: 3rem;">
        N'hésitez pas à nous contacter pour des collaborations ou simplement pour un bonjour amical
    </p>

    <div class="form-container" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 2rem;">
        <form>
            <div style="margin-bottom: 2rem;">
                <label style="display: block; color: #fff; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.8rem;">Votre Email</label>
                <input type="email" placeholder="Votre Email" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; color: #fff; font-family: var(--font-main); font-size: 1rem; box-sizing: border-box;" />
            </div>

            <div style="margin-bottom: 2rem;">
                <label style="display: block; color: #fff; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.8rem;">Votre Message</label>
                <textarea placeholder="Votre Message" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 1rem; color: #fff; font-family: var(--font-main); font-size: 1rem; min-height: 200px; resize: vertical; box-sizing: border-box;"></textarea>
            </div>

            <button type="submit" class="btn-primary" style="display: flex; align-items: center; gap: 0.8rem; padding: 0.8rem 2rem; border-radius: 8px; border: none; background: #60a5fa; color: #000; font-weight: 700; cursor: pointer; font-family: var(--font-main); transition: all 0.2s;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(45deg);"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                Envoyer
            </button>
        </form>
    </div>

  </main>

  <footer class="footer">
    <div class="footer-content">
        <div class="footer-brand">
            <span class="nav-logo-text" style="font-size: 1.5rem;">
                <span style="color:white">&gt;</span><span style="color: #60a5fa; -webkit-text-fill-color: #60a5fa;">EVA</span><span style="color: #60a5fa; -webkit-text-fill-color: #60a5fa;">|</span>
            </span>
            <div class="footer-socials">
                <a href="#" class="social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" class="social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" class="social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
            </div>
        </div>
        <div class="footer-column">
            <h4>Ressources</h4>
            <ul class="footer-links">
                <li><a href="/realisations.html">Nos Projets</a></li>
                <li><a href="/404.html">À propos</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">FAQ</a></li>
            </ul>
        </div>
        <div class="footer-column">
            <h4>Légal</h4>
            <ul class="footer-links">
                <li><a href="#">Mentions Légales</a></li>
                <li><a href="#">Confidentialité</a></li>
            </ul>
        </div>
    </div>
    <div class="footer-bottom">
        <p>© 2026 EVA Studio. Built with Figma.</p>
        <div class="footer-legal-links">
            <a href="#" class="btn-footer">Paramètres des cookies</a>
        </div>
    </div>
  </footer>
`
