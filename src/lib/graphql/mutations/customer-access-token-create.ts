const customerToken = `
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerAccessToken {
      accessToken, 
      expiresAt
    }
    customerUserErrors {
      message
    }
  }
}
`;

export default customerToken;
