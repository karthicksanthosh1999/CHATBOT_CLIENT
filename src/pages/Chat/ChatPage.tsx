import { useParams } from "react-router-dom"
import MessageSection from "./_components/message-section";

const ChatPage = () => {
    const { id } = useParams();
  return (
    <div >
      <MessageSection />
    </div>
  )
}

export default ChatPage
