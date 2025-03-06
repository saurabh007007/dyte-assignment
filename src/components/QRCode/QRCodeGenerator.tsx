import React, { useState } from "react";
import QRCode from "qrcode.react";
import { Settings, Download } from "lucide-react";

interface QRCodeOptions {
  value: string;
  size: number;
  fgColor: string;
  bgColor: string;
  level: "L" | "M" | "Q" | "H";
  includeMargin: boolean;
}

export function QRCodeGenerator() {
  const [options, setOptions] = useState<QRCodeOptions>({
    value: "",
    size: 256,
    fgColor: "#000000",
    bgColor: "#ffffff",
    level: "L",
    includeMargin: true,
  });

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = url;
      link.click();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">QR Code Generator</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={options.value}
                onChange={(e) =>
                  setOptions({ ...options, value: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                rows={4}
                placeholder="Enter URL or text"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <input
                  type="range"
                  min="128"
                  max="512"
                  value={options.size}
                  onChange={(e) =>
                    setOptions({ ...options, size: Number(e.target.value) })
                  }
                  className="w-full"
                />
                <span className="text-sm text-gray-500">{options.size}px</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foreground Color
                </label>
                <input
                  type="color"
                  value={options.fgColor}
                  onChange={(e) =>
                    setOptions({ ...options, fgColor: e.target.value })
                  }
                  className="w-full h-10 p-1 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Color
                </label>
                <input
                  type="color"
                  value={options.bgColor}
                  onChange={(e) =>
                    setOptions({ ...options, bgColor: e.target.value })
                  }
                  className="w-full h-10 p-1 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Error Correction Level
                </label>
                <select
                  value={options.level}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      level: e.target.value as "L" | "M" | "Q" | "H",
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="L">Low</option>
                  <option value="M">Medium</option>
                  <option value="Q">Quartile</option>
                  <option value="H">High</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.includeMargin}
                  onChange={(e) =>
                    setOptions({ ...options, includeMargin: e.target.checked })
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Include Margin
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <QRCode {...options} />
            </div>
            <button
              onClick={handleDownload}
              disabled={!options.value}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              <Download className="w-5 h-5 mr-2" />
              Download QR Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
