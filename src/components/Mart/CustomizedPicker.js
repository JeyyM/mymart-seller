import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from "@mui/material"
import { useState } from 'react';

function CustomizedPicker(props) {
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const useStyles = makeStyles((theme) => ({
        datePicker: {
          backgroundColor: 'lightblue',
          '& .MuiPickersDay-daySelected': {
            backgroundColor: 'blue',
          }
        },
      }));
      
    const classes = useStyles();
    const customTheme = createMuiTheme({
        // custom theme options
      });

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={customTheme}>
          <DatePicker
            className={classes.datePicker}
            label="Customized DatePicker"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </ThemeProvider>
      </LocalizationProvider>
    );
}

export default CustomizedPicker