import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { createTheme } from "@mui/material"
import { useState } from 'react';
import TextField from '@mui/material/TextField';

function CustomizedPickerBase(props) {
    const {selectedDate, handleDateChange} = props

    const useStyles = makeStyles((theme) => ({
        datePicker: {
            border: `${props.valid ? "solid 5px transparent !important" : "solid 5px red !important"}`,
            borderRadius: "4px",
            width: "19rem",
            height: "7rem",
            backgroundOrigin: "border-box",
            backgroundImage: `linear-gradient(to right, white, white), linear-gradient(to right, #0057FF, #7FC9FF)`,
            backgroundClip: "content-box, border-box",
            filter: "brightness(120%)",
            boxShadow: `inset 0 0 0 2rem white, 0 0 0 3px #0057FF,  0 0 0 5px white !important`,
            '& .MuiInputBase-input': {
                color: `#0A2647`,
                fontWeight: '500',
                fontSize: "2rem",
            },
            '& .MuiInputAdornment-root': {
                color: `#0A2647`,
                fontWeight: "500",
                fontSize: "2rem",
                // width: '5rem',
                // height: '5rem',
            },
            '& .MuiInputLabel-root': {
                color: `#0A2647`,
                fontWeight: '500',
                fontSize: "2rem",
                '&.Mui-focused': {
                    fontSize: "2.5rem",
                    color: `#0A2647`
                },
            },
            '& .MuiInputLabel-floating': {
                fontSize: `10rem`,
            },
            '& .MuiOutlinedInput-root': {
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: "transparent",
                    borderWidth: "3px",
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: `transparent`,
                    borderWidth: "3px",
                },
                '& input[type="date"]::-webkit-calendar-picker-indicator': {
                    filter: 'brightness(2)',
                },
                '& .MuiSvgIcon-root': {
                    width: '3rem',
                    height: '3rem',
                    color: `#0A2647`
                  },
                  '& .MuiPickersDay-root': {
                    fontSize: '4rem',
                  },
                  '& .MuiPickersDay-day': {
                    fontSize: '2rem',
                  },
                  '& .MuiFormLabel-root-MuiInputLabel-root.Mui-error': {
                    color: 'yellow !important',
                  }

            },
        },
    }));

    const classes = useStyles();
    const customTheme = createTheme({
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        '&.Mui-focusVisible': {
                            borderColor: `#0057FF`,
                            borderWidth: '30px',
                        },
                    },
                },
            },
        },
    });

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
            <ThemeProvider theme={customTheme}>
                <DatePicker
                    className={classes.datePicker}
                    label={props.valid ? "Birthday" : "Invalid Date"}
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            sx={{
                                svg: {
                                    width: "5rem",
                                    height: "5rem"
                                }
                            }}
                            InputProps={{
                                ...params.InputProps,
                                classes: {
                                    input: classes.input,
                                },
                            }}
                            InputLabelProps={{
                                ...params.InputLabelProps,
                                classes: {
                                    root: classes.label,
                                },
                            }}
                            InputAdornmentProps={{
                                ...params.InputAdornmentProps,
                                classes: {
                                    root: classes.adornment,
                                },
                            }}
                        />
                    )}
                />
            </ThemeProvider>
        </LocalizationProvider>
    );
}

export default CustomizedPickerBase
