// Updated GraphQL mutation query
const cartLinesRemoveMutation = `
mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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

export default cartLinesRemoveMutation;
