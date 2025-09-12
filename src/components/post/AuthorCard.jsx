function AuthorCard(props) {
  return (
    <div className="mx-5 mb-8 rounded-2xl border p-5 md:p-6 text-zinc-700 bg-[#efeeeb]">
      <div className="flex items-center gap-3">
        <img
          className="w-11 h-10 rounded-full mr-2"
          src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
          alt={props.author}
        />
        <div className="flex flex-col">
          <span className="text-sm text-[#75716b] ">Author</span>
          <span className="text-xl font-semibold text-[#43403b]">
            {props.author}
          </span>
        </div>
      </div>
      <div className="my-3 h-px bg-gray-300"/>
      <div  className="space-y-4 leading-6 text-[#75716b] font-medium">
        <p className="mb-4">I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy
            sharing insights on feline companionship and wellness.
        </p>
        <p>When i'm not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes.</p>
      </div>
    </div>
  );
}

export default AuthorCard;
