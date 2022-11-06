import { ApolloClient, InMemoryCache,createHttpLink, gql } from '@apollo/client';
  import jwt_decode from "jwt-decode"
  import { RetryLink } from "@apollo/client/link/retry";
  import { setContext } from '@apollo/client/link/context';


  const API_URL = 'https://api.lens.dev';
  /* configuring Apollo GraphQL Client */
const authLink = setContext((_, { headers }) => {
  const token = window.localStorage.getItem('lens-auth-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const httpLink = createHttpLink({
  uri: API_URL
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
 

///QUERY-----------------

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

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

export const authenticate = async (address, signature) => {
  const { data } = await apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  });
  return data.authenticate.accessToken;
};


///////// GET Default Profile

const GET_DEFAULT_PROFILES = `
  query($request: DefaultProfileRequest!) {
    defaultProfile(request: $request) {
      id
      name
      bio
      attributes {
        displayType
        traitType
        key
        value
      }
      followNftAddress
      metadata
      isDefault
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      handle
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      ownedBy
      dispatcher {
        address
        canUseRelay
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
        ... on FeeFollowModuleSettings {
          type
          amount {
            asset {
              symbol
              name
              decimals
              address
            }
            value
          }
          recipient
        }
        ... on ProfileFollowModuleSettings {
         type
        }
        ... on RevertFollowModuleSettings {
         type
        }
      }
    }
  }
`;

export const getDefaultProfileRequest = async (address) => {
  const result = await apolloClient.query({
    query: gql(GET_DEFAULT_PROFILES),
    variables: {
      ethereumAddress: address,
    },
  });

  return result.data.defaultProfile;
};