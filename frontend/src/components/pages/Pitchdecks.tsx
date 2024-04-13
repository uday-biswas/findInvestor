import { endpoints } from '@/services/api';
import { apiConnector } from '@/services/apiConnector';
import React, { useEffect, useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { PitchDeckSelect } from '@/data/PitchDeckSelect';
import { Input } from '../ui/input';
import BounceLoader from 'react-spinners/BounceLoader';
import PitchDeckCard from '../common/PitchDeckCard';

type Filters = {
    industry: any;
    businessModel: any;
    customer: any;
    round: any;
    amountRaised: any;
    investor: any;
    searchTerm: any;
    [key: string]: any;
}

const Pitchdecks: React.FC = () => {
    const [filters, setFilters] = useState<Filters>({
        industry: [],
        businessModel: [],
        customer: [],
        round: [],
        amountRaised: "",
        investor: [],
        searchTerm: "",
    });

    const [loading, setLoading] = useState(false);
    const [pitchdecks, setPitchdecks] = useState<any[]>([]);
    const [totalItems, setTotalItems] = useState(0);

    const fetchInvestors = async () => {
        setLoading(true);
        try {
            const filterParams = Object.entries(filters).map(([key, value]) => {
                if (Array.isArray(value) && value.length > 0) {
                    return `${key}=${value.join(',')}`;
                } else if (value !== '') {
                    return `${key}=${value}`;
                }
                return '';
            }).filter(param => param !== '').join('&');

            const url = endpoints.PITCHDECK_API + (filterParams ? `?${filterParams}` : '');

            console.log("url from pitchdecks page: ", url);
            const result = await apiConnector("GET", url);
            setPitchdecks(result?.data.data);
            setTotalItems(result?.data.total);
            console.log("result from pitchdecks page: ", result.data);
            setLoading(false);
        } catch (err) {
            console.log(`error while fetching pitchdecks : - > ${err}`);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvestors();
    }, [filters]);

    const handleCheckboxChange = (category: keyof Filters, value: string) => {
        console.log("category: ", category);
        const isChecked = filters[category].includes(value);
        let updatedFilters: Filters;

        if (isChecked) {
            updatedFilters = {
                ...filters,
                [category]: filters[category].filter((item: string) => item !== value),
            };
        } else {
            updatedFilters = {
                ...filters,
                [category]: [...filters[category], value],
            };
        }

        setFilters(updatedFilters);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({
            ...filters,
            searchTerm: e.target.value
        });
    };

    return (
        <div className='flex flex-col w-11/12 mx-auto'>
            <div className='text-2xl mt-6 mb-3 font-bold'>
                Pitch Decks
            </div>
            <div className='flex'>
                <ScrollArea className='w-1/4 border-r-[0.5px] pb-5 h-[calc(100vh-8rem)]'>
                    <div className='text-gray-400 font-semibold mb-5'>Filter By:</div>
                    <div>
                        {PitchDeckSelect?.map((category, i) => (
                            <div key={i}>
                                <div className='w-full h-1 border-t-[0.5px] border-gray-500 my-4'></div>
                                <div className='text-gray-400 font-semibold my-3'>{category.title}</div>
                                <div>
                                    {category.data.map((option, i) => (
                                        <div key={i}>
                                            <input type="checkbox" className='w-4 h-4'
                                                id={option}
                                                checked={Array.isArray(filters[category.name]) && filters[category.name].includes(option)}
                                                onChange={() => handleCheckboxChange(category.name, option)}
                                            />
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
                <ScrollArea className='flex flex-col w-10/12 py-5 pl-10 h-[calc(100vh-8rem)]'>
                    <Input
                        placeholder='Search by Business Model, Customer, Round or other'
                        type='text'
                        className='rounded w-[400px]'
                        value={filters.searchTerm}
                        onChange={handleSearchChange}
                    />
                    <div className='text-sm text-green-100 pl-4 pt-2'>showing {totalItems} items</div>
                    {/* loading indicator while fetching data */}
                    {loading && (
                        <div className="flex justify-center items-center mt-4">
                            <BounceLoader
                                color={"blue"}
                                loading={loading}
                                size={100}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    )}
                    <div className='flex flex-wrap gap-6 pt-4'>
                        {
                            pitchdecks?.map((pitchdeck: any, i: number) => (
                                <PitchDeckCard key={i} pitchdeck={pitchdeck} />
                            ))
                        }
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export default Pitchdecks;