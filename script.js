const CONFIG = {
  whatsappNumber: "527442320022", // WhatsApp Business de DODITECH
  contactEmail: ""     // Opcional: ejemplo contacto@doditech.mx
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year")?.replaceChildren(String(new Date().getFullYear()));

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav?.classList.toggle("open", !open);
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  }));

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const money = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });
  const calculator = document.getElementById("margin-calculator");
  const calculate = () => {
    const cost = Number(document.getElementById("lot-cost")?.value || 0);
    const pieces = Number(document.getElementById("pieces")?.value || 0);
    const price = Number(document.getElementById("sale-price")?.value || 0);
    const unit = pieces > 0 ? cost / pieces : 0;
    const revenue = pieces * price;
    const profit = revenue - cost;
    const margin = revenue > 0 ? profit / revenue * 100 : 0;
    document.getElementById("unit-cost")?.replaceChildren(money.format(unit));
    document.getElementById("profit")?.replaceChildren(money.format(profit));
    document.getElementById("margin")?.replaceChildren(`${margin.toFixed(2)}%`);
  };
  calculator?.addEventListener("input", calculate);
  calculate();

  document.querySelectorAll("[data-service]").forEach(link => link.addEventListener("click", () => {
    const select = document.getElementById("service");
    if (select) select.value = link.dataset.service || "";
  }));

  document.querySelectorAll("[data-product]").forEach(link => link.addEventListener("click", () => {
    sessionStorage.setItem("doditechProduct", link.dataset.product || "");
  }));
  const storedProduct = sessionStorage.getItem("doditechProduct");
  if (storedProduct && document.getElementById("message")) {
    document.getElementById("service").value = "Software a la medida";
    document.getElementById("message").value = `Me interesa conocer más sobre ${storedProduct}.`;
    sessionStorage.removeItem("doditechProduct");
  }

  const form = document.getElementById("quote-form");
  form?.addEventListener("submit", event => {
    event.preventDefault();
    const status = document.getElementById("form-status");
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const name = document.getElementById("name").value.trim();
    const business = document.getElementById("business").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();
    const text = `Hola DODITECH, soy ${name}${business ? ` de ${business}` : ""}.\n\nMe interesa: ${service}.\n\nNecesidad: ${message}`;

    if (CONFIG.whatsappNumber) {
      window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      status.textContent = "Tu mensaje está listo en WhatsApp.";
    } else if (CONFIG.contactEmail) {
      window.location.href = `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent(`Cotización: ${service}`)}&body=${encodeURIComponent(text)}`;
      status.textContent = "Abrimos tu aplicación de correo.";
    } else {
      navigator.clipboard?.writeText(text);
      status.textContent = "Mensaje preparado y copiado. Falta configurar el WhatsApp de DODITECH en script.js.";
    }
  });
});
