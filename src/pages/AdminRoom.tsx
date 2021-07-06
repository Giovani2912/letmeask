import {useHistory, useParams} from 'react-router-dom'
// import {useState, FormEvent, useContext} from 'react'
import logoImg from '../assets/images/logo.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import {RoomCode} from '../components/RoomCode'
import '../styles/room.scss';
// import { AuthContext } from '../contexts/AuthContext';
import { QuestionComponent } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import deleteImg from '../assets/images/delete.svg'
import { database } from '../services/firebase';
 
type RoomParams = {
    id: string;
}

export function AdminRoom(){
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const {title, questions} = useRoom(roomId)

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({endendAt: new Date(),})    

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Tem certeza que deseja excluir essa pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
        
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button 
                            isOutlined
                            onClick={handleEndRoom}
                            >
                                Encerrar a sala
                        </Button>
                    </div>

                </div>
            </header>
            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>


                {questions.map(questions => {
                    return(
                        <QuestionComponent
                        key={questions.id}
                        content={questions.content}
                        author={questions.author}
                        isAnswered={questions.isAnswered}
                        isHighlighted={questions.isHighlighted}
                        >
                            {!questions.isAnswered && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => handleCheckQuestionAsAnswered(questions.id)}
                                    >
                                        <img src={checkImg} alt="marcar" />
                                    </button>
                                    
                                    <button
                                        type="button"
                                        onClick={() => handleHighlightQuestion(questions.id)}
                                    >
                                        <img src={answerImg} alt="destacar" />
                                    </button>
                                        </>
                            )} 
 
                            <button
                                type="button"
                                onClick={() => handleDeleteQuestion(questions.id)}
                            >
                                <img src={deleteImg} alt="remover" />
                            </button>
                        </QuestionComponent>
                    );
                })}
            </main>
        </div>
    );
}