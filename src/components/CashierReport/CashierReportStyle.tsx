import { Theme, createStyles } from '@material-ui/core';


const CashierReportStyle = (theme: Theme) => createStyles({
    content: {
        minWidth: 600,
        width: '100%'
    },
    textAlignLeft: {
        textAlign: 'left'
    },
    textAlignRight: {
        textAlign: 'right'
    },
    textAlignCenter: {
        textAlign: 'center'
    },
    textUppercase: {
        textTransform: 'uppercase'
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        textTransform: "uppercase",
    },    
    successMessage: {
        color: 'green',
        fontSize: 18,
        textTransform: 'uppercase'
    },
    errorMessage: {
        color: 'red',
        fontSize: 18,
        textTransform: 'uppercase'
    }
});

export default CashierReportStyle;