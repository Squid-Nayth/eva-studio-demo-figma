import './style.css'

// --- Utility Functions ---

function generateTexture() {
  const chars = '0123456789ABCDEF+/*-.,:;[]{}<>=?@#';
  let texture = '';
  for (let i = 0; i < 100; i++) {
    texture += chars.charAt(Math.floor(Math.random() * chars.length)) + '<br>';
  }
  return texture;
}

function initTexture() {
  const columns = document.querySelectorAll('.texture-column');
  columns.forEach(col => {
    col.innerHTML = generateTexture();
  });
}

// --- Page-Specific Logic ---

// Home Page: Typewriter
function initHome() {
  const titleEl = document.getElementById('typewriter');
  if (!titleEl) return;

  const prefix = ">";
  const textToType = "EVA";
  const fullText = prefix + textToType;
  let typeIdx = 0;

  const toBlue = (str) => `<span style="color: #60a5fa; -webkit-text-fill-color: #60a5fa;">` + str + `</span>`;
  const toWhite = (str) => `<span style="color: white; -webkit-text-fill-color: white;">` + str + `</span>`;

  titleEl.innerHTML = toBlue('<span class="cursor">|</span>');

  function typeWriter() {
    if (!titleEl) return;

    let currentHTML = "";
    if (typeIdx < fullText.length) {
      const currentStr = fullText.slice(0, typeIdx + 1);
      let whitePart = "";
      let bluePart = "";

      if (currentStr.startsWith(">")) {
        whitePart = ">";
        if (currentStr.length > 1) {
          bluePart = currentStr.slice(1);
        }
      } else {
        bluePart = currentStr;
      }

      currentHTML = toWhite(whitePart) + toBlue(bluePart) + toBlue('<span class="cursor">|</span>');
      titleEl.innerHTML = currentHTML;

      typeIdx++;
      setTimeout(typeWriter, 200 + Math.random() * 100);
    } else {
      titleEl.innerHTML = toWhite(">") + toBlue("EVA") + toBlue('<span class="cursor blink">|</span>');
    }
  }

  setTimeout(typeWriter, 800);
}

// Contact Page: Booking Logic (Placeholder for interactivity if needed)
function initContact() {
  const bookingContainer = document.querySelector('.booking-container');
  if (!bookingContainer) return;

  // Add event listeners for time slots or calendar days if required
  const slots = document.querySelectorAll('.time-slot');
  slots.forEach(slot => {
    slot.addEventListener('click', () => {
      slots.forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
    });
  });

  const days = document.querySelectorAll('.calendar-day:not(.disabled)');
  days.forEach(day => {
    day.addEventListener('click', () => {
      days.forEach(d => d.classList.remove('selected'));
      day.classList.add('selected');
    });
  });
}

// Message Page: Form Handling
function initMessage() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    console.log('Form submitted:', Object.fromEntries(formData));
    alert('Merci pour votre message ! Nous vous recontacterons bientôt.');
    form.reset();
  });
}

// --- App Initialization ---

document.addEventListener('DOMContentLoaded', () => {
  initTexture();
  initHome();
  initContact();
  initMessage();
});
