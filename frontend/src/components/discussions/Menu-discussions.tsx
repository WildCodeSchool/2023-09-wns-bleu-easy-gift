// import { useRouter } from "next/router";
import { use } from "react";
import { useGetGroupByIdQuery } from "@/graphql/generated/schema";

const MenuDiscussions = () => {
  /* const router = useRouter();
  const groupId = Number(router.query.groupId)
  const { data, loading, error } = useGetGroupByIdQuery({
    variables: { groupId },
  });

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Oups, une erreur est survenue</div>;
  if (!data || !data.getGroupById) {
    return <div>Groupe introuvable</div>;
  }
  const group = data.getGroupById;
  */

  const group = {
    "id": 1,
    "name": "chat",
    "userToGroups": [
      {
        "user": {
          "pseudo": "Pierre",
          "avatar": {
            "url": "https://ucarecdn.com/bb05bd7d-e0cc-49b1-867b-36aa9ff245f2/-/preview/1000x1000/"
          },
          "id": 1
        }
      },
      {
        "user": {
          "pseudo": "Dorothée",
          "avatar": {
            "url": "https://ucarecdn.com/74347f17-c04e-4e57-aafd-fc518ebd332e/-/preview/1000x1000/"
          },
          "id": 8
        }
      },
      {
        "user": {
          "pseudo": "Alliaume",
          "avatar": {
            "url": "https://ucarecdn.com/4efb4fd3-382c-4734-86ae-23eb62594036/-/preview/1000x1000/"
          },
          "id": 7
        }
      },
      {
        "user": {
          "pseudo": "Guilhemine",
          "avatar": {
            "url": "https://ucarecdn.com/f3546ab4-0edd-4470-90b9-f604c84266e1/-/preview/1000x1000/"
          },
          "id": 9
        }
      },
      {
        "user": {
          "pseudo": "Cyriaque",
          "avatar": {
            "url": "https://ucarecdn.com/beb1818b-3726-4a90-9db0-563b8a2671c1/-/preview/1000x1000/"
          },
          "id": 11
        }
      },
      {
        "user": {
          "pseudo": "Chilpéric",
          "avatar": {
            "url": "https://ucarecdn.com/9dab743e-7860-4603-850f-64e5c344ae1a/-/preview/1000x1000/"
          },
          "id": 10
        }
      }
    ]
  }

  return (
    <nav className="bg-slate-200 w-full h-full pt-5 pb-6 flex  flex-col justify-start md:pb-6 md:w-5/12 md:max-w-screen-sm md:h-auto md:justify-between md:overflow-y-auto md:shadow-[-11px_6px_21px_3px_theme(colors.slate.500)] lg:justify-start">
      <div className="w-4/5 mx-auto h-36 flex flex-shrink-0 flex-wrap justify-between items-center md:min-h-40">
        <div className="basis-5/6 flex justify-start items-center h-14">
          <img src="/images/avatar/group_xmas8.png" alt="" className="w-14 h-14 rounded-sm" />
          <h1 className="text-4xl md:text-5xl 2xl::text-6xl font-bold text-primaryBlue inline-block
          ml-4 self-end">
            Noël
          </h1>
        </div>
        <div className="h-12 self-end">
          <button type="button" className="w-8 h-8 shadow-lg lg:duration-150 lg:hover:scale-125">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="w-full h-full bg-white text-primaryBlue rounded-md">
              <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1" />
            </svg>
          </button>
        </div>
        <div className="basis-full h-11">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="absolute ml-3 mt-3.5 z-10 text-slate-500">
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
          </svg>
          <input type="search" className="w-full h-full rounded-3xl shadow-lg pl-9 outline-slate-200 outline-2 outline" placeholder="Pour trouver tes copains... c'est ici" />
        </div>
      </div>
      <ul className="w-4/5 max-h-[68vh] min-h-0 overflow-y-auto mx-auto flex flex-col flex-grow flex-shrink justify-evenly max-w-96 pt-3 md:h-auto md:min-h-auto md:max-h-none md:flex-grow lg:max-h-[45rem]">
        {group.userToGroups.map((userToGroup, index) => (
          <li
            className={`w-full h-16 rounded-full ${index === 0 ? "bg-red400 shadow-md border-red500 md:mb-12" : "bg-blue200 focus:border-2 focus:border-primaryBlue"
              } pl-4 pr-6 py-2 mb-4`}
            key={userToGroup.user.id}
          >
            <a className="h-full flex items-center justify-start" href="/">
              <div className="relative mr-3 w-12 h-12">
                <img
                  src={index === 0 ? "/images/avatar/profil_girafe.png" : userToGroup.user.avatar?.url}
                  className={`absolute inset-0 w-12 h-12 rounded-full mr-2 border-solid border-4 ${index === 0 ? "border-red500" : "border-primaryBlue"
                    }`}
                  alt="Avatar of the user"
                />
              </div>
              <div className="self-start flex flex-wrap w-3/4">
                <h2 className={`text-xl ${index === 0 ? "text-white" : "text-primaryBlue font-semibold"}`}>
                  {userToGroup.user.pseudo}
                </h2>
                <p className={`truncate text-sm ${index === 0 ? "text-white" : "text-primaryBlue"} font-semibold w-min`}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div className="w-4/5 mx-auto self-start flex flex-grow justify-end items-start shadow-[1px_-7px_8px_-8px_theme(colors.slate.400)] md:shadow-none">
        <div className="flex justify-end mt-4 lg:self-end">
          <img src="" alt="" />
          <p className="text-2xl font-bold text-red400 cursor-pointer lg:transition lg:duration-150 lg:hover:scale-125 lg:hover:translate-x-[-15px] ">Quitter Nöel</p>
          <button type="button" className="ml-4 lg:duration-100 lg:hover:scale-125" onClick={() => router.push("/groupes")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left text-red400 w-8 h-8" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
              <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
            </svg>
          </button>
        </div>
        <div>
        </div>
      </div>
    </nav>
  );
}

export default MenuDiscussions;

