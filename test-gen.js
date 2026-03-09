import fs from 'fs';
import { MasaxTypstPDF } from './src/core/generator.js';

async function testGeneration() {
  const masax = new MasaxTypstPDF();
  const templatePath = './public/pdf-template/candidate-evaluation.typ';
  const dataPath = './public/pdf-template/candidate-evaluation-data.json';
  
  const templateStr = fs.readFileSync(templatePath, 'utf8');
  const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  
  masax.setBlueprint({ typstTemplate: templateStr });
  
  try {
    const pdfBlob = await masax.genPDF(jsonData);
    console.log("PDF generated successfully! Size:", pdfBlob.size);
  } catch (err) {
    console.error("PDF generation failed:", err);
  }
}

testGeneration();
