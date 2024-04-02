import React from 'react';
import { Button } from '@/components/ui/button'
import { SaveToList } from '@/components/common/SaveToList'
import { CreateNewList } from '../common/CreateNewList';
import { InvestorSelect } from '../../data/InvestorSelect';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';
import { Checkbox } from '../ui/checkbox';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const Investor: React.FC = () => {
    return (
        <div className='flex flex-col w-11/12 mx-auto'>
            <div className='flex justify-between mt-8'>
                <div className='text-2xl font-bold'>
                    Search Investors
                </div>
                <div className='flex gap-3'>
                    <SaveToList />
                    <CreateNewList />
                </div>
            </div>
            <div className='flex '>
                <ScrollArea className='w-1/4 border-r-[0.5px] pb-5 h-[492px]'>
                    <div className='text-gray-400 font-semibold mb-5'>Filter By:</div>
                    <div>
                        {InvestorSelect?.map((category, i) => (
                            <div key={i}>
                                <div className='w-full h-1 border-t-[0.5px] border-gray-500 my-4'></div>
                                <div className='text-gray-400 font-semibold my-3'>{category.title}</div>
                                <div>
                                    {category.data.map((option, i) => (
                                        <div key={i}>
                                            <Checkbox id={option} />
                                            <label
                                                htmlFor={option}
                                                className="text-sm ml-2 leading-none"
                                            >
                                                {option}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        ))}
                    </div>
                </ScrollArea>
                <div className='flex flex-col w-11/12 mx-auto p-10'>
                    <div className='flex justify-between'>
                        <Input placeholder='Search by Name, Country, Industry, Fund Type' type='text' className='rounded w-[400px]' />
                        <div className='flex gap-3'>
                            <div className='text-xl font-semibold'>Rows per page</div>
                            <Select defaultValue='25'>
                                <SelectTrigger className="w-[100px] rounded">
                                    <SelectValue placeholder="Select a fruit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="75">75</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default Investor;
