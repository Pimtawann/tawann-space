import ReactionPill from "./ReactionPill";
import CopyLinkButton from "./CopyLinkButton";
import SocialButton from "./SocialButton";

function ShareBar(props) {
  return (
    <section className="bg-[#efeeeb] p-4 md:p-5 md:rounded-2xl">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
        <div className="relative w-full">
          <ReactionPill
            initial={props.reactions ?? 0}
            className="mx-auto w-full max-w-[360px] justify-center"
          />
        </div>
        <div className="flex w-full gap-2">
          <div className="flex w-full items-center justify-between gap-4">
            <CopyLinkButton url={props.url} />
          </div>
          <div>
            <SocialButton url={props.url} title={props.title} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShareBar;
