const getHomeCollectionQuery = `
  query getCollectionById($id: ID!) {
    collection(id: $id) {
      products(first: 4) {
        edges {
          node {
            id
            title
            featuredImage {
              url
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;

export default getHomeCollectionQuery;
