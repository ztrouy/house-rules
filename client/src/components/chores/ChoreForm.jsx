import { useState } from "react"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { createChore } from "../../managers/choreManager.js"
import { useNavigate } from "react-router-dom"
import PageContainer from "../PageContainer.jsx"

export const ChoreForm = ({ loggedInUsers }) => {
    const [name, setName] = useState("")
    const [difficulty, setDifficulty] = useState(0)
    const [frequency, setFrequency] = useState(0)
    
    const navigate = useNavigate()

    const handleSubmit = () => {
        const newChore = {
            name: name,
            difficulty: difficulty,
            choreFrequencyDays: frequency
        }

        createChore(newChore).then(() => {
            navigate("/chores")
        })
    }

    return (
        <PageContainer>
            <div className="w-75">
                <h1>New Chore</h1>
            </div>
            <Form className="w-75">
                <FormGroup>
                    <Label>Name of the Chore</Label>
                    <Input 
                        type="text"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Difficulty of the Chore (1-5)</Label>
                    <Input 
                        type="number"
                        value={difficulty}
                        onChange={event => setDifficulty(parseInt(event.target.value))}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>This Chore Should be Done Every How Many Days?</Label>
                    <Input 
                        type="number"
                        value={frequency}
                        onChange={event => setFrequency(parseInt(event.target.value))}
                    />
                </FormGroup>
                <Button onClick={handleSubmit}>Submit</Button>
            </Form>
        </PageContainer>
    )
}

export default ChoreForm