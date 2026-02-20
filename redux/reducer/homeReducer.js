let initialState = {
  errors: {},
  mehndi: [],
  hotel: [],
  makeup: [],
  bridal: [],
  groom: [],
  realWedding: [],
  photographer: [],
  decor: [],
  vendor: {},
  venue: {},
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MEHNDI":
      return {
        ...state,
        loading: true,
        errors: {},
      };

    case "FETCH_MEHNDI":
      return {
        ...state,
        mehndi: action.payload.data,
      };

    case "MEHNDI_REJECTED":
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };

    case "HOTEL":
      return {
        ...state,
        loading: true,
        errors: {},
      };

    case "FETCH_HOTEL":
      return {
        ...state,
        hotel: action.payload.data,
      };
    case "HOTEL_REJECTED":
      return {
        ...state,
        errors: action.payload,
      };

    case "BRIDAL":
      return {
        ...state,
        loading: true,
        errors: {},
      };
    case "FETCH_BRIDAL":
      return {
        ...state,
        bridal: action.payload.data,
      };
    case "BRIDAL_REJECTED":
      return {
        ...state,
        errors: action.payload,
      };

    case "GROOM":
      return {
        ...state,
        loading: true,
        errors: {},
      };
    case "FETCH_GROOM":
      return {
        ...state,
        groom: action.payload.data,
      };
    case "GROOM_REJECTED":
      return {
        ...state,
        errors: action.payload,
      };

    case "MAKEUP":
      return {
        ...state,
        loading: true,
        errors: {},
      };

    case "FETCH_MAKEUP":
      return {
        ...state,
        makeup: action.payload.data,
      };
    case "MAKEUP_REJECTED":
      return {
        ...state,
        errors: action.payload,
      };

    case "PHOTOGRAPHER":
      return {
        ...state,
        loading: true,
        errors: {},
      };

    case "FETCH_PHOTOGRAPHER":
      return {
        ...state,
        photographer: action.payload.data,
      };
    case "PHOTOGRAPHER_REJECTED":
      return {
        ...state,
        errors: action.payload,
      };

    case "DECOR":
      return {
        ...state,
        loading: true,
        errors: {},
      };

    case "FETCH_DECOR":
      return {
        ...state,
        decor: action.payload.data,
      };
    case "DECOR_REJECTED":
      return {
        ...state,
        errors: action.payload,
      };

    case "VENDOR":
      return {
        ...state,
        loading: true,
        errors: {},
      };

    case "FETCH_VENDOR":
      return {
        ...state,
        vendor: action.payload.data,
      };
    case "VENDOR_REJECTED":
      return {
        ...state,
        errors: action.payload,
      };

    case "REAL_WEDDING":
      return {
        ...state,
        loading: true,
        errors: {},
      };

    case "FETCH_REAL_WEDDING":
      return {
        ...state,
        realWedding: action.payload,
      };
    case "REAL_WEDDING_REJECTED":
      return {
        ...state,
        errors: action.payload,
      };

    case "VENUE":
      return {
        ...state,
        loading: true,
        errors: {},
      };

    case "FETCH_VENUE":
      return {
        ...state,
        venue: action.payload.data,
      };
    case "VENUE_REJECTED":
      return {
        ...state,
        errors: action.payload,
      };

    case "ASSOCIATION":
      return {
        ...state,
        loading: true,
        errors: {},
      };

    case "ASSOCIATION_FULFILLED":
      return {
        ...state,
        loading: false,
        association: action.payload.associations,
      };

    case "ASSOCIATION_REJECTED":
      return {
        ...state,
        loading: false,
        errors: action.payload.data,
      };
    case "SETTING":
      return {
        ...state,
        setting: {},
      };
    case "SETTING_FULFILLED":
      return {
        ...state,
        setting: action.payload,
      };
    case "SETTING_REJECTED":
      return {
        ...state,
        isLoadingProfessionalEpisodes: false,
        isLoadingIndustrialSolutions: false,
        isLoadingSchemes: false,
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default homeReducer;
