import styled  from '@material-ui/core/styles/styled';
import Dialog from '@material-ui/core/Dialog/Dialog';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

export default BootstrapDialog;