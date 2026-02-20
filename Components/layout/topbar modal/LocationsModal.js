import {
  Autocomplete,
  Box,
  Modal,
  Slide,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useWindowSize from '@rooks/use-window-size';
const style = {
  position: 'absolute',
  display: 'flex',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#fff',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  // height: "60%",
  flexWrap: 'wrap',
  maxWidth: '650px',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '15px 30px 30px 30px',
  borderRadius: '30px',

  fieldset: {
    border: 'none',
  },
};

const columnStyle = {
  margin: '0px',
  display: 'flex',
  flexWrap: 'no-wrap',
  marginTop: '24px',
};

const columnHeader = {
  m: 1,
  fontFamily: 'Bahnschrift',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '18px',
  lineHeight: '22px',
  color: '#E48F0E',

  h2: {
    fontWeight: '400 !important',
  },
};
const searchStyle = {
  width: 300,
  background: '#FFFFFF',
  boxShadow: '0px 0px 8px 1px rgba(0, 0, 0, 0.5)',
  borderRadius: '20px',
  border: 'none',
};

const titleStyle = {
  marginHorizontal: 2,
  h2: {
    fontWeight: '400 !important',
    textAlign: 'center',
  },
};

const rowsStyle = {
  fontFamily: `'Be Vietnam Pro', sans-serif`,
  fontStyle: 'initial',
  fontWeight: 100,
  fontSize: '16px',
  m: 1,
  cursor: 'pointer',
};

const Locations = [
  {
    location: 'Delhi',
    id: 'Delhi',
  },
  {
    location: 'Pune',
    id: 'Pune',
  },
  {
    location: 'Mumbai',
    id: 'Mumbai',
  },
  {
    location: 'Jaipur',
    id: 'Jaipur',
  },
  {
    location: 'Goa',
    id: 'Goa',
  },
  {
    location: 'Gurgaon',
    id: 'Gurgaon',
  },
  {
    location: 'Bangalore',
    id: 'Bangalore',
  },
  {
    location: 'Hyderabad',
    id: 'Hyderabad',
  },
  {
    location: 'Ahmedabad',
    id: 'Ahmedabad',
  },
  {
    location: 'Kolkata',
    id: 'Kolkata',
  },
];

const newLocations = [
  {
    location: 'Mumbai',
    id: 'Mumbai',
  },
  {
    location: 'Pune',
    id: 'Pune',
  },
  {
    location: 'Delhi',
    id: 'Delhi',
  },
  {
    location: 'Jaipur',
    id: 'Jaipur',
  },
  {
    location: 'Goa',
    id: 'Goa',
  },
  {
    location: 'Udaipur',
    id: 'Udaipur',
  },
  {
    location: 'Agra',
    id: 'Agra',
  },
  {
    location: 'Noida',
    id: 'Noida',
  },
  {
    location: 'Gurgaon',
    id: 'Gurgaon',
  },
  {
    location: 'Ranchi',
    id: 'Ranchi',
  },
  {
    location: 'Patna',
    id: 'Patna',
  },
  {
    location: 'Bangalore',
    id: 'Bangalore',
  },
  {
    location: 'Hyderabad',
    id: 'Hyderabad',
  },
  {
    location: 'Ahmedabad',
    id: 'Ahmedabad',
  },
  {
    location: 'Chennai',
    id: 'Chennai',
  },
  {
    location: 'Kolkata',
    id: 'Kolkata',
  },
  {
    location: 'Surat',
    id: 'Surat',
  },
  {
    location: 'Lucknow',
    id: 'Lucknow',
  },
  {
    location: 'Kanpur',
    id: 'Kanpur',
  },
  {
    location: 'Nagpur',
    id: 'Nagpur',
  },
  {
    location: 'Indore',
    id: 'Indore',
  },
  {
    location: 'Thane',
    id: 'Thane',
  },
  {
    location: 'Bhopal',
    id: 'Bhopal',
  },
  {
    location: 'Visakhapatnam',
    id: 'Visakhapatnam',
  },
  {
    location: 'Vadodara',
    id: 'Vadodara',
  },
  {
    location: 'Ghaziabad',
    id: 'Ghaziabad',
  },
  {
    location: 'Ludhiana',
    id: 'Ludhiana',
  },
  {
    location: 'Nashik',
    id: 'Nashik',
  },
  {
    location: 'Meerut',
    id: 'Meerut',
  },
  {
    location: 'Rajkot',
    id: 'Rajkot',
  },
  {
    location: 'Varanasi',
    id: 'Varanasi',
  },
  {
    location: 'Srinagar',
    id: 'Srinagar',
  },
  {
    location: 'Aurangabad',
    id: 'Aurangabad',
  },
  {
    location: 'Dhanbad',
    id: 'Dhanbad',
  },
  {
    location: 'Amritsar',
    id: 'Amritsar',
  },
  {
    location: 'Allahabad',
    id: 'Allahabad',
  },
  {
    location: 'Gwalior',
    id: 'Gwalior',
  },
  {
    location: 'Jabalpur',
    id: 'Jabalpur',
  },
  {
    location: 'Coimbatore',
    id: 'Coimbatore',
  },
  {
    location: 'Vijayawada',
    id: 'Vijayawada',
  },
  {
    location: 'Jodhpur',
    id: 'Jodhpur',
  },
  {
    location: 'Raipur',
    id: 'Raipur',
  },
  {
    location: 'Kota',
    id: 'Kota',
  },
  {
    location: 'Chandigarh',
    id: 'Chandigarh',
  },
  {
    location: 'Guwahati',
    id: 'Guwahati',
  },
  {
    location: 'Mysore',
    id: 'Mysore',
  },
  {
    location: 'Bareilly',
    id: 'Bareilly',
  },
  {
    location: 'Aligarh',
    id: 'Aligarh',
  },
  {
    location: 'Moradabad',
    id: 'Moradabad',
  },
  {
    location: 'Jalandhar',
    id: 'Jalandhar',
  },
  {
    location: 'Bhuba',
    id: 'Bhuba',
  },
  {
    location: 'Gorakhpur',
    id: 'Gorakhpur',
  },
  {
    location: 'Bikaner',
    id: 'Bikaner',
  },
  {
    location: 'Saharanpur',
    id: 'Saharanpur',
  },
  {
    location: 'Jamshedpur',
    id: 'Jamshedpur',
  },
  {
    location: 'Bhilai',
    id: 'Bhilai',
  },
  {
    location: 'Cuttack',
    id: 'Cuttack',
  },
  {
    location: 'Firozabad',
    id: 'Firozabad',
  },
  {
    location: 'Kochi',
    id: 'Kochi',
  },
  {
    location: 'Dehradun',
    id: 'Dehradun',
  },
  {
    location: 'Durgapur',
    id: 'Durgapur',
  },
  {
    location: 'Ajmer',
    id: 'Ajmer',
  },
  {
    location: 'Siliguri',
    id: 'Siliguri',
  },
  {
    location: 'Gaya',
    id: 'Gaya',
  },
  {
    location: 'Tirupati',
    id: 'Tirupati',
  },
  {
    location: 'Mathura',
    id: 'Mathura',
  },
  {
    location: 'Bilaspur',
    id: 'Bilaspur',
  },
  {
    location: 'Haridwar',
    id: 'Haridwar',
  },
  {
    location: 'Gandhinagar',
    id: 'Gandhinagar',
  },
  {
    location: 'Shimla',
    id: 'Shimla',
  },
  {
    location: 'Gangtok',
    id: 'Gangtok',
  },
  {
    location: 'Nainital',
    id: 'Nainital',
  },
  {
    location: 'Jaisalmer',
    id: 'Jaisalmer',
  },
  {
    location: 'Indor',
    id: 'Indor',
  },
  {
    location: 'Rishikesh',
    id: 'Rishikesh',
  },
  {
    location: 'kaushali',
    id: 'kaushali',
  },
  {
    location: 'Pushkar',
    id: 'Pushkar',
  },
  {
    location: 'Kerala',
    id: 'Kerala',
  },
  {
    location: 'Jim Corbet',
    id: 'Jim Corbet',
  },
  {
    location: 'Mussoorie',
    id: 'Mussoorie',
  },
  {
    location: 'Faridabad',
    id: 'Faridabad',
  },
  {
    location: 'Dubai',
    id: 'Dubai',
  },
  {
    location: 'Thailand',
    id: 'Thailand',
  },
  {
    location: 'Srilanka',
    id: 'Srilanka',
  },
  {
    location: 'Bali',
    id: 'Bali',
  },
  {
    location: 'Canada',
    id: 'Canada',
  },
  {
    location: 'Maldives',
    id: 'Maldives',
  },
  {
    location: 'Vietnam',
    id: 'Vietnam',
  },
  {
    location: 'Cambodia',
    id: 'Cambodia',
  },
  {
    location: 'Philippine',
    id: 'Philippine',
  },
  {
    location: 'Malaysia',
    id: 'Malaysia',
  },
];
const topCites = [
  {
    location: 'Mumbai',
    id: 'Mumbai',
  },
  {
    location: 'Pune',
    id: 'Pune',
  },
  { location: 'Delhi', id: 'Delhi' },
  { location: 'Jaipur', id: 'Jaipur' },
  { location: 'Goa', id: 'Goa' },
  { location: 'Udaipur', id: 'Udaipur' },
  { location: 'Agra', id: 'Agra' },
  { location: 'Noida', id: 'Noida' },
  { location: 'Gurgaon', id: 'Gurgaon' },
  { location: 'Kolkata', id: 'Kolkata' },
];
const populorCites = [

  {
    location: 'Siliguri',
    id: 'Siliguri',
  },
  {
    location: 'Jim Corbet',
    id: 'Jim Corbet',
  },
  { location: 'Mussoorie', id: 'Mussoorie' },
  { location: 'Kaushali', id: 'kaushali' },
  { location: 'Kerala', id: 'Kerala' },
  { location: 'Bangalore', id: 'Bangalore' },
  { location: 'Lucknow', id: 'Lucknow' },
  { location: 'Ahmedabad', id: 'Ahmedabad' },
  { location: 'Chennai', id: 'Chennai' },
  { location: 'Jaisalmer', id: 'Jaisalmer' },
];
const othersCites = [
  {
    location: 'Ranchi',
    id: 'Ranchi',
  },
  {
    location: 'Patna',
    id: 'Patna',
  },
  { location: 'Indore', id: 'Indore' },
  { location: 'Rishikesh', id: 'Rishikesh' },
  { location: 'Kochi', id: 'Kochi' },
  { location: 'Dehradun', id: 'Dehradun' },
  { location: 'Jodhpur', id: 'Jodhpur' },
  { location: 'Raipur', id: 'Raipur' },
  { location: 'Chandigarh', id: 'Chandigarh' },
  { location: 'Varanasi', id: 'Varanasi' },
];
const internationalCites = [
  {
    location: 'Dubai',
    id: 'Dubai',
  },
  {
    location: ' Thailand',
    id: ' Thailand',
  },
  { location: 'Srilanka', id: 'Srilanka' },
  { location: 'Bali', id: 'Bali' },
  { location: 'Canada', id: 'Canada' },
  { location: 'Maldives', id: 'Maldives' },
  { location: 'Vietnam', id: 'Vietnam' },
  { location: 'Cambodia', id: 'Cambodia' },
  { location: 'Philippine', id: 'Philippine' },
  { location: 'Malaysia', id: 'Malaysia' },
];

const LocationOptions = [
  {
    head: 'Top Cities',
    cities: topCites,
  },
  {
    head: 'Popular Cities',
    cities: populorCites,
  },
  {
    head: 'Other Cities',
    cities: othersCites,
  },
  {
    head: 'International Cities',
    cities: internationalCites,
  },
];

export const LocationsModal = (props) => {
  const { innerWidth } = useWindowSize();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredOptions = newLocations.filter((option) =>
    option.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const Transition = React.forwardRef(function Transition(props, ref) {
    return (
      <Slide
        direction='up'
        ref={ref}
        {...props}
      />
    );
  });
  return innerWidth <= 900 ? (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClose}
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' }}
    >
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='Search'
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
        />

        <List>
          <ListItem
            onClick={(e) => {
              props.handleLocation('');
            }}
          >
            <ListItemText primary={'All Location'} />
          </ListItem>
          {filteredOptions?.map((option, index) => (
            <ListItem
              button
              key={index}
              onClick={(e) => {
                props.handleLocation(e.target.textContent);
              }}
            >
              <ListItemText primary={option.location} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  ) : (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Autocomplete
          sx={searchStyle}
          id='country-select-demo'
          // sx={{ width: 300 }}
          onChange={(e) => {
            props.handleLocation(e.target.textContent);
          }}
          options={newLocations}
          autoHighlight
          getOptionLabel={(option) => option.location}
          renderOption={(props, option) => (
            <Box
              component='li'
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.location}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              style={{ border: 'none' }}
              {...params}
              label='Search a city'
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            id='modal-modal-item'
            variant='h4'
            component='h2'
            sx={rowsStyle}
            onClick={(e) => {
              props.handleLocation('');
            }}
          >
            All locations
          </Typography>
          <Box sx={columnStyle}>
            {LocationOptions?.map((el) => {
              return (
                <Box
                  key={el.head}
                  sx={titleStyle}
                >
                  <Typography
                    id='modal-modal-item'
                    variant='h6'
                    component='h2'
                    sx={columnHeader}
                  >
                    {el.head}
                  </Typography>
                  {el.cities?.map((el) => {
                    return (
                      <Typography
                        key={el.id}
                        id='modal-modal-item'
                        variant='h4'
                        component='h2'
                        sx={rowsStyle}
                        onClick={(e) => {
                          props.handleLocation(el.id);
                        }}
                      >
                        {el.location}
                      </Typography>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
