import fs from "fs";
import path from "path";
import EraPageClient from "@/components/EraPageClient";

export default function Home() {
  const filePath = path.join(process.cwd(), "src", "app", "page_content.html");
  const htmlContent = fs.readFileSync(filePath, "utf-8");

  return <EraPageClient content={htmlContent} />;
}
