// === JS/Registro.js ===
import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword, updateProfile }
  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { doc, setDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Llama a esta función desde el <form onsubmit="formulario(event)">
export async function formulario(event) {
  event.preventDefault();

  const usuario = document.getElementById("Usuario").value.trim();
  const clave   = document.getElementById("Contra").value.trim();
  const nombre  = document.getElementById("nombre").value.trim();
  const correo  = document.getElementById("Correo").value.trim();

  try {
    // 1) Crear cuenta con correo + contraseña
    const cred = await createUserWithEmailAndPassword(auth, correo, clave);

    // 2) Poner displayName (nombre visible)
    await updateProfile(cred.user, { displayName: nombre });

    // 3) Guardar PERFIL en Firestore para mapear usuario -> correo
    await setDoc(doc(db, "perfiles", cred.user.uid), {
      uid: cred.user.uid,
      usuario,     // << nombre de usuario
      nombre,
      correo,      // << correo real usado en Auth
      creado: serverTimestamp()
    });

    alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
    window.location.href = "login.html";
  } catch (err) {
    alert("⚠️ Error al registrar: " + err.message);
  }
}

// Para que funcione con onsubmit="formulario(event)"
window.formulario = formulario;
