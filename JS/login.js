// === JS/login.js ===
import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { collection, getDocs, query, where, limit }
  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// ---- CARRUSEL (solo si existe en esta página) ----
const slides = document.getElementById('carouselSlides');
if (slides) {
  const total = slides.children.length;
  let index = 0;
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  const update = ()=>{ slides.style.transform = `translateX(-${index*100}%)`; };
  if (prev) prev.onclick = ()=>{ index = (index - 1 + total) % total; update(); };
  if (next) next.onclick = ()=>{ index = (index + 1) % total; update(); };
  setInterval(()=>{ index = (index + 1) % total; update(); }, 6000);
}

// ---- Resolver "usuario o correo" -> correo ----
async function resolverCorreo(entrada) {
  // Si ya parece correo, devuélvelo
  if (entrada.includes("@")) return entrada;

  // Si es "usuario", buscar su correo en Firestore
  const q = query(
    collection(db, "perfiles"),
    where("usuario", "==", entrada),
    limit(1)
  );
  const snap = await getDocs(q);
  if (snap.empty) throw new Error("USUARIO_NO_ENCONTRADO");
  const data = snap.docs[0].data();
  return data.correo;
}

// ---- LOGIN ----
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const msg  = document.getElementById('mensaje');
  if (!form || !msg) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.style.display = "none";

    const entrada = document.getElementById('usuario').value.trim(); // usuario O correo
    const clave   = document.getElementById('clave').value.trim();

    try {
      const correo = await resolverCorreo(entrada);
      await signInWithEmailAndPassword(auth, correo, clave);

      msg.textContent   = "✅ Bienvenido a SecLab";
      msg.className     = "mensaje exito";
      msg.style.display = "block";
      setTimeout(()=>window.location.href="inicio.html", 1200);
    } catch (err) {
      let texto = "⚠️ Usuario o contraseña incorrectos.";
      if (err.message === "USUARIO_NO_ENCONTRADO") {
        texto = "⚠️ Usuario no encontrado. (Prueba con tu correo)";
      }
      msg.textContent   = texto;
      msg.className     = "mensaje error";
      msg.style.display = "block";
    }
  });
});

// Botón con onclick="redirigir()" mantiene el flujo
export function redirigir(){
  const form = document.getElementById('loginForm');
  if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
}
window.redirigir = redirigir;

// (Opcional) ver si ya hay sesión activa
onAuthStateChanged(auth, (user) => {
  if (user) console.log("Sesión activa:", user.email);
});
