import { useGetMessagesByDisscutionQuery } from '@/graphql/generated/schema';

function NewDiscussionComponent() {
  const { data, loading, error } = useGetMessagesByDisscutionQuery({
    variables: {
      discussionId: 1,
    },
  });
  console.log('data', data?.getMessagesByDisscution);
  console.log('WebSocket subscription data:', data);
  console.log('WebSocket subscription loading:', loading);
  console.log('WebSocket subscription error:', error);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h4>New Discussion:</h4>
      <ul>
        {data?.getMessagesByDisscution.map((message) => (
          <li key={message.id}>
            <p>{message.content}</p>
            <small>By: {message.user.id}</small>
            <small>At: {message.created_at}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewDiscussionComponent;
