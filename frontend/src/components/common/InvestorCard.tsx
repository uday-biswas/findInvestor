import { Copy, DollarSign, Facebook, Linkedin, Twitter, ChevronDown, Phone, Mail, CopyCheck, Globe } from 'lucide-react';
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'

interface InvestorData {
    Image: string;
    Company: string | null;
    City: string | null;
    StagePreferences: string | null;
    IndustryPreferences: string | null;
    PastIndustryPreferences: string | null;
    FB: string | null;
    Twitter: string | null;
    Linkedin: string | null;
    _id: string;
    Name: string | null;
    Role: string | null;
    TypeOfFund: string | null;
    Country: string | null;
    EmailAddress: string | null;
    PhoneNumber: string;
    Websites: string | null;
}

interface InvestorProps {
    investor: InvestorData
}

const InvestorCard: React.FC<InvestorProps> = ({ investor }) => {

    return (
        <div className='rounded border-[0.5px] border-gray-600 p-4 flex flex-col bg-gray-900'>
            <div className='flex gap-5'>
                {investor.Image && <img src={investor.Image} alt={`${investor.Name} photo`} className='w-40 h-40 rounded ' />}
                <div className='flex flex-col gap-y-4'>
                    <div className='text-xl font-bold'>{investor.Name}</div>
                    <div className='flex gap-x-1 text-green-400 max-w-fit bg-green-950 font-medium px-2 border-[1.5px] rounded-[10px] border-green-400'>
                        <DollarSign size={15} className='mt-1' />
                        {investor.TypeOfFund}
                    </div>
                    <div className='flex gap-x-3'>
                        <a href={`${investor.FB}`} title="facebook link" target='_blank' rel='noreferrer'><Facebook /></a>
                        <a href={`${investor.Twitter}`} title="twitter link" target='_blank' rel='noreferrer'><Twitter /></a>
                        <a href={`${investor.Linkedin}`} title="linkedin link" target='_blank' rel='noreferrer'><Linkedin /></a>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className='font-semibold flex gap-1 rounded border-[1.5px] border-gray-500 max-w-fit'>
                                <div>View Contact Details</div>
                                <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-72">
                            <DropdownMenuGroup>
                                {investor.PhoneNumber &&
                                    <div onClick={() => { navigator.clipboard.writeText(investor.PhoneNumber) }}>
                                        <DropdownMenuItem>
                                            <Phone className='mr-2' />
                                            <span>{investor.PhoneNumber}</span>
                                            <DropdownMenuShortcut><Copy /></DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </div>}
                                {investor.EmailAddress &&
                                    <a href={`mailto:${investor.EmailAddress}`} title="email link" target='_blank' rel='noreferrer'>
                                        <DropdownMenuItem>
                                            <Mail className='mr-2' />
                                            <span>{investor.EmailAddress}</span>
                                            <DropdownMenuShortcut><CopyCheck /></DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </a>}
                                {investor.Websites &&
                                    <a href={`${investor.Websites}`} title="website link" target='_blank' rel='noreferrer'>
                                        <DropdownMenuItem>
                                            <Globe className='mr-2' />
                                            <span>{investor.Websites}</span>
                                        </DropdownMenuItem>
                                    </a>}
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

export default InvestorCard