
  {
      appointment: {
          list: {
              error: null,
              isFetching: false,
              shouldReload: false,
              dataSource: {
                  data: [],
                  filter: {
                      startDate: null,
                      endDate: null,
                      clientName: '',
                      onlyMe: false
                  }
              },
              sorting: { // данные сортитровки
                  field: 'startDate',
                  order: 'asc'
              },
              pagination: { // данные пагинации
                  page: 1,
                  size: 25,
                  totalCount: 0
              }
          },
          details: { // детали приёма
              error: null,
              isFetching: false,
              shouldReload: false,
              data: null // сами данные
          },
          form: { // форма для создания/редактирования приёма
              error: null,
              isFetching: false,
              shouldReload: false,
              fields: { // поля формы
                  startDate: null,
                  endDate: null,
                  clientName: '',
                  onlyMe: false
              }
          },
          count: { // счётчик колличества (записей в таблице БД)
              error: null,
              isFetching: false,
              shouldReload: false,
              value: null
          },
          history: { // история изменений приёма (например мы несколько раз редактировали одну запись)
              // структура точно такая же как и у просто списка list
              error: null,
              isFetching: false,
              shouldReload: false,
              dataSource: {
                  data: [],
                  pagination: {
                      page: 1,
                      size: 10,
                      totalCount: 0
                  }
              }
          },
          can: { // разграничение прав
              add: { // может ли текущий пользователь добавлять запись
                  error: null,
                  isFetching: false,
                  value: null
              },
              edit: { // может ли текущий пользователь редактировать запись
                  error: null,
                  isFetching: false,
                  value: null
              },
              remove: { // может ли текущий пользователь удалять запись
                  error: null,
                  isFetching: false,
                  value: null
              }
          }
      }
  }



   // список
    this.props.appointment.list.error
    this.props.appointment.list.isFetching
    this.props.appointment.list.dataSource.data
    this.props.appointment.list.dataSource.filter
    this.props.appointment.list.dataSource.pagination
    ...

    // детали
    this.props.appointment.details.error
    this.props.appointment.details.isFetching
    this.props.appointment.details.data
    ...

    // форма
    this.props.appointment.form.error
    this.props.appointment.form.isFetching
    this.props.appointment.form.fields
    ...

