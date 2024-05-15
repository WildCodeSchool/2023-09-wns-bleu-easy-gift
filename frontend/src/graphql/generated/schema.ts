import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTimeISO: any;
};

export type Avatar = {
  __typename?: 'Avatar';
  id: Scalars['Int'];
  name: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
};

export type Discussion = {
  __typename?: 'Discussion';
  created_at: Scalars['String'];
  group: Group;
  id: Scalars['Int'];
  modified_at: Scalars['String'];
  name: Scalars['String'];
  users: Array<User>;
};

export type Group = {
  __typename?: 'Group';
  avatar: Avatar;
  created_at: Scalars['String'];
  id: Scalars['Int'];
  modified_at: Scalars['String'];
  name: Scalars['String'];
};

export type InputLogin = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type InputRegister = {
  avatar?: InputMaybe<ObjectId>;
  email: Scalars['String'];
  password: Scalars['String'];
  pseudo?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewGroup: Group;
  register: UserWithoutPassword;
};


export type MutationAddNewGroupArgs = {
  data: NewGroupInput;
};


export type MutationRegisterArgs = {
  data: InputRegister;
};

export type NewGroupInput = {
  emailUsers: Array<Scalars['String']>;
  name: Scalars['String'];
};

export type ObjectId = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getUserInfos: UserInfos;
  groups: Array<Group>;
  login: ResponseMessage;
  logout: ResponseMessage;
  profilAvatars: Array<Avatar>;
  testAuthorized: ResponseMessage;
  userGroups: Array<Group>;
  users: Array<User>;
  usersToGroups: Array<UserToGroup>;
};


export type QueryLoginArgs = {
  infos: InputLogin;
};

export type ResponseMessage = {
  __typename?: 'ResponseMessage';
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Avatar>;
  birthday?: Maybe<Scalars['DateTimeISO']>;
  created_at: Scalars['String'];
  discussions: Array<Discussion>;
  email: Scalars['String'];
  id: Scalars['Int'];
  modified_at: Scalars['String'];
  pseudo: Scalars['String'];
  validated_email?: Maybe<Scalars['DateTimeISO']>;
};

export type UserInfos = {
  __typename?: 'UserInfos';
  avatar?: Maybe<Avatar>;
  email: Scalars['String'];
  id: Scalars['String'];
  pseudo: Scalars['String'];
};

export type UserToGroup = {
  __typename?: 'UserToGroup';
  created_at: Scalars['String'];
  group_id: Scalars['Float'];
  id: Scalars['Int'];
  is_admin: Scalars['Boolean'];
  modified_at: Scalars['String'];
  user_id: Scalars['Float'];
};

export type UserWithoutPassword = {
  __typename?: 'UserWithoutPassword';
  avatar: Avatar;
  email: Scalars['String'];
  pseudo: Scalars['String'];
};

export type UserGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserGroupsQuery = { __typename?: 'Query', userGroups: Array<{ __typename?: 'Group', id: number, name: string, avatar: { __typename?: 'Avatar', id: number, url: string } }> };

export type GetUserInfosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserInfosQuery = { __typename?: 'Query', getUserInfos: { __typename?: 'UserInfos', id: string, email: string, pseudo: string, avatar?: { __typename?: 'Avatar', id: number, name: string, url: string } | null } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', email: string, id: number, pseudo: string, avatar?: { __typename?: 'Avatar', url: string } | null }> };

export type LoginQueryVariables = Exact<{
  infos: InputLogin;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'ResponseMessage', message: string, success: boolean } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: { __typename?: 'ResponseMessage', success: boolean, message: string } };

export type RegisterUserMutationVariables = Exact<{
  data: InputRegister;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', register: { __typename?: 'UserWithoutPassword', email: string, pseudo: string } };


export const UserGroupsDocument = gql`
    query UserGroups {
  userGroups {
    id
    name
    avatar {
      id
      url
    }
  }
}
    `;

/**
 * __useUserGroupsQuery__
 *
 * To run a query within a React component, call `useUserGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserGroupsQuery(baseOptions?: Apollo.QueryHookOptions<UserGroupsQuery, UserGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserGroupsQuery, UserGroupsQueryVariables>(UserGroupsDocument, options);
      }
export function useUserGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserGroupsQuery, UserGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserGroupsQuery, UserGroupsQueryVariables>(UserGroupsDocument, options);
        }
export type UserGroupsQueryHookResult = ReturnType<typeof useUserGroupsQuery>;
export type UserGroupsLazyQueryHookResult = ReturnType<typeof useUserGroupsLazyQuery>;
export type UserGroupsQueryResult = Apollo.QueryResult<UserGroupsQuery, UserGroupsQueryVariables>;
export const GetUserInfosDocument = gql`
    query GetUserInfos {
  getUserInfos {
    id
    email
    pseudo
    avatar {
      id
      name
      url
    }
  }
}
    `;

/**
 * __useGetUserInfosQuery__
 *
 * To run a query within a React component, call `useGetUserInfosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInfosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInfosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserInfosQuery(baseOptions?: Apollo.QueryHookOptions<GetUserInfosQuery, GetUserInfosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserInfosQuery, GetUserInfosQueryVariables>(GetUserInfosDocument, options);
      }
export function useGetUserInfosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserInfosQuery, GetUserInfosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserInfosQuery, GetUserInfosQueryVariables>(GetUserInfosDocument, options);
        }
export type GetUserInfosQueryHookResult = ReturnType<typeof useGetUserInfosQuery>;
export type GetUserInfosLazyQueryHookResult = ReturnType<typeof useGetUserInfosLazyQuery>;
export type GetUserInfosQueryResult = Apollo.QueryResult<GetUserInfosQuery, GetUserInfosQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    email
    id
    pseudo
    avatar {
      url
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const LoginDocument = gql`
    query Login($infos: InputLogin!) {
  login(infos: $infos) {
    message
    success
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      infos: // value for 'infos'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const LogoutDocument = gql`
    query Logout {
  logout {
    success
    message
  }
}
    `;

/**
 * __useLogoutQuery__
 *
 * To run a query within a React component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutQuery(baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
      }
export function useLogoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutQueryResult = Apollo.QueryResult<LogoutQuery, LogoutQueryVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($data: InputRegister!) {
  register(data: $data) {
    email
    pseudo
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;