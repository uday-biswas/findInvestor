import React, { useEffect, useState } from 'react';
import { CreateNewList } from '../common/CreateNewList';
import { InvestorSelect } from '../../data/InvestorSelect';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import BounceLoader from "react-spinners/BounceLoader";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination"
import { apiConnector } from '@/services/apiConnector';
import { endpoints } from '@/services/api';
import InvestorCard from '../common/InvestorCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/index';
import AddToList from '../common/AddToList';
import { getListDetails } from '@/services/operation/listAPI';

type Filters = {
    city: any;
    country: any;
    typeOfFund: any;
    industryPreferences: any;
    stagePreferences: any;
    jobTitle: any;
    dataAvailable: any;
    searchTerm: any;
    [key: string]: any;
}

const Investor: React.FC = () => {
    const [investors, setInvestors] = useState<any[]>([]);
    const [filters, setFilters] = useState<Filters>({
        city: [],
        country: [],
        typeOfFund: [],
        industryPreferences: [],
        stagePreferences: [],
        jobTitle: [],
        dataAvailable: [],
        searchTerm: ''
    });
    const [limit, setLimit] = useState(25);
    const [skip, setSkip] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(10);
    const [loading, setLoading] = useState(false);
    const email = useSelector((state: RootState) => state.profile.user ? state.profile.user.email : null);
    const dispatch = useDispatch();

    useEffect(() => {
        getListDetails(email, dispatch);
    }, []);

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

            const url = endpoints.INVESTOR_API + `?limit=${limit}&skip=${skip}&email=${email}` + (filterParams ? `&${filterParams}` : '');

            console.log("url: ", url);
            const result = await apiConnector("GET", url);
            setInvestors(result?.data.data);
            setTotalItems(result?.data.total);
            setLoading(false);
        } catch (err) {
            console.log(`error while fetching investors : - > ${err}`);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvestors();
    }, [filters, limit, skip]);

    const handlePages = () => {
        const pages = Math.ceil(totalItems / limit);
        setTotalPages(pages);
    }

    useEffect(() => {
        handlePages();
    }, [totalItems, limit]);

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

    const handleLimitChange = (value: string) => {
        setLimit(parseInt(value, 10));
        setSkip((currentPage - 1) * parseInt(value, 10));
    };

    const handlePageChange = (page: number) => {
        setSkip((page - 1) * limit);
        setCurrentPage(page);
    };

    const convertToId = (data: any) => {
        return data.map((item: any) => item._id);
    }

    return (
        <div className='flex flex-col w-11/12 mx-auto'>
            <div className='flex justify-between mt-8'>
                <div className='text-2xl font-bold'>
                    Search Investors
                </div>
                <div className='flex gap-3'>
                    <AddToList ids={convertToId(investors)} page={true} />
                    <CreateNewList />
                </div>
            </div>
            <div className='flex '>
                <ScrollArea className='w-1/4 border-r-[0.5px] pb-5 h-[calc(100vh-8rem)]'>
                    <div className='text-gray-400 font-semibold mb-5'>Filter By:</div>
                    <div>
                        {InvestorSelect?.map((category, i) => (
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
                    <div className='flex justify-between'>
                        <Input
                            placeholder='Search by Name, Country, Industry, Fund Type'
                            type='text'
                            className='rounded w-[400px]'
                            value={filters.searchTerm}
                            onChange={handleSearchChange}
                        />
                        <div className='flex gap-3'>
                            <div className='text-xl font-semibold'>Rows per page</div>
                            <Select defaultValue='25' onValueChange={handleLimitChange}
                                value={limit.toString()}>
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
                    <div className='flex flex-col gap-y-6 pt-4'>
                        {
                            investors?.map((investor: any, i: number) => (
                                <InvestorCard key={i} investor={investor} listId={null} />
                            ))
                        }
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} className={
                                        currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
                                    } />
                                </PaginationItem>
                                {[1, 2, 3].map((page) => (
                                    <PaginationItem key={page}>
                                        <PaginationLink
                                            onClick={() => handlePageChange(page)}
                                            isActive={currentPage === page}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                {currentPage > 3 && (
                                    <PaginationItem>
                                        <PaginationLink
                                            onClick={() => handlePageChange(currentPage)}
                                            isActive
                                        >
                                            {currentPage}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}
                                <PaginationItem>
                                    <PaginationNext onClick={() => handlePageChange(currentPage + 1)}
                                        className={
                                            currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined
                                        } />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>

                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

export default Investor;
