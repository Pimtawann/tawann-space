import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

function ArticleSection () {
    return(
        <div className="mx-auto md:px-8 py-10">
            <h2 className="text-2xl font-bold text-[#26231e] mb-5 px-5">Latest articles</h2>
            <div className="bg-[#efeeeb] h-[172px] md:h-[80px] p-3.5 md:rounded-2xl">
                <div className="grid gap-3 md:flex md:justify-between md:items-center">
                    <div className="hidden md:flex md:flex-nowrap md:gap-4">
                        <button className="h-[48px] px-4 py-2 rounded-lg text-sm font-medium bg-[#d8d4ce] text-[#26231e]">Highlight</button>
                        <button className="h-[48px] px-4 py-2 rounded-lg text-sm font-medium text-[#26231e]">Cat</button>
                        <button className="h-[48px] px-4 py-2 rounded-lg text-sm font-medium text-[#26231e]">Inspiration</button>
                        <button className="h-[48px] px-4 py-2 rounded-lg text-sm font-medium text-[#26231e]">General</button>
                    </div>
                    <div className="space-y-2">
                        <div className="relative md:w-[360px]">
                            <Input 
                                placeholder="Search" 
                                className="px-5 py-3 h-[48px] bg-white border-[#dad6d1] rounded-lg font-medium text-lg text-[#75716b] focus:ring-2"
                            />
                            <Search size={20} className="absolute right-5.5 top-1/2 -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="space-y-2 md:hidden">
                        <label className="flex font-medium text-lg text-[#75716b] px-1">Category</label>
                        <Select>
                            <SelectTrigger size="custom" className="w-full h-[48px] bg-white border border-[#dad6d1] rounded-lg px-5 text-lg font-medium text-[#75716b] focus:ring-2">
                                <SelectValue placeholder="Highlight"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="highlight">Highlight</SelectItem>
                                <SelectItem value="cat">Cat</SelectItem>
                                <SelectItem value="inspiration">Inspiration</SelectItem>
                                <SelectItem value="general">General</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleSection;