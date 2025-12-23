function exportExcel(){
  let csv = "USN,Name,Class,Branch,CGPA,Email,Phone\n";
  students.forEach(s=>{
    csv += `${s.usn},${s.name},${s.class},${s.branch},${s.cgpa},${s.email},${s.phone}\n`;
  });
  const blob = new Blob([csv], {type:"text/csv"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "students.csv";
  a.click();
}
