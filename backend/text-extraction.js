const { extractText } = require('./src/utils/textExtractor');
const path = require('path');

async function testExtraction() {
  // Test with your resume file
  const resumePath = path.join(__dirname, 'uploads', 'your-resume.pdf');
  
  try {
    console.log('🧪 Testing text extraction...');
    const text = await extractText(resumePath);
    
    console.log('\n✅ Extracted Text:');
    console.log('='.repeat(50));
    console.log(text);
    console.log('='.repeat(50));
    console.log(`\n📊 Total characters: ${text.length}`);
    console.log(`📊 Total words: ${text.split(/\s+/).length}`);
    
    // Check for key skills
    const skillsToCheck = ['Python', 'JavaScript', 'React', 'Node.js', 'MongoDB'];
    console.log('\n🔍 Checking for key skills:');
    skillsToCheck.forEach(skill => {
      const found = text.toLowerCase().includes(skill.toLowerCase());
      console.log(`  ${found ? '✅' : '❌'} ${skill}`);
    });
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run if called directly
if (require.main === module) {
  testExtraction();
}

module.exports = testExtraction;