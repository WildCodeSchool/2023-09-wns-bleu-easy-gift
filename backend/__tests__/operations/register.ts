import gql from 'graphql-tag'

export default gql`
    mutation Register($data: InputRegister!) {
        register(data: $data) {
            email
            pseudo
        }
    }
`
