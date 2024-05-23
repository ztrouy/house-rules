import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserProfile } from "../../managers/userProfileManager.js"
import { Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap"

export const UserProfileDetails = ({ loggedInUser }) => {
    const [user, setUser] = useState(null)

    const {id} = useParams()

    useEffect(() => {
        getUserProfile(id).then(setUser)
    }, [])
    
    if (!user) {
        return (<>Loading...</>)
    }

    return (
        <div className="d-flex flex-column align-items-center gap-3 pt-3 mb-5">
            <div className="w-75">
                <h1>{`${user.firstName} ${user.lastName}`}</h1>
                <p><b>Address:</b> {user.address}</p>
            </div>
            <div className="w-75">
                <h3>Assigned Chores</h3>
            </div>
            {user.choreAssignments.map(ca => {
                return (
                    <Card className={"w-75"} key={`ca-${ca.id}`}>
                        <CardHeader>
                            <CardTitle>{ca.chore.name}</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <CardText>{`Difficulty: ${ca.chore.difficulty}`}</CardText>
                            <CardText>{`Repeat Every ${ca.chore.choreFrequencyDays} Days`}</CardText>
                        </CardBody>
                    </Card>
                )
            })}
            <div className="w-75">
                <h3>Completed Chores</h3>
            </div>
            {user.choreCompletions.map(cc => {
                return (
                    <Card className={"w-75"} key={`cc-${cc.id}`}>
                        <CardHeader>
                            <CardTitle>{cc.chore.name}</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <CardText>{`Difficulty: ${cc.chore.difficulty}`}</CardText>
                            <CardText>{`Repeat Every ${cc.chore.choreFrequencyDays} Days`}</CardText>
                            <CardText>{`Completed On: ${cc.completedOn}`}</CardText>
                        </CardBody>
                    </Card>
                )
            })}
        </div>
    )
}