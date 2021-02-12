export default {
  layout: 'horizontal',
  api: 'https://jsonplaceholder.typicode.com/users',
  items: [
    {
      label: 'Name',
      type: 'input',
    },
    {
      label: 'Age',
      type: 'inputNumber',
    },
    {
      label: 'Gender',
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
      type: 'timepicker'
    },
    {
      label: 'Is VIP',
      type: 'switch'
    }
  ],
}