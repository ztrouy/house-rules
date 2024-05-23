import { useEffect, useState } from "react"
import { getUserProfiles } from "../../managers/userProfileManager.js"
import { Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap"

export const UserProfilesList = ({ loggedInUser }) => {
    const [userProfiles, setUserProfiles] = useState([])

    useEffect(() => {
        getUserProfiles().then(setUserProfiles)
    }, [])
    
    return (
        <div className="d-flex flex-column align-items-center gap-3 pt-3">
            <div className="w-75">
                <h1>User Profiles</h1>
            </div>
            {userProfiles.map(up => {
                return (
                    <Card className="w-75" key={`up-${up.id}`}>
                        <CardHeader>
                            <CardTitle className="fw-bold fs-2">
                                {up.userName}
                            </CardTitle>
                            <CardText>
                                {`${up.firstName} ${up.lastName}`}
                            </CardText>
                        </CardHeader>
                        <CardBody>
                            <CardText>
                                {`Address: ${up.address}`}
                            </CardText>
                            <CardText>
                                {`Email: ${up.email}`}
                            </CardText>
                        </CardBody>
                    </Card>
                )
            })}
        </div>
    )
}

export default UserProfilesList