import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { FormControl, FormControlLabel, InputLabel, Input, FormHelperText, Switch } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import NewItemDialog from './NewItemDialog'
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    "& .MuiFormLabel-root.Mui-focused": {
      borderColor: theme.palette.primary.dark,
      color: theme.palette.primary.dark
    },
    "& .MuiInput-underline:after": {
      borderColor: theme.palette.primary.dark,
    },
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  inl: {
    margin: "0"
  },
  add: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    "&:hover": {
      borderColor: theme.palette.primary.dark,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.dark,
    },
    textAlign: "center",
    margin: theme.spacing(2, 0)
  },
  btn: {
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color:theme.palette.primary.dark,
    },
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewOrderDialog(props) {
  const { open, passData } = props
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(open);
  const [data, setData] = useState({})
  const [orderItems, setOrderItems] = useState([])
  const [newServiceDialogOpen, setNewServiceDialogOpen] = useState(false)
  const [isCorporateClient, setIsCorporateClient] = useState(false);
  const [hasToRedirect, setHasToRedirect] = useState(false)

  const corporateClientDetals = [
    <FormControl key="cc-1" fullWidth>
      <InputLabel htmlFor="component-helper">Булстат</InputLabel>
      <Input
        id="component-helper"
        value={data.name}
        onChange={(e) => handleChange('name', e.target.value)}
        aria-describedby="component-helper-text"
      />
      <FormHelperText id="component-helper-text"></FormHelperText>
    </FormControl>,
    <FormControl key="cc-2" fullWidth>
      <InputLabel htmlFor="component-helper">VAT Номер</InputLabel>
      <Input
        id="component-helper"
        value={data.name}
        onChange={(e) => handleChange('name', e.target.value)}
        aria-describedby="component-helper-text"
      />
      <FormHelperText id="component-helper-text"></FormHelperText>
    </FormControl>
  ]

  const handleClose = async () => {

    passData(data)
    setDialogOpen(false);
    setHasToRedirect(true)
  };
  const handleChange = (field, value) => {

    setData({ ...data, [field]: value })

  }
  const saveData = (datas) => {

    console.log(data)
    let old = orderItems
    old.push(datas)
    setOrderItems([...old])
    setData({ ...data, orderItems: [...old] })
  }
  if (hasToRedirect) {
    return <Redirect to={"/dashboard"} />
  } else {
    return (
      <div>
        <NewItemDialog open={newServiceDialogOpen} setOpen={setNewServiceDialogOpen} saveData={saveData} />
        <Dialog disableBackdropClick className={classes.root} open={dialogOpen} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Нова Поръчка
              </Typography>
              <Button className={classes.btn} variant="outlined" autoFocus onClick={handleClose}>
                Запиши
              </Button>
            </Toolbar>
          </AppBar>
          <form className={classes.root} noValidate autoComplete="off">
            <Typography>Въведи данни за поръчка</Typography>
            <FormControlLabel
              control={<Switch color="primary" className={classes.switch} checked={isCorporateClient} onChange={(e) => setIsCorporateClient(!isCorporateClient)} name="checkedA" />}
              label={isCorporateClient ? "Тип клиент: корпоративен" : "Тип клиент: некорпоративен"}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="component-helper">Имена на клиента</InputLabel>
              <Input
                id="component-helper"
                value={data.name}
                onChange={(e) => handleChange('name', e.target.value)}
                aria-describedby="component-helper-text"
              />
              <FormHelperText id="component-helper-text"></FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="component-helper">Телефон</InputLabel>
              <Input
                id="component-helper"
                value={data.tel}
                onChange={(e) => handleChange('tel', e.target.value)}
                aria-describedby="component-helper-text"
              />
              <FormHelperText id="component-helper-text">телефонът във формат 08******</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="component-helper">Адрес за изпълнение поръчката</InputLabel>
              <Input
                id="component-helper"
                value={data.addr}
                onChange={(e) => handleChange('addr', e.target.value)}
                aria-describedby="component-helper-text"
              />
              <FormHelperText id="component-helper-text"></FormHelperText>
            </FormControl>
            {isCorporateClient ? corporateClientDetals : null}
            <FormControl fullwidth >
              <Button
                className={classes.add}
                onClick={() => setNewServiceDialogOpen(true)}
                variant="outlined"
                color="primary">
                <AddShoppingCartIcon />&nbsp;
                Добави услуга
              </Button>

            </FormControl>
            <List>
              {orderItems.map((el, idx) => {
                return (
                  <ListItem key={idx}>
                    <ListItemText primary={el.serviceType.name} secondary={`${el.serviceQty} x ${el.servicePrice} лв.`} />
                    <Button><DeleteForeverIcon /></Button>
                  </ListItem>
                )
              })}
            </List>
          </form>
        </Dialog>
      </div>
    );
  }
}