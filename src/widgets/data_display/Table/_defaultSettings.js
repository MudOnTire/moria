export default {
  bordered: true,
  sticky: true,
  api: 'https://jsonplaceholder.typicode.com/posts',
  columns: [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'User Id',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Body',
      dataIndex: 'body',
      key: 'body',
    }
  ],
  rowKey: 'id',
}