import React, { useState, useEffect } from 'react';
import { Grid, ListItem, ListItemText, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import OrderActions from './details-tab/OrderActions';
import ClientDetails from './details-tab/ClientDetails';
import OrderItemsList from './details-tab/OrderItemsList';
import TableRowDetails from './TableRowDetails';

const useStyles = makeStyles(theme => ({
    row: {
        borderLeft: "4px solid",
        borderColor: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.dark,
        marginBottom: theme.spacing(1),
        height: "64px",
        padding: theme.spacing(0, 2)
    },
    button: {
        borderColor: theme.palette.primary.dark,
        color: theme.palette.primary.dark,
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            color: "white",
        },
        textAlign: "center",
    },
    darkButton: {
        color: "white",
        backgroundColor: theme.palette.primary.dark
    },
    details: {
        display: "flex",
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        marginBottom: theme.spacing(1),
        borderLeft: "4px solid",
        borderColor: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.light
    },
    hide: {
        display: 'none'
    },
    orderDetails: {
        display: "flex",
        flexDirection: "column",
    },
    total: {
        alignSelf: "flex-start",
        padding: theme.spacing(0, 3),
    }


}));

const getStatus = (status) => {
    switch (status) {
        case "NEW":
            return "Нова"
        case "PENDING":
            return "Чакаща"
        case "APPROVED":
            return "Одобрена"
        default:
            return "Нова"
    }
}
const TableRow = (props) => {
    const classes = useStyles()

    const [isShown, setIsShown] = useState(false)

    let { order, type } = props

    let cellSizes = type === "archive" ? [4, 4, 3, 0, 1] : [3, 3, 3, 2, 1]

    useEffect(() => setIsShown(false), [props])

    const onClickHandler = (e) => setIsShown(!isShown)

    let total = order.orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    let clientName = order.client.type === "Некорпоративен" ? `${order.client.firstName} ${order.client.lastName}` : order.client.corporateName
    return (
        <div>
            {/* Order Row */}
            <Grid className={classes.row} container alignItems="center">
                <Grid item xs={4} md={cellSizes[0]}>
                    <strong>{order.orderNumber}</strong>
                </Grid>
                <Grid item xs={4} md={cellSizes[1]} className={classes.bold}>
                    {clientName}
                </Grid>
                <Grid item xs={false} md={cellSizes[2]}>
                    {`${order.scheduledAtString.split(" ")[0]} в ${order.scheduledAtString.split(" ")[1]}`}
                </Grid>
                {type !== "archive" ?
                    <Grid item xs={false} md={cellSizes[3]}>
                        {getStatus(order.status)}
                    </Grid> : ""
                }
                <Grid item xs={4} md={cellSizes[4]}>
                    <Button
                        id={order.orderNumber}
                        onClick={onClickHandler}
                        className={`${classes.button} ${isShown ? classes.darkButton : ''}`} variant="outlined">{isShown ? "Скрий" : "Виж"}</Button>
                </Grid>
            </Grid>
            {/* END Order Row */}

           
            {/* <Grid container className={`${classes.details} ${classes.primary} ${isShown ? "" : classes.hide}`}>
                <ListItem className={classes.orderDetails}>
                    <ClientDetails scheduledAtString={order.scheduledAtString} client={order.client} />
                    <OrderItemsList items={order.orderItems} />
                    <ListItemText className={classes.total}>
                        <strong>ОБЩО: {total.toFixed(2)} лв.</strong>
                    </ListItemText>
                </ListItem>
                {type !== "archive" ? <OrderActions order={order} /> : ""}
            </Grid> */}
           

            {isShown ? <TableRowDetails order={order}/> : ""}

        </div>
    );

}

export default TableRow;