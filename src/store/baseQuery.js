import axios from 'axios';
import queryString from 'query-string';


const baseQuery = ({ baseUrl }) => async (args) => {

  const headers = {
    // Authorization: TOKEN_HERE,
  };

  const axiosRequestConfig = {
    ...args,
    headers: {
      ...headers,
      ...args.headers,
    },
    url: baseUrl + args.url,
    paramsSerializer: (params) => queryString.stringify(params, {
      arrayFormat: 'comma',
      parseBooleans: true,
      parseNumbers: true,
    })
  };

  try {
    const response = await axios(axiosRequestConfig);
    return { data: response.data };
  } catch (e) {
    if (!e.response) {
      return {
        error: {
          state: 'APP_ERROR',
          data: e.message,
        }
      }
    }
    return {
      error: {
        state: e.response.status,
        data: e.response.data || e.message,
      }
    };
  }
};


export default baseQuery;
