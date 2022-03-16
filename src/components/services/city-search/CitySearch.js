import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios';
import { cityContext } from '../Services';
import './CitySearch.styles.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function CitySearch() {
    const {value1, value2} = useContext(cityContext);
    const [city,setCity] = value1;
    const [showServices,setShowServices] = value2;
    const [show,setShow] = useState(1);
    const [results,setResults] = useState(null);
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        const loadLocations = async() => {
            const response = await axios.get(`https://api.locationiq.com/v1/autocomplete.php?key=pk.df6bb483f87eb129461b7632ea1e6903&q=${city}&countrycodes=in&tag=place:city,place:town`)
            let matches = response.data.map((resp) => {
                return resp.display_place;
            })
            console.log(city);
            let res11 = matches.map((sugg,i) => {
                return ( <div key={i} className='suggestion-city-item' onClick={onClickHandle}> {sugg} </div>)
            })
            setResults(res11)
        }

        loadLocations();
    }, [city])

    const handleOnChange = (e) => {
        setCity(e.target.value);
        setShow(1)
    }

    const onClickHandle = (e) => {
        setCity(e.target.innerText);
        console.log(city)
        setShow(0)
    }

    const onClickSearchHandle = (e) => {
        let found = 0;
        for(let i = 0; i < results.length; i++)
        {
            if((results[i].props.children[1]).toLowerCase()===city.toLowerCase()) {
                found = 1;
                break;
            }
        }

        if(found===1) {
            setShowServices(1);
        } else {
            setOpen(true);
            setCity("");
            setShow(0);
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
       <div className='wrapper'>
            <div className='search-box'>
                <i class="material-icons">search</i>
                <input type="text" onChange={handleOnChange} value={city} class="city-input" placeholder='Enter the city you want to go' />
                <Button className='search-button' variant="contained" color="success" onClick={onClickSearchHandle}> Search </Button>
            </div>
            {results && show===1 && city!=="" ? <div className='suggestion-cities'> {results.slice(0,6)} </div> : null}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                  {"Wrong city entered"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Sorry, it seems you have entered wrong city name. Try again!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                    Okay
                  </Button>
                </DialogActions>
            </Dialog>
       </div>
    )
}

export default CitySearch;