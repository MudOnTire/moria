export default {
  title: 'User detail',
  api: 'https://jsonplaceholder.typicode.com/users/1',
  items: [
    {
      label: 'Id',
      property: 'id',
    },
    {
      label: 'Name',
      property: 'name',
    },
    {
      label: 'Username',
      property: 'username',
    },
    {
      label: 'Email',
      property: 'email',
    },
    {
      label: 'Address',
      property: 'address',
      renderStr: 'record=>`${record?.address?.city}, ${record?.address?.street}`'
    }
  ]
}