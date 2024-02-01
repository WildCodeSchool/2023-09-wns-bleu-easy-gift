import React from 'react';
import { useUsersQuery } from '@/graphql/generated/schema';

const { loading, data, error } = useUsersQuery();

// export type RecentAd = {
//   id: number;
//   title: string;
//   price: number;
//   picture: string;
// };

console.log(data);

<section className="">
        {users.map((user) => (
          <AdCard key={user.id} user={user} link={/users/${user.id}} />
        ))}
      </section>

export default function RecentAds() {
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const users = data?.users || [];

  return (
    <div className="">
      <h2 className="">Liste des utilisateurs</h2>


      
    </div>
  );
}
