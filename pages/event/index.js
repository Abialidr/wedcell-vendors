import { PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useCallback, useEffect, useState } from 'react';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
// import Styles from "../../styles/Editlist.module.css";
import Styles from '../../styles/Editlist.module.css';
import axios from 'axios';

import { useRouter } from 'next/router';

// import { PROXY } from "../../config";
import { PROXY } from '../../config';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/reducer/appEssentials';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: 0.5,
  },
  form: {
    width: '100%',
    marginTop: 1,
  },
  submit: {
    margin: 3,
  },
  imageList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: 'black',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const EditListedItems = ({ query }) => {
  const errorr = () =>
    toast.error('image cant be uploaded with size bigger then 500kb', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  const uploadErrorr = () =>
    toast.error('Somethimg went wrong please try again', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  const uploadSucsess = () =>
    toast.success('Uploading done Successfully', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  const editSucsess = () =>
    toast.success('Edit done Successfully', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  let [fileListMain, setFileListMain] = useState([]);
  const [fileListAlbum, setFileListAlbum] = useState([]);
  const [fileListBrochure, setFileListBrochure] = useState([]);
  const [fileListGallery, setFileListGallery] = useState([]);
  const [fileListMenu, setFileListMenu] = useState([]);
  const [mainImageDefault, setMainImagedefault] = useState([]);
  const [brochureImageDefault, setBrochureImagedefault] = useState([]);
  const [albumImageDefault, setAlbumdefault] = useState([]);
  const [menuImageDefault, setMenuImagedefault] = useState([]);
  const [galleryImageDefault, setGalleryImagedefault] = useState([]);
  const globleuser = useSelector(selectUser);

  const [state, setState] = React.useState({
    Indoor: false,
    Outdoor: false,
    Poolside: false,
    Terrace: false,
  });
  const { Poolside, Indoor, Outdoor, Terrace } = state;
  const [typeFilter, setTypeFilter] = useState([]);

  const handleChange = (event) => {
    let newArr = additional.venue_type;
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });

    if (event.target.checked) {
      newArr.push(event.target.name);
    } else {
      newArr = newArr.filter((item) => item !== event.target.name);
    }

    setAdditional({
      ...additional,
      venue_type: newArr,
    });
    setTypeFilter(newArr);
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleChangeMain = ({ fileList: newFileList, file }) => {
    if (file.status !== 'removed') {
      if (file.size / 1028 <= 500) {
        setFileListMain(newFileList);
      } else {
        errorr();
      }
    } else {
      setFileListMain(newFileList);
      setMainImagedefault(null);
    }
  };
  //   const data = newFileList
  //   .filter((data) => data.url)
  //   .map((data) => data.url);
  const handleChangeBrochure = ({ fileList: newFileList, file }) => {
    if (file.status !== 'removed') {
      if (file.size / 1028 <= 500) {
        setFileListBrochure(newFileList);
      } else {
        errorr();
      }
    } else {
      setFileListBrochure(newFileList);
      setBrochureImagedefault(null);
    }
  };

  const handleChangeGallery = ({ fileList: newFileList, file }) => {
    if (file.status !== 'removed') {
      if (file.size / 1028 <= 500) {
        setFileListGallery(newFileList);
      } else {
        errorr();
      }
    } else {
      const data = newFileList
        .filter((data) => data.url)
        .map((data) => data.url);
      setGalleryImagedefault(data);
      setFileListGallery(newFileList);
    }
  };

  const handleChangeMenu = ({ fileList: newFileList, file }) => {
    if (file.status !== 'removed') {
      if (file.size / 1028 <= 500) {
        setFileListMenu(newFileList);
      } else {
        errorr();
      }
    } else {
      const data = newFileList
        .filter((data) => data.url)
        .map((data) => data.url);
      setMenuImagedefault(data);
      setFileListMenu(newFileList);
    }
  };

  const handleChangeAlbum = ({ fileList: newFileList, file }, key) => {
    if (file.status !== 'removed') {
      if (file.size / 1028 <= 500) {
        fileListAlbum[key].value = newFileList;
        setFileListAlbum([...fileListAlbum]);
      } else {
        errorr();
      }
    } else {
      const data = newFileList
        .filter((data) => data.url)
        .map((data) => data.url);
      fileListAlbum[key].value = newFileList;
      setFileListAlbum([...fileListAlbum]);
      albumImageDefault[key].value = data;
      setAlbumdefault([...albumImageDefault]);
    }
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  // useEffect(()=>{
  // },form)

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const editable = query.name === 'edit' ? true : false;
  const [status, setStatus] = useState(editable ? 'Edit' : 'Submit');
  const id = query.id;
  const [config, setConfig] = useState();
  const [uploading, setUploading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [vidLinks, setVidLinks] = useState(['']);
  const [amenities, setAmenities] = useState([{ name: '', min: '', max: '' }]);
  const [plans, setPlans] = useState([{ name: '', value: '' }]);
  const [features, setFeatures] = useState([{ name: '', value: false }]);
  const [deleting, setDeleting] = useState(false);
  const [allowedVendors, setAllowedVendors] = useState([
    { name: 'Decor', value: false },
    { name: 'DJ', value: false },
    { name: 'Cake', value: false },
    { name: 'Liquor', value: false },
    { name: 'Pan Counter', value: false },
  ]);
  const classes = useStyles();
  // const { width } = useWindowDimensions();
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const Div = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);
  const [form, setForm] = useState(null);

  useEffect(() => {
    const getdata = async () => {
      await axios
        .get(`${PROXY}/event/getone/${query.id}`, {
          headers: {
            authorization: globleuser.data?.token,
          },
        })
        .then((res) => {
          if (res.data.success) {
            const resData = res.data.events;
            const a = {
              end_date: dayjs(new Date(resData.end_date)),
              start_date: dayjs(new Date(resData.start_date)),
              start_time: dayjs(new Date(resData.start_time)),
              end_time: dayjs(new Date(resData.end_time)),
              venue: resData?.venue,
              required_member: resData?.required_member,
              required_member_type: resData?.required_member_type,
              event_type: resData?.event_type,
              sallery: resData?.sallery,
            };
            setForm(a);
          }
        })
        .catch((e) => {
          alert(e.message);
        });
    };

    if (editable) {
      getdata();
    } else {
      setForm({
        end_date: dayjs(new Date()),
        start_date: dayjs(new Date()),
        start_time: dayjs(new Date()),
        end_time: dayjs(new Date()),
        venue: '',
        required_member: '',
        required_member_type: '',
        event_type: '',
        sallery: '',
      });
    }
  }, [editable, id, router]);

  const onChangeAlbumHandler = (index) => (e) => {
    let newArr = [...fileListAlbum];
    newArr[index].name = e.target.value;
    setFileListAlbum(newArr);
  };

  // useEffect(() => {
  //   if (localStorage.getItem("wedcell") !== null) {
  //     const config = {
  //       headers: {
  //         authorization: globleuser.data
  //           ?.token,
  //       },
  //     };

  //     setConfig(config);

  //     setForm({
  //       ...form,
  //       vendorId: globleuser.data?._id,
  //     });
  //   }
  // }, [form]);

  const addHandler = async () => {
    // setUploading(true);
    if (form) {
      if (
        !form.start_date ||
        !form.end_date ||
        !form.end_time ||
        !form.start_time ||
        !form.required_member ||
        !form.required_member_type ||
        !form.venue ||
        !form.event_type
      ) {
        alert('please add all fields');
        return;
      }
    }

    const forrm = JSON.parse(JSON.stringify(form));
    forrm.start_time = moment(forrm.start_time);
    forrm.end_time = moment(forrm.end_time);
    forrm.start_date = moment(forrm.start_date);
    forrm.end_date = moment(forrm.end_date);

    if (editable) {
      forrm._id = query.id;
      axios
        .post(`${PROXY}/event/update`, forrm, {
          headers: {
            authorization: globleuser.data?.token,
          },
        })
        .then((res) => {
          setStatus('Edit Done');
          setUploading(false);
          editSucsess();
          setTimeout(() => {
            // location.reload();
            router.push('/dashboard');
            setStatus('Edit');
          }, 3000);
        })
        .catch((e) => {
          console.error(e.message);
          setStatus('Error Occured');
          uploadErrorr();
          setUploading(false);
        });
    } else {
      axios
        .post(`${PROXY}/event/insert`, forrm, {
          headers: {
            authorization: globleuser.data?.token,
          },
        })
        .then((res) => {
          setStatus('All Done');
          setUploading(false);
          uploadSucsess();
          setTimeout(() => {
            setStatus('Submit');
            // location.reload();
            router.push('/dashboard');
          }, 3000);
          // location.reload();
          router.push('/dashboard');
        })
        .catch((e) => {
          console.error(e.message);
          setStatus('Error Occured');
          uploadErrorr();
          setUploading(false);
        });
    }
  };
  const [value, setValue] = useState(dayjs('2022-04-17'));
  return (
    <div
      className='bg-white py-2'
      style={{ marginTop: '50px' }}
    >
      <h5
        style={{ color: '#b6255a' }}
        className='text-center'
      >
        {editable ? 'Edit Events' : 'Add Events'}
      </h5>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={Styles.form_container}>
          <div className={Styles.borders}>
            <div className='row'>
              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                <label className={Styles.label}>Start Date</label>
                <br></br>
                <div className={Styles.category_section}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      // label="Start Date"
                      value={form?.start_date}
                      onChange={(newValue) =>
                        setForm({
                          ...form,
                          start_date: dayjs(newValue),
                        })
                      }
                      sx={{ width: '100%' }}
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          sx={{ width: '100%' }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>

              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                <label className={Styles.label}>End Date</label>
                <br></br>
                <div className={Styles.category_section}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoItem label="Start Date"> */}
                    <DatePicker
                      // label="Start Date"
                      value={form?.end_date}
                      onChange={(newValue) =>
                        setForm({
                          ...form,
                          end_date: dayjs(newValue),
                        })
                      }
                      sx={{ width: '100%' }}
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          sx={{ width: '100%' }}
                        />
                      )}
                    />
                    {/* </DemoItem> */}
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <br />
            <div className='row'>
              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                <label className={Styles.label}>Start Time</label>
                <br></br>
                <div className={Styles.category_section}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      // label="Start Date"
                      value={form?.start_time}
                      ampm={false}
                      onChange={(newValue) =>
                        setForm({
                          ...form,
                          start_time: dayjs(newValue),
                        })
                      }
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          sx={{ width: '100%' }}
                        />
                      )}
                      sx={{ width: '100%' }}
                    />
                  </LocalizationProvider>
                </div>
              </div>

              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                <label className={Styles.label}>End Time</label>
                <br></br>
                <div className={Styles.category_section}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoItem label="Start Date"> */}
                    <TimePicker
                      // label="Start Date"
                      ampm={false}
                      value={form?.end_time}
                      onChange={(newValue) =>
                        setForm({
                          ...form,
                          end_time: dayjs(newValue),
                        })
                      }
                      renderInput={(props) => (
                        <TextField
                          {...props}
                          sx={{ width: '100%' }}
                        />
                      )}
                      sx={{ width: '100%' }}
                    />
                    {/* </DemoItem> */}
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <br />
            <div className='row'>
              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                <div className={Styles.category_section}>
                  <label className={Styles.label}>required member</label>
                  <br></br>
                  <input
                    onChange={(e) => {
                      setForm({ ...form, required_member: e.target.value });
                    }}
                    type='text'
                    value={form?.required_member}
                    className={Styles.phone_tag}
                  />
                </div>
              </div>

              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                <label className={Styles.label}>required member type</label>
                <br></br>
                <input
                  onChange={(e) => {
                    setForm({ ...form, required_member_type: e.target.value });
                  }}
                  type='text'
                  value={form?.required_member_type}
                  className={Styles.email_tag}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                <div className={Styles.category_section}>
                  <label className={Styles.label}>event type</label>
                  <br></br>
                  <input
                    onChange={(e) => {
                      setForm({ ...form, event_type: e.target.value });
                    }}
                    type='text'
                    value={form?.event_type}
                    className={Styles.phone_tag}
                  />
                </div>
              </div>

              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                <label className={Styles.label}>venue</label>
                <br></br>
                <input
                  onChange={(e) => {
                    setForm({ ...form, venue: e.target.value });
                  }}
                  type='text'
                  value={form?.venue}
                  className={Styles.email_tag}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                <div className={Styles.category_section}>
                  <label className={Styles.label}>Sallery</label>
                  <br></br>
                  <input
                    onChange={(e) => {
                      setForm({ ...form, sallery: e.target.value });
                    }}
                    type='number'
                    value={form?.sallery}
                    className={Styles.phone_tag}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={Styles.btnevent}>
            <button
              onClick={addHandler}
              disabled={uploading ? true : false}
            >
              {status}
            </button>
          </div>
        </div>
      )}
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt='example'
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

EditListedItems.getInitialProps = ({ query }) => {
  return { query };
};

export default EditListedItems;
