// Load students from localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];

function exportExcel() {
    if (students.length === 0) {
        alert("No student records to export!");
        return;
    }

    // CSV Header
    let csv = "Photo,USN,Name,Class,Branch,CGPA,Email,Phone,Marks(S1|S2|S3),Total,Average\n";

    students.forEach(s => {
        // Compute total and average if marks exist
        let total = 0, average = 0;
        let marksStr = "";

        if (s.marks) {
            if (typeof s.marks === "object") {
                const arr = Object.values(s.marks).map(Number);
                total = arr.reduce((a, b) => a + b, 0);
                average = (total / arr.length).toFixed(2);
                marksStr = `${s.marks.subject1}|${s.marks.subject2}|${s.marks.subject3}`;
            } else {
                marksStr = s.marks;
            }
        }

        // Add CSV row
        csv += `"${s.photo}",${s.usn},${s.name},${s.class},${s.branch},${s.cgpa},${s.email},${s.phone},${marksStr},${total},${average}\n`;
    });

    // Create CSV Blob and download
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "students.csv";
    a.click();
}
