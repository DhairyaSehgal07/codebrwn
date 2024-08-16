const customerCreate = `
mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer {
      id
    }
    customerUserErrors {
      field
      message
      code
    }
  }
}
`;

export default customerCreate;
