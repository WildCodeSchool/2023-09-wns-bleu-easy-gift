import MenuDiscussions from "@/components/discussions/Menu-discussions";
import EspaceDiscussion from "@/components/discussions/espace-discussion";

const DiscussionsPage = () => {
  return (
    <>
      <section className="w-full max-h-[93vh] h-screen flex flex-col overflow-y-auto md:flex-grow md:flex md:flex-row">
        <MenuDiscussions />
        <EspaceDiscussion />
      </section>
    </>
  );
}

export default DiscussionsPage;
