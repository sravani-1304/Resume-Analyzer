const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs').promises;
const path = require('path');

/**
 * Extract text from PDF file using pdf-parse
 * @param {string} filePath - Path to the PDF file
 * @returns {Promise<string>} - Extracted text content
 */
const extractTextFromPDF = async (filePath) => {
  try {
    console.log(`📄 Extracting text from PDF: ${filePath}`);
    
    // Read file buffer
    const dataBuffer = await fs.readFile(filePath);
    
    // Extract text using pdf-parse
    const data = await pdfParse(dataBuffer);
    
    console.log(`✅ PDF extracted: ${data.text.length} characters`);
    return data.text;
  } catch (error) {
    console.error('❌ PDF extraction error:', error);
    throw new Error(`PDF extraction failed: ${error.message}`);
  }
};

/**
 * Extract text from DOCX file using mammoth
 * @param {string} filePath - Path to the DOCX file
 * @returns {Promise<string>} - Extracted text content
 */
const extractTextFromDOCX = async (filePath) => {
  try {
    console.log(`📄 Extracting text from DOCX: ${filePath}`);
    
    // Extract text using mammoth
    const result = await mammoth.extractRawText({ path: filePath });
    
    console.log(`✅ DOCX extracted: ${result.value.length} characters`);
    return result.value;
  } catch (error) {
    console.error('❌ DOCX extraction error:', error);
    throw new Error(`DOCX extraction failed: ${error.message}`);
  }
};

/**
 * Main text extraction function that handles both PDF and DOCX
 * @param {string} filePath - Path to the uploaded file
 * @returns {Promise<string>} - Extracted text content
 */
const extractText = async (filePath) => {
  try {
    // Check if file exists
    await fs.access(filePath);
    
    // Get file extension
    const ext = path.extname(filePath).toLowerCase();
    console.log(`🔍 Processing file: ${path.basename(filePath)} (${ext})`);
    
    let extractedText = '';
    
    // Extract based on file type
    if (ext === '.pdf') {
      extractedText = await extractTextFromPDF(filePath);
    } else if (ext === '.docx') {
      extractedText = await extractTextFromDOCX(filePath);
    } else {
      throw new Error(`Unsupported file format: ${ext}`);
    }
    
    // Clean up the extracted text
    const cleanedText = cleanExtractedText(extractedText);
    
    // Log preview
    console.log('📝 Text preview:', cleanedText.substring(0, 200).replace(/\n/g, ' '));
    
    return cleanedText;
    
  } catch (error) {
    console.error('❌ Text extraction error:', error);
    throw new Error(`Failed to extract text: ${error.message}`);
  }
};

/**
 * Clean and normalize extracted text
 * @param {string} text - Raw extracted text
 * @returns {string} - Cleaned text
 */
const cleanExtractedText = (text) => {
  if (!text) return '';
  
  // Remove extra whitespace
  let cleaned = text.replace(/\s+/g, ' ').trim();
  
  // Fix common PDF extraction issues
  cleaned = cleaned
    // Fix line breaks
    .replace(/([a-z])-\\n([a-z])/g, '$1$2') // Fix hyphenated words
    .replace(/\\n/g, '\n') // Fix escaped newlines
    .replace(/\\r/g, '\r') // Fix escaped carriage returns
    
    // Remove special characters but keep important ones
    .replace(new RegExp('[^\\w\\s\\-.,@#&()\\[\\]\\{}/:;\'"]', 'g'), ' ')
    
    // Normalize spaces
    .replace(/\s+/g, ' ')
    
    // Fix common OCR mistakes
    .replace(/0/g, 'O') // Sometimes numbers are read as letters
    .replace(/1/g, 'l') // And vice versa
    
    // Preserve section headers
    .replace(/([A-Z][A-Z\s]+):/g, '\n$1:\n');
  
  return cleaned;
};

/**
 * Extract text from uploaded file buffer (for memory storage)
 * @param {Object} file - Multer file object
 * @returns {Promise<string>} - Extracted text
 */
const extractTextFromBuffer = async (file) => {
  try {
    console.log(`📄 Extracting text from buffer: ${file.originalname}`);
    
    let extractedText = '';
    
    if (file.mimetype === 'application/pdf') {
      // Extract from PDF buffer
      const data = await pdfParse(file.buffer);
      extractedText = data.text;
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // Extract from DOCX buffer
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      extractedText = result.value;
    } else {
      throw new Error(`Unsupported file type: ${file.mimetype}`);
    }
    
    return cleanExtractedText(extractedText);
    
  } catch (error) {
    console.error('❌ Buffer extraction error:', error);
    throw new Error(`Failed to extract text from buffer: ${error.message}`);
  }
};

/**
 * Validate if file is a supported format
 * @param {string} filename - Name of the file
 * @returns {boolean} - True if supported
 */
const isSupportedFile = (filename) => {
  const ext = path.extname(filename).toLowerCase();
  return ['.pdf', '.docx'].includes(ext);
};

module.exports = { 
  extractText, 
  extractTextFromBuffer,
  isSupportedFile,
  cleanExtractedText 
};