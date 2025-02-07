
async function getData() {
    const res = await fetch('/api/questions');
    if(!res.ok) throw res;
    const data = await res.json();
    return data;
}

getData()
.then((data) => {
  let categoryHTML = '';
  data.forEach(data => {
    const {category, questions} = data;
    categoryHTML += `
      <div class="category">
        <h3 class="category-title">${category}</h3>
        <div class="question-container">
          ${question(questions)}
        </div>
      </div>
    `;
  });

  document.querySelector(".wrapper").innerHTML = categoryHTML;

  function question(questions) {
    let questionsHTML = '';
    questions.forEach((q, i) => {
      questionsHTML += `
        <div class="question">
          <span class="num">${i + 1}.</span>
          <span class="q">${q}</span>
        </div>
      `
    })
    return questionsHTML;
  };

}).catch((err) => {
  console.log(err);
})