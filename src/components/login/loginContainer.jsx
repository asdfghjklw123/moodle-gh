import { connect } from "react-redux"
import Login from "./login"
import { loginStudentTC } from "../../store/reducers/authReducers"

const LoginContainer = props => {
    return (
        <Login login={props.loginStudentTC}/>
    )
}

let mapStateToProps = state => ({
    auth: state.auth
})

export const LoginConnected = connect(mapStateToProps, {loginStudentTC})(LoginContainer)