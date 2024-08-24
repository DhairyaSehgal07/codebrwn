export function extractQuotedText(input: string) {
  const match = input.match(/"(.*?)"/);
  return match ? match[1] : "";
}

export const formatTitle = (title: string): string => {
  return title.toLowerCase().replace(/[\s,]+/g, "-");
};

export const extractId = (shopifyId: string): string | null => {
  const match = shopifyId.match(/\/(\d+)$/);
  return match ? match[1] : null;
};

// Function to split product details into two parts
export const splitProductDetails = (details: string) => {
  const keyFeaturesIndex = details.indexOf("Key Features");

  if (keyFeaturesIndex === -1) {
    // If "Key Features" is not found, return the whole string as the first part and an empty second part
    return { part1: details, part2: "" };
  }

  // Split the string into two parts: before and after "Key Features"
  const part1 = details.substring(0, keyFeaturesIndex).trim();
  const part2 = details.substring(keyFeaturesIndex).trim();

  return { part1, part2 };
};
