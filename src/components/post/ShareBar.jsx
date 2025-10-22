import ReactionPill from "./ReactionPill";
import CopyLinkButton from "./CopyLinkButton";
import SocialButton from "./SocialButton";

export default function ShareBar(props) {
  return (
    <section className="bg-[#efeeeb] p-4 md:p-5 md:rounded-2xl">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
        <div className="relative w-full">
          <ReactionPill
            initial={props.reactions ?? 0}
            className="mx-auto w-full max-w-[360px] justify-center"
          />
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <div className="flex  w-full md:w-auto items-center justify-between">
            <CopyLinkButton url={props.url} />
          </div>
          <div className="flex md:w-full">
            <SocialButton url={props.url} title={props.title} />
          </div>
        </div>
      </div>
    </section>
  );
}
