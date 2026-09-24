import JSZip from "jszip";
import { saveAs } from "file-saver";

/**
 * Downloads the complete source code of ANANT VR Super Platform as a ready-to-deploy zip file.
 * Includes all source components, server, serverless api, vercel.json, package.json, styles, README and docs.
 */
export async function downloadProjectZip(onProgress?: (percent: number, status: string) => void) {
  const zip = new JSZip();

  // Root level configuration files and sources using Vite glob imports
  const textFiles = import.meta.glob([
    "/src/**/*.{ts,tsx,css,json}",
    "/api/**/*.{ts,js,json}",
    "/index.html",
    "/package.json",
    "/tsconfig.json",
    "/tsconfig.app.json",
    "/tsconfig.node.json",
    "/vite.config.ts",
    "/vercel.json",
    "/README.md",
    "/.env.example",
    "/server.ts"
  ], { query: "?raw", import: "default" });

  const fileEntries = Object.entries(textFiles);
  const totalFiles = fileEntries.length;
  let processed = 0;

  for (const [filePath, loader] of fileEntries) {
    try {
      const content = await loader() as string;
      const relativePath = filePath.startsWith("/") ? filePath.slice(1) : filePath;
      zip.file(relativePath, content);
      processed++;
      if (onProgress) {
        const pct = Math.round((processed / totalFiles) * 80);
        onProgress(pct, `Bundling ${relativePath}...`);
      }
    } catch (err) {
      console.warn(`Could not bundle file: ${filePath}`, err);
    }
  }

  // Ensure crucial deployment files exist in the zip
  if (!zip.file("vercel.json")) {
    zip.file("vercel.json", JSON.stringify({
      version: 2,
      framework: "vite",
      buildCommand: "npm run build",
      outputDirectory: "dist",
      rewrites: [
        { source: "/api/(.*)", destination: "/api/$1" },
        { source: "/(.*)", destination: "/index.html" }
      ]
    }, null, 2));
  }

  if (!zip.file(".gitignore")) {
    zip.file(".gitignore", "node_modules\ndist\n.env\n.DS_Store\n.vercel\n");
  }

  if (onProgress) onProgress(85, "Compressing ZIP archive...");

  const blob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 6 }
  }, (metadata) => {
    if (onProgress) {
      const currentPct = 85 + Math.round((metadata.percent / 100) * 15);
      onProgress(Math.min(99, currentPct), `Compressing ${Math.round(metadata.percent)}%...`);
    }
  });

  if (onProgress) onProgress(100, "Download complete!");
  saveAs(blob, "ANANT-VR-Super-Platform-Vercel-Ready.zip");
}
