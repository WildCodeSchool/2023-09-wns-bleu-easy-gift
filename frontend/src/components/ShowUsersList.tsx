export default function ShowUsersList({
  users,
}: {
  users: {
    __typename?: "User" | undefined;
    id: number;
    pseudo: string;
    email: string;
    avatar?: { __typename?: "Avatar" | undefined; url: string } | null | undefined;
  }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-green-700">Liste des utilisateurs</h2>

      {users.map((user) => (
        <div key={user.id} className="flex items-center">
          {user.avatar && <img src={user.avatar.url} alt={`Avatar de ${user.pseudo}`} className="w-10 h-10 rounded-full mr-2" />}
          <div>
            {user.id} {user.pseudo} {user.email}
          </div>
        </div>
      ))}
    </div>
  );
}
