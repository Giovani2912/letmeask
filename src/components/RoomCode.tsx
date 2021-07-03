import copyImg from '../assets/images/copy.svg'
import '../styles/room-code.scss'
import {toast, Toaster} from 'react-hot-toast'

type RoomCodeProps = {
    code: string;
}


export function RoomCode(props: RoomCodeProps){

    async function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code)
        toast.success('Copied!')        
    }

    return(
        <div>
            <Toaster 
            position="top-center"
            reverseOrder={false}
            />
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
        
        </div>
    );
}