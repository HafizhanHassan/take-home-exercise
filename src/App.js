import './App.css';
import TextField from "@material-ui/core/TextField";
import {  
        Button, 
        Dialog, 
        DialogActions, 
        DialogContent, 
        DialogContentText, 
        DialogTitle, 
        FormControl, 
        InputLabel, 
        makeStyles, 
        MenuItem, 
        Modal, 
        Select 
      } from '@material-ui/core';
import { Grid } from "@material-ui/core";
import { useState } from 'react';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      minWidth: 280,
    },
  },formControl:{
    margin: theme.spacing(2),
      minWidth: 280,
    },
  floatingLabelFocusStyle: {
        color: 'rgb(252, 102, 2) !important',
        fontWeight: 'Bold'
    },
  button: {

    color: 'white',
    fontWeight: 'Bolder',
    backgroundColor: 'rgb(252, 102, 2)',
    padding: '8px 15px',
    minWidth: 280


    },
    paper: {
    position: 'absolute',
    minWidth:'475px',
    minHeight: '50%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const [apiKey, setApiKey] = useState('ff9f895b2e884d6680530135202710')
  const [cityName, setCityName] = useState('')
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertType, setAlert] = useState('')
  const [celsius, setcelsius] = useState('')
  const [fahrenheit, setfahrenheit] = useState('')

  //after click on submit button
  const handleSubmit = async(event) => {
    event.preventDefault()
    console.log("API: ",apiKey);
    console.log('City: ', cityName);
    const city = cityName.toString()


    if(cityName && apiKey){ 
      //fetching the data using the api with the combination of apikey and the slected city
      await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
      .then(res => {
        console.log('json: ', res);
        return res.json()})
      .then(result => {
        const tempC = result.current.temp_c
        const tempF = result.current.temp_f
        //set the extracted data (celsius and fahrenheit) & set modal to open to display the result on modal
        setcelsius(tempC.toString())
        setfahrenheit(tempF.toString())
        setOpen(true)
        
      }).catch((e) => {

        setOpen(false)
        setAlertOpen(true)
        //if the error found set the type of error
        setAlert('API')})

      
    }else{
      setAlertOpen(true)
      setAlert('City')
    }
    

  }

  const alertClose = () => {
    setAlertOpen(false)
  }

  
  return (
    <div className="App">
      <Grid 
          container 
          alignItems = "center"
          direction='column'
          justify="center"
          style={{ minHeight: '90vh'}}
          className='grid-scale'
      >
        <FormControl className = {classes.root} noValidate autoComplete='off'>
            <TextField
                type = 'text'
                className = 'api-key'
                label= 'Your API key'
                InputLabelProps = {{
                  className: classes.floatingLabelFocusStyle
                }}
                value={apiKey}
                onChange= {(e) => setApiKey(e.target.value)}
              /> 
        </FormControl>

        <FormControl className = {classes.formControl} noValidate autoComplete='off'>

            <InputLabel  id="demo-simple-select-label">
              City Name
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value = {cityName}
              onChange = { (e) => setCityName(e.target.value)}
              // onChange
            >
              <MenuItem value={'Kuala Lumpur'}>Kuala Lumpur</MenuItem>
              <MenuItem value={'Singapore'}>Singapore</MenuItem>
            </Select>
        
        </FormControl>
        <br />

        <Button variant = 'contained' className = {classes.button} onClick = {handleSubmit} >
          Submit
        </Button>

     </Grid>
    
    <Modal
      open={open}
      onClose={() => {
        setApiKey('ff9f895b2e884d6680530135202710')
        setCityName('')
        setOpen(false)
        setcelsius('')
        setfahrenheit('')
      }}
    >
      <div style={modalStyle} className={classes.paper}>
        <Grid 
          container 
          alignItems = "center"
          direction='column'
          justify="center"
          style={{ minHeight: '10vh'}}
          className='grid-scale'
      >
        <TextField
          label= 'Celsius'
          InputLabelProps = {{
            className: classes.floatingLabelFocusStyle
          }}
          value={celsius}
          disabled
        >

        </TextField>
        <br />
        <TextField
          label= 'Fahrenheit'
          InputLabelProps = {{
            className: classes.floatingLabelFocusStyle
          }}
          value={fahrenheit}
          disabled
        >

        </TextField>
        </Grid>
      </div>


    </Modal>
    
    <Dialog
        open={alertOpen}
        onClose={alertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          { alertType === 'API' ? ' The API Key entered is not authorized' : 'Please Select the City'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={alertClose} color="primary" autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>

    </div>

  );
}

export default App;
