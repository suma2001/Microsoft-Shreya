import {React, useState} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Snack from "@material-ui/core/SnackbarContent";
import styles from "../../assets/jss/material-dashboard-react/components/snackbarContentStyle.js";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Button } from "@material-ui/core";

import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Popup from "../Popup/Popup";
import BootstrapDialog from "../BootstrapDialog/BootstrapDialog";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const useStyles = makeStyles(styles);

export default function SnackbarContent(props) {
  const classes = useStyles();
  const { message, color, dele, icon, id, rtlActive } = props;
  var action = [];
  const messageClasses = classNames({
    [classes.iconMessage]: icon !== undefined,
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    fetch(`/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json , text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
    }).then(res => {
      
      if(res.status === 200) {
        return res.json();
      }
    }).then(() => {
      toast.success('Group Deleted !', {autoClose: 3000});
      window.location.href = "/admin/profile";
    }).catch(err => {
      toast.error('Error creating group !', {autoClose: 3000});
      console.log(err);
    })
  }

  if (dele === "true") {
    action = [
      <DeleteForeverIcon 
        key="dele"
        onClick={handleClickOpen}
        />,
        <BootstrapDialog
          key="dele1"
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
        <Popup onClose={handleClose} style={{width: "500px"}}>
          Do you want to delete ?
        </Popup>
        <DialogActions>
          <Button autoFocus color="secondary" onClick={handleDelete}>
            DELETE
          </Button>
        </DialogActions>
      </BootstrapDialog>
    ];
  }

  return (
    <div>
      <Snack
      message={
        <div>
          {icon !== undefined ? <props.icon className={classes.icon} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      classes={{
        root: classes.root + " " + classes[color],
        message: classes.message,
        action: classNames({ [classes.actionRTL]: rtlActive }),
      }}
      action={action}
      
    />
    </div>
    
  );
}

SnackbarContent.propTypes = {
  message: PropTypes.node.isRequired,
  dele: PropTypes.string,
  id: PropTypes.string,
  color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
  close: PropTypes.bool,
  icon: PropTypes.object,
  rtlActive: PropTypes.bool,
};
