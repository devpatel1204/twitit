import { Form, Row, Col, Button } from 'react-bootstrap';
import {useState} from 'react';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { add_question } from '../services/service';
import { LoginContext } from '../controller/loginstate';
import { GiEclipseFlare } from 'react-icons/gi';
let count=140;
const AddQuestion = () => {

    const {account, setAccount} = useContext(LoginContext);

    const questionInitialValues = {
        content: '',
        usernameQ: account
    };

    const [question, setquestion] = useState(questionInitialValues);

    const onInputChange = (e) => { 
        count=140-question.content.length;
        if(question.content.length < 140)
        {  
            setquestion({ ...question, [e.target.name]: e.target.value });
        }
        else 
        {   
            e.target.value=e.target.value.substring(0, 140);
           

            setquestion({ ...question, [e.target.name]: e.target.value });
        }
    }

    const history = useHistory();
    
    const clickHandler = async () => {
        console.log(question);
        let response = await add_question(question);
        if(!response) {
            alert("invalid question");
            setquestion({ ...question, content: ''});
            return;  
        }
        console.log(questionInitialValues);
        setquestion(questionInitialValues);
    }

    return (
        <div style={{ display: 'block', 
        width: '100%',
        margin: '50px auto',
        borderRadius: '5px',
        background: 'rgba(255,255,255, 0.15)',
        padding: 80,
        }} className="col-8">
            <h4 style={{color: '#ffffff', display:'flex', justifyContent: "center", alignItems: "center", marginBottom: 20}}>
            Add Your Twit Here
            </h4>
            <Form className="my-4">
                
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: '#ffffff'}}>
                            <span>Add Your Twit</span>
                        </Form.Label>
                        <Form.Control maxLength="141" onChange={(e) => onInputChange(e)} value={question.content} name="content" as="textarea" placeholder="enter the question"/>
                    </Form.Group>
                </Row>
                <p> remaining words {count} </p>
                <Button size="lg" variant="outline-dark" style={{color:'black'}} onClick={() => clickHandler()} style={{marginLeft: '45%', marginTop: 40}}>
                    Submit
                </Button>
            </Form>
        </div>
    ) 
}

export default AddQuestion;