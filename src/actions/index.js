
import fetch from 'isomorphic-fetch';
import store from "../store";
const API_URL = 'https://api.magicthegathering.io/v1';

const fetchInitialContentAction = pageSize => ({
  type: 'FETCH_INITIAL_CONTENT',
  pageSize
});

const fetchMoreContentAction = () => ({
  type: 'FETCH_MORE_CONTENT'
});

const fetchContentSuccessAction = data => ({
  type: 'FETCH_CONTENT_SUCCESS',
  data
});

const fetchContentErrorAction = error => ({
  type: 'FETCH_CONTENT_ERROR',
  error
});

const fetchContent = async (pageSize, page) => {
  const response = await fetch(`${API_URL}/cards?pageSize=${pageSize}?page=${page}`);
  const data = await response.json();
  return data.cards;
}

export const fetchInitialContent = ({pageSize, initialFetchSize}) => {
  return async (dispatch, getState) => {
    dispatch(fetchInitialContentAction(pageSize));

    try {
      const data = await fetchContent(initialFetchSize, 1);
      dispatch(fetchContentSuccessAction(data));
    } catch (err) {
      dispatch(fetchContentErrorAction(err.message));
    }
  };
};

export const fetchMoreContent = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch(fetchMoreContentAction());

    try {
      const data = await fetchContent(state.pageSize, state.fetchedPage + 1);
      dispatch(fetchContentSuccessAction(data));
    } catch (err) {
      dispatch(fetchContentErrorAction(err));
    }
  };
};