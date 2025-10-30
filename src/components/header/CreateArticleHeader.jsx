export default function AdminCreateArticleHeader() {
  return (
    <div className="flex items-center justify-between px-8 py-4 mb-8 border-b border-brown-3">
      <p className="text-2xl font-semibold text-brown-6">Create article</p>
      <div className="flex gap-3">
        <button className="flex gap-2 text-brown-6 bg-white border border-brown-6 font-medium px-7 py-3 rounded-full hover:bg-brown-3 cursor-pointer">
          Save as draft
        </button>
        <button className="flex gap-2 bg-brown-6 text-white font-medium px-7 py-3 rounded-full hover:bg-brown-4 cursor-pointer">
          Save and publish
        </button>
      </div>
    </div>
  );
}
