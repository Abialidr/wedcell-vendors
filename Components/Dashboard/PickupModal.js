import React from "react";
import styles from "../../styles/Modal.module.css"; // Import the CSS module

const Modal = ({
  isOpen,
  closeModal,
  pickupTime,
  setPickupTime,
  pickupDate,
  setPickupDate,
  expectedPackageCount,
  setExpectedPackageCount,
  handleSubmit,
}) => {
  if (!isOpen) {
    return null; // Don't render the modal if it's not open
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <header className={styles.modalHeader}>
          <h4>Pickup Details</h4>
          <button
                className={styles.cancelButton}
                aria-label="close"
            onClick={closeModal}
          >
            Return back
          </button>
        </header>
        <section className={styles.modalSection}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Pickup Time</label>
              <div>
                {/* <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                /> */}
                <input
                  className={styles.inputField}
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Pickup Date</label>
              <div>
                <input
                  className={styles.inputField}
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Expected Package Count</label>
              <div>
                <input
                  className={styles.inputField}
                  type="number"
                  value={expectedPackageCount}
                  onChange={(e) => setExpectedPackageCount(e.target.value)}
                />
              </div>
            </div>
            <footer className={styles.modalFooter}>
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={closeModal}
              >
                Cancel
              </button>
            </footer>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Modal;
