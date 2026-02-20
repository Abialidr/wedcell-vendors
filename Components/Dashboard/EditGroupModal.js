import React, { useEffect, useState } from 'react';
import styles from '../../styles/Modal.module.css'; // Import the CSS module
import { selectUser, user } from '../../redux/reducer/appEssentials';
import axios from 'axios';
import { PROXY } from '../../config';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles2 from '../../styles/planning.module.scss';
const EditGroupModal = ({ isOpen, setOpenEditModal, selected }) => {
  const router = useRouter();
  const globleuser = useSelector(selectUser);
  const config = {
    headers: { authorization: globleuser?.data?.token },
  };
  if (!isOpen) {
    return null; // Don't render the modal if it's not open
  }

  const [grpName, setGrpName] = useState('');

  const leave = async () => {
    const result = await axios.post(
      `${PROXY}/contacts/removefromgroup`,
      {
        _id: selected._id,
        vendorId: globleuser.data._id,
      },
      config
    );
    console.log(result);
    if (result.data.success) {
      alert('Success');
      setOpenEditModal(false);
      router.push('/dashboard/Group-Message');
    }
    //   setOpenEditModal(false)
  };

  // const addToGroup = async (event) => {
  //   event.preventDefault();
  //   if ( selectedPeople.length > 0) {
  //     const result = await axios.post(
  //       `${PROXY}/contacts/addtogroup`,
  //       {
  //         _id: selected._id,
  //         vendorInfo: selectedPeople,
  //       },
  //       config
  //     );
  //     alert("Success");
  //       setOpenEditModal(false)
  //     // router.push("/user-dashboard/Group-Message");
  //     // setOpenEditModal(false);
  //   } else   {
  //     alert("Select atleast one person to add");
  //   }
  // };

  // console.log(connections);
  // useEffect(() => {
  //   globleuser && getContact();
  // }, [globleuser]);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <header className={styles.modalHeader}>
          <h4>View group</h4>
          <button
            className={styles.cancelButton}
            aria-label='close'
            onClick={() => setOpenEditModal(false)}
          >
            Return back
          </button>
        </header>
        <section className={styles.modalSection}>
          <button
            className={styles.cancelButton}
            aria-label='close'
            onClick={leave}
          >
            Leave group
          </button>
          <div className={styles.formGroup}>
            <label>People in group</label>
            <div>
              <ul>
                {selected.vendorInfo.map((person) => (
                  <li
                    key={person.vendorId}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                        }}
                      >
                        <img
                          className={styles2.imgmessagediv}
                          src={person.vendorImage}
                          alt={`${person.vendorName} Image`}
                        />
                        <span>{person.vendorName}</span>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditGroupModal;
