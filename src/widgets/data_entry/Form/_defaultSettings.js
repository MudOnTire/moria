export default {
  padding: '10px 20px',
  layout: 'horizontal',
  labelCol: 3,
  footerLayout: 'flex-start',
  colon: true,
  api: 'https://jsonplaceholder.typicode.com/users',
  items: [
    {
      id: 0,
      label: 'Name',
      name: 'name',
      type: 'input',
    },
    {
      id: 1,
      label: 'Age',
      name: 'age',
      type: 'inputNumber',
    },
    {
      id: 2,
      label: 'Gender',
      name: 'gender',
      type: 'select',
      options: [
        {
          id: 0,
          label: 'Male',
          value: 'male',
        },
        {
          id: 1,
          label: 'Female',
          value: 'female',
        }
      ]
    },
    {
      id: 3,
      label: 'Birthday',
      name: 'birthday',
      type: 'datepicker'
    },
    {
      id: 4,
      label: 'Is VIP',
      name: 'vip',
      type: 'switch'
    },
    {
      id: 5,
      label: 'Introduce',
      name: 'introduce',
      type: 'textarea'
    },
  ],
}