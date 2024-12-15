/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom'

const JobCard = ({ job }) => {
  console.log(job);

  const { job_tittle,
    category,
    date,
    min_price,
    max_price,
    description,
    bit_count } = job || {};

  return (
    <Link
      to={`/job/1`}
      className='w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all'
    >
      <div className='flex items-center justify-between'>
        <span className='text-xs font-light text-gray-800 '>
          Deadline: {date}
        </span>
        <span className='px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full '>
          {category}
        </span>
      </div>

      <div>
        <h1 className='mt-2 text-lg font-semibold text-gray-800 '>
          {job_tittle}
        </h1>

        <p className='mt-2 text-sm text-gray-600 '>
          {description.substring(0, 70)} ...
        </p>
        <p className='mt-2 text-sm font-bold text-gray-600 '>
          Range: ${min_price} - ${max_price}
        </p>
        <p className='mt-2 text-sm font-bold text-gray-600 '>Total Bids: {bit_count}</p>
      </div>
    </Link>
  )
}

export default JobCard
