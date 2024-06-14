import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";

/*
function MyGroups({
  groupCards,
}: {
  groupCards: {
    _typename?: "userGroup" | undefined;
    group_title: string,
  }
}) {
  return (
    <div>
      {groupCards?.map((card) => (

      ))}
    </div>
  )
}

export default MyGroups;

 */

function MyGroups() {
  return (
    <div className="flex flex-col sm:flex-col justify-center items-center gap-8 md:flex-row md:flex-wrap">
      <Card className="w-80 shadow-lg hover:scale-110 shadow-slate-300 hover:-translate-x-8 transition-transform duration-300 ease-in-out flex-grow md:max-w-[318px] md:shadow-slate-400">
        <CardHeader
          className="bg-white shadow-sm h-350
        rounded-t-lg
        "
        >
          <img src="/images/avatar/group_bday7.png" alt="" className="w-full h-full object-cover rounded-t-lg mb-4" />
          <CardTitle className="font-bold text-2xl">Channiversaire</CardTitle>
        </CardHeader>
        <CardContent className=""></CardContent>
      </Card>
      <Card className="w-80 shadow-lg hover:scale-110 shadow-slate-300 transition-transform duration-300 ease-in-out flex-grow md:max-w-[318px] md:shadow-slate-400">
        <CardHeader
          className="bg-white shadow-sm h-350
        rounded-t-lg"
        >
          <img src="/images/avatar/group_xmas4.png" alt="" className="w-full h-full object-cover rounded-t-lg mb-4" />
          <CardTitle className="font-bold text-xl mb-2">Secret Santa 2024</CardTitle>
        </CardHeader>
        <CardContent className=""></CardContent>
      </Card>
      <Card className="w-80 shadow-lg hover:scale-110 shadow-slate-300 hover:translate-x-8 transition-transform duration-300 ease-in-out flex-grow md:max-w-[318px] md:shadow-slate-400">
        <CardHeader
          className="bg-white shadow-sm h-350
        rounded-t-lg"
        >
          <img src="/images/avatar/profil_ghibli2.png" alt="" className="w-full h-full object-cover rounded-t-lg mb-4" />
          <CardTitle className="font-bold text-xl mb-2">Cousinade</CardTitle>
        </CardHeader>
        <CardContent className=""></CardContent>
      </Card>
    </div>
  );
}

export default MyGroups;
