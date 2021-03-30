import React, { Component } from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Moment from 'react-moment'
import { map, filter } from 'underscore'
import { Form, Button } from 'reactstrap'

import Table from '../../component/Table/Table'
import TextField from '../../component/Form/TextField/TextField'
import DateField from '../../component/Form/DateField/DateField'
import SelectField from '../../component/Form/SelectField/SelectField'
import CheckboxField from '../../component/Form/CheckboxField/CheckboxField'

import './Appointments.scss'


import * as appointmentListActions from '../../redux/appointment/list/appointmentListAction'
import * as appointmentStatusListActions from '../../redux/directory/appointment/status/list/appointmentStatusListActions'

import { ReactComponent as Search } from '../../images/search.svg'
const TITLE = 'Приёмы'

const USER = 'Иванов Иван Иванович'

// маппинг состояния приложения в свойства компонента-контейнера
function mapStateToProps (state) {
    return {
        error: state.appointment.list.error,
        isFetching: state.appointment.list.isFetching,
        dataSource: state.appointment.list.dataSource,
        shouldReload: state.appointment.list.shouldReload,

        directory: state.directory
    }
}

// подключение генераторов действий к компоненту-контейнеру
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            ...bindActionCreators(appointmentListActions, dispatch),

            status: {
                list: bindActionCreators(appointmentStatusListActions, dispatch)
            }
        }
    }
}

class Appointments extends Component {

    componentDidMount() {
        this.load()
        this.loadStatuses()
    }

    onChangeFilterField = (name, value) => {
        this.changeFilterField(name, value)
    }

    onChangeFilterDateField = (name, value) => {
        this.changeFilterField(name, value && value.getTime())
    }

    onSearch = () => {
        this.load()
    }

    load() {
        const {
            actions,
            dataSource: ds
        } = this.props

        actions.load({
            ...ds.filter.toJS()
        })
    }

    loadStatuses () {
        this.props.actions.status.list.load()
    }

    changeFilterField (name, value, shouldReload) {
        this.props
            .actions
            .changeFilterField(name, value, shouldReload)
    }

    render() {

        // берём данные из состояния приложения используя свойства props
        const {
            isFetching,
            dataSource: ds,
            directory
        } = this.props

        const {
            startDate,
            endDate,
            clientName,
            statusId,
            onlyMe
        } = ds.filter

        return (
            <div className='Appointments'>
                <div className='Appointments-Body'>
                    <div className='Appointments-Filter'>
                        <Form className='Appointments-FilterForm'>
                            <DateField
                                hasTime
                                name='startDate'
                                value={startDate}
                                dateFormat='dd/MM/yyyy HH:mm'
                                timeFormat='HH:mm'
                                placeholder='С'
                                className='Appointments-FilterField'
                                onChange={this.onChangeFilterDateField}
                            />
                            <DateField
                                hasTime
                                name='endDate'
                                value={endDate}
                                dateFormat='dd/MM/yyyy HH:mm'
                                timeFormat='HH:mm'
                                placeholder='По'
                                className='Appointments-FilterField'
                                onChange={this.onChangeFilterDateField}
                            />
                            <TextField
                                name='clientName'
                                value={clientName}
                                placeholder='Клиент'
                                className='Appointments-FilterField'
                                onChange={this.onChangeFilterField}
                            />
                            <SelectField
                                name='statusId'
                                value={statusId}
                                placeholder='Статус'
                                options={[
                                    { value: -1, text: '' },
                                    ...map(
                                        directory.appointment.status.list.dataSource.data,
                                        o => ({ value: o.id, text: o.title })
                                    )
                                ]}
                                className='Appointments-FilterField'
                                onChange={this.onChangeFilterField}
                            />
                            <CheckboxField
                                name='onlyMe'
                                label='Только я'
                                value={onlyMe}
                                className='Appointments-FilterField'
                                onChange={this.onChangeFilterField}
                            />
                            <Button
                                className='Appointments-SearchBtn'
                                onClick={this.onSearch}>
                                <Search className='Appointments-SearchBtnIcon'/>
                            </Button>
                        </Form>
                    </div>
                    <Table
                        data={ds.data}
                        isLoading={isFetching}
                        className='AppointmentList'
                        columns={[
                            {
                                dataField: 'date',
                                text: 'Дата',
                                headerStyle: {
                                    width: '150px'
                                },
                                formatter: (v, row) => {
                                    return (
                                        <Moment date={v} format='DD.MM.YYYY HH.mm' />
                                    )
                                }
                            },
                            {
                                dataField: 'clientName',
                                text: 'Клиент',
                                headerStyle: {
                                    width: '300px'
                                }
                            },
                            {
                                dataField: 'status',
                                text: 'Статус'
                            },
                            {
                                dataField: 'holderName',
                                text: 'Принимающий',
                                headerStyle: {
                                    width: '300px'
                                }
                            },
                            {
                                dataField: 'compliences',
                                text: 'Жалобы',
                                headerStyle: {
                                    width: '200px'
                                }
                            },
                            {
                                dataField: 'diagnosis',
                                text: 'Диагноз',
                                headerStyle: {
                                    width: '200px'
                                }
                            }
                        ]}
                    />
                </div>
            </div>
        )
    }
}

// объявляем контейнер
export default connect(mapStateToProps, mapDispatchToProps)(Appointments)