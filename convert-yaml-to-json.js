const fs = require('fs');
const yaml = require('js-yaml');

// YAML file path
const yamlFile = './src/config/pages.yaml';
// JSON file path
const jsonFile = './src/config/pages.json';

try {
  const fileContents = fs.readFileSync(yamlFile, 'utf8');
  const data = yaml.load(fileContents);

  fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));
  console.log('✅ YAML converted to JSON successfully!');
} catch (e) {
  console.error(e);
}
