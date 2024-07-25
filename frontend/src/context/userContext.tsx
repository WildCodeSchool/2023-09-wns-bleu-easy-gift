import { useGetUserInfosQuery } from '@/graphql/generated/schema'
import { checkUserConnected } from '@/utils/checkConnection'
import React, { createContext, useContext, useEffect } from 'react'

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
        refetch,
    } = useGetUserInfosQuery()

    const isConnected = checkUserConnected()

    const userData = data?.getUserInfos

    useEffect(() => {
        refetch()
    }, [isConnected])

    return (
        <userContext.Provider value={{ userData }}>
            {children}
        </userContext.Provider>
    )
}

export const useUserData = () => {
    return useContext(userContext)
}
