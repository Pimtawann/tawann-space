import { Github, Linkedin } from 'lucide-react';
import GoogleIcon from "../assets/google.png"

export function Footer () {
    return(
        <footer className="bg-[#efeeeb]">
            <div className="flex flex-col gap-5 md:flex-row md:justify-between md:py-[60px] md:px-32 items-center mx-auto px-6 py-11 ">
                <div className="flex items-center gap-5 text-[#43403b]">
                    <p className="font-medium">Get in touch</p>
                    <div className="flex gap-4">
                        <a className="grid place-items-center h-6 w-6 rounded-full bg-[#43403b] hover:bg-[#75716b] transition-colors"><Linkedin fill='white' color='stone' size={16}/></a>
                        <a className="grid place-items-center h-6 w-6 rounded-full bg-[#43403b] hover:bg-[#75716b] transition-colors"><Github fill='white' color='white' size={16}/></a>
                        <a className="grid place-items-center h-6 w-6 rounded-full bg-[#43403b] hover:bg-[#75716b] transition-colors"><img src={GoogleIcon} alt='Google' className='h-4 w-4'/></a>
                    </div>
                </div>
                <div>
                     <p className='text-[#26231e] font-medium underline hover:text-[#75716b]'>Home page</p>
                </div>
            </div>
        </footer>
    )
}