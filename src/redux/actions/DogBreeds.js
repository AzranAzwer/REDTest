import {
  FETCHING,
  FETCHED,
  DOG_BREED_LIST,
  SUB_BREED,
  BREED_IMAGE,
} from './Types';
import {API_URL} from '../../config/Consts';

export const fetchDogsList = () => dispatch => {
  try {
    dispatch({type: FETCHING});
    return fetch(API_URL + `/breeds/list/all`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: DOG_BREED_LIST,
          payload: response,
        });
        dispatch({type: FETCHED});
      })
      .catch(e => {
        console.log('server error', e);
      });
  } catch (error) {
    console.log('error', error);
  }
};

export const fetchSubBreeds = data => dispatch => {
  try {
    dispatch({type: FETCHING});
    return fetch(API_URL + '/breed/' + data + '/list', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: SUB_BREED,
          payload: response,
        });
        dispatch({type: FETCHED});
      })
      .catch(e => {
        console.log('server error', e);
      });
  } catch (error) {
    console.log('error', error);
  }
};

export const fetchBreedImage = data => dispatch => {
  try {
    dispatch({type: FETCHING});
    return fetch(API_URL + '/breed/' + data + '/images/random', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: BREED_IMAGE,
          payload: response,
        });
        dispatch({type: FETCHED});
      })
      .catch(e => {
        console.log('server error', e);
      });
  } catch (error) {
    console.log('error', error);
  }
};
