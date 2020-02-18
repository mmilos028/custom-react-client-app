import { Theme, createStyles } from '@material-ui/core';


const CreateMemberCardStyle = (theme: Theme) => createStyles({
    content: {
        minWidth: 600,
        width: '100%'
    },
    mainMessage: {
        textTransform: "uppercase",
        textAlign: "center"
    },
    toggleButtonGroup: {
        height: 90,
        textAlign: "center"
    },
    toggleButton: {
        height: 70,
        width: 130,
        border: '1px solid black',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        color: "#000000",
        "&:hover": {
            backgroundColor: "#00a152",
            color: "#ffffff",
        }
    },
    toggleButtonSelected: {
        height: 70,
        width: 130,
        border: '1px solid black',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#00a152 !important",
        color: "#ffffff !important",
        "&:hover": {
            backgroundColor: "#00a152 !important",
            color: "#ffffff !important",
        }
    },
    toggleButtonText: {
        textTransform: "uppercase",
        color: "inherit",
    },
    submit: {        
        marginTop: theme.spacing.unit * 3,
        textTransform: "uppercase",
        background: "#00a152",
        "&:hover":{
            backgroundColor: "#00a152",
        }     
    },    
    validationMessage: {
        fontSize: 18
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

export default CreateMemberCardStyle;