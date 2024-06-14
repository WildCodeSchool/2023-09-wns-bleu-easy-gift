export default function GroupCard({
  group,
}: {
  group: {
    __typename?: "Group" | undefined;
    id: number;
    name: string;
    avatar?:
      | {
          __typename?: "Avatar" | undefined;
          url: string;
          name: string;
          id: number;
        }
      | null
      | undefined;
    userToGroups?: [] | null | undefined;
  }[];
}) {
  return (
    <div key={group.id}>
      <p>{group.name}</p>
      <img
        src={group.avatar.url}
        className="w-32 h-32"
        alt="Avatar for the group"
      />
    </div>
  );
}
