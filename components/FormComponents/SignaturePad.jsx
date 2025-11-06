"use client";
import React, { useRef, useEffect, useState } from 'react';

export default function SignaturePad({ label, name, value, onChange, error }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureData, setSignatureData] = useState(value || '');
  
  // Small fixed size
  const canvasWidth = 200;
  const canvasHeight = 80;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    // Higher DPI for better quality
    const scale = 2;
    canvas.width = canvasWidth * scale;
    canvas.height = canvasHeight * scale;
    ctx.scale(scale, scale);
    
    // Styling
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.5; // Thinner line for small canvas
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw existing signature
    if (signatureData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
      };
      img.src = signatureData;
    }
  }, [signatureData]);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scale = canvas.width / rect.width;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    return {
      x: (clientX - rect.left) * scale,
      y: (clientY - rect.top) * scale
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const { x, y } = getCoordinates(e);
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    
    const ctx = canvasRef.current.getContext('2d');
    const { x, y } = getCoordinates(e);
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      const signatureDataUrl = canvas.toDataURL('image/png');
      setSignatureData(signatureDataUrl);
      onChange({ target: { name, value: signatureDataUrl } });
      setIsDrawing(false);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    setSignatureData('');
    onChange({ target: { name, value: '' } });
  };

  return (
    <div className="flex flex-col"
      style={{ width: "100%" }}
    >
      <div
        className="flex flex-col sm:flex-row justify-center items-start sm:items-center gap-3 sm:gap-7"
        style={{ width: "90%" }}
      >
        <label className="text-sm mb-1 w-34">{label}</label>
        
        <div className="border border-[var(--border-color)] rounded-lg p-1 bg-[var(--background)] inline-block">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="border border-gray-300 cursor-crosshair bg-white"
            style={{
              width: `${canvasWidth}px`,
              height: `${canvasHeight}px`,
              touchAction: 'none'
            }}
          />
          <div className="flex justify-between items-center mt-1">
            <button
              type="button"
              onClick={clearSignature}
              className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Clear
            </button>
            {signatureData && (
              <span className="text-green-500 text-xs">✓ Signed</span>
            )}
          </div>
        </div>
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      
      {signatureData && (
        <div className="mt-2 flex flex-col">
          <p className="text-xs mb-1 text-gray-600">Preview:</p>
          <img 
            src={signatureData} 
            alt="Signature" 
            className="border border-gray-300 w-full max-h-[60px] bg-white"
          />
        </div>
      )}
    </div>
  );
}