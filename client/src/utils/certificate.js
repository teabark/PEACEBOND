import { jsPDF } from "jspdf";

export function downloadCertificate({ completedActions, peaceBond, progress }) {
  const doc = new jsPDF();
  const completedCount = completedActions.filter(Boolean).length;
  const generatedDate = new Date().toLocaleDateString();

  doc.setFillColor(247, 239, 228);
  doc.rect(0, 0, 210, 297, "F");

  doc.setTextColor(47, 36, 29);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("PeaceBond Completion Certificate", 105, 36, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text("This certificate honors a completed path of repair and reconciliation.", 105, 48, {
    align: "center",
  });

  doc.setDrawColor(184, 116, 79);
  doc.line(30, 58, 180, 58);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("PeaceBond category", 24, 78);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(peaceBond.category.replaceAll("_", " "), 24, 88);

  doc.setFont("helvetica", "bold");
  doc.text("Rehabilitatee name", 24, 106);

  doc.setFont("helvetica", "normal");
  doc.text(peaceBond.fighterName, 24, 116, { maxWidth: 160 });

  doc.setFont("helvetica", "bold");
  doc.text("Community and skills", 24, 134);

  doc.setFont("helvetica", "normal");
  doc.text(
    `${peaceBond.communityType || "General community"} - ${
      peaceBond.skills || "skills not recorded"
    }`,
    24,
    144,
    { maxWidth: 160 }
  );

  doc.setFont("helvetica", "bold");
  doc.text("Original harm description", 24, 162);

  doc.setFont("helvetica", "normal");
  doc.text(peaceBond.harmDescription, 24, 172, { maxWidth: 160 });

  doc.setFont("helvetica", "bold");
  doc.text("Completed repair actions", 24, 196);

  doc.setFont("helvetica", "normal");
  peaceBond.repairActions.forEach((action, index) => {
    const status = completedActions[index] ? "Complete" : "Pending";
    doc.text(`${index + 1}. ${status} - ${action}`, 24, 208 + index * 10, {
      maxWidth: 160,
    });
  });

  doc.setFont("helvetica", "bold");
  doc.text("Community ritual", 24, 240);

  doc.setFont("helvetica", "normal");
  doc.text(peaceBond.ritual, 24, 250, { maxWidth: 160 });

  doc.setFont("helvetica", "bold");
  doc.text("Mock micro-grant", 24, 270);

  doc.setFont("helvetica", "normal");
  doc.text(
    `${peaceBond.grant.currency} ${peaceBond.grant.amount} - ${peaceBond.grant.purpose}`,
    24,
    280,
    { maxWidth: 160 }
  );

  doc.setFont("helvetica", "bold");
  doc.text(`Progress: ${progress}% (${completedCount}/3 actions)`, 24, 292);

  doc.setFont("helvetica", "normal");
  doc.text(`Generated on ${generatedDate}`, 150, 292);

  doc.save("peacebond-certificate.pdf");
}
