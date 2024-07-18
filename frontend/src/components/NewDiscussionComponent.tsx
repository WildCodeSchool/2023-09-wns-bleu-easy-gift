import {
  useGetMessagesByDisscutionQuery,
  useAddNewMessageSubscription,
  GetMessagesByDisscutionQuery,
  useCreateMessageMutation,
} from '@/graphql/generated/schema';
import { useState, useEffect } from 'react';

function NewDiscussionComponent() {
  const [messages, setMessages] = useState<
    GetMessagesByDisscutionQuery['getMessagesByDisscution']
  >([]);
  const [content, setContent] = useState('');

  const { data, loading, error } = useGetMessagesByDisscutionQuery({
    variables: {
      discussionId: 1,
    },
  });
  const { data: subscriptionData } = useAddNewMessageSubscription({
    variables: {},
  });

  const [createMessage] = useCreateMessageMutation();

  const handleSendMessage = async () => {
    try {
      await createMessage({
        variables: {
          discussionId: 1,
          userId: 3,
          content,
        },
      });
      setContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (data?.getMessagesByDisscution) {
      setMessages(data.getMessagesByDisscution);
    }
  }, [data]);

  useEffect(() => {
    if (subscriptionData) {
      const newMessage = subscriptionData.newMessage;
      setMessages((prevMessages) => {
        if (!prevMessages.find((message) => message.id === newMessage.id)) {
          return [...prevMessages, newMessage];
        }
        return [...prevMessages];
      });
    }
  }, [subscriptionData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h4>New Discussion:</h4>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <p>{message.content}</p>
            <small>By: {message.user.id}</small>
            <small>At: {message.created_at}</small>
          </li>
        ))}
      </ul>
      <div>
        <input
          type='text'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default NewDiscussionComponent;
