import client from '@/graphql/client'
import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import Layout from './layout'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Head from 'next/head'
import { UserDataProvider } from '@/context/userContext'

export default function App({ Component, pageProps }: AppProps) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])
    if (!isClient) return

    return (
        <ApolloProvider client={client}>
            <Head>
                <title>Easy Gift</title>
            </Head>
            <UserDataProvider>
                <Layout>
                    <Component {...pageProps} />
                    <ToastContainer />
                </Layout>
            </UserDataProvider>
        </ApolloProvider>
    )
}
