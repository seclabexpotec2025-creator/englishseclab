   function formulario(event) {
       event.preventDefault(); 

       let td = document.querySelectorAll("td");

       let nombre = document.getElementById("nombre");
       let user = document.getElementById("Usuario");
       let correo = document.getElementById("Correo");
       let contra = document.getElementById("Contra");

window.location.href = "login.html"; 
   }

   function vaciar(elemento) {
       alert("Por favor, escribe un texto válido.");
       elemento.value = "";
   }