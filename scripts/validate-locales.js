#!/usr/bin/env node

/**
 * Validate locale files: check that zh and en have the same keys.
 * Usage: node scripts/validate-locales.js
 */

const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'locales');
const locales = ['zh', 'en'];

function loadJson(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function getKeys(obj, prefix = '') {
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys.push(...getKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

let totalErrors = 0;

// Find all JSON files in the first locale directory to use as reference
const referenceLocale = locales[0];
const referenceDir = path.join(localesDir, referenceLocale);

if (!fs.existsSync(referenceDir)) {
  console.error(`Reference locale directory not found: ${referenceDir}`);
  process.exit(1);
}

function collectJsonFiles(dir, base = '') {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(...collectJsonFiles(path.join(dir, entry.name), rel));
    } else if (entry.name.endsWith('.json')) {
      files.push(rel);
    }
  }
  return files;
}

const jsonFiles = collectJsonFiles(referenceDir);

for (const file of jsonFiles) {
  const refData = loadJson(path.join(localesDir, referenceLocale, file));
  const refKeys = new Set(getKeys(refData));

  for (const locale of locales.slice(1)) {
    const localeFile = path.join(localesDir, locale, file);
    const localeData = loadJson(localeFile);

    if (!localeData) {
      console.error(`MISSING: ${locale}/${file}`);
      totalErrors++;
      continue;
    }

    const localeKeys = new Set(getKeys(localeData));

    // Keys in reference but missing in this locale
    for (const key of refKeys) {
      if (!localeKeys.has(key)) {
        console.error(`MISSING KEY: ${locale}/${file} -> ${key}`);
        totalErrors++;
      }
    }

    // Keys in this locale but not in reference
    for (const key of localeKeys) {
      if (!refKeys.has(key)) {
        console.warn(`EXTRA KEY:   ${locale}/${file} -> ${key}`);
      }
    }
  }
}

// Also check reverse: files in other locales not in reference
for (const locale of locales.slice(1)) {
  const localeDir = path.join(localesDir, locale);
  if (!fs.existsSync(localeDir)) continue;
  const otherFiles = collectJsonFiles(localeDir);
  for (const file of otherFiles) {
    if (!jsonFiles.includes(file)) {
      console.warn(`EXTRA FILE:  ${locale}/${file} (not in ${referenceLocale})`);
    }
  }
}

if (totalErrors === 0) {
  console.log(`✓ All locale files are in sync (${jsonFiles.length} files checked across ${locales.length} locales)`);
  process.exit(0);
} else {
  console.error(`\n✗ ${totalErrors} error(s) found`);
  process.exit(1);
}
