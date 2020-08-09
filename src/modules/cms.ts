import { GraphQLClient } from 'graphql-request';
import { GRAPHCMS_API_URL } from '../config/env';

const cms = new GraphQLClient(GRAPHCMS_API_URL);

export default cms;
