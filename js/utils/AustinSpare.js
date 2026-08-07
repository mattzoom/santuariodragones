/**
 * Austin Osman Spare Consonant Filtering Algorithm
 * Removes vowels (including accents) and ANY consonant that appears more than once in the total phrase.
 */
export function extractConsonants(str1 = "", str2 = "") {
  const combined = (str1 + " " + str2).toUpperCase();
  const normalized = combined.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const vowels = new Set(["A", "E", "I", "O", "U"]);

  const lettersOnly = [];
  for (let ch of normalized) {
    if (ch >= "A" && ch <= "Z") {
      lettersOnly.push(ch);
    }
  }

  const freq = {};
  for (let ch of lettersOnly) {
    if (!vowels.has(ch)) {
      freq[ch] = (freq[ch] || 0) + 1;
    }
  }

  const result = [];
  for (let ch of lettersOnly) {
    if (!vowels.has(ch) && freq[ch] === 1) {
      if (!result.includes(ch)) {
        result.push(ch);
      }
    }
  }

  return result.length > 0 ? result : ["M", "D", "T"];
}
