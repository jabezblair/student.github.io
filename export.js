function exportExcel() {
    // CSV Header
    let csv = "USN,Name,Class,Branch,CGPA,Email,Phone,Marks(S1,S2,S3),Total,Average\n";

    students.forEach(s => {
        const total = s.marks.subject1 + s.marks.subject2 + s.marks.subject3;
        const average = (total / 3).toFixed(2);
        csv += `${s.usn},${s.name},${s.class},${s.branch},${s.cgpa},${s.email},${s.phone},` +
               `${s.marks.subject1}|${s.marks.subject2}|${s.marks.subject3},${total},${average}\n`;
    });

    // Create and download CSV
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "students.csv";
    a.click();
}
