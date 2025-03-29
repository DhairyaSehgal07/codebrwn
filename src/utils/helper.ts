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

export const splitProductDetails = (details: string) => {
  // Define the regex patterns for the delimiters
  const keyFeaturesPattern = /Key Features\*/i;
  const compositionPattern = /Composition\*/i;
  const washCarePattern = /Wash Care\*/i;
  const garmentCarePattern = /Garment Care\*/i;

  // Find the index of each section
  const keyFeaturesIndex = details.search(keyFeaturesPattern);
  const compositionIndex = details.search(compositionPattern);
  const washCareIndex = details.search(washCarePattern);
  const garmentCareIndex = details.search(garmentCarePattern);

  // Extract the description part
  const description =
    keyFeaturesIndex !== -1
      ? details.substring(0, keyFeaturesIndex).trim()
      : details.trim(); // If no "Key Features" found, the whole string is the description

  // Helper function to extract a section of the details
  const extractSection = (startIndex: number, endIndex: number) => {
    if (startIndex === -1) return "";
    if (endIndex === -1) return details.substring(startIndex).trim();
    return details.substring(startIndex, endIndex).trim();
  };

  // Extract each section based on the indexes
  const keyFeaturesPart = extractSection(
    keyFeaturesIndex !== -1
      ? keyFeaturesIndex + keyFeaturesPattern.source.length
      : -1,
    compositionIndex !== -1
      ? compositionIndex
      : washCareIndex !== -1
        ? washCareIndex
        : garmentCareIndex !== -1
          ? garmentCareIndex
          : -1,
  );

  const compositionPart = extractSection(
    compositionIndex !== -1
      ? compositionIndex + compositionPattern.source.length
      : -1,
    washCareIndex !== -1
      ? washCareIndex
      : garmentCareIndex !== -1
        ? garmentCareIndex
        : -1,
  );

  const washCarePart = extractSection(
    washCareIndex !== -1 ? washCareIndex + washCarePattern.source.length : -1,
    garmentCareIndex !== -1 ? garmentCareIndex : -1,
  );

  const garmentCarePart = extractSection(
    garmentCareIndex !== -1
      ? garmentCareIndex + garmentCarePattern.source.length
      : -1,
    -1,
  );

  // Helper function to convert sections to list items
  const convertToList = (section: string) => {
    return section
      .split(/,\s*|\n+/) // Split by ", " or newline
      .map((item) => item.trim()) // Trim each item
      .filter((item) => item.length > 0); // Remove empty items
  };

  return {
    description,
    keyFeatures: convertToList(keyFeaturesPart),
    composition: convertToList(compositionPart),
    washCare: convertToList(washCarePart),
    garmentCare: convertToList(garmentCarePart),
  };
};
