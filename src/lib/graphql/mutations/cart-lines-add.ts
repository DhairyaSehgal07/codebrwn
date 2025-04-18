const cartLinesAdd = `
mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      lines(first:10){
        edges{
         node{
         id
         quantity
          merchandise {
              ... on ProductVariant {
                id
                title
              }
            }
         }
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
`;

export default cartLinesAdd;
