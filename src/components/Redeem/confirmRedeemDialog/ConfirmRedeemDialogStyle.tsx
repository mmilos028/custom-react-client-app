import { Theme, createStyles } from '@material-ui/core';

const ConfirmRedeemDialogStyle = (theme: Theme) => createStyles({
    content: {
        minWidth: 500,
    },
    tableHead: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
});

export default ConfirmRedeemDialogStyle;