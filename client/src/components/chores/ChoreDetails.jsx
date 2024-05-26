import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { assignChore, getChore, unassignChore } from "../../managers/choreManager.js"
import { getUserProfiles } from "../../managers/userProfileManager.js"
import { Card, CardBody, CardText, CardTitle, Input, Label } from "reactstrap"
import PageContainer from "../PageContainer.jsx"

export const ChoreDetails = ({ loggedInUser }) => {
    const [chore, setChore] = useState(null)
    const [users, setUsers] = useState(null)

    const {id} = useParams()

    useEffect(() => {
        getChore(id).then(setChore)
        getUserProfiles().then(setUsers)
    }, [])

    const handleCheck = (event) => {
        const userId = event.target.value
        const isAssigned = chore.choreAssignments.some(ca => ca.userProfileId == userId)
        
        if (isAssigned) {
            unassignChore(chore.id, userId).then(() => {
                getChore(id).then(setChore)
            })
        } else {
            assignChore(chore.id, userId).then(() => {
                getChore(id).then(setChore)
            })
        }
    }
    
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
            <div className="w-75 d-flex gap-3">
                {users.map(u => {
                    let isChecked = false
                    if (chore.choreAssignments.some(ca => ca.userProfileId == u.id)) {
                        isChecked = true
                    }
                    
                    return (
                        <div key={`up-${u.id}`}>
                            <Label>{`${u.firstName} ${u.lastName}`}</Label>
                            <Input 
                                type="checkbox"
                                checked={isChecked}
                                value={u.id}
                                onChange={handleCheck}
                            />
                        </div>
                    )
                })}
            </div>
            <div className="w-75">
                <h3>Recent Completion</h3>
            </div>
            {chore.mostRecentCompletion ? (
                <Card className="w-75" key={`cc-${chore.mostRecentCompletion.id}`}>
                    <CardBody>
                        <CardTitle className="fs-2 fw-bold">
                            {`${chore.mostRecentCompletion.userProfile.firstName} ${chore.mostRecentCompletion.userProfile.lastName}`}
                        </CardTitle>
                        <CardText>{chore.mostRecentCompletion.completedOn}</CardText>
                    </CardBody>
                </Card>
            ) : (
                <p><i><b>This Chore has never been completed!</b></i></p>
            )}
        </PageContainer>
    )
}

export default ChoreDetails