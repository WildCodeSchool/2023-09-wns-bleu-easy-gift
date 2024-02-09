import { AuthChecker } from 'type-graphql'
import { MyContext } from '..'

export const customAuthChecker: AuthChecker<MyContext> = ({ context }) => {
    if (context.user) {
        return true
    }
    return false
}
