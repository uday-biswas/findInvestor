import { ArrowUpRight, View, Download } from 'lucide-react';
import React, { useState } from 'react';
// import { Viewer } from '@react-pdf-viewer/core'
// import '@react-pdf-viewer/core/lib/styles/index.css';
import { Document, Page } from 'react-pdf';

interface PitchDeckData {
    _id: string;
    CompanyName: string;
    ImageLink: string;
    PDFLink: string;
    PPTLink: string;
    Industry: string;
    BusinessModel: string;
    Customer: string;
    Round: string;
    AmountRaised: string;
    Investor: string;
    Year: string;
    Website: string;
    Crunchbase: string;
    AngelList: string;
    Twitter: string;
}

interface InvestorProps {
    pitchdeck: PitchDeckData,
}

const PitchDeckCard: React.FC<InvestorProps> = ({ pitchdeck }) => {

    const handleDownload = () => {
        const anchor = document.createElement('a');
        anchor.style.display = 'none';
        document.body.appendChild(anchor);
        anchor.href = `${pitchdeck.PDFLink}`
        anchor.download = `${pitchdeck.CompanyName}_pitchdeck.pdf`;
        anchor.click();
        document.body.removeChild(anchor);
    };

    return (
        <div className='rounded border-[0.5px] w-[48%] border-gray-600 p-4 flex flex-col gap-3 bg-gray-900'>
            <div className='flex gap-5'>
                {pitchdeck.ImageLink && <img src={`https://${pitchdeck.ImageLink}`} alt={`${pitchdeck.CompanyName} photo`} className='w-28 h-28 rounded ' />}
                <div className='flex flex-col gap-2'>
                    <div className='p-1 border-[0.5px] border-gray-600 text-gray-400 font-semibold rounded'>{pitchdeck.Industry}</div>
                    <div className='text-2xl font-semibold text-white'>{pitchdeck.CompanyName}</div>
                    <a className='text-blue-500' href={pitchdeck.Website} target='_blank'>Visit Website <ArrowUpRight className='inline-block' /></a>
                </div>
            </div>
            <div className='flex gap-5'>
                <a className='text-blue-500' href={pitchdeck.Twitter} target='_blank'>Twitter <ArrowUpRight className='inline-block' /></a>
                <a className='text-blue-500' href={pitchdeck.Crunchbase} target='_blank'>Crunchbase <ArrowUpRight className='inline-block' /></a>
                <a className='text-blue-500' href={pitchdeck.AngelList} target='_blank'>AngelList <ArrowUpRight className='inline-block' /></a>
            </div>
            <table>
                <tr>
                    <td className='text-gray-400 font-semibold'>Amounts Raised</td>
                    <td className='text-gray-400 font-semibold'>Year</td>
                </tr>
                <tr>
                    <td className='text-white font-semibold'>{pitchdeck.AmountRaised}</td>
                    <td className='text-white font-semibold'>{pitchdeck.Year}</td>
                </tr>
            </table>
            <div className='flex flex-row-reverse gap-5'>
                <button className='text-gray-300 p-2 px-3 rounded font-semibold bg-gray-600 hover:bg-gray-700' onClick={handleDownload}>Download as PDF <Download className='inline-block w-5 h-5 mt-[-2px]' /></button>
                <a rel="noopener noreferrer" href={`https://${pitchdeck.PDFLink}`} title={pitchdeck.CompanyName} target="_blank" className='text-gray-300 p-2 px-3 rounded font-semibold border-[0.5px] border-gray-500'>view <View className="inline-block w-5 h-5 mt-[-2px]" /></a>
            </div>
        </div>
    )
}

export default PitchDeckCard;