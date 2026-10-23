document.addEventListener("DOMContentLoaded", () => {
  // Menú de navegación para celulares
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".navigation");

  menuToggle.addEventListener("click", () => {
    const opened = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(opened));
    menuToggle.textContent = opened ? "✕" : "☰";
  });

  navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  // Año automático
  document.getElementById("year").textContent =
    new Date().getFullYear();

  // Fecha mínima para solicitar una cita
  const dateInput = document.getElementById("date");

  function getLocalDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  dateInput.min = getLocalDate();

  // Formulario de solicitudes por WhatsApp
  const appointmentForm =
    document.getElementById("appointment-form");

  const WHATSAPP_NUMBER = "573126020219";

  appointmentForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!appointmentForm.reportValidity()) return;

    const owner =
      document.getElementById("owner").value.trim();

    const pet =
      document.getElementById("pet").value.trim();

    const phone =
      document.getElementById("phone").value.trim();

    const service =
      document.getElementById("service").value;

    const date =
      document.getElementById("date").value;

    const additionalMessage =
      document.getElementById("message").value.trim();

    if (!owner || !pet || !phone || !service || !date) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    if (date < getLocalDate()) {
      alert("Selecciona una fecha igual o posterior a hoy.");
      return;
    }

    const formattedDate = date.split("-").reverse().join("/");

    const message = [
      "🐾 ¡Hola, Veterinaria Patitas Felices!",
      "",
      "Deseo solicitar una cita para mi mascota.",
      "",
      "👤 Nombre del propietario: " + owner,
      "🐶 Nombre de la mascota: " + pet,
      "📱 Teléfono de contacto: " + phone,
      "🩺 Servicio solicitado: " + service,
      "📅 Fecha deseada: " + formattedDate,
      "📝 Información adicional: " +
        (additionalMessage || "No se agregó información adicional."),
      "",
      "Por favor, indíquenme si hay disponibilidad.",
      "Muchas gracias."
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );
  });

  // Galería de fotografías ampliables
  const galleryItems = Array.from(
    document.querySelectorAll(".gallery-item")
  );

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");

  const closeButton =
    document.querySelector(".lightbox-close");

  const previousButton =
    document.querySelector(".lightbox-prev");

  const nextButton =
    document.querySelector(".lightbox-next");

  let currentIndex = 0;
  let lastFocusedElement = null;

  function showGalleryImage(index) {
    currentIndex =
      (index + galleryItems.length) % galleryItems.length;

    const image =
      galleryItems[currentIndex].querySelector("img");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
  }

  function openGallery(index) {
    lastFocusedElement = document.activeElement;

    showGalleryImage(index);

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    closeButton.focus();
  }

  function closeGallery() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    lightboxImage.removeAttribute("src");

    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      openGallery(index);
    });
  });

  closeButton.addEventListener("click", closeGallery);

  previousButton.addEventListener("click", () => {
    showGalleryImage(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    showGalleryImage(currentIndex + 1);
  });

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
      closeGallery();
    }
  });

  document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("open")) return;

    if (event.key === "Escape") {
      closeGallery();
    }

    if (event.key === "ArrowLeft") {
      showGalleryImage(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showGalleryImage(currentIndex + 1);
    }
  });

  // Botón para volver arriba
  const backToTop =
    document.getElementById("back-to-top");

  function updateBackToTop() {
    backToTop.classList.toggle(
      "visible",
      window.scrollY > 350
    );
  }

  window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
  );

  updateBackToTop();

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});