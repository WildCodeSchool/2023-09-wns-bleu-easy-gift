import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <meta
                    name='description'
                    content="Echanger en groupe sur des cadeaux communs n'a jamais été aussi simple"
                />
                <link rel='icon' href='/favicon.ico' />
                <link
                    rel='stylesheet'
                    href='https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap'
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
