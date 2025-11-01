import { Github, Linkedin } from 'lucide-react';
import GoogleIcon from "../assets/google.png"
import { Link } from 'react-router-dom';

export default function Footer () {
    return(
        <footer className="bg-brown-2">
            <div className="flex flex-col gap-5 md:flex-row md:justify-between md:py-[60px] md:px-32 items-center mx-auto px-6 py-11 ">
                <div className="flex items-center gap-5 text-brown-5">
                    <p className="font-medium">Get in touch</p>
                    <div className="flex gap-4">
                        <a className="grid place-items-center h-6 w-6 rounded-full bg-brown-5 hover:bg-brown-4 transition-colors cursor-pointer"><Linkedin fill='white' color='stone' size={16}/></a>
                        <a className="grid place-items-center h-6 w-6 rounded-full bg-brown-5 hover:bg-brown-4 transition-colors cursor-pointer"><Github fill='white' color='white' size={16}/></a>
                        <a className="grid place-items-center h-6 w-6 rounded-full bg-brown-5 hover:bg-brown-4 transition-colors cursor-pointer"><img src={GoogleIcon} alt='Google' className='h-4 w-4'/></a>
                    </div>
                </div>
                <div>
                     <Link to="/" className='text-brown-6 font-medium underline hover:text-brown-4 cursor-pointer'>Home page</Link>
                </div>
            </div>
        </footer>
    )
}