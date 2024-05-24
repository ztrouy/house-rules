import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getChore } from "../../managers/choreManager.js"
import { getUserProfiles } from "../../managers/userProfileManager.js"
import { Card, CardBody, CardText, CardTitle } from "reactstrap"
import PageContainer from "../PageContainer.jsx"

export const ChoreDetails = ({ loggedInUser }) => {
    const [chore, setChore] = useState(null)
    const [users, setUsers] = useState(null)

    const {id} = useParams()

    useEffect(() => {
        getChore(id).then(setChore)
        getUserProfiles().then(setUsers)
    }, [])
    
    if (!chore || !users) {
        return (<>Loading...</>)
    }

    return (
        <PageContainer>
            <div className="w-75">
                <h1>{chore.name}</h1>
                <div className="d-flex gap-5">
                    <div>Difficulty: {chore.difficulty}</div>
                    <div>Repeat Every {chore.choreFrequencyDays} Days</div>
                </div>
            </div>
            <div className="w-75">
                <h3>Assigned Users</h3>
            </div>
            {chore.choreAssignments.length > 0 ? (users.map(u => {
                if (chore.choreAssignments.find(ca => ca.userProfileId == u.id)) {
                    return (
                        <Card className="w-75" key={`u-${u.id}`}>
                            <CardBody>
                                <CardTitle className="fs-2 fw-bold">{`${u.firstName} ${u.lastName}`}</CardTitle>
                            </CardBody>
                        </Card>
                    )
                }
            })) : (
                <p><i><b>No one is assigned this Chore!</b></i></p>
            )}
            <div className="w-75">
                <h3>Recent Completion</h3>
            </div>
            {chore.choreCompletions.length > 0 ? (
                <Card className="w-75" key={`cc-${chore.choreCompletions[0].id}`}>
                    <CardBody>
                        <CardTitle className="fs-2 fw-bold">
                            {`${chore.choreCompletions[0].userProfile.firstName} ${chore.choreCompletions[0].userProfile.lastName}`}
                        </CardTitle>
                        <CardText>{chore.choreCompletions[0].completedOn}</CardText>
                    </CardBody>
                </Card>
            ) : (
                <p><i><b>This Chore has never been completed!</b></i></p>
            )}
        </PageContainer>
    )
}

export default ChoreDetails