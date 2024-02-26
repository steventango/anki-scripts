function explorationsbioanth2() {
  const h1_text = document.querySelector("h1.entry-title").textContent.trim();
  let title_prefix = "ANTHR 209 ";
  if (!h1_text.startsWith("Appendix ")) {
    title_prefix += "Chapter ";
  }
  const title = title_prefix + h1_text;
  const keyTermsHeader = Array.from(document.querySelectorAll("h2"))
    .find(h2 => h2.textContent.trim() === "Key Terms");
  const keyTermsParagraphs = [];
  let currentSibling = keyTermsHeader.nextElementSibling;

  if (currentSibling.tagName === "DIV") {
    currentSibling = currentSibling.querySelector("p");
  }

  while (currentSibling && currentSibling.tagName !== "H2") {
    if (currentSibling.tagName === "P") {
      keyTermsParagraphs.push(currentSibling.textContent.trim());
    }
    currentSibling = currentSibling.nextElementSibling;
  }

  const tsvData = keyTermsParagraphs.map(paragraph => {
    const parts = paragraph.split(":")
    const term = parts[0].trim();
    const definition = parts.slice(1).join(":").trim();
    return [definition, term];
  });

  const tsvString = tsvData.map(row => row.join("\t")).join("\n");

  const blob = new Blob([tsvString], { type: "text/tab-separated-values" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${title}.tsv`;
  link.click();
}

explorationsbioanth2();
