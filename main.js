// Load students from localStorage or initialize with sample data
let students = JSON.parse(localStorage.getItem("students")) || [
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
    }
];

// Save to localStorage
function save() {
    localStorage.setItem("students", JSON.stringify(students));
}

// Form submit
const form = document.getElementById("studentForm");
if(form){
    form.addEventListener("submit", function(e){
        e.preventDefault();

        const reader = new FileReader();
        const file = document.getElementById("photo").files[0] || null;

        reader.onload = function(){
            const student = {
                usn: document.getElementById("usn").value,
                name: document.getElementById("name").value,
                class: document.getElementById("class").value,
                branch: document.getElementById("branch").value,
                cgpa: parseFloat(document.getElementById("cgpa").value),
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                photo: reader.result || "https://i.pravatar.cc/50?img=10",
                marks: {
                    subject1: Number(document.getElementById("marks1").value),
                    subject2: Number(document.getElementById("marks2").value),
                    subject3: Number(document.getElementById("marks3").value)
                }
            };

            students.push(student);
            save();
            alert("Student Added Successfully!");
            form.reset();
        }

        if(file){
            reader.readAsDataURL(file);
        } else {
            reader.onload(); // Call immediately if no file
        }
    });
}

// Render Table
function renderTable(list = students){
    const tbody = document.getElementById("tableBody");
    if(!tbody) return;

    tbody.innerHTML = "";
    list.forEach((s,i)=>{
        const total = s.marks.subject1 + s.marks.subject2 + s.marks.subject3;
        const avg = (total/3).toFixed(2);

        tbody.innerHTML += `
            <tr>
                <td><img src="${s.photo}" width="50"></td>
                <td>${s.usn}</td>
                <td>${s.name}</td>
                <td>${s.class}</td>
                <td>${s.branch}</td>
                <td>${s.cgpa}</td>
                <td>${s.email}</td>
                <td>${s.phone}</td>
                <td>${s.marks.subject1}, ${s.marks.subject2}, ${s.marks.subject3}</td>
                <td>${total}</td>
                <td>${avg}</td>
                <td>
                    <button onclick="editStudent(${i})">Edit</button>
                    <button onclick="deleteStudent(${i})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Delete function
function deleteStudent(i){
    if(confirm("Delete this student?")){
        students.splice(i,1);
        save();
        renderTable();
    }
}

// Dummy Edit function
function editStudent(i){
    alert("Edit function for " + students[i].name);
}

// Search
const search = document.getElementById("search");
if(search){
    search.addEventListener("input", ()=>{
        const q = search.value.toLowerCase();
        renderTable(students.filter(s =>
            s.usn.toLowerCase().includes(q) ||
            s.name.toLowerCase().includes(q) ||
            s.branch.toLowerCase().includes(q)
        ));
    });
}

// Initial render
renderTable();
