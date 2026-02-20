import React, { useState } from 'react';
import Styles from '../../styles/reviews.module.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from 'moment';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { useRef } from 'react';
import Iconify from '../common/Iconify';
const Reply = ({ items, item, handleButtonClick, handleDeleteReply }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={Styles.ReviewUser}>
        <AccountCircleIcon fontSize='medium'></AccountCircleIcon>
        <h6>{items?.name}</h6>
      </div>
      <span className={Styles.ReviewCountryDate}>
        Reply on {moment(items?.createdAt).format('MMM DD YYYY')}
      </span>
      <div
        className={Styles.ReviewSpan}
        style={{ marginBottom: '10px' }}
      >
        <span>{items?.replyBody}</span>
        {items.userid ===
          JSON.parse(localStorage.getItem('wedcell'))?.data?._id && (
          <IconButton
            ref={ref}
            onClick={() => setIsOpen(true)}
          >
            <Iconify
              icon='eva:more-vertical-fill'
              width={20}
              height={20}
            />
          </IconButton>
        )}
        <Menu
          open={isOpen}
          anchorEl={ref.current}
          onClose={() => setIsOpen(false)}
          PaperProps={{
            sx: { width: 200, maxWidth: '100%' },
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem
            onClick={() => {
              handleDeleteReply(items?._id);
            }}
          >
            <ListItemIcon></ListItemIcon>
            <ListItemText
              primary='Delete'
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleButtonClick(
                item?.productid,
                item?.userid,
                items?.id,
                setIsOpen
              );
            }}
          >
            <ListItemIcon></ListItemIcon>
            <ListItemText
              primary='Update'
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default Reply;
