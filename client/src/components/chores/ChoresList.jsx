import { useEffect, useState } from "react"
import { deleteChore, getChores } from "../../managers/choreManager.js"
import { Button, Card, CardBody, CardFooter, CardText, CardTitle } from "reactstrap"

export const ChoresList = ({ loggedInUser }) => {
    const [chores, setChores] = useState(null)

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
        <div className="d-flex flex-column align-items-center gap-3 pt-3 mb-5">
            <div className="w-75">
                <h1>Chores</h1>
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
                            <CardFooter className="d-flex flex-row-reverse">
                                <Button onClick={() => handleDeleteBtn(parseInt(c.id))}>Delete</Button>
                            </CardFooter>
                        )}
                    </Card>
                )
            })}
        </div>
    )
}

export default ChoresList