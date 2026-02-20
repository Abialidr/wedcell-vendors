import React from "react";
import Styles from "../../styles/Footer.module.css";
import Image from "next/image";
// import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import google from "../../public/images/Google-Play.png";
import apple from "../../public/images/Apple-Store.png";
import { Box } from "@mui/material";
import BottomNav from "./BottomNav";
import { useDispatch } from "react-redux";
import { location as setLocation } from "../../redux/reducer/appEssentials";

const containerWidth = {
  width: "100%",
  "@media (minWidth: 780px)": {
    width: "100%",
  },
};
const Footer = () => {
  const dispatch = useDispatch();
  // dispatch(loginRoute(""));
  const router = useRouter();
  const handleLocation = (el) => {
    localStorage.setItem("location", el);
    window.dispatchEvent(new Event("location"));
    dispatch(setLocation(el));
    // setLocation(el);
    // setOpenLocation(false);
  };
  let role;
  if (typeof window !== "undefined") {
    let local = localStorage.getItem("role");
    role = local ? JSON.parse(local).role : null;
  }
  return (
    <div
      className={Styles.social_media_block}
      style={{
        zIndex: 10,
        position: "absolute",
        left: 0,
        ...containerWidth,
      }}
    >
      <BottomNav />
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col-md-2 col-6">
            <div className="footer-widget">
              <h3 className={Styles.widget_title}>Delhi NCR</h3>
              <ul className={`${Styles.listnone} px-0`}>
                <ul className={`${Styles.listnone} px-0`}>
                  <li>
                    <Box
                      onClick={() => {
                        handleLocation("Delhi");
                        router.push({
                          pathname: "/venue",
                          query: {
                            category: "Hotel",
                            // subCategory: sub,
                          },
                        });
                      }}
                    >
                      Hotels In Delhi
                    </Box>
                  </li>
                  <li>
                    <Box
                      onClick={() => {
                        handleLocation("Delhi");
                        router.push({
                          pathname: "/vendors",
                          query: {
                            category: "Planning & Decor",
                          },
                        });
                      }}
                    >
                      Decoration In Delhi
                    </Box>
                  </li>
                  <li>
                    <Box
                      onClick={() => {
                        handleLocation("Delhi");
                        router.push({
                          pathname: "/vendors",
                          query: {
                            category: "Photographers",
                          },
                        });
                      }}
                    >
                      Photographers In Delhi
                    </Box>
                  </li>
                  <li>
                    <Box
                      onClick={() => {
                        handleLocation("Delhi");
                        router.push({
                          pathname: "/vendors",
                          query: {
                            category: "Makeup",
                          },
                        });
                      }}
                    >
                      Makeup Artist In Delhi
                    </Box>
                  </li>
                  <li>
                    <Box
                      onClick={() => {
                        handleLocation("Delhi");
                        router.push({
                          pathname: "/vendors",
                          query: {
                            category: "Mehndi",
                          },
                        });
                      }}
                    >
                      Mehndi Artist In Delhi
                    </Box>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
          <div className="col-md-2 col-6">
            <div className="footer-widget">
              <h3 className={Styles.widget_title}>Jaipur </h3>
              <ul className={`${Styles.listnone} px-0`}>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Jaipur");
                      router.push({
                        pathname: "/venue",
                        query: {
                          category: "Hotel",
                          // subCategory: sub,
                        },
                      });
                    }}
                  >
                    Hotels In Jaipur
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Jaipur");
                      router.push({
                        pathname: "/vendors",
                        query: {
                          category: "Planning & Decor",
                        },
                      });
                    }}
                  >
                    Decoration In Jaipur
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Jaipur");
                      router.push({
                        pathname: "/vendors",
                        query: {
                          category: "Photographers",
                        },
                      });
                    }}
                  >
                    Photographers In Jaipur
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Jaipur");
                      router.push({
                        pathname: "/vendors",
                        query: {
                          category: "Makeup",
                        },
                      });
                    }}
                  >
                    Makeup Artist In Jaipur
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Jaipur");
                      router.push({
                        pathname: "/vendors",
                        query: {
                          category: "Mehndi",
                        },
                      });
                    }}
                  >
                    Mehndi Artist In Jaipur
                  </Box>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2 col-6">
            <div className="footer-widget">
              <h3 className={Styles.widget_title}>Udaipur </h3>
              <ul className={`${Styles.listnone} px-0`}>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Udaipur");
                      router.push({
                        pathname: "/venue",
                        query: {
                          category: "Hotel",
                          // subCategory: sub,
                        },
                      });
                    }}
                  >
                    Hotels In Udaipur
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Udaipur");
                      router.push({
                        pathname: "/vendors",
                        query: {
                          category: "Planning & Decor",
                        },
                      });
                    }}
                  >
                    Decoration In Udaipur
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Udaipur");
                      router.push({
                        pathname: "/vendors",
                        query: {
                          category: "Photographers",
                        },
                      });
                    }}
                  >
                    Photographers In Udaipur
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Udaipur");
                      router.push({
                        pathname: "/vendors",
                        query: {
                          category: "Makeup",
                        },
                      });
                    }}
                  >
                    Makeup Artist In Udaipur
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Udaipur");
                      router.push({
                        pathname: "/vendors",
                        query: {
                          category: "Mehndi",
                        },
                      });
                    }}
                  >
                    Mehndi Artist In Udaipur
                  </Box>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2 col-6">
            <div className="footer-widget">
              <h3 className={Styles.widget_title}>Agra </h3>
              <ul className={`${Styles.listnone} px-0`}>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Agra");
                      router.push({
                        pathname: "/venue",
                        query: {
                          category: "Hotel",
                          // subCategory: sub,
                        },
                      });
                    }}
                  >
                    Hotels In Agra
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Agra");
                      router.push({
                        pathname: "/vendors",
                        query: {
                          category: "Planning & Decor",
                        },
                      });
                    }}
                  >
                    Decoration In Agra
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Agra");
                      router.push({
                        pathname: "/vendors",
                        query: {
                          category: "Photographers",
                        },
                      });
                    }}
                  >
                    Photographers In Agra
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Agra");
                      router.push({
                        pathname: "/vendors",
                        query: {
                          category: "Makeup",
                        },
                      });
                    }}
                  >
                    Makeup Artist In Agra
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Agra");
                      router.push({
                        pathname: "/vendors",
                        query: {
                          category: "Mehndi",
                        },
                      });
                    }}
                  >
                    Mehndi Artist In Agra
                  </Box>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2 col-6">
            <div className="footer-widget">
              <h3 className={Styles.widget_title}>Jim Corbett </h3>
              <ul className={`${Styles.listnone} px-0`}>
                <ul className={`${Styles.listnone} px-0`}>
                  <li>
                    <Box
                      onClick={() => {
                        handleLocation("Jim Corbett");
                        router.push({
                          pathname: "/venue",
                          query: {
                            category: "Hotel",
                            // subCategory: sub,
                          },
                        });
                      }}
                    >
                      Hotels In Jim Corbett
                    </Box>
                  </li>
                  <li>
                    <Box
                      onClick={() => {
                        handleLocation("Jim Corbett");
                        router.push({
                          pathname: "/vendors",
                          query: {
                            category: "Planning & Decor",
                          },
                        });
                      }}
                    >
                      Decoration In Jim Corbett
                    </Box>
                  </li>
                  <li>
                    <Box
                      onClick={() => {
                        handleLocation("Jim Corbett");
                        router.push({
                          pathname: "/vendors",
                          query: {
                            category: "Photographers",
                          },
                        });
                      }}
                    >
                      Photographers In Jim Corbett
                    </Box>
                  </li>
                  <li>
                    <Box
                      onClick={() => {
                        handleLocation("Jim Corbett");
                        router.push({
                          pathname: "/vendors",
                          query: {
                            category: "Makeup",
                          },
                        });
                      }}
                    >
                      Makeup Artist In Jim Corbett
                    </Box>
                  </li>
                  <li>
                    <Box
                      onClick={() => {
                        handleLocation("Jim Corbett");
                        router.push({
                          pathname: "/vendors",
                          query: {
                            category: "Mehndi",
                          },
                        });
                      }}
                    >
                      Mehndi Artist In Jim Corbett
                    </Box>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
          <div className="col-md-2 col-6">
            <div className="footer-widget">
              <h3 className={Styles.widget_title}>Jodhpur </h3>
              <ul className={`${Styles.listnone} px-0`}>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Jodhpur");
                      router.push({
                        pathname: "/venue",
                        query: {
                          category: "Hotel",
                          // subCategory: sub,
                        },
                      });
                    }}
                  >
                    Hotels In Jodhpur
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Jodhpur");
                      router.push({
                        pathname: "/vendors",
                        query: {
                          category: "Planning & Decor",
                        },
                      });
                    }}
                  >
                    Decoration In Jodhpur
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Jodhpur");
                      router.push({
                        pathname: "/vendors",
                        query: {
                          category: "Photographers",
                        },
                      });
                    }}
                  >
                    Photographers In Jodhpur
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Jodhpur");
                      router.push({
                        pathname: "/vendors",
                        query: {
                          category: "Makeup",
                        },
                      });
                    }}
                  >
                    Makeup Artist In Jodhpur
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Jodhpur");
                      router.push({
                        pathname: "/vendors",
                        query: {
                          category: "Mehndi",
                        },
                      });
                    }}
                  >
                    Mehndi Artist In Jodhpur
                  </Box>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-2 col-6">
            <div className="footer-widget">
              <h3 className={Styles.widget_title}>Destination Wedding</h3>
              <ul className={`${Styles.listnone} px-0`}>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Agra");
                      router.push({
                        pathname: "/venue",
                        query: {
                          category: "Destination Wedding",
                          // subCategory: sub,
                        },
                      });
                    }}
                  >
                    Agra
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Delhi");
                      router.push({
                        pathname: "/venue",
                        query: {
                          category: "Destination Wedding",
                          // subCategory: sub,
                        },
                      });
                    }}
                  >
                    Delhi
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Jaipur");
                      router.push({
                        pathname: "/venue",
                        query: {
                          category: "Destination Wedding",
                          // subCategory: sub,
                        },
                      });
                    }}
                  >
                    Jaipur
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Udaipur");
                      router.push({
                        pathname: "/venue",
                        query: {
                          category: "Destination Wedding",
                          // subCategory: sub,
                        },
                      });
                    }}
                  >
                    Udaipur
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Jodhpur");
                      router.push({
                        pathname: "/venue",
                        query: {
                          category: "Destination Wedding",
                          // subCategory: sub,
                        },
                      });
                    }}
                  >
                    Jodhpur
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Jim Corbett");
                      router.push({
                        pathname: "/venue",
                        query: {
                          category: "Destination Wedding",
                          // subCategory: sub,
                        },
                      });
                    }}
                  >
                    Jim Corbett
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Masoori");
                      router.push({
                        pathname: "/venue",
                        query: {
                          category: "Destination Wedding",
                        },
                      });
                    }}
                  >
                    Masoori
                  </Box>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2 col-6">
            <div className="footer-widget">
              <h3 className={Styles.widget_title}>Venue</h3>
              <ul className={`${Styles.listnone} px-0`}>
                <ul className={`${Styles.listnone} px-0`}>
                  <li>
                    <Box
                      onClick={() => {
                        handleLocation("Agra");
                        router.push({
                          pathname: "/venue",
                        });
                      }}
                    >
                      Agra
                    </Box>
                  </li>
                  <li>
                    <Box
                      onClick={() => {
                        handleLocation("Delhi");
                        router.push({
                          pathname: "/venue",
                        });
                      }}
                    >
                      Delhi
                    </Box>
                  </li>
                  <li>
                    <Box
                      onClick={() => {
                        handleLocation("Jaipur");
                        router.push({
                          pathname: "/venue",
                        });
                      }}
                    >
                      Jaipur
                    </Box>
                  </li>
                  <li>
                    <Box
                      onClick={() => {
                        handleLocation("Udaipur");
                        router.push({
                          pathname: "/venue",
                        });
                      }}
                    >
                      Udaipur
                    </Box>
                  </li>
                  <li>
                    <Box
                      onClick={() => {
                        handleLocation("Jodhpur");
                        router.push({
                          pathname: "/venue",
                        });
                      }}
                    >
                      Jodhpur
                    </Box>
                  </li>
                  <li>
                    <Box
                      onClick={() => {
                        handleLocation("Jim Corbett");
                        router.push({
                          pathname: "/venue",
                        });
                      }}
                    >
                      Jim Corbett
                    </Box>
                  </li>
                  <li>
                    <Box
                      onClick={() => {
                        handleLocation("Masoori");
                        router.push({
                          pathname: "/venue",
                        });
                      }}
                    >
                      Masoori
                    </Box>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
          <div className="col-md-2 col-6">
            <div className="footer-widget">
              <h3 className={Styles.widget_title}>Vendor</h3>
              <ul className={`${Styles.listnone} px-0`}>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Agra");
                      router.push({
                        pathname: "/vendors",
                      });
                    }}
                  >
                    Agra
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Delhi");
                      router.push({
                        pathname: "/vendors",
                      });
                    }}
                  >
                    Delhi
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Jaipur");
                      router.push({
                        pathname: "/vendors",
                      });
                    }}
                  >
                    Jaipur
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Udaipur");
                      router.push({
                        pathname: "/vendors",
                      });
                    }}
                  >
                    Udaipur
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Jodhpur");
                      router.push({
                        pathname: "/vendors",
                      });
                    }}
                  >
                    Jodhpur
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Jim Corbett");
                      router.push({
                        pathname: "/vendors",
                      });
                    }}
                  >
                    Jim Corbett
                  </Box>
                </li>
                <li>
                  <Box
                    onClick={() => {
                      handleLocation("Masoori");
                      router.push({
                        pathname: "/vendors",
                      });
                    }}
                  >
                    Masoori
                  </Box>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-2 col-6">
            <div className="footer-widget">
              <h3 className={Styles.widget_title}>Important Links</h3>
              <ul className={`${Styles.listnone} px-0`}>
                <li></li>
                <Link href={"/"}>
                  <li>Home</li>
                </Link>
                {/* <li> Contact Us</li>
                <li>Terms &amp; Conditions</li>
                <Link href={"/privacy-policy"}>
                  <li>Privacy Policy</li>
                </Link>
                <li>About</li>
                <li>Blog</li> */}
                {/* <Link href={"https://wedcellinstitute.com"}>
                  <li>WedCell Institute</li>
                </Link> */}
                <Link href={"/blogs"}>
                  <li>Blog</li>
                </Link>
                <Link href={"/RealWeddingHome"}>
                  <li>Real Wedding</li>
                </Link>
                <a href={"https://wedcellinstitute.com/"} target="_blank">
                  <li>WedCell Institute</li>
                </a>
                <Link href={"/vendor"}>
                  <li>Get Jobs</li>
                </Link>
                <Link href={"/user-dashboard"}>
                  <li>Planning Tools</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="col-md-2 col-6">
            <div className="footer-widget">
              <h3 className={Styles.widget_title}>Contact Us</h3>
              <ul
                className={Styles.listnone}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <a
                  target="_blank"
                  href="https://www.facebook.com/wedcellevents"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <FacebookIcon sx={{ color: "gray", width: "10%" }} />
                  <li sx={{ color: "gray", width: "90%" }}>FaceBook</li>
                </a>

                <a
                  target="_blank"
                  href="https://www.instagram.com/wedcellevents/"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <InstagramIcon sx={{ color: "gray", width: "10%" }} />
                  <li sx={{ color: "gray", width: "90%" }}>Instagram</li>
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/company/wedcell/mycompany/?viewAsMember=true"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <LinkedInIcon sx={{ color: "gray", width: "10%" }} />
                  <li sx={{ color: "gray", width: "90%" }}>LinkedIn</li>
                </a>
                <a
                  target="_blank"
                  href="https://in.pinterest.com/wedcelleventpvtltd/"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <PinterestIcon sx={{ color: "gray", width: "10%" }} />
                  <li>Pinterest</li>
                </a>

                <a
                  target="_blank"
                  href="https://www.youtube.com/@wedcelleventspvt.ltd.4819"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <YouTubeIcon sx={{ color: "gray", width: "10%" }} />
                  <li>Youtube</li>
                </a>
              </ul>
            </div>
          </div>
          <div className="col-md-2 col-6" style={{ paddingRight: "20px" }}>
            <div className="footer-widget">
              <h3 className={Styles.widget_title}>List You Buisness</h3>
              <ul className={Styles.listnone1}>
                <li>Are you vendor ? List your venue and</li>
                <li>service get more from listing business.</li>
                {role !== "Students" && (
                  <li>
                    <button
                      onClick={() => {
                        Router.push("/vendor-login");
                      }}
                      className={Styles.footer_button}
                    >
                      List Your Buisness
                    </button>
                  </li>
                )}
                {role !== "Students" && (
                  <li>
                    <button
                      onClick={() => {
                        Router.push("/student/login");
                      }}
                      className={Styles.footer_button}
                    >
                      Login for students
                    </button>
                  </li>
                )}
                <Link
                  href={
                    "https://play.google.com/store/apps/details?id=com.wb.wedcell"
                  }
                >
                  <li>
                    <Image src={google} height={"50"} width={"160"} />
                  </li>
                </Link>
                <Link
                  href={"https://apps.apple.com/in/app/wedcell/id1603782330"}
                >
                  <li>
                    <Image src={apple} height={"50"} width={"160"} />
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className={Styles.copyright}></div>

          <p className={`${Styles.footer_copyright} mb-0`}>
            <Link href={"/terms-conditions"}>
              <a>Terms and Conditions</a>
            </Link>
            |
            <Link href={"/privacy-policy"}>
              <a>Privacy Policy</a>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;© 2018 Wedcell. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
