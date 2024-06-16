import MenuDiscussions from "@/components/discussions/Menu-discussions";
import EspaceDiscussion from "@/components/discussions/espace-discussion";

const DiscussionsPage = () => {
  return (
    <>
      <section className="h-full flex md:min-h-160">
        <MenuDiscussions />
        <EspaceDiscussion />
      </section>
    </>
  );
}

export default DiscussionsPage;
