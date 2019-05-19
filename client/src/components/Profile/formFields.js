export const fields = {
  text:
  [
    { label: 'User Name', name: 'userName', subscript: 'Must be a unique username'},
    { label: 'Email', name: 'email', subscript: 'We will never share your email' },
    { label: 'Phone Number', name: 'phone', subscript: 'We will never share you phone number'},
    { label: 'Street Address', name: 'streetAddress', subscript: 'We will never share you address' },
    { label: 'City', name: 'city' },
    { label: 'State', name: 'state' },
    { label: 'Age', name: 'age', subscript: 'We will never share your age' },
  ],
  radio:
  [
    { label: 'gender', name: 'gender' },
  ],
  select:
  [
    { label: 'Activities you would like to participate in', name: 'categories' },
  ]
}
