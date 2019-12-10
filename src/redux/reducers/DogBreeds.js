import {
  DOG_BREED_LIST,
  FETCHING,
  FETCHED,
  SUB_BREED,
  BREED_IMAGE,
} from '../actions/Types';

const initialState = {
  isFetching: false,
  dogList: [],
  subBreed: [],
  breedImage: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHED:
      return {
        ...state,
        isFetching: false,
      };
    case DOG_BREED_LIST: {
      return {
        ...state,
        dogList: action.payload,
      };
    }
    case SUB_BREED: {
      return {
        ...state,
        subBreed: action.payload,
      };
    }
    case BREED_IMAGE: {
      return {
        ...state,
        breedImage: action.payload,
      };
    }
  }
  return state;
};

export default reducer;
