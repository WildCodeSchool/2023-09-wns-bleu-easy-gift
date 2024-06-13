import { useOnNewDiscussionSubscription } from '@/graphql/generated/schema';

function NewDiscussionComponent() {
  const { data } = useOnNewDiscussionSubscription();
  console.log('data', data);

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error: {error.message}</p>;

  return <div>{/* <h4>New Discussion: {data.newDiscussion.name}</h4> */}</div>;
}

export default NewDiscussionComponent;
