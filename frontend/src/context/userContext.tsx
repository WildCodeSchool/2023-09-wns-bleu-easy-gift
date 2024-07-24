import { useGetUserInfosQuery, UserInfos } from '@/graphql/generated/schema'
import React, { createContext, useContext } from 'react'

const userContext = createContext<{
    userData:
        | {
              __typename?: 'UserInfos'
              id: string
              email: string
              pseudo: string
              avatar?: {
                  __typename?: 'Avatar'
                  id: number
                  name: string
                  url: string
              } | null
          }
        | undefined
}>({
    userData: undefined,
})

export const UserDataProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const {
        data,
        loading: userLoading,
        error: userError,
    } = useGetUserInfosQuery()

    const userData = data?.getUserInfos

    return (
        <userContext.Provider value={{ userData }}>
            {children}
        </userContext.Provider>
    )
}

export const useUserData = () => {
    return useContext(userContext)
}
