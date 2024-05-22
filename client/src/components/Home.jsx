import { Card, CardBody, CardHeader, CardText } from "reactstrap"

export const Home = ({ loggedInUser }) => {
    if (!loggedInUser) {
        return <>Loading</>
    }
    
    return (
        <div>
            <Card className="w-50 position-absolute top-50 start-50 translate-middle">
                <CardHeader>
                    <CardText className="fw-bold fs-2">
                        Welcome {loggedInUser.firstName}
                    </CardText>
                </CardHeader>
                <CardBody>You should get to your chores!</CardBody>
            </Card>
        </div>
    )
}

export default Home