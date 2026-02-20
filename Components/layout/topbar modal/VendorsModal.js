import { Box, Grid, Modal, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

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
  padding: '30px',
  flexDirection: 'row',
  width: 'max-content',
  width: '70%',
};

const columnHeader = {
  color: '#E48F0E',
  fontFamily: `'Be Vietnam Pro', sans-serif`,
  fontStyle: 'ExtraLight',
  fontWeight: 200,
  fontSize: '18px',
  lineHeight: '22px',
  m: 1,
  cursor: 'pointer',
};

const rowsStyle = {
  fontFamily: `'Be Vietnam Pro', sans-serif`,
  fontStyle: 'initial',
  fontWeight: 100,
  fontSize: '16px',
  m: 1,
  cursor: 'pointer',
};

const Vendors = [
  {
    name: 'Food',
    subCategories: [
      'Chaat Counter',
      'Fruit Counter',
      'Catering services',
      'Pan Counter',
      'Cake',
      'Bar Tenders',
    ],
  },

  {
    name: 'Photographers',
    subCategories: [
      'Cinema/Video',
      'Album',
      'Collage Maker',
      'Drone',
      'Pre Wedding Shoot',
    ],
  },
  {
    name: 'Music & Dance',
    subCategories: [
      'Anchor',
      'Artist management services',
      'Choreographer',
      'Singer',
      'DJ',
      'Ghodi & Baggi',
      'Band Baja',
      'Dhol',
      'Live band',
      'DJ based Band',
      'Male & Female Singer',
      'Dance Troupe',
    ],
  },
  {
    name: 'Planning & Decor',
    subCategories: [
      'Wedding Decor',
      'Wedding Planners',
      'Celebrities Management',
      'Hospitality Service',
    ],
  },
  {
    name: 'Jwellery And Accessories',
    subCategories: ['Bridal Jwellery on Rent'],
  },
  {
    name: 'Invites & Gifts',
    subCategories: ['Invitation Card', 'Invitation Gift'],
  },

  {
    name: 'Makeup',
    subCategories: ['Bridal Makeup', 'Groom Makeup', 'Family Makeup'],
  },
  {
    name: 'Mehndi',
    subCategories: ['Bride Mehndi', 'Family Member Mehndi'],
  },

  {
    name: 'Pandit Jee',
    subCategories: [],
  },
];
// const VendorsByType = [
//   {
//     vendor: "Food",
//     id: "Food",
//   },
//   {
//     vendor: "Invites and Gifts",
//     id: "Invites and Gifts",
//   },
//   {
//     vendor: "Jwellery and Accessories",
//     id: "Jwellery and Accessories",
//   },
//   {
//     vendor: "Music and Dance",
//     id: "Music and Dance",
//   },
//   {
//     vendor: "Pandit Jee",
//     id: "Pandit jee",
//   },
//   {
//     vendor: "Make up",
//     id: "Make up",
//   },
// ];

const gridStyle = {
  marginTop: '20px !important',
  marginLeft: '0px',
};
const imgTitle = {
  marginTop: '20px',
  paddingLeft: '0px !important',
  marginTop: '0px !important',
  paddingTop: '0px !important',

  p: {
    fontFamily: 'Bahnschrift',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: '14px',
    lineHeight: '17px',
    textAlign: ' center',
    color: '#444444',
  },
  img: {
    borderRadius: '10px',
    marginBottom: '5px',
  },
};

function FormRow({ props }) {
  const router = useRouter();

  const subCategotyArr = [
    // 'bridal Makeup',
    // 'Groom Makeup',
    // 'Family Makeup',
    // 'Bride Mehndi',
    // 'Family Member Mehndi',
    // 'Cinema/Video',
    // 'Album',
    // 'Collage Maker',
    // 'Drone',
    // 'Pre Wedding Shoot',
  ];

  return (
    <React.Fragment>
      {Vendors?.map((el) => (
        <Grid
          key={el.name}
          sx={imgTitle}
          item
          xs={3}
        >
          <Typography
            id='modal-modal-item'
            variant='h6'
            component='h2'
            sx={columnHeader}
            onClick={(e) => {
              e.preventDefault();
              if (el.name) {
                router.push({
                  pathname: '/vendors',
                  query: { category: el.name },
                });
                props.handleClose();
              }
            }}
          >
            {el.name}
          </Typography>
          {el.subCategories?.map((sub) => {
            return (
              <Typography
                key={el}
                id='modal-modal-item'
                variant='h4'
                component='h2'
                sx={rowsStyle}
                onClick={(e) => {
                  e.preventDefault();
                  router.push({
                    pathname: '/vendors',
                    query: { category: el.name, subCategory: sub },
                    // ...(subCategotyArr.includes(sub)
                    //   ? {
                    //       query: {
                    //         category: subCategotyArr.includes(sub)
                    //           ? el.route
                    //           : sub,
                    //       },
                    //     }
                    //   : {
                    //       query: {
                    //         subCategory: subCategotyArr.includes(sub)
                    //           ? el.route
                    //           : sub,
                    //       },
                    //     }),
                    // query: {
                    //   subCategory: subCategotyArr.includes(sub)
                    //     ? el.route
                    //     : sub,
                    // },
                  });
                  props.handleClose();
                }}
              >
                {sub}
              </Typography>
            );
          })}
        </Grid>
      ))}
    </React.Fragment>
  );
}
export const VendorsModal = (props) => {
  const router = useRouter();
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div>
        {/* <Box sx={style}>
          <Box sx={columnStyle}>
            {Vendors.map((el) => {
              return (
                <Box key={el.name} sx={{}}>
                  <Typography
                    id="modal-modal-item"
                    variant="h6"
                    component="h2"
                    sx={columnHeader}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/vendors");
                      props.handleClose();
                    }}
                  >
                    {el.name}
                  </Typography>
                  {el.subCategories.map((sub) => {
                    return (
                      <Typography
                        key={el}
                        id="modal-modal-item"
                        variant="h4"
                        component="h2"
                        sx={rowsStyle}
                        onClick={(e) => {
                          e.preventDefault();
                          router.push({
                            pathname: "/vendors",
                            query: { subCategory: sub },
                          });
                          props.handleClose();
                        }}
                      >
                        {sub}
                      </Typography>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </Box> */}

        <Box
          spacing={2}
          sx={style}
          display='grid'
          gridTemplateColumns='repeat(12, 1fr)'
        >
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={1}
              >
                <Grid
                  sx={gridStyle}
                  container
                  spacing={1}
                >
                  <FormRow props={props} />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </div>
    </Modal>
  );
};
