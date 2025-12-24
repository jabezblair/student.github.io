console.log("MAIN.JS LOADED");

// ===== LOAD STUDENTS =====
let students = JSON.parse(localStorage.getItem("students"));

if (!students || students.length === 0) {
    students = [
        {
            photo: "https://i.pravatar.cc/50?img=1",
            usn: "1CR24CS120",
            name: "Alice Johnson",
            class: "CS-4A",
            branch: "Computer Science",
            cgpa: 8.5,
            email: "alice@example.com",
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
            email: "bob@example.com",
            phone: "9123456780",
            marks: { subject1: 65, subject2: 70, subject3: 80 }
        }
    ];
    localStorage.setItem("students", JSON.stringify(students));
}

// ===== SAVE =====
function save() {
    localStorage.setItem("students", JSON.stringify(students));
}

// ===== RENDER TABLE =====
function renderTable(data = students) {
    const tbody = document.getElementById("tableBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    data.forEach((s, i) => {
        const total = s.marks.subject1 + s.marks.subject2 + s.marks.subject3;
        const avg = (total / 3).toFixed(2);

        tbody.innerHTML += `
            <tr>
                <td><img src="${s.photo}"></td>
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
                    <button onclick="deleteStudent(${i})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// ===== DELETE =====
function deleteStudent(i) {
    if (confirm("Delete this student?")) {
        students.splice(i, 1);
        save();
        renderTable();
    }
}

// ===== SEARCH =====
const search = document.getElementById("search");
if (search) {
    search.addEventListener("input", () => {
        const q = search.value.toLowerCase();
        renderTable(
            students.filter(s =>
                s.usn.toLowerCase().includes(q) ||
                s.name.toLowerCase().includes(q) ||
                s.branch.toLowerCase().includes(q)
            )
        );
    });
}

// ===== INITIAL LOAD =====
document.addEventListener("DOMContentLoaded", renderTable);

