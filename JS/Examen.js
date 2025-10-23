  const quiz = document.getElementById('quiz');
    const gradeBtn = document.getElementById('gradeBtn');
    const resetBtn = document.getElementById('resetBtn');
    const showKeyBtn = document.getElementById('showKeyBtn');
    const scoreEl = document.getElementById('score');
    const feedback = document.getElementById('feedback');

    function grade(){
      let total = 35, score = 0;
      const cards = quiz.querySelectorAll('.card');
      cards.forEach((card, idx) => {
        // limpiar estilos previos
        card.querySelectorAll('.opt').forEach(l => l.classList.remove('correct','wrong'));
        const name = 'q' + (idx+1);
        const checked = quiz.querySelector('input[name="'+name+'"]:checked');
        if(checked){
          const isCorrect = checked.value === '1';
          if(isCorrect) score++;
          // marcar seleccionado
          const label = checked.closest('label');
          label.classList.add(isCorrect? 'correct' : 'wrong');
                  const inputs = card.querySelectorAll('input[type="radio"]');
        inputs.forEach(i => { if(i.value==='1'){ i.closest('label').classList.add('correct'); } });
        }
      });
      scoreEl.textContent = `Puntaje: ${score} / ${total}`;
      feedback.style.display = 'block';
      const pct = Math.round((score/total)*100);
      const msg = pct>=90? '¡Excelente!' : pct>=70? '¡Bien hecho!' : pct>=50? 'Vamos por buen camino.' : "Repasemos de nuevo.";
      feedback.innerHTML = `<strong>Resultado:</strong> ${pct}% — ${msg}`;
      document.getElementById("gradeBtn").style.display = "none";
      document.getElementById("score").style.display = "flex";
        document.getElementById("botoncito").style.display = "block";
    }

    function resetQuiz(){
      quiz.reset();
      quiz.querySelectorAll('.opt').forEach(l => l.classList.remove('correct','wrong'));
      scoreEl.textContent = 'Puntaje: 0 / 35';
      feedback.style.display = 'none';
    }

    function showKey(){
      // Resalta la opción correcta de cada pregunta
      const cards = quiz.querySelectorAll('.card');
      cards.forEach((card, idx) => {
        card.querySelectorAll('.opt').forEach(l => l.classList.remove('wrong','correct'));
        const inputs = card.querySelectorAll('input[type="radio"]');
        inputs.forEach(i => { if(i.value==='1'){ i.closest('label').classList.add('correct'); } });
      });
    }

    gradeBtn.addEventListener('click', (e)=>{ e.preventDefault(); grade(); });
    resetBtn.addEventListener('click', (e)=>{ e.preventDefault(); resetQuiz(); });
    showKeyBtn.addEventListener('click', (e)=>{ e.preventDefault(); showKey(); });