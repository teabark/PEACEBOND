import { jsPDF } from "jspdf";
import { getStaffName } from "./auth.js";

const PAGE = {
  height: 297,
  width: 210,
};

const COLORS = {
  clay: [184, 116, 79],
  cream: [255, 252, 247],
  line: [216, 196, 170],
  olive: [111, 125, 77],
  olivePale: [231, 235, 218],
  sand: [247, 239, 228],
  soil: [47, 36, 29],
  stone: [96, 80, 68],
};

const LAYOUT = {
  bottom: 267,
  margin: 18,
  width: 174,
};

function asText(value, fallback = "Not recorded") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return String(value);
}

function formatLabel(value) {
  return asText(value)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value) {
  const date = value ? new Date(value) : new Date();

  if (Number.isNaN(date.getTime())) {
    return new Date().toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getCompletionDate(peaceBond) {
  return formatDate(
    peaceBond.completedAt ||
      peaceBond.reportSubmittedAt ||
      peaceBond.grantReleasedAt ||
      peaceBond.updatedAt ||
      new Date()
  );
}

function getGrant(peaceBond) {
  return {
    amount: peaceBond.grant?.amount || peaceBond.grantAmount || 0,
    currency: peaceBond.grant?.currency || "USD",
    purpose: peaceBond.grant?.purpose || peaceBond.grantPurpose || "reintegration support",
  };
}

function getReportValue(peaceBond, field, fallback) {
  return asText(peaceBond.completionReport?.[field], fallback);
}

function splitLines(doc, text, maxWidth) {
  return doc.splitTextToSize(asText(text), maxWidth);
}

function drawTextLines(doc, lines, x, y, options = {}) {
  const { align = "left", lineHeight = 5 } = options;

  lines.forEach((line, index) => {
    doc.text(line, x, y + index * lineHeight, { align });
  });

  return lines.length * lineHeight;
}

function drawWrappedText(doc, text, x, y, maxWidth, options = {}) {
  const {
    align = "left",
    color = COLORS.stone,
    font = "normal",
    lineHeight = 5,
    maxLines,
    size = 9.5,
  } = options;

  doc.setFont("helvetica", font);
  doc.setFontSize(size);
  doc.setTextColor(...color);

  let lines = splitLines(doc, text, maxWidth);

  if (maxLines && lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
    lines[lines.length - 1] = `${lines[lines.length - 1].replace(/\.+$/, "")}...`;
  }

  return drawTextLines(doc, lines, x, y, {
    align,
    lineHeight,
  });
}

function drawLeafMark(doc, centerX, centerY, size = 1) {
  doc.setFillColor(...COLORS.olivePale);
  doc.circle(centerX, centerY, 9 * size, "F");

  doc.setFillColor(...COLORS.olive);
  doc.ellipse(centerX + 1.5 * size, centerY - 1.5 * size, 3.5 * size, 6 * size, "F");
  doc.setDrawColor(...COLORS.soil);
  doc.setLineWidth(0.6 * size);
  doc.line(centerX - 3.8 * size, centerY + 5.5 * size, centerX + 4.2 * size, centerY - 5 * size);
}

function drawCornerLeaf(doc, x, y, direction = 1) {
  doc.setFillColor(...COLORS.olivePale);
  doc.ellipse(x, y, 3.2, 6.5, "F");
  doc.setDrawColor(...COLORS.olive);
  doc.setLineWidth(0.35);
  doc.line(x - 2 * direction, y + 4, x + 2 * direction, y - 4);
}

function drawPageFrame(doc) {
  doc.setFillColor(...COLORS.sand);
  doc.rect(0, 0, PAGE.width, PAGE.height, "F");

  doc.setFillColor(...COLORS.cream);
  doc.roundedRect(10, 10, PAGE.width - 20, PAGE.height - 20, 3, 3, "F");

  doc.setDrawColor(...COLORS.clay);
  doc.setLineWidth(0.65);
  doc.roundedRect(12, 12, PAGE.width - 24, PAGE.height - 24, 2, 2, "S");

  doc.setDrawColor(...COLORS.line);
  doc.setLineWidth(0.25);
  doc.roundedRect(16, 16, PAGE.width - 32, PAGE.height - 32, 1.5, 1.5, "S");

  drawCornerLeaf(doc, 22, 23, 1);
  drawCornerLeaf(doc, PAGE.width - 22, 23, -1);
  drawCornerLeaf(doc, 22, PAGE.height - 23, -1);
  drawCornerLeaf(doc, PAGE.width - 22, PAGE.height - 23, 1);
}

function drawSectionHeading(doc, title, x, y, width = LAYOUT.width) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.2);
  doc.setTextColor(...COLORS.clay);
  doc.text(title.toUpperCase(), x, y);

  doc.setDrawColor(...COLORS.line);
  doc.setLineWidth(0.3);
  doc.line(x, y + 2.7, x + width, y + 2.7);
}

function drawInfoCell(doc, label, value, x, y, width) {
  doc.setFillColor(250, 244, 235);
  doc.roundedRect(x, y, width, 21, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.8);
  doc.setTextColor(...COLORS.clay);
  doc.text(label.toUpperCase(), x + width / 2, y + 7, { align: "center" });

  drawWrappedText(doc, value, x + width / 2, y + 14, width - 8, {
    align: "center",
    color: COLORS.soil,
    font: "bold",
    lineHeight: 4.2,
    maxLines: 2,
    size: 9,
  });
}

function drawRepairActions(doc, peaceBond, completedActions, x, y, width) {
  drawSectionHeading(doc, "RESTORATIVE REPAIR ACTIONS", x, y, width);

  const boxY = y + 7;
  doc.setFillColor(252, 248, 241);
  doc.roundedRect(x, boxY, width, 58, 2.5, 2.5, "F");
  doc.setDrawColor(...COLORS.line);
  doc.roundedRect(x, boxY, width, 58, 2.5, 2.5, "S");

  let cursorY = boxY + 10;

  peaceBond.repairActions.forEach((action, index) => {
    const isComplete = completedActions[index];
    doc.setDrawColor(...COLORS.olive);
    doc.setFillColor(isComplete ? COLORS.olive[0] : COLORS.cream[0], isComplete ? COLORS.olive[1] : COLORS.cream[1], isComplete ? COLORS.olive[2] : COLORS.cream[2]);
    doc.circle(x + 7, cursorY - 2, 2.7, isComplete ? "FD" : "S");

    if (isComplete) {
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.35);
      doc.line(x + 5.7, cursorY - 2, x + 6.8, cursorY - 0.8);
      doc.line(x + 6.8, cursorY - 0.8, x + 8.7, cursorY - 3.7);
    }

    const status = isComplete ? "Complete" : "Pending";
    const actionHeight = drawWrappedText(doc, `${index + 1}. ${status} - ${action}`, x + 14, cursorY, width - 22, {
      color: COLORS.soil,
      lineHeight: 4.4,
      maxLines: 3,
      size: 8.7,
    });

    cursorY += Math.max(actionHeight, 8) + 5;
  });
}

function drawTwoColumnSummary(doc, peaceBond, x, y, width) {
  const grant = getGrant(peaceBond);
  const gap = 8;
  const columnWidth = (width - gap) / 2;
  const boxHeight = 32;

  [
    {
      body: peaceBond.ritual,
      title: "RECONCILIATION RITUAL",
    },
    {
      body: `${grant.currency} ${grant.amount} for ${grant.purpose}`,
      title: "REINTEGRATION SUPPORT",
    },
  ].forEach((item, index) => {
    const columnX = x + index * (columnWidth + gap);
    drawSectionHeading(doc, item.title, columnX, y, columnWidth);

    doc.setFillColor(252, 248, 241);
    doc.roundedRect(columnX, y + 7, columnWidth, boxHeight, 2.5, 2.5, "F");
    doc.setDrawColor(...COLORS.line);
    doc.roundedRect(columnX, y + 7, columnWidth, boxHeight, 2.5, 2.5, "S");
    drawWrappedText(doc, item.body, columnX + 6, y + 18, columnWidth - 12, {
      color: COLORS.stone,
      lineHeight: 4.5,
      maxLines: 4,
      size: 8.8,
    });
  });
}

function drawSignatureArea(doc, peaceBond, x, y, width) {
  const completionDate = getCompletionDate(peaceBond);
  const staffName = getStaffName();
  const gap = 8;
  const columnWidth = (width - gap * 2) / 3;
  const items = [
    {
      label: "Staff Mediator",
      value: staffName === "staff" ? "" : staffName,
    },
    {
      label: "PeaceBond Program",
      value: "Restorative Reintegration",
    },
    {
      label: "Completion Date",
      value: completionDate,
    },
  ];

  doc.setDrawColor(...COLORS.line);
  doc.setLineWidth(0.35);
  doc.line(x, y, x + width, y);

  items.forEach((item, index) => {
    const itemX = x + index * (columnWidth + gap);
    doc.setDrawColor(...COLORS.soil);
    doc.setLineWidth(0.35);
    doc.line(itemX, y + 15, itemX + columnWidth, y + 15);

    drawWrappedText(doc, item.value || " ", itemX + columnWidth / 2, y + 10, columnWidth - 4, {
      align: "center",
      color: COLORS.soil,
      font: "bold",
      lineHeight: 4,
      maxLines: 1,
      size: 8.4,
    });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.clay);
    doc.text(item.label.toUpperCase(), itemX + columnWidth / 2, y + 21.5, {
      align: "center",
    });
  });
}

function addContinuationPage(doc, title) {
  doc.addPage();
  drawPageFrame(doc);
  drawLeafMark(doc, 28, 31, 0.7);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...COLORS.soil);
  doc.text(title.toUpperCase(), 42, 30);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...COLORS.stone);
  doc.text("PeaceBond completion record", 42, 36);

  return 52;
}

function drawDynamicTextSection(doc, section, y) {
  const x = LAYOUT.margin;
  const width = LAYOUT.width;
  const lineHeight = 4.8;
  const textX = x + 6;
  const textWidth = width - 12;
  let lines = splitLines(doc, section.body, textWidth);
  let continued = false;

  while (lines.length > 0) {
    if (y > LAYOUT.bottom - 26) {
      y = addContinuationPage(doc, section.title);
      continued = true;
    }

    const availableLines = Math.max(1, Math.floor((LAYOUT.bottom - y - 18) / lineHeight));
    const visibleLines = lines.slice(0, availableLines);
    const boxHeight = 17 + visibleLines.length * lineHeight;

    doc.setFillColor(252, 248, 241);
    doc.roundedRect(x, y, width, boxHeight, 2.5, 2.5, "F");
    doc.setDrawColor(...COLORS.line);
    doc.roundedRect(x, y, width, boxHeight, 2.5, 2.5, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.2);
    doc.setTextColor(...COLORS.clay);
    doc.text(`${section.title}${continued ? " CONTINUED" : ""}`.toUpperCase(), textX, y + 8);

    doc.setDrawColor(...COLORS.line);
    doc.line(textX, y + 11, x + width - 6, y + 11);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.4);
    doc.setTextColor(...COLORS.stone);
    drawTextLines(doc, visibleLines, textX, y + 18, { lineHeight });

    y += boxHeight + 7;
    lines = lines.slice(visibleLines.length);

    if (lines.length > 0) {
      y = addContinuationPage(doc, section.title);
      continued = true;
    }
  }

  return y;
}

function drawCertificatePage(doc, peaceBond, completedActions, progress) {
  const completedCount = completedActions.filter(Boolean).length;
  const completionDate = getCompletionDate(peaceBond);

  drawPageFrame(doc);
  drawLeafMark(doc, PAGE.width / 2, 29, 1.05);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...COLORS.soil);
  doc.text("PEACEBOND COMPLETION CERTIFICATE", PAGE.width / 2, 51, {
    align: "center",
  });

  doc.setDrawColor(...COLORS.clay);
  doc.setLineWidth(0.45);
  doc.line(42, 58, PAGE.width - 42, 58);

  drawWrappedText(
    doc,
    "This certificate recognizes the successful completion of a community-led restorative reintegration pathway through accountability, repair, and reconciliation.",
    PAGE.width / 2,
    67,
    146,
    {
      align: "center",
      color: COLORS.stone,
      lineHeight: 4.8,
      size: 10,
    }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...COLORS.stone);
  doc.text("Presented with dignity to", PAGE.width / 2, 86, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(21);
  doc.setTextColor(...COLORS.soil);
  doc.text(asText(peaceBond.fighterName, "Rehabilitatee"), PAGE.width / 2, 98, {
    align: "center",
    maxWidth: 150,
  });

  doc.setDrawColor(...COLORS.line);
  doc.line(53, 104, PAGE.width - 53, 104);

  drawWrappedText(
    doc,
    `NATIONALITY: ${asText(peaceBond.nationality)}`,
    PAGE.width / 2,
    111,
    140,
    {
      align: "center",
      color: COLORS.olive,
      font: "bold",
      lineHeight: 4,
      maxLines: 1,
      size: 8.2,
    }
  );

  const cellGap = 5;
  const cellWidth = (LAYOUT.width - cellGap * 2) / 3;
  drawInfoCell(doc, "Community Type", peaceBond.communityType || "General community", 18, 119, cellWidth);
  drawInfoCell(doc, "Severity Level", formatLabel(peaceBond.severity), 18 + cellWidth + cellGap, 119, cellWidth);
  drawInfoCell(doc, "Completion Date", completionDate, 18 + (cellWidth + cellGap) * 2, 119, cellWidth);

  drawRepairActions(doc, peaceBond, completedActions, 18, 151, LAYOUT.width);
  drawTwoColumnSummary(doc, peaceBond, 18, 222, LAYOUT.width);

  drawSectionHeading(doc, "CERTIFIED COMPLETION", 18, 266, LAYOUT.width);
  drawWrappedText(
    doc,
    `Completion recorded at ${progress}% with ${completedCount} of 3 restorative repair actions completed.`,
    18,
    276,
    LAYOUT.width,
    {
      color: COLORS.soil,
      font: "bold",
      lineHeight: 4.6,
      size: 9.3,
    }
  );
}

function drawReviewPage(doc, peaceBond) {
  const grant = getGrant(peaceBond);
  let y = addContinuationPage(doc, "COMMUNITY ACKNOWLEDGMENT");

  const sections = [
    {
      body: getReportValue(
        peaceBond,
        "summary",
        "Staff recorded that the restorative repair pathway was completed and reviewed."
      ),
      title: "STAFF COMPLETION REVIEW SUMMARY",
    },
    {
      body: getReportValue(
        peaceBond,
        "communityResponse",
        "Community acknowledgment was recorded by staff review."
      ),
      title: "COMMUNITY ACKNOWLEDGMENT",
    },
    {
      body: `Grant amount: ${grant.currency} ${grant.amount}. Grant purpose: ${grant.purpose}.`,
      title: "REINTEGRATION SUPPORT",
    },
    {
      body: getReportValue(
        peaceBond,
        "staffRecommendation",
        "Based on the successful completion of the restorative repair pathway, community mediators and PeaceBond staff recommend continued reintegration support and community inclusion."
      ),
      title: "STAFF RECOMMENDATION",
    },
  ];

  sections.forEach((section) => {
    y = drawDynamicTextSection(doc, section, y);
  });

  if (y > 225) {
    y = addContinuationPage(doc, "CERTIFIED COMPLETION");
  }

  doc.setFillColor(...COLORS.olivePale);
  doc.roundedRect(18, y, LAYOUT.width, 22, 2.5, 2.5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.2);
  doc.setTextColor(...COLORS.olive);
  doc.text("CERTIFIED COMPLETION", 24, y + 8);

  drawWrappedText(
    doc,
    "This record affirms restoration, dignity, reconciliation, and successful reintegration through a completed PeaceBond pathway.",
    24,
    y + 16,
    LAYOUT.width - 12,
    {
      color: COLORS.soil,
      lineHeight: 4.4,
      maxLines: 2,
      size: 8.8,
    }
  );

  drawSignatureArea(doc, peaceBond, 18, 256, LAYOUT.width);
}

export function downloadCertificate({ completedActions, peaceBond, progress }) {
  const doc = new jsPDF({
    format: "a4",
    unit: "mm",
  });

  drawCertificatePage(doc, peaceBond, completedActions, progress);
  drawReviewPage(doc, peaceBond);
  doc.save("peacebond-completion-certificate.pdf");
}
