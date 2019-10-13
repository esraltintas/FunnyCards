const options = (
  state = {
    pageSize: null,
    page: 0,
    fetchedPage: 0,
    loading: false,
    error: null,
    content: []
  },
  action
) => {
  switch (action.type) {
    case 'FETCH_INITIAL_CONTENT': 
      return {
        ...state,
        loading: true,
        error: null,
        pageSize: action.pageSize
      }

    case 'FETCH_MORE_CONTENT': 
      return {
        ...state,
        loading: true,
        error: null,
        page: state.page + 1
      }

    case 'FETCH_CONTENT_SUCCESS': 
      const content = [
        ...state.content,
        ...action.data
      ];
      
      const fetchedPage = Math.floor(content.length / state.pageSize);

      return {
        ...state,
        fetchedPage,
        content,
        page: state.page || 1,
        loading: false
      }

    case 'FETCH_CONTENT_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export default options