import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Bubble, BubbleContent } from "../../../components/ui/bubble"
import { Message, MessageAvatar, MessageContent } from "../../../components/ui/message"

const MessageSection = () => {
  return (
    <Message>
    <MessageAvatar>
        <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    </MessageAvatar>
    <MessageContent>
        <Bubble>
        <BubbleContent className="text-blue-400">How can I help you today?</BubbleContent>
        </Bubble>
    </MessageContent>
    </Message>
  )
}

export default MessageSection
