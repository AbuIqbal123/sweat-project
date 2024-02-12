import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "@nextui-org/react";
import "./exportPDF.css";
import html2canvas from "html2canvas"; // Make sure this path is correct based on your project structure

const ExportPDFButton = ({ moduleData, studyStyle }) => {
  const toTitleCase = (str) =>
    str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  const generatePDFDocument = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      format: "a3",
    });
    doc.setFontSize(10);
    doc.text("Module Data Calendar", 10, 10);

    const tableColumns = [
      "Module Code",
      ...Array.from({ length: 15 }, (_, i) => `Week ${i + 1}`),
    ];

    const moduleRow = new Array(16).fill("");
    moduleRow[0] = moduleData.moduleCode;

    moduleData.coursework.forEach((cw) => {
      const deadlineWeek = cw.deadline - 1;
      if (deadlineWeek >= 0 && deadlineWeek < 15) {
        moduleRow[deadlineWeek + 1] = `Assessment Type: ${toTitleCase(
          cw.assessmentType
        )}\n\nRecommended Study Hours: ${cw.studyHours.toFixed(
          2
        )}\n\nWeightage: ${cw.weightage}%`;
      }
    });

    const tableData = [moduleRow];

    // Example of adding a table and capturing its final Y position
    doc.autoTable({
      head: [tableColumns],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 9 },
      columnStyles: { 0: { cellWidth: "auto" } },
      margin: { top: 20, right: 15, bottom: 20, left: 15 },
    });

    const finalY = doc.lastAutoTable.finalY || 20; // Fallback to 30 if autoTable wasn't used
    return { doc, finalY };
  };

  const captureChartAndAddToPDF = async (
    doc,
    startY,
    moduleCode,
    studyStyle
  ) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const graphElement = document.querySelector(".chart-container");
    if (!graphElement) {
      console.error("Chart element not found");
      return;
    }

    const canvas = await html2canvas(graphElement);
    const chartDataURL = canvas.toDataURL("image/png");
    const imgProps = doc.getImageProperties(chartDataURL);

    let imgWidth = 180; // Adjust this width to fit your graph width
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    const xPos = (pageWidth - imgWidth) / 2; // Center graph horizontally

    // Calculate the space required for the titles and adjust startY accordingly
    const titleSpace = 10; // Space for the titles above the graph
    startY += titleSpace; // Make room for the titles

    // Check if the titles and graph fit on the current page, if not, add a new page
    if (startY + imgHeight + titleSpace > pageHeight) {
      doc.addPage();
      startY = 10; // Start from the top of the new page
    }

    // Title positioning
    const titleY = startY - 5; // Slightly above where the graph will be
    const moduleTitle = `Module: ${moduleCode}`;
    const studyStyleFormatted = toTitleCase(studyStyle);
    const studyStyleTitle = `Study Style: ${studyStyleFormatted}`;

    // Calculate title widths
    const moduleTitleWidth = doc.getTextWidth(moduleTitle);
    const studyStyleTitleWidth = doc.getTextWidth(studyStyleTitle);

    // Calculate the starting X positions for the titles to center them above the graph
    const moduleTitleX =
      xPos + imgWidth / 2 - (moduleTitleWidth + studyStyleTitleWidth) / 2;
    const studyStyleTitleX = moduleTitleX + moduleTitleWidth + 5; // 5 units apart from each other

    // Draw the titles
    doc.setFontSize(10);
    doc.text(moduleTitle, moduleTitleX, titleY);
    doc.text(studyStyleTitle, studyStyleTitleX, titleY);

    // Now, place the graph
    const graphStartY = startY;

    // Add the graph image to the PDF
    try {
      doc.addImage(chartDataURL, "PNG", xPos, startY, imgWidth, imgHeight);
    } catch (error) {
      console.error("Error adding image to PDF:", error.message);
    }
  };

  const previewPDF = async () => {
    const { doc, finalY } = await generatePDFDocument();
    await captureChartAndAddToPDF(
      doc,
      finalY + 10,
      moduleData.moduleCode,
      studyStyle
    ); // Adding 10 for some spacing
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  };

  const downloadPDF = async () => {
    const { doc, finalY } = await generatePDFDocument();
    await captureChartAndAddToPDF(
      doc,
      finalY + 10,
      moduleData.moduleCode,
      studyStyle
    ); // Adding 10 for some spacing
    doc.save("module_data.pdf");
  };

  return (
    <div className="buttonContainer">
      <Button
        auto
        shadow
        color="primary"
        onClick={previewPDF}
        className="previewButton"
      >
        Preview PDF
      </Button>
      <Button
        auto
        shadow
        color="success"
        onClick={downloadPDF}
        className="downloadButton"
      >
        Download PDF
      </Button>
    </div>
  );
};

export default ExportPDFButton;
