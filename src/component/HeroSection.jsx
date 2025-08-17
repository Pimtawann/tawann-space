import heroSectionImg from "../assets/hero-section-banner.jpg"

function HeroSection (){
    return(
        <div className="flex flex-col md:flex-row py-17">
        <div className="grid  md:gap-14 md:grid-cols-12 md:items-center">
        <div className="md:col-span-4 text-center md:text-left md:flex md:flex-col md:items-end">
            <h1 className="font-semibold text-[40px] text-[#262331e] text-center md:text-[56px] md:leading-[64px] md:text-end">Stay<br className="hidden md:block"/> Informed,<br/>Stay Inspired</h1>
            <p className="text-center text-[#75716b] font-medium mt-5 leading-6 md:max-w-[380px] md:text-right">Discover a World of Knowledge at Your Fingertips. Your Daily Dose of Inspiration and Information.</p>
        </div>
        <div className="my-8 flex justify-center md:col-span-4">
            <img src={heroSectionImg} alt="Hero Section Banner" className="w-full h-[470px] object-cover rounded-2xl"/>
        </div>
        <div className="flex flex-col md:col-span-4 md:text-left mt-6 max-w-[28rem] mx-auto text-start">
            <p className="text-xs text-gray-500">-Author</p>
            <p className="mt-1 font-semibold text-2xl text-[#43403b]">Thompson P.</p>
            <p className="mt-2 leading-6 text-[#75716b] font-medium">I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.</p>
            <p className="mt-5 leading-6 text-[#75716b] font-medium">When I'm not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes.</p>
        </div>
        </div>
        </div>
    );
};

export default HeroSection;