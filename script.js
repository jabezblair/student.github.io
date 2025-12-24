// Load students from localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Function to export students as CSV
function exportExcel() {
    if (students.length === 0) {
        alert("No student records to export!");
        return;
    }

    // CSV Header
    let csv = "Roll,Name,Course,Marks,Grade,Total,Average\n";

    students.forEach(s => {
        let total = 0, average = 0;

        // If marks is a number or a string of comma-separated numbers
        if (typeof s.marks === "number") {
            total = s.marks;
            average = s.marks;
        } else if (typeof s.marks === "string" && s.marks.includes(",")) {
            // Convert marks string "78,85,92" to array
            let arr = s.marks.split(",").map(Number);
            total = arr.reduce((a, b) => a + b, 0);
            average = (total / arr.length).toFixed(2);
        } else if (typeof s.marks === "object") {
            // If marks stored as {subject1, subject2, subject3}
            const arr = Object.values(s.marks).map(Number);
            total = arr.reduce((a, b) => a + b, 0);
            average = (total / arr.length).toFixed(2);
        }

        const marksStr = typeof s.marks === "object"
            ? `${s.marks.subject1}|${s.marks.subject2}|${s.marks.subject3}`
            : s.marks;

        // Add row to CSV
        csv += `${s.roll},${s.name},${s.course},${marksStr},${s.grade},${total},${average}\n`;
    });

    // Create a Blob and trigger download
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "students.csv";
    a.click();
}
