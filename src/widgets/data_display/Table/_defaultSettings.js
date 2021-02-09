export default {
  bordered: true,
  sticky: true,
  api: 'https://jsonplaceholder.typicode.com/users',
  columns: [
    {
      id: 1,
      title: 'Id',
      dataIndex: 'id',
      width: '60px'
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
    },
    {
      id: 6,
      title: 'Address',
      dataIndex: 'address',
      renderStr: `()=>{console.log('render function')}`
    }
  ],
  rowKey: 'id',
  width: null,
}