import { connect } from "react-redux"
import Profile from "./profile"

const ProfileContainer = props => {
    return (
        <Profile props={props.auth} />
    )
}

let mapStateToProps = state => ({
    auth: state.auth
})

export const ProfileConnected = connect(mapStateToProps, {})(ProfileContainer)