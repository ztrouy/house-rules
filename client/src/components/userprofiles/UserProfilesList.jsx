import { useEffect, useState } from "react"
import { getUserProfiles } from "../../managers/userProfileManager.js"
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle } from "reactstrap"
import { useNavigate } from "react-router-dom"
import PageContainer from "../PageContainer.jsx"

export const UserProfilesList = ({ loggedInUser }) => {
    const [userProfiles, setUserProfiles] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getUserProfiles().then(setUserProfiles)
    }, [])
    
    return (
        <PageContainer>
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
                        <CardFooter className="d-flex flex-row-reverse">
                            <Button onClick={() => navigate(`${up.id}`)}>Details</Button>
                        </CardFooter>
                    </Card>
                )
            })}
        </PageContainer>
    )
}

export default UserProfilesList