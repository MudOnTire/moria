export default {
  bordered: true,
  sticky: true,
  api: 'https://jsonplaceholder.typicode.com/users',
  columns: [
    {
      id: 1,
      title: 'Id',
      dataIndex: 'id'
    },
    {
      id: 2,
      title: 'Name',
      dataIndex: 'name'
    },
    {
      id: 3,
      title: 'Email',
      dataIndex: 'email'
    },
    {
      id: 4,
      title: 'Phone',
      dataIndex: 'phone'
    },
    {
      id: 5,
      title: 'Website',
      dataIndex: 'website'
    }
  ],
  rowKey: 'id',
  width: null,
}