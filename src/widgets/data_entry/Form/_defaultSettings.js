export default {
  padding: '10px',
  layout: 'horizontal',
  labelCol: 6,
  api: 'https://jsonplaceholder.typicode.com/users',
  items: [
    {
      label: 'Name',
      name: 'name',
      type: 'input',
    },
    {
      label: 'Age',
      name: 'age',
      type: 'inputNumber',
    },
    {
      label: 'Gender',
      name: 'gender',
      type: 'select',
      options: [
        {
          key: 'Male',
          value: 'male',
        }, {
          key: 'Female',
          value: 'female',
        }
      ]
    },
    {
      label: 'Birthday',
      name: 'birthday',
      type: 'timepicker'
    },
    {
      label: 'Is VIP',
      name: 'vip',
      type: 'switch'
    }
  ],
}