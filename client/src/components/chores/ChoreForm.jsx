import { useEffect, useState } from "react"
import { Button, Form, FormGroup, Input, Label, Toast, ToastBody, ToastHeader } from "reactstrap"
import { createChore } from "../../managers/choreManager.js"
import { useNavigate } from "react-router-dom"
import PageContainer from "../PageContainer.jsx"

export const ChoreForm = ({ loggedInUsers }) => {
    const [name, setName] = useState("")
    const [difficulty, setDifficulty] = useState(0)
    const [frequency, setFrequency] = useState(0)
    const [errors, setErrors] = useState({})
    const [toastState, setToastState] = useState(false)
    
    const navigate = useNavigate()

    useEffect(() => {
        if (errors.hasOwnProperty("Name") || errors.hasOwnProperty("Difficulty") || errors.hasOwnProperty("ChoreFrequencyDays")) {
            setToastState(true)
            setTimeout(() => {
                setToastState(false)
            }, 5000)
        }
    }, [errors])

    const handleSubmit = (event) => {
        event.preventDefault()
        const newChore = {
            name: name,
            difficulty: difficulty,
            choreFrequencyDays: frequency
        }

        createChore(newChore).then(res => {
            if (res.errors) {
                setErrors(res.errors)
            } else {
                navigate("/chores")
            }
        })
    }

    const toggleToast = () => {
        setToastState(!toastState)
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
            <Toast isOpen={toastState} className="position-absolute top-0 end-0 m-4">
                <ToastHeader toggle={() => toggleToast()}>Error!</ToastHeader>
                <ToastBody className="color-red">
                    {Object.keys(errors).map(key => (
                        <p key={key}>
                            {key}: {errors[key].join(",")}
                        </p>
                    ))}
                </ToastBody>
            </Toast>
        </PageContainer>
    )
}

export default ChoreForm