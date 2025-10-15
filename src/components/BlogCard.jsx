import { Link } from "react-router-dom";

export default function BlogCard(props) {
    return (
        <div className="flex flex-col gap-4 py-2">
            <Link to={`/post/${props.id}`} className="relative">
                <img className="w-full h-[212px] md:h-[360px] object-cover rounded-2xl" src={props.image} alt={props.title}/>
            </Link>
            <div className="flex flex-col">
                <div className="flex">
                    <span className="bg-[#d7f2e9] rounded-full px-3 py-1 text-sm font-medium text-green-600 mb-2">{props.category}
                    </span>
                </div>
                <Link to={`/post/${props.id}`}>
                    <h2 className="text-start font-semibold text-xl mb-1.5 line-clamp-2 text-[#26231e] hover:underline">
                        {props.title}
                    </h2>
                </Link>
                <p className="text-sm font-medium text-[#75716b] mb-4 flex-grow line-clamp-3">
                    {props.description}
                </p>
                <div className="flex items-center text-sm">
                    <img className="w-6 h-6 rounded-full mr-2" src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg" alt={props.author} />
                    <span className="text-sm font-medium text-[#43403b]">{props.author}</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="text-sm font-medium text-[#75716b]">{props.date}</span>
                </div>
            </div>
        </div>
    );
}
