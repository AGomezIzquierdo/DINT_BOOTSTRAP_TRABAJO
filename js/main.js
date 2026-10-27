// =========================================================
// VITALIA - JavaScript común a todas las páginas
// =========================================================
document.addEventListener("DOMContentLoaded", () => {

  // 1. Animación de aparición al hacer scroll (IntersectionObserver)
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        observador.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".aparecer").forEach((el) => observador.observe(el));

  // 2. Tooltips de Bootstrap (hay que activarlos con JS)
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
    .forEach((el) => new bootstrap.Tooltip(el));

  // 3. Año actual en el pie de página
  const anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();

  // 4. Galería: filtro por categoría con nav-pills
  const botonesFiltro = document.querySelectorAll("[data-filtro]");
  botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", () => {
      botonesFiltro.forEach((b) => b.classList.remove("active"));
      boton.classList.add("active");
      const filtro = boton.dataset.filtro;
      document.querySelectorAll(".item-galeria").forEach((item) => {
        const mostrar = filtro === "todas" || item.dataset.categoria === filtro;
        item.classList.toggle("d-none", !mostrar);
      });
    });
  });

  // 5. Galería: abrir la foto pulsada dentro del modal
  const modalFoto = document.getElementById("modalFoto");
  if (modalFoto) {
    modalFoto.addEventListener("show.bs.modal", (evento) => {
      const origen = evento.relatedTarget;           // la figura pulsada
      modalFoto.querySelector(".modal-title").textContent = origen.dataset.titulo;
      modalFoto.querySelector("img").src = origen.dataset.imagen;
      modalFoto.querySelector("img").alt = origen.dataset.titulo;
      modalFoto.querySelector(".modal-body p").textContent = origen.dataset.descripcion;
    });
  }

  // 6. Contacto: validación del formulario y aviso con un Toast
  const formulario = document.getElementById("formContacto");
  if (formulario) {
    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault();
      if (!formulario.checkValidity()) {
        formulario.classList.add("was-validated");
        return;
      }
      bootstrap.Toast.getOrCreateInstance(document.getElementById("toastEnviado")).show();
      formulario.reset();
      formulario.classList.remove("was-validated");
    });
  }
});
