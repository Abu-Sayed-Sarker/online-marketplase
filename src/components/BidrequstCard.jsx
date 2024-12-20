import { format } from "date-fns";

// eslint-disable-next-line react/prop-types
const BidrequstCard = ({ job, handleSaatuseChange }) => {
    const { price, deadline, job_title,
        category, status, byear, _id } = job || {}
    return (
        <tr>
            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                {job_title}
            </td>
            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                {byear}
            </td>

            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                {format(new Date(deadline), 'P')}
            </td>

            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                ${price}
            </td>
            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                <div className='flex items-center gap-x-2'>
                    <p
                        className={`px-3 py-1 text-[8px] ${category === "Web Development" && "text-blue-500 bg-blue-100/60"} ${category === "Graphics Design" && "text-pink-500 bg-pink-100/60"} ${category === "Digital Marketing" && "text-green-500 bg-green-100/60"} rounded-full`}
                    >
                        {category}
                    </p>
                </div>
            </td>
            <td className='px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap'>
                <div
                    className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${status === "Completed" && "text-green-500 bg-green-100/60"} ${status === "In Progress" && "text-blue-500 bg-blue-100/60"} ${status === "Rejected" && "text-red-500 bg-red-100/60"} ${status === "Pending" && "text-yellow-500 bg-yellow-100/60"}`}
                >
                    <span
                        className={`h-1.5 w-1.5 rounded-full ${status === "Completed" && "bg-green-500"} ${status === "In Progress" && " bg-blue-500"} ${status === "Rejected" && " bg-red-500"} ${status === "Pending" && " bg-yellow-500"}`}
                    ></span>
                    <h2 className='text-sm font-normal '>{status}</h2>
                </div>
            </td>
            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                <div className='flex items-center gap-x-6'>
                    <button
                        onClick={() => handleSaatuseChange(_id, status, 'In Progress')}
                        disabled={status === "In Progress" || status === "Completed"}
                        className='disabled:hover:cursor-not-allowed disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='m4.5 12.75 6 6 9-13.5'
                            />
                        </svg>
                    </button>

                    <button
                        onClick={() => handleSaatuseChange(_id, status, 'Rejected')}
                        disabled={status === "Rejected" || status === "Completed"}
                        className='disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636'
                            />
                        </svg>
                    </button>
                </div>
            </td>
        </tr >
    );
};

export default BidrequstCard;