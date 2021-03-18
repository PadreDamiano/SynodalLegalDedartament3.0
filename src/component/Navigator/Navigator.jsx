import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AlarmIcon from '@material-ui/icons/Alarm';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import GavelIcon from '@material-ui/icons/Gavel';
import TimerIcon from '@material-ui/icons/Timer';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import SearchIcon from '@material-ui/icons/Search';
import logo from '../Header/logo.png';

const categories = [
    {
        id: 'Судові рішення',
        children: [
            {id: 'Всі судові рішення', icon: <GavelIcon/>, link: '/all', active: true},
            {id: 'Єпархії', icon: <AccountBalanceIcon/>, link: '/diocese', active: false},
            {id: 'Області', icon: <HomeWorkIcon/>, link: '/region', active: false},
            {id: 'Найближчі засідання', icon: <AlarmIcon/>, link: '/upcoming', active: false},
            {id: 'Обрані', icon: <DoneAllIcon/>, link: '/favorites', active: false},
            {id: 'Пошук', icon: <SearchIcon/>, link: '/search', active: false}
        ],
    },
    {
        id: 'Додатково',
        children: [
            {id: 'Аналітика', icon: <AssessmentIcon/>, link: '/analytics'},
            {id: 'Performance', icon: <TimerIcon/>, link: '/performance'},
            {id: 'Звязатися з розробником', icon: <PhonelinkSetupIcon/>, link: '/contact'},
        ],
    },
];

const styles = (theme) => ({
    categoryHeader: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
        color: theme.palette.common.white,
    },
    item: {
        paddingTop: 1,
        paddingBottom: 1,
        color: 'rgba(255, 255, 255, 0.7)',
        '&:hover,&:focus': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
    },
    itemCategory: {
        backgroundColor: '#232f3e',
        boxShadow: '0 -1px 0 #404854 inset',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    firebase: {
        color: theme.palette.common.white,
    },
    itemActiveItem: {
        color: '#4fc3f7',
    },
    itemNotActiveItem: {
        color: 'rgba(255,255,255,0.7)',
    },
    itemPrimary: {
        fontSize: 'inherit',
    },
    itemIcon: {
        minWidth: 'auto',
        marginRight: theme.spacing(2),
    },
    divider: {
        marginTop: theme.spacing(2),
    },
});

function Navigator(props) {
    const {classes, ...other} = props;

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
                    <img src={logo}
                         height='86'
                         width='60'
                         className='display-inline-block align-top'
                         alt='UOC'
                    />
                </ListItem>
                <ListItem
                    component="a" href="/"
                    className={clsx(classes.item, classes.itemCategory)}>
                    <ListItemIcon className={classes.itemIcon}>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText
                        classes={{
                            primary: classes.itemPrimary,
                        }}
                    >
                        Додому
                    </ListItemText>
                </ListItem>
                {categories.map(({id, children}) => (
                    <React.Fragment key={id}>
                        <ListItem className={classes.categoryHeader}>
                            <ListItemText
                                classes={{
                                    primary: classes.categoryHeaderPrimary,
                                }}
                            >
                                {id}
                            </ListItemText>
                        </ListItem>
                        {children.map(({id: childId, icon, link, active}) => (
                            <ListItem
                                component="a" href={link}
                                button
                                key={childId}
                                className=
                                    {clsx(classes.item, active ? classes.itemActiveItem : classes.itemNotActiveItem)}
                            >
                                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                                <ListItemText
                                    classes={{
                                        primary: classes.itemPrimary,
                                    }}
                                >
                                    {childId}
                                </ListItemText>
                            </ListItem>
                        ))}

                        <Divider className={classes.divider}/>
                    </React.Fragment>
                ))}
            </List>
        </Drawer>
    );
}

Navigator.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);