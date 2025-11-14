"use client";

import { useRef } from "react";

export default function Page() {
  const contentRef = useRef(null);

  async function urlToBase64(url) {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    const binary = String.fromCharCode(...new Uint8Array(buf));
    return `data:image/png;base64,${btoa(binary)}`;
  }

  async function downloadPDF() {
    const innerHTML = contentRef.current.innerHTML;

    // Convert border frame to base64
    const border = await urlToBase64("/frames/full-frame.png");

    // Build PDF-specific HTML (A4 size + border)
    const html = `
      <html>
        <head>
          <style>
            @page { margin: 0; }
            body { margin: 0; }

            /* A4 size container ONLY FOR PDF */
            .page {
              width: 595px;
              height: 842px;
              background-image: url('${border}');
              background-size: cover;
              background-repeat: no-repeat;
              padding: 100px 70px;
              box-sizing: border-box;
              font-family: serif;
            }
          </style>
        </head>
        <body>
          <div class="page">
            ${innerHTML}
          </div>
        </body>
      </html>
    `;

    const res = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html }),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    window.open(url);
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>This is Web View</h1>

      {/* NORMAL WEB CONTENT (NO A4 SIZING) */}
      <div
        ref={contentRef}
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          maxWidth: 600,
        }}
      >
        <h2>Certificate of Excellence</h2>
        <p>This is a normal responsive web layout.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>This is a normal responsive web layout.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>This is a normal responsive web layout.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>This is a normal responsive web layout.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
        <p>No fixed width. No A4 styling here.</p>
      </div>

      <button
        onClick={downloadPDF}
        style={{
          marginTop: 20,
          padding: "12px 20px",
          background: "green",
          color: "white",
          borderRadius: 6
        }}
      >
        Download PDF (A4 with Border)
      </button>
    </div>
  );
}
