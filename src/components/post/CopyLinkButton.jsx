import { toast } from "sonner";
import { Copy } from 'lucide-react';

export default function CopyLinkButton (props) {
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(props.url);
            toast.success("Copied! this article has been copied to your clipboard.");
        } catch {
            toast.error("Copy failed. Please try again.")
        }
    }
    
    return (
        <button
        onClick={copy}
        className="flex item-center gap-2 justify-center rounded-full w-[170px] md:w-[140px] h-[47px] border border-brown-6 px-4 py-2.5 font-medium bg-white hover:bg-brown-2 cursor-pointer"
        >
            <Copy size={19} strokeWidth={1.2} className="mt-[3px]"/> Copy link
        </button>
    );
};