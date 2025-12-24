let students = JSON.parse(localStorage.getItem("students")) || [];

function exportExcel() {
    if (students.length === 0) {
        alert("No student records to export!");
        return;
    }

    let csv = "Photo,USN,Name,Class,Branch,CGPA,Email,Phone,Marks(S1|S2|S3),Total,Average\n";

    students.forEach(s => {
        const total = s.marks.subject1 + s.marks.subject2 + s.marks.subject3;
        const avg = (total/3).toFixed(2);
        const marksStr = `${s.marks.subject1}|${s.marks.subject2}|${s.marks.subject3}`;

        csv += `"${s.photo}",${s.usn},${s.name},${s.class},${s.branch},${s.cgpa},${s.email},${s.phone},${marksStr},${total},${avg}\n`;
    });

    const blob = new Blob([csv], {type:"text/csv"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "students.csv";
    a.click();
}
