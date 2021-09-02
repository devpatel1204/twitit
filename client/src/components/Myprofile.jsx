import { Col, Row, Card, Spinner, Button, Container } from 'react-bootstrap';
import { useEffect, useState, useContext} from 'react';
import {FaRegQuestionCircle} from 'react-icons/fa';
import axios from 'axios';
import { LoginContext } from '../controller/loginstate';
import AddAnswer from './AddAnswer';
import SeeAnswer from './AnswerList';
import EditQuestion from './EditQuestion';
const url = 'http://localhost:5000/api';

const Myprofile=()=>{
    var [ questiondata, setQuestiondata ] = useState([]);

    const {account, setAccount} = useContext(LoginContext);
    console.log(account);
    const [ clickdone, setClickdone ] = useState("false");

    const [ clickquestionid, setClickquestionid ] =  useState();

    const questionSaver = async () => {
        try {
            await axios.get(`${url}/question/search`)
            .then ((res) => {
                console.log(res.data);
                setQuestiondata(questiondata => ([...questiondata, res.data]));
            })
        }catch(err) {
            console.log('Error while finding User',err);
        }
    }


    useEffect(() => {
        questionSaver();
    }, [clickdone])


    return (
     
        <div>
        {     
            
            (clickdone === "false"  ) ? 
            <div>
            {  
                <Row xs={1} md={1} className="g-4" style={{margin: '3% 3%'}}>
                {
                    (questiondata[0] === undefined)?
                        <div></div>:
                        questiondata[0].map((question, index) => (
                            (question.usernameQ===account) ?
                            <div>
                            <Col className = "mb-3">
                                <Card style = {{backgroundColor: 'rgba(255,255,255, 0.15)', color: '#ffffff', borderWidth: '2px' , borderBlockColor:'orange'}}>
                                    <Card.Body> 
                                       
                                        <Card.Text>
                                            <span style={{color:'teal', fontWeight:600}}>Twit: </span>{question.content}
                                            <br/>
                                            
                                        </Card.Text>
                                        <div className="d-flex justify-content-around">
                                            <Button variant="outline-warning" size="sm" id="seeanswer" onClick={() => {setClickdone("seeanswer"); setClickquestionid(question)}}>
                                                Comments
                                            </Button>
                                            
                                            <Button variant="outline-primary" style={{color:'white'}} size="sm" id="editquestion" onClick={() => {setClickdone("editquestion"); setClickquestionid(question)}}>
                                                Edit Twit
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col></div>:<div></div>
                        ))
                }
                </Row>
            }
            </div>
            :
            <div>
            {
                (clickdone === "seeanswer")?
                <div>
                    <SeeAnswer question={clickquestionid} />
                </div>
                : 
                <div>
                {
                    (clickdone === "addanswer")?
                    <div>
                        <AddAnswer question={clickquestionid._id} />
                    </div>
                    :
                    <div>
                        <EditQuestion question={clickquestionid} />
                    </div>
                }
                </div>
            }
                <div className="d-flex justify-content-center">
                    <Button variant="outline-light" style={{color:'orange'}} size="lg" id="addanswer" onClick={() => {setClickdone("false"); questionSaver(); setQuestiondata([])}}>
                       Home page
                    </Button>
                </div>
            </div>
        }
        </div>
    )

}

export default Myprofile;