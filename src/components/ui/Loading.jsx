import { DotLoader } from "react-spinners";

export default function Loading({ text = "Loading..." }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <DotLoader color="#957341" size={60} />
      <p className="text-brown-6 text-lg font-semibold">{text}</p>
    </div>
  );
}
