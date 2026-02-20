import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import Icon from '@mui/material/Icon';

import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import { selectUser, user } from '../../redux/reducer/appEssentials';
import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
const MobileMenu = ({ openDrawer, handleMobileMenu }) => {
  const router = useRouter();
  const DashboardList = [
    {
      name: 'Dashboard',
      subCategories: [
        {
          name: 'Wishlist',
          icon: 'account_circle',
          route: 'wishlist',
        },
        {
          name: 'Cart',
          route: 'cart',
        },
        {
          name: 'Order',
          route: 'orders',
        },
        {
          name: 'Contact',
          route: 'contact',
        },
        {
          name: 'Profile',
          route: 'profile',
        },
      ],
    },
    {
      name: 'Planning Tools',
      icon: 'construction',
      subCategories: [
        {
          name: 'My Wedding',
          route: 'MyWedding',
        },
        {
          name: 'Checklist',
          route: 'Checklist',
        },
        {
          name: 'Vendor Manager',
          route: 'VendorManager',
        },
        {
          name: 'Guest List',
          route: 'GuestList',
        },
        {
          name: 'Budget Planner',
          route: 'BudgetPlanner',
        },
        {
          name: 'Invites',
          route: 'Invites',
        },
      ],
    },
  ];
  const CategoriesList = [
    {
      name: 'Venue',
      icon: 'favorite',
      id: 'venue',
      subCategories: [
        'Hotel',
        'Resort',
        'Farm House',
        'Banquet Hall',
        'Lawn',
        'Destination Wedding',
      ],
    },
    {
      name: 'Food',
      id: 'vendors',
      icon: 'fastfood',
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
      name: 'Invites & Gifts',
      id: 'vendors',
      icon: 'card_giftcard',
      subCategories: ['Invitation Card', 'Invitation Gift'],
    },
    {
      name: 'Jewellery And Accessories',
      id: 'vendors',
      icon: 'star',
      subCategories: ['Bridal Jewellery on Rent'],
    },
    {
      name: 'Music & Dance',
      id: 'vendors',
      icon: 'music_note',
      subCategories: [
        'Anchor',
        'Choreographer',
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
      name: 'Pandit Jee',
      icon: 'person',
      id: 'vendors',
      subCategories: [],
    },
    {
      name: 'Makeup',
      id: 'vendors',
      icon: 'face',
      subCategories: ['Bridal Makeup', 'Groom Makeup', 'Family Makeup'],
    },
    {
      name: 'Mehndi',
      id: 'vendors',
      icon: 'style',
      subCategories: ['Bride Mehndi', 'Family Member Mehndi'],
    },
    {
      name: 'Photographers',
      id: 'vendors',
      icon: 'photo_camera',
      subCategories: [
        'Cinema/Video',
        'Album',
        'Collage Maker',
        'Drone',
        'Pre Wedding Shoot',
      ],
    },
    {
      name: 'Planning & Decor',
      id: 'vendors',
      icon: 'event',
      subCategories: [
        'Wedding Decor',
        'Wedding Planners',
        'Celebrities Management',
        'Hospitality Service',
      ],
    },
  ];

  const CategotiesListVenue = [
    {
      name: 'Hotel',
      subCategories: [],
    },
    {
      name: 'Resort',
      subCategories: [],
    },
    {
      name: 'Farm House',
      subCategories: [],
    },
    {
      name: 'Banquet Hall',
      subCategories: [],
    },
    {
      name: 'Lawn',
      subCategories: [],
    },
    {
      name: 'Destination Wedding',
      subCategories: [],
    },
  ];

  const shopCategories = [
    {
      name: 'Bridal Wear',
      id: 'products',
      icon: 'woman',
      subCategories: [
        // "Bridal Collection Lehenga",
        // "Gowns",
        'Lehenga',
        // "Saree",
        // "Skirt Top",
        // "Stitched Suit",
      ],
    },
    {
      name: 'Groom Wear',
      id: 'products',
      icon: 'man',
      subCategories: [
        // "Blazer for Men",
        // "formal",
        // "Indo Western",
        // "Kids Kurta",
        // "Kids Kurta Jacket",
        // "kurta dhoti collection",
        // "Kurta Jacket Set",
        // "Kurta Pajama",
        // "Lower",
        // "Men Blazers Suits",
        // "Only Jacket",
        // "Only Kurta",
        'Sherwani',
        // "Stitched Suit",
        // "Twamev Kurta Set",
      ],
    },
  ];
  const globleuser = useSelector(selectUser);

  const occations = [
    'Engagement',
    'Haldi',
    'Mehendi',
    'Cocktail',
    'Wedding',
    'Reception',
    'Sangeet',
  ];

  const otherList = [
    {
      option: 'Real Weddings',
      icon: 'event',
      id: 'RealWeddingHome',
    },
    {
      option: 'Blogs',
      icon: 'book',
      id: 'blogs',
    },
    {
      option: 'Hire freelance',
      icon: 'handshake',
      id: 'student',
    },
    {
      option: 'Get Jobs',
      icon: 'work',
      id: 'vendor',
    },
  ];
  const ListOptionSingle = ({ item }) => {
    return (
      <div style={{ display: 'flex' }}>
        <div
          style={{ display: 'flex', alignItems: 'center', paddingLeft: '5px' }}
        >
          <Icon>{item.icon ? item.icon : 'star'}</Icon>
        </div>
        <ListItemButton
          onClick={(e) => {
            e.preventDefault();
            router.push({
              pathname: `/${item.id}`,
            });
            handleMobileMenu();
          }}
        >
          {/* <ListItemIcon>
          <InboxIcon />
        </ListItemIcon> */}
          <ListItemText primary={item.option} />
        </ListItemButton>
      </div>
    );
  };
  const dispatch = useDispatch();
  const ShopByOccasionOptions = () => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
      setOpen(!open);
    };
    return (
      <>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '5px',
            }}
          >
            <Icon>celebration</Icon>
          </div>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary={'By Occasion'} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </div>
        <Collapse
          in={open}
          timeout='auto'
          unmountOnExit
        >
          <List
            component='div'
            disablePadding
          >
            {occations?.map((sub) => (
              <ListItemButton
                sx={{ pl: 4 }}
                key={sub}
                onClick={(e) => {
                  e.preventDefault();
                  router.push({
                    pathname: '/products',
                    query: {
                      occation: sub,
                    },
                  });
                  handleMobileMenu();
                }}
              >
                {/* <ListItemIcon>
                  <StarBorder />
                </ListItemIcon> */}
                <ListItemText primary={sub} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </>
    );
  };

  const ListOption1 = ({ item }) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
      setOpen(!open);
    };
    return (
      <div key={item.name}>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '5px',
            }}
          >
            <Icon>{item.icon ? item.icon : 'account_circle'}</Icon>
          </div>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary={item.name} />
            {item.subCategories.length > 0 ? (
              open ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )
            ) : null}
          </ListItemButton>
        </div>

        <Collapse
          in={open}
          timeout='auto'
          unmountOnExit
        >
          <List
            component='div'
            disablePadding
          >
            {item?.subCategories?.map((sub, key) => (
              <ListItemButton
                sx={{ pl: 4 }}
                key={key}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (globleuser) {
                    router.push(
                      item.name === 'Dashboard'
                        ? `/user-dashboard/${sub.route}`
                        : `/user-dashboard?direction=${sub.route}`
                    );
                  } else {
                    router.push(`/customer-login`);
                  }
                  handleMobileMenu();
                }}
              >
                <ListItemText primary={sub.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </div>
    );
  };

  const ListOption = ({ item }) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => {
      setOpen(!open);
    };

    return (
      <div key={item.name}>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '5px',
            }}
          >
            <Icon>{item.icon ? item.icon : 'star'}</Icon>
          </div>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary={item.name} />
            {item.subCategories.length > 0 ? (
              open ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )
            ) : null}
          </ListItemButton>
        </div>

        <Collapse
          in={open}
          timeout='auto'
          unmountOnExit
        >
          <List
            component='div'
            disablePadding
          >
            {item?.subCategories?.map((sub) => (
              <ListItemButton
                sx={{ pl: 4 }}
                key={sub}
                onClick={(e) => {
                  e.preventDefault();
                  router.push({
                    pathname: `/${item.id}`,
                    ...(item.id === 'venue'
                      ? {
                          query: {
                            category: sub,
                          },
                        }
                      : item.id === 'products'
                      ? {
                          query: {
                            category: sub,
                          },
                        }
                      : {
                          query: {
                            category: item?.name,
                            subCategory: sub,
                          },
                        }),
                  });
                  handleMobileMenu();
                }}
              >
                <ListItemText primary={sub} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </div>
    );
  };

  //   const menuOptions = [""];

  var role;
  if (typeof window !== 'undefined') {
    let local = localStorage.getItem('role');
    role = local ? JSON.parse(local).role : null;
  }

  return (
    <SwipeableDrawer
      onOpen={() => {}}
      variant='temporary'
      open={openDrawer}
      PaperProps={{
        sx: { width: '70%', maxWidth: '300px' },
      }}
      onClose={handleMobileMenu}
      disableBackdropTransition
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: '16px',
        }}
      >
        <IconButton
          onClick={() => {
            router.push(
              role === 'User' ? '/user-dashboard' : '/customer-login'
            );
            handleMobileMenu();
          }}
          size='large'
          edge='end'
          aria-label='account of current user'
          aria-haspopup='true'
          color='inherit'
        >
          <Typography sx={styles.menuOptions}>
            {role === 'User' || role === 'Vendor'
              ? 'Dashboard'
              : 'Login / Register'}
          </Typography>
        </IconButton>
        {role === 'User' ||
        role === 'Vendor' ||
        role === 'Venue' ||
        role === 'ShopNow' ? (
          <LogoutIcon
            onClick={(e) => {
              e.preventDefault();
              dispatch(user(undefined));
              localStorage.removeItem('wedcell');
              localStorage.removeItem('role');
              localStorage.setItem('wedcellIsLoged', '');
              router.push('/');
              handleMobileMenu();
            }}
          />
        ) : (
          <></>
        )}
      </div>
      <Divider />
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
        // subheader={
        //   <ListSubheader component="div" id="nested-list-subheader">
        //     Dashboard Options
        //   </ListSubheader>
        // }
      >
        {DashboardList?.map((item, key) => (
          <ListOption1
            item={item}
            key={key}
          />
        ))}
      </List>
      <Divider />
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
        // subheader={
        //   <ListSubheader component="div" id="nested-list-subheader">
        //     Wedding Options
        //   </ListSubheader>
        // }
      >
        {CategoriesList?.map((item, key) => (
          <ListOption
            item={item}
            key={key}
          />
        ))}
      </List>
      <Divider />
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader
            component='div'
            id='nested-list-subheader'
          >
            Shop
          </ListSubheader>
        }
      >
        {shopCategories?.map((item, key) => (
          <ListOption
            item={item}
            key={key}
          />
        ))}
        <ShopByOccasionOptions />
      </List>
      <Divider />
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
      >
        {otherList?.map((item) => (
          <ListOptionSingle
            item={item}
            key={item.option}
          />
        ))}
      </List>
      {/* <ListItemButton
        onClick={(e) => {
          e.preventDefault();
          localStorage.removeItem("wedcell");
          localStorage.removeItem("role");
          localStorage.setItem("wedcellIsLoged", "");
          dispatch(user(undefined));
          router.push("/");
          handleMobileMenu();
        }}
      >
       
        <ListItemText primary={"Logout"} />
      </ListItemButton> */}
    </SwipeableDrawer>
  );
};

export default MobileMenu;

const styles = {
  menuOptions: {
    fontSize: 16,
  },
};
