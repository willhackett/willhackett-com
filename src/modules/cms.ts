import axios from 'axios';
import { GRAPHCMS_API_URL } from '../config/env';

const cms = {
  request: async (query: string, variables?: any) => {
    const { data } = await axios.post(GRAPHCMS_API_URL, {
      query,
      variables,
    });

    return data;
  },
};

export default cms;
