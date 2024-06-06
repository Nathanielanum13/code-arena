import "./jspdf.umd.min.js"

const downloadButton = document.getElementById("download")
const sectionToPrint = document.getElementById("printable-area")
downloadButton.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    console.log(jsPDF)

    doc.html("<h1>What is your name</h1>", {});
    // doc.save("a4.pdf");
    // new DOMParser()
})