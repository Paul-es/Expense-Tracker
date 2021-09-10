import React, { useEffect } from "react";
import { format } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import "../styles/bill.css";
import category from "./category.json";
import { useHistory } from "react-router-dom";

import {
  Button,
  Modal,
  Backdrop,
  Paper,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { BiPlus, BiPaperPlane, BiXCircle } from "react-icons/bi";

function Bill() {
  const [open, setOpen] = React.useState(false);
  const [hide, setHide] = React.useState(true);
  const [filterClose, setFilterClose] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [localBills, setLocalbills] = React.useState([]);
  const [bills, setBills] = React.useState({
    title: "",
    category: "",
    date: new Date(),
    amount: "",
  });
  const history = useHistory();

  const track = () => {
    if (hide === true) {
      for (var i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        localBills.push(JSON.parse(localStorage.getItem(key)));
        setHide(false);
      }
    }
  };
  track();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    localStorage.setItem(bills.title, JSON.stringify(bills));
  };
  const handleCategory = (event) => {
    setBills({ ...bills, category: event.target.value });
  };
  const handleDateChange = (date) => {
    setBills({ ...bills, date: format(date, "MM") });
  };

  const handleTitle = (event) => {
    setBills({ ...bills, title: event.target.value });
  };
  const handleAmount = (event) => {
    setBills({ ...bills, amount: event.target.value });
  };
  const deleteBill = (del) => {
    localStorage.removeItem(del);
    window.location.reload();
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilter = (data) => {
    setAnchorEl(null);
    setFilterClose(true);
    var list = [];
    for (var i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (JSON.parse(localStorage.getItem(key)).category === data) {
        list.push(JSON.parse(localStorage.getItem(key)));
      }
    }
    setLocalbills(list);
  };
  const handleClear = () => {
    setHide(true);
    setFilterClose(false);
    setLocalbills([]);
    track();
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Bill Tracker
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            style={{ marginRight: "1.5rem" }}
            onClick={() => history.push("/chart")}
          >
            Track
          </Button>
          {filterClose ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClear}
              style={{ paddingRight: "12px", marginRight: "1.5rem" }}
              startIcon={<BiXCircle />}
            >
              Clear
            </Button>
          ) : null}
          <Button color="inherit" variant="outlined" onClick={handleClick}>
            Filter
          </Button>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
          >
            {category.map((option) => (
              <MenuItem onClick={() => handleFilter(option.value)}>
                {option.value}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      <Button
        className="add-btn"
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        <BiPlus />
      </Button>

      <Modal
        className="modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Paper variant="outlined" square elevation={3}>
          <div className="paper">
            <h2 style={{ paddingBottom: "5%" }} id="spring-modal-title">
              Budget !!!
            </h2>
            <form onSubmit={handleSubmit}>
              <Grid container>
                <Grid style={{ paddingLeft: "30px" }} item xs={6}>
                  <TextField
                    value={bills.title}
                    onChange={handleTitle}
                    required
                    label="Title"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-select-currency"
                    select
                    label="Category"
                    style={{ width: "65%" }}
                    value={bills.category}
                    onChange={handleCategory}
                    variant="outlined"
                  >
                    {category.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid style={{ paddingLeft: "30px" }} item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      label="Due Date"
                      style={{ marginTop: "30px" }}
                      format="MM/dd/yyyy"
                      onChange={handleDateChange}
                      value={bills.date}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid style={{ marginTop: "30px" }} item xs={12}>
                  <TextField
                    required
                    type="number"
                    label="Amount"
                    variant="outlined"
                    value={bills.amount}
                    onChange={handleAmount}
                  />
                </Grid>
                <Grid className="submit-bill" item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disableElevation
                  >
                    <BiPaperPlane style={{ fontSize: "30px" }} />
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Paper>
      </Modal>
      <div className="Cards">
        {localBills.map((item) => (
          <div style={{ display: "inline-block" }}>
            <Card
              style={{
                width: "20rem",
                marginInlineEnd: "20px",
                marginTop: "20px",
              }}
            >
              <CardContent>
                <Typography component="h2" variant="h5" color="textSecondary">
                  {item.title}
                </Typography>
                <Typography
                  style={{ marginTop: 12, marginBottom: 12 }}
                  color="textSecondary"
                >
                  {item.category}
                </Typography>
              </CardContent>
              <CardActions style={{ backgroundColor: "#e6e6e6" }}>
                <Button size="large">Edit</Button>
                <Button
                  onClick={() => deleteBill(item.title)}
                  style={{ color: "red", right: -100 }}
                  size="large"
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bill;
