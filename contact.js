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

// Helper for calendar days
function getDaysInMonth() {
    // Just a static representation for Feb 2026 as per user mock or current date
    // Let's mimic the structure: mix of enabled/disabled days
    let days = [];
    for (let i = 1; i <= 28; i++) {
        days.push(i);
    }
    return days;
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
      <a href="/message.html" class="contact-link"><button class="subscribe-btn">Contact</button></a>
      <div class="lang-switch">
        <span class="lang-option active">FR</span>
        <span class="lang-option">EN</span>
      </div>
    </div>
  </nav>

  <main class="hero-content" style="max-width: 1200px; padding-top: 2rem;">
    
    <div class="contact-header" style="margin-bottom: 3rem;">
        <div class="back-btn-wrapper" style="position:absolute; left:0; top:0;">
             <a href="/" class="back-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
             </a>
        </div>
        
        <h2 style="font-size: 1.5rem; color: #60a5fa; margin-bottom: 1rem; font-weight:600;">Réservez un appel de 15 min.</h2>
        <h1 style="font-size: 2.5rem; margin: 0; line-height: 1.2;">Nous étudierons votre projet.</h1>
    </div>

    <!-- Booking Interface -->
    <div class="booking-container">
        
        <!-- Sidebar Info -->
        <div class="booking-sidebar">
            <div class="company-logo-small">
                 <span class="nav-logo-text" style="font-size: 1.2rem;">
                    <span>&gt;</span><span style="color: #60a5fa; -webkit-text-fill-color: #60a5fa;">EVA</span><span style="color: #60a5fa; -webkit-text-fill-color: #60a5fa;">|</span>
                 </span>
            </div>
            <div class="intro-text">
                <h3 class="intro-title">Introduction EVA Studio</h3>
                <p class="intro-desc">
                    Nous allons échanger pendant ~15 mins pour :<br>
                    - Faire les présentations<br>
                    - Comprendre vos objectifs business<br>
                    - Partager notre process de travail
                </p>
            </div>
            
            <div class="booking-meta">
                <div class="meta-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    15 min
                </div>
                <div class="meta-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3"></path><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    Google Meet
                </div>
            </div>
        </div>

        <!-- Calendar View -->
        <div class="booking-calendar">
            <div class="calendar-header">
                <span class="current-month">Février 2026</span>
                <div class="month-nav">
                    <button class="nav-arrow">&lt;</button>
                    <button class="nav-arrow">&gt;</button>
                </div>
            </div>
            
            <div class="calendar-grid">
                <div class="day-label">DIM</div>
                <div class="day-label">LUN</div>
                <div class="day-label">MAR</div>
                <div class="day-label">MER</div>
                <div class="day-label">JEU</div>
                <div class="day-label">VEN</div>
                <div class="day-label">SAM</div>
                
                <!-- Generating days -->
                <div class="calendar-day disabled"></div>
                <div class="calendar-day disabled">1</div>
                <div class="calendar-day disabled">2</div>
                <div class="calendar-day">3</div>
                <div class="calendar-day selected">4</div>
                <div class="calendar-day">5</div>
                <div class="calendar-day">6</div>
                <div class="calendar-day disabled">7</div>
                
                <div class="calendar-day disabled">8</div>
                <div class="calendar-day">9</div>
                <div class="calendar-day">10</div>
                <div class="calendar-day">11</div>
                <div class="calendar-day">12</div>
                <div class="calendar-day">13</div>
                <div class="calendar-day disabled">14</div>
                
                <div class="calendar-day disabled">15</div>
                <div class="calendar-day">16</div>
                <div class="calendar-day">17</div>
                <div class="calendar-day">18</div>
                <div class="calendar-day">19</div>
                <div class="calendar-day">20</div>
                <div class="calendar-day disabled">21</div>

                <div class="calendar-day disabled">22</div>
                <div class="calendar-day">23</div>
                <div class="calendar-day">24</div>
                <div class="calendar-day">25</div>
                <div class="calendar-day">26</div>
                <div class="calendar-day">27</div>
                <div class="calendar-day disabled">28</div>
            </div>
        </div>

        <!-- Time Slots -->
        <div class="booking-slots">
            <div class="slots-header">
                mer. 04
            </div>
            <div class="slots-list">
                <button class="time-slot">09:00</button>
                <button class="time-slot">09:30</button>
                <button class="time-slot">10:00</button>
                <button class="time-slot">10:30</button>
                <button class="time-slot">11:00</button>
                <button class="time-slot">11:30</button>
                <button class="time-slot">14:00</button>
                <button class="time-slot">14:30</button>
                <button class="time-slot">15:00</button>
                <button class="time-slot">15:30</button>
                <button class="time-slot">16:00</button>
                <button class="time-slot">16:30</button>
            </div>
        </div>

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
