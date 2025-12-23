let students = JSON.parse(localStorage.getItem("students")) || [];
const body = document.getElementById("tableBody");

function save() {
  localStorage.setItem("students", JSON.stringify(students));
}

if (document.getElementById("studentForm")) {
  studentForm.onsubmit = e => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = () => {
      students.push({
        usn: usn.value, name: name.value, class: class.value,
        branch: branch.value, cgpa: cgpa.value,
        email: email.value, phone: phone.value,
        photo: reader.result || "assets/student.png"
      });
      save();
      alert("Student Added!");
      studentForm.reset();
    };
    reader.readAsDataURL(photo.files[0] || new Blob());
  };
}

function render(list = students) {
  if (!body) return;
  body.innerHTML = "";
  list.forEach((s,i)=>{
    body.innerHTML += `
      <tr>
        <td><img src="${s.photo}"></td>
        <td>${s.usn}</td><td>${s.name}</td><td>${s.class}</td>
        <td>${s.branch}</td><td>${s.cgpa}</td>
        <td>${s.email}</td><td>${s.phone}</td>
        <td>
          <button onclick="del(${i})">Delete</button>
        </td>
      </tr>`;
  });
}

function del(i){
  if(confirm("Delete record?")){
    students.splice(i,1);
    save(); render();
  }
}

if(document.getElementById("search")){
  search.oninput = ()=>{
    const q = search.value.toLowerCase();
    render(students.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.usn.toLowerCase().includes(q) ||
      s.branch.toLowerCase().includes(q)
    ));
  }
}

render();
