import { GraphQLClient, gql } from 'graphql-request';

import { GRAPHCMS_API_URL } from '../config/env';

export const cms = new GraphQLClient(GRAPHCMS_API_URL);

export { gql };
