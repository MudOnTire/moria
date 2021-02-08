export default {
  bordered: true,
  sticky: true,
  api: 'https://jsonplaceholder.typicode.com/posts',
  columns: [
    {
      id: 1,
      title: 'Id',
      dataIndex: 'id'
    },
    {
      id: 2,
      title: 'User Id',
      dataIndex: 'userId'
    },
    {
      id: 3,
      title: 'Title',
      dataIndex: 'title'
    },
    {
      id: 4,
      title: 'Body',
      dataIndex: 'body'
    }
  ],
  rowKey: 'id',
  width: null,
}