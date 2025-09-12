import PostContent from "./PostContent";
import AuthorCard from "./AuthorCard";

function PostSection({ post }) {
  if (!post) return null;

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div>
      <figure className="md:mx-6 md:pt-19">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[220px] md:h-[420px] object-cover md:rounded-xl"
        />
      </figure>
      <div className="md:grid md:grid-cols-12 md:gap-8 md:pt-5">
        <article className="md:col-span-8">
          <PostContent
            title={post.title}
            category={post.category}
            description={post.description}
            date={formatDate(post.date)}
            content={post.content}
          />
        </article>
        <aside className="md:mt-5 md:col-span-4 md:sticky md:top-24 md:self-start">
          <AuthorCard author={post.author} />
        </aside>
      </div>
    </div>
  );
}

export default PostSection;
