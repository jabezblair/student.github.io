let students = JSON.parse(localStorage.getItem("students")) || [];
const tbody = document.getElementById("tableBody");
const countEl = document.getElementById("count");
const searchInput = document.getElementById("search");

function render(data = students) {
  tbody.innerHTML = "";
  data.forEach((s, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${s.roll}</td>
        <td>👨‍🎓 ${s.name}</td>
        <td>${s.course}</td>
        <td>${s.marks}</td>
        <td>${s.grade}</td>
        <td>
          <button class="action-btn edit" onclick="edit(${i})">Edit</button>
          <button class="action-btn delete" onclick="del(${i})">Delete</button>
        </td>
      </tr>`;
  });
  localStorage.setItem("students", JSON.stringify(students));
  countEl.textContent = students.length;
}

document.getElementById("studentForm").onsubmit = e => {
  e.preventDefault();
  const s = {
    roll: roll.value,
    name: name.value,
    course: course.value,
    marks: marks.value,
    grade: grade.value
  };
  const i = students.findIndex(x => x.roll === s.roll);
  if (i >= 0) students[i] = s;
  else students.push(s);
  e.target.reset();
  render();
};

function edit(i) {
  const s = students[i];
  roll.value = s.roll;
  name.value = s.name;
  course.value = s.course;
  marks.value = s.marks;
  grade.value = s.grade;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function del(i) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(i, 1);
    render();
  }
}

searchInput.oninput = () => {
  const q = searchInput.value.toLowerCase();
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.course.toLowerCase().includes(q) ||
    s.roll.includes(q)
  );
  render(filtered);
};

render();
