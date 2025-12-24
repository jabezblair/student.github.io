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
const form = document.getElementById("studentForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Capture basic info
    const student = {
        usn: document.getElementById("usn").value,
        name: document.getElementById("name").value,
        class: document.getElementById("class").value,
        branch: document.getElementById("branch").value,
        cgpa: document.getElementById("cgpa").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        photo: document.getElementById("photo").files[0] ? document.getElementById("photo").files[0].name : "",
        // Capture marks
        marks: {
            subject1: Number(document.getElementById("marks1").value),
            subject2: Number(document.getElementById("marks2").value),
            subject3: Number(document.getElementById("marks3").value)
        }
    };

    console.log(student); // Replace this with saving to storage or sending to backend

    // Optional: Clear form after adding
    form.reset();
    alert("Student record added successfully!");
});

render();
// Sample Student Data
const students = [
    {
        photo: "https://i.pravatar.cc/50?img=1",
        usn: "1CR24CS120",
        name: "Alice Johnson",
        class: "CS-4A",
        branch: "Computer Science",
        cgpa: 8.5,
        email: "alice.johnson@example.com",
        phone: "9876543210",
        marks: { subject1: 78, subject2: 85, subject3: 92 }
    },
    {
        photo: "https://i.pravatar.cc/50?img=2",
        usn: "1CR24CS125",
        name: "Bob Smith",
        class: "CS-4A",
        branch: "Computer Science",
        cgpa: 7.9,
        email: "bob.smith@example.com",
        phone: "9123456780",
        marks: { subject1: 65, subject2: 70, subject3: 80 }
    },
    {
        photo: "https://i.pravatar.cc/50?img=3",
        usn: "1CR24CS130",
        name: "Charlie Davis",
        class: "CS-4A",
        branch: "Computer Science",
        cgpa: 9.1,
        email: "charlie.davis@example.com",
        phone: "9988776655",
        marks: { subject1: 90, subject2: 88, subject3: 94 }
    },
    {
        photo: "https://i.pravatar.cc/50?img=4",
        usn: "1CR24CS135",
        name: "Diana Evans",
        class: "CS-4A",
        branch: "Computer Science",
        cgpa: 8.0,
        email: "diana.evans@example.com",
        phone: "9871122334",
        marks: { subject1: 75, subject2: 82, subject3: 78 }
    },
    {
        photo: "https://i.pravatar.cc/50?img=5",
        usn: "1CR24CS140",
        name: "Edward Harris",
        class: "CS-4A",
        branch: "Computer Science",
        cgpa: 8.7,
        email: "edward.harris@example.com",
        phone: "9112233445",
        marks: { subject1: 88, subject2: 90, subject3: 85 }
    }
];

// Function to render table
function renderTable(data) {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = ""; // Clear previous rows

    data.forEach((student, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td><img src="${student.photo}" alt="photo" width="50"></td>
            <td>${student.usn}</td>
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.branch}</td>
            <td>${student.cgpa}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Initial Render
renderTable(students);

// Search Functionality
document.getElementById("search").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filtered = students.filter(s =>
        s.usn.toLowerCase().includes(query) ||
        s.name.toLowerCase().includes(query) ||
        s.branch.toLowerCase().includes(query)
    );
    renderTable(filtered);
});

// Dummy functions for Edit/Delete
function editStudent(index) {
    alert("Edit function for " + students[index].name);
}

function deleteStudent(index) {
    if(confirm("Are you sure you want to delete " + students[index].name + "?")) {
        students.splice(index,1);
        renderTable(students);
    }
}


