import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
    gql
  } from '@apollo/client';

  const API_URL = 'https://api.lens.dev';

  const httpLink = new HttpLink({ uri: API_URL });

  const authLink = new ApolloLink((operation, forward) => {
    const token = sessionStorage.getItem('accessToken');

    operation.setContext({
        headers: {
            'x-access-token': token ? `Bearer ${token}` : '',
        },
    });

    return forward(operation);
});


export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const GET_CHALLENGE = `
    query($request: ChallengeRequest!) {
        challenge(request: $request) { text }
    }
`;

export const generateChallenge = async (address) => {
    const res = await apolloClient.query({
        query: gql(GET_CHALLENGE),
        variables: {
            request: {
                address,
            }
        }
    });
    return res.data.challenge.text;
}


const AUTHENTICATE_LOGIN = `
mutation Authenticate($request: SignedAuthChallenge!) { 
  authenticate(request: $request) {
    accessToken
    refreshToken
  }
}
`;

export const authenticate = (address, signature) => {
  return apolloClient.mutate({
   mutation: gql(AUTHENTICATE_LOGIN),
   variables: {
     request: {
       address,
       signature,
     },
   },
 })
}