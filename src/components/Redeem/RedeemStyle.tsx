import { Theme, createStyles } from '@material-ui/core';

const RedeemStyle = (theme: Theme) => createStyles({
    content: {
        minWidth: 600,
        width: '100%'
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
    },
    availableAmountTextField: {
        color: "#ffffff"        
    },
    "availableAmountTextField:disabled": {
        color: "#ffffff !important"
    },
    cardContentList: {
        width: '100%',
        minWidth: 600,
        padding: 0,
        margin: 0,
        textDecoration: "none",
        listStyle: "none",
        boxSizing: "border-box",
        "-moz-box-sizing": "border-box",
        "-webkit-box-sizing": "border-box",
        letterSpacing: "0.025em",
        fontWeight: "normal",
        "-webkit-tap-highlight-color": "transparent",
        "-webkit-overflow-scrolling": "touch",

        "& .flexCell": {
            display: "flex",
        },
        "& .flex1Cell": {
            display: "flex",
            flex: 1,
        },
        '& .infoHeader': {
            display: "table",
            border: "1px solid rgba(0, 0, 0, 0.23)",
            width: "100%",
            background: "#ffffff",

            "& .part1": {
                width: 284,
                height: 80,
                overflow: "hidden",
                display: "table-cell",
                
                "& .cell": {
                    display: "table-cell",
                    verticalAlign: "middle",
                },

                "& .infoNames": {
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    width: 82,
                    fontSize: 13,
                    lineHeight: 24,
                }
            },

            "& .part2": {
                padding: 0,
                margin: 0,
                textDecoration: "none",
                listStyle: "none",
                boxSizing: "border-box",
                "-moz-box-sizing": "border-box",
		        "-webkit-box-sizing": "border-box",
                color: "#000000",
                letterSpacing: "0.025em",
                fontWeight: "normal",
                "-webkit-tap-highlight-color": "transparent",
                "-webkit-overflow-scrolling": "touch",
                
                "& .cell": {
                    display: "table-cell",
                    verticalAlign: "middle",
                },

                "& .prioritiesHolder": {
                    padding: 0,
                    margin: 0,
                    textDecoration: "none",
                    listStyle: "none",
                    "-moz-box-sizing": "border-box",
			        "-webkit-box-sizing": "border-box",
                    boxSizing: "border-box",
                    color: "#000000",
                    letterSpacing: "0.025em",
                    fontWeight: "normal",
                    "-webkit-tap-highlight-color": "transparent",
			        "-webkit-overflow-scrolling": "touch",

                    "& .subcell": {
                        height: 40,
                        flexWrap: "wrap",
                        borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
                        flexFlow: "column wrap",

                        "& .name": {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            fontSize: 14,
                            fontWeight: "bold",
                            height: 40,
                            backgroundColor: "#ffffff",
                            color: "#000000",
                            width: "100%",
                            padding: 6,
                            opacity: .6,
                            marginBottom: 0
                        }
                    }
                }
            }
        }
    },
    article: {
        display: "block"
    },    
    cardContent: {        
        height: 305,
        display: "block",
        overflow: "hidden scroll",
        //overflowY: "scroll",
        //overflowX: "hidden",
        "-webkit-tap-highlight-color": "transparent",
        "-webkit-overflow-scrolling": "touch",
        "-webkit-backface-visibility": "hidden",
        backfaceVisibility: "hidden",        
        boxSizing: "content-box",
        "-moz-box-sizing": "content-box",
	    "-webkit-box-sizing": "content-box",
        "&::-webkit-scrollbar": {
            display: "none",
            width: 0,
            background: "transparent"
        },
        borderBottom: "1px solid rgba(0, 0, 0, 0.23)",

        "& .cell": {
            display: "table-cell",
            verticalAlign: "middle",
        },
        "& .default": {
            background: "#ffffff"
        },

        "& .cardContentRow": {
            fontSize: 18,
            display: "flex",
            flex: 1,
            //height: 50,
            height: "auto",
            border: "1px solid rgba(0, 0, 0, 0.23)",
            borderRight: "none",
            borderTop: "none",

            "& :hover": {
                background: "#f5f5f5"    
            },

            "& .part1": {
                display: "flex",
                width: 284,
                cursor: "pointer",
            },
            "& .part2": {
                borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
                display: "flex",                
                flex: 1,
                flexWrap: "wrap",
                minHeight: 50,
                
                "& .part2wrapperV2": {
                    flex: 1,
                    display: "flex",
                    boxOrient: "horizontal",
                    boxDirection: "normal",
                    flexFlow: "row wrap",
                    borderRight: "1px solid rgba(0, 0, 0, 0.23)",

                    "& .break-lines": {
                        lineHeight: "22px !important",
                        display: "flex",
                        alignItems: "center"
                    },
                    "& .partvar-left": {
				    	flex: 1,
					    textAlign: "left",
					    paddingLeft: 10,
					    cursor: "pointer"
				    },				    
				    "& .partvar": {
				    	flex: 1,
					    textAlign: "center",
					    justifyContent: "center",
					    cursor: "pointer"
                    },
                    "& p": {
                        overflow: "hidden",
                        fontSize: 12,
                        color: "#ffffff",
                        letterSpacing: ".025em",
                        lineHeight: 16,
                        marginBottom: 0
                    }
                }
            }
        }
    },    
    vb: {
        padding: 0,
        margin: 0,
        textDecoration: "none",
        listStyle: "none",
        "-moz-box-sizing": "border-box",
        "-webkit-box-sizing": "border-box",
        boxSizing: "border-box",
        letterSpacing: "0.025em",
        fontWeight: "normal",
        "-webkit-tap-highlight-color": "transparent",
        "-webkit-overflow-scrolling": "touch",
        overflow: "hidden"
    },
});

export default RedeemStyle;