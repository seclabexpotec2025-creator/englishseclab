
   // ---- CARRUSEL ----
  const slides=document.getElementById('carouselSlides');
  const total=slides.children.length;
  let index=0;
  document.getElementById('prevBtn').onclick=()=>{index=(index-1+total)%total;update();}
  document.getElementById('nextBtn').onclick=()=>{index=(index+1)%total;update();}
  function update(){slides.style.transform=`translateX(-${index*100}%)`; }
  setInterval(()=>{index=(index+1)%total;update();},6000);

  // ---- LOGIN ----
  const form=document.getElementById('loginForm');
  const msg=document.getElementById('mensaje');

  form.addEventListener('submit',e=>{
    e.preventDefault();
    const usuario=document.getElementById('usuario').value.trim();
    const clave=document.getElementById('clave').value.trim();

    // Leer datos guardados
    const guardado=JSON.parse(localStorage.getItem('usuarioSecLab'));
    if(!guardado){
      msg.textContent="No hay usuarios registrados aún.";
      msg.className="mensaje error";
      msg.style.display="block";
      return;
    }

    if(usuario===guardado.usuario && clave===guardado.clave){
      msg.textContent=`¡Bienvenido, ${usuario}!`;
      msg.className="mensaje exito";
      msg.style.display="block";
      // Ejemplo: redirigir después de 2s
      setTimeout(()=>window.location.href="index.html",2000);
    } else {
      msg.textContent="⚠️ Usuario o contraseña incorrectos.";
      msg.className="mensaje error";
      msg.style.display="block";
    }
  });




localStorage.setItem("usuarioSecLab", JSON.stringify({usuario:"admin", clave:"1234"}));
