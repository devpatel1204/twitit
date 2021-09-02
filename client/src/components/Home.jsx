import { Col, Row, Card, Spinner, Button, Container } from 'react-bootstrap';
import {FaRegQuestionCircle} from 'react-icons/fa';
import axios from 'axios';
import { LoginContext } from '../controller/loginstate';
import AddAnswer from './AddAnswer';
import EditQuestion from './EditQuestion';
import SeeAnswer from './AnswerList';
import { useEffect, useState, useContext} from 'react';

import {CgProfile,AiOutlineLike} from 'react-icons/all';
import {FaRegComment} from 'react-icons/all';
const url = 'http://localhost:5000/api';

const Home = () => {
    
    var [ questiondata, setQuestiondata ] = useState([]);

    const {account, setAccount} = useContext(LoginContext);

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

console.log("-->quedata",questiondata);
    return (
        <div>
        {
            (clickdone === "false") ? 
            <div>
            {
                // component for all the questions output
                <Row xs={1} md={1} className="justify-content-center" style={{marginLeft: '32%'}}>
                {
                    (questiondata[0] === undefined)?
                        <div></div>:
                        questiondata[0].map((question, index) => (
                            <Col className = "mb-3">
                                <Card  style = {{backgroundColor: 'white', height:300,width:500, color: '#ffffff', borderWidth: '2px' , borderBlockColor:'orange'}}>
                                    <Card.Body> 
                                        <Card.Text>
                                       
                                           <span style={{color:'black', fontWeight:600, display:'flex'}}><h4> <CgProfile style={{color:'black'}}></CgProfile>   {question.usernameQ}</h4> </span>
                                         
                                         <span style={{color:'#1DA1F2'}}>{question.content}</span>
                                            
                                            
                                        </Card.Text>
                                        <div className="d-flex justify-content-around" style={{marginTop:70}}>
                                            <Button variant="primary" size="sm" id="seeanswer" onClick={() => {setClickdone("seeanswer"); setClickquestionid(question)}}>
                                                <FaRegComment></FaRegComment>
                                            </Button>
                                            <Button variant="secondary"size="sm" id="addanswer" onClick={() => {setClickdone("addanswer"); setClickquestionid(question)}}>
                                                Add comments
                                            </Button>
                                        
                                           
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
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


export default Home;