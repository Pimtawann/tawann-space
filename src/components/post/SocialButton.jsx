import buildShareUrls from "@/lib/ShareUrls";
import { Facebook, Linkedin, Twitter } from 'lucide-react';


export default function SocialButton(props) {
  const links = buildShareUrls({ url: props.url , title: props.title });
  const item =
    "grid h-[47px] w-[47px] place-items-center rounded-full hover:opacity-80";
  return (
    <div className="flex items-center gap-3 md:gap-2">
      <a
        className={`${item} bg-[#1877F2]`}
        href={links.facebook}
        target="_blank"
        rel="noreferrer"
        aria-label="Share to Facebook"
      >
        <Facebook fill="#efeeeb" size={24} strokeWidth={2.25} absoluteStrokeWidth className="text-[#efeeeb]"/>
      </a>
      <a
        className={`${item} bg-[#0A66C2]`}
        href={links.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label="Share to LinkedIn"
      >
        <Linkedin fill="#efeeeb" size={24} strokeWidth={2.25} absoluteStrokeWidth className="text-[#efeeeb]"/>
      </a>
      <a
        className={`${item} bg-[#1DA1F2]`}
        href={links.twitter}
        target="_blank"
        rel="noreferrer"
        aria-label="Share to X"
      >
        <Twitter fill="#efeeeb" size={24} strokeWidth={2.25} absoluteStrokeWidth className="text-[#efeeeb]"/>
      </a>
    </div>
  );
}
