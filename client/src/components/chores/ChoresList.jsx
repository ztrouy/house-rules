import { useEffect, useState } from "react"
import { deleteChore, getChores } from "../../managers/choreManager.js"
import { Button, Card, CardBody, CardFooter, CardText, CardTitle } from "reactstrap"
import { useNavigate } from "react-router-dom"
import PageContainer from "../PageContainer.jsx"

export const ChoresList = ({ loggedInUser }) => {
    const [chores, setChores] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        getChores().then(setChores)
    }, [])

    const handleDeleteBtn = (id) => {
        deleteChore(id).then(() => {
            getChores().then(setChores)
        })
    }
    
    if (!chores) {
        return (<>Loading...</>)
    }
    
    return (
        <PageContainer>
            <div className="w-75 d-flex gap-3">
                <h1>Chores</h1>
                {loggedInUser.roles.includes("Admin") && (
                    <div className="d-flex align-items-center">
                        <Button onClick={() => navigate("new")}>New Chore</Button>
                    </div>
                )}
            </div>
            {chores.map(c => {
                return (
                    <Card className="w-75" key={`c-${c.id}`}>
                        <CardBody>
                            <CardTitle className="fw-bold fs-2">{c.name}</CardTitle>
                            <CardText>Difficulty: {c.difficulty}</CardText>
                            <CardText>Repeat Every {c.choreFrequencyDays} Days</CardText>
                        </CardBody>
                        {loggedInUser.roles.includes("Admin") && (
                            <CardFooter className="d-flex flex-row-reverse gap-2">
                                <Button onClick={() => handleDeleteBtn(parseInt(c.id))}>Delete</Button>
                                <Button onClick={() => navigate(`${c.id}`)}>Details</Button>
                            </CardFooter>
                        )}
                    </Card>
                )
            })}
        </PageContainer>
    )
}

export default ChoresList