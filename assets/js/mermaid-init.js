import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";

function normalizeMermaidBlocks() {
  const codeBlocks = document.querySelectorAll("pre > code.language-mermaid");

  codeBlocks.forEach((code) => {
    const pre = code.parentElement;
    if (!pre || !pre.parentElement) return;

    const container = document.createElement("pre");
    container.className = "mermaid";
    container.textContent = code.textContent || "";
    pre.replaceWith(container);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  normalizeMermaidBlocks();
  mermaid.initialize({ startOnLoad: true });
  await mermaid.run({ querySelector: "pre.mermaid" });
});
