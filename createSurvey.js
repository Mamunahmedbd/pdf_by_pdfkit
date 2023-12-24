const fs = require("fs");
const PDFDocument = require("pdfkit");

function createSurvey(survey, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  doc
    .fontSize(15)
    .text(
      `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived ${survey.name} not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
      50,
      140,
      { align: "left" }
    );
  generateCustomerInformation(doc, survey);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

// Survey Pdf top header
function generateHeader(doc) {
  doc
    // Header left side
    .image("logo.png", 50, 45, { width: 60 })
    .fillColor("#444444")
    .fontSize(20)
    .text("Go high-level.", 50, 85)
    // header right side
    .fontSize(10)
    .text("Go high-level.", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("New York, NY, 10025", 200, 80, { align: "right" })
    .moveDown();
}

// survey information section
function generateCustomerInformation(doc, survey) {
  doc.fillColor("#444444").fontSize(20).text("Survey", 50, 310);

  generateHr(doc, 340);

  const customerInformationTop = 350;

  doc
    // left side information
    .fontSize(10)
    .text("Survey Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(survey.survey_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Email:", 50, customerInformationTop + 15)
    .text(survey.email, 150, customerInformationTop + 15)
    .text("Phone:", 50, customerInformationTop + 30)
    .text(survey.phone, 150, customerInformationTop + 30)
    .text("Survey Date:", 50, customerInformationTop + 45)
    .text(formatDate(new Date()), 150, customerInformationTop + 45)

    // right side information
    .font("Helvetica-Bold")
    .text(survey.name, 350, customerInformationTop)
    .font("Helvetica")
    .text(survey.address, 350, customerInformationTop + 15)
    .text(
      survey.city + ", " + survey.state + ", " + survey.country,
      350,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 420);
}

function generateFooter(doc) {
  doc.fontSize(10).text("Thank you for your business.", 50, 780, {
    align: "center",
    width: 500,
  });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createSurvey,
};
