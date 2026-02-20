import { Box, Modal, Typography } from '@mui/material';
import { useRouter } from 'next/router';

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
  flexDirection: 'row',
  padding: '30px',
  width: '750px',
};

const columnStyle = {
  margin: '0',
  display: 'flex',
  fontFamily: 'Bahnschrift',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '18px',
  lineHeight: '22px',
  color: '#E48F0E',
  width: '100%',
  justifyContent: 'space-between',

  h2: {
    fontWeight: '400 !important',
    cursor: 'default',
  },
  h3: {
    fontFamily: 'Bahnschrift',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#444444',
  },
};

const columnHeader = {
  color: '#E48F0E',
  fontFamily: `'Be Vietnam Pro', sans-serif`,
  fontStyle: 'normal',
  fontWeight: '300',
  fontSize: '18px',
  lineHeight: '22px',
  m: 1,
  fontFamily: 'Bahnschrift',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '18px',
  lineHeight: '22px',
  h2: {
    cursor: 'default',
  },
};
const columnHeaderSx = {
  color: '#E48F0E',
  fontFamily: `'Be Vietnam Pro', sans-serif`,
  fontStyle: 'normal',
  fontWeight: '300',
  fontSize: '18px',
  lineHeight: '22px',
  m: 1,
  fontFamily: 'Bahnschrift',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '18px',
  lineHeight: '22px',
  color: '#444444',
};

const rowsStyle = {
  fontFamily: `'Be Vietnam Pro', sans-serif`,
  fontStyle: 'normal',
  fontWeight: '200',
  fontSize: '16px',
  lineHeight: '22px',
  m: 1,
  cursor: 'pointer',
  h3: {
    fontFamily: 'Bahnschrift',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: '18px',
    lineHeight: '22px',
    color: '#444444',
  },
};

const VenuesByType = [
  {
    venue: 'Lehnga',
    id: 'Lehenga',
  },
  // {
  //   venue: 'Saree',
  //   id: 'Saree',
  // },
  // {
  //   venue: 'Gown',
  //   id: 'Gowns',
  // },
  // {
  //   venue: 'Skirt Top',
  //   id: 'Skirt Top',
  // },
  // {
  //   venue: 'Anarkal',
  //   id: 'Anarkal',
  // },
  // {
  //   venue: 'Bridal Collection Lehenga',
  //   id: 'Bridal Collection Lehenga',
  // },
  // {
  //   venue: 'Stitched Suit',
  //   id: 'Stitched Suit',
  // },
];
const broomVenuesByType = [
  // {
  //   venue: 'Blazer for Men',
  //   id: 'Blazer for Men',
  // },
  // {
  //   venue: 'Formal',
  //   id: 'formal',
  // },
  // {
  //   venue: 'Indo Western',
  //   id: 'Indo Western',
  // },
  // {
  //   venue: 'Kids Kurt',
  //   id: 'Kids Kurta',
  // },
  // {
  //   venue: 'Kids Kurta Jacket',
  //   id: 'Kids Kurta Jacket',
  // },
  // {
  //   venue: 'Kurta Dhoti Collection',
  //   id: 'kurta dhoti collection',
  // },
  // {
  //   venue: 'Kurta Jacket Se',
  //   id: 'Kurta Jacket Set',
  // },

  // {
  //   venue: 'Kurta Pajama',
  //   id: 'Kurta Pajama',
  // },
  // {
  //   venue: 'Lower',
  //   id: 'Lower',
  // },
  // {
  //   venue: 'Men Blazers Suit',
  //   id: 'Men Blazers Suits',
  // },
  // {
  //   venue: 'Only Jacket ',
  //   id: 'Only Jacket ',
  // },
  // {
  //   venue: 'Only Kurta',
  //   id: 'Only Kurta',
  // },
  {
    venue: 'Sherwani',
    id: 'Sherwani',
  },
  // {
  //   venue: 'Stitched Suit ',
  //   id: 'Stitched Suit',
  // },
  // {
  //   venue: 'Twamev Kurta Set ',
  //   id: 'Twamev Kurta Set',
  // },
];
const mostPop = [
  {
    venue: 'Engagement Lehenga',
    id: 'Engagement Lehenga',
  },
  {
    venue: 'Cocktail Gowns',
    id: 'Cocktail Gowns',
  },
  {
    venue: 'Reception Lehenga',
    id: 'Reception Lehenga',
  },
  {
    venue: 'Wedding Sarees',
    id: 'Wedding Sarees',
  },
  {
    venue: 'Lehenga Drape Sarees',
    id: 'Lehenga Drape Sarees',
  },
  {
    venue: 'Silk Sarees',
    id: 'Silk Sarees',
  },
  {
    venue: 'Banaras Lehenga',
    id: 'Banaras Lehenga',
  },
  {
    venue: 'Red Bridal Lehenga',
    id: 'Red Bridal Lehenga',
  },
];
const byOccasion = [
  {
    venue: 'Engagement',
    id: 'Engagement',
  },
  {
    venue: 'Haldi',
    id: 'Haldi',
  },
  {
    venue: 'Mehendi',
    id: 'Mehendi',
  },
  {
    venue: 'Cocktail',
    id: 'Cocktail',
  },
  {
    venue: 'Wedding',
    id: 'Wedding',
  },
  {
    venue: 'Reception',
    id: 'Reception',
  },
  {
    venue: 'Sangeet',
    id: 'Sangeet',
  },
];

const bridalStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const ShopModal = (props) => {
  const router = useRouter();
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Box sx={columnStyle}>
          <Box>
            <Typography
              id='modal-modal-title'
              variant='h6'
              component='h2'
              sx={columnHeader}
            >
              Bridal Wear
            </Typography>
            <Box sx={bridalStyle}>
              <Box>
                <Typography
                  id='modal-modal-title'
                  variant='h6'
                  component='h2'
                  sx={columnHeaderSx}
                >
                  By Type
                </Typography>
                {VenuesByType?.map((el) => {
                  return (
                    <Typography
                      key={el}
                      id='modal-modal-item'
                      variant='h4'
                      component='h3'
                      sx={rowsStyle}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push({
                          pathname: '/products',
                          query: { category: el.id },
                        });
                        props.handleClose();
                      }}
                    >
                      {el.venue}
                    </Typography>
                  );
                })}
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography
              id='modal-modal-title'
              variant='h6'
              component='h2'
              sx={columnHeader}
              onClick={(e) => {
                e.preventDefault();
                router.push('/products');
                props.handleClose();
              }}
            >
              Groom Wear
            </Typography>
            <Box sx={bridalStyle}>
              <Box>
                <Typography
                  id='modal-modal-title'
                  variant='h6'
                  component='h2'
                  sx={columnHeaderSx}
                >
                  By Type
                </Typography>
                {broomVenuesByType?.map((el) => {
                  return (
                    <Typography
                      key={el}
                      id='modal-modal-item'
                      variant='h4'
                      component='h3'
                      sx={rowsStyle}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push({
                          pathname: '/products',
                          query: { category: el.id },
                        });
                        props.handleClose();
                      }}
                    >
                      {el.venue}
                    </Typography>
                  );
                })}
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginTop: '37px' }}>
            <Typography
              id='modal-modal-title'
              variant='h6'
              component='h2'
              sx={columnHeaderSx}
            >
              By Occasion
            </Typography>
            {byOccasion?.map((el) => {
              return (
                <Typography
                  key={el}
                  id='modal-modal-item'
                  variant='h4'
                  component='h3'
                  sx={rowsStyle}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push({
                      pathname: '/products',
                      query: { category: el.id },
                    });
                    props.handleClose();
                  }}
                >
                  {el.venue}
                </Typography>
              );
            })}
          </Box>
          <Box sx={{ marginTop: '37px' }}>
            <Typography
              id='modal-modal-title'
              variant='h6'
              component='h2'
              sx={columnHeaderSx}
            >
              Most Popular
            </Typography>
            {mostPop?.map((el) => {
              return (
                <Typography
                  key={el}
                  id='modal-modal-item'
                  variant='h4'
                  component='h3'
                  sx={rowsStyle}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push({
                      pathname: '/products',
                      query: { category: el.id },
                    });
                    props.handleClose();
                  }}
                >
                  {el.venue}
                </Typography>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
