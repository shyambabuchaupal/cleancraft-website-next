// Import pages from JSON instead of YAML
import pages from "../config/pages.json";
import { generateSitemapFiles } from "./sitemap-generator.js";

// Optional: pass pages to generator if needed
// generateSitemapFiles(pages);

// Set production environment for proper URL generation
process.env.NODE_ENV = "production";
process.env.VITE_ENVIRONMENT = "production";

console.log("🚀 Generating production sitemap and robots.txt...");
generateSitemapFiles();
