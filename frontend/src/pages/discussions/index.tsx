import MenuDiscussions from "@/components/discussions/Menu-discussions";
import EspaceDiscussion from "@/components/discussions/espace-discussion";

const DiscussionsPage = () => {
  return (
    <>
      <section className="w-full h-[92vh] flex flex-col overflow-y-auto md:h-full md:flex md:flex-row">
        <MenuDiscussions />
        <EspaceDiscussion />
      </section>
    </>
  );
}

export default DiscussionsPage;
