export default {
  padding: '10px 20px',
  layout: 'horizontal',
  labelCol: 3,
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
          label: 'Male',
          value: 'male',
        }, {
          label: 'Female',
          value: 'female',
        }
      ]
    },
    {
      label: 'Birthday',
      name: 'birthday',
      type: 'datepicker'
    },
    {
      label: 'Is VIP',
      name: 'vip',
      type: 'switch'
    },
    {
      label: 'Introduce',
      name: 'introduce',
      type: 'textarea'
    },
  ],
}