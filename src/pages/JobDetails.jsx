import axios from 'axios'
import { compareAsc, format } from 'date-fns'
import { useContext, useEffect, useState } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider'
import toast from 'react-hot-toast'

const JobDetails = () => {
  const { user } = useContext(AuthContext);

  const nevigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date())

  const { id } = useParams();


  const [job, setJob] = useState([]);

  const {
    job_title,
    byear,
    category,
    date,
    min_price,
    max_price,
    description,
    bit_count,
    _id
  } = job || {};


  useEffect(() => {
    fatchallData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const fatchallData = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/job/${id}`)
    setJob(data)
  }




  // handle from submit

  const handleSubmit = async e => {
    e.preventDefault();
    const from = e.target;

    const price = from.price.value;
    const email = user?.email;
    const comment = from.comment.value;
    const jobId = _id


    //validation

    //0. chack bids parmisstion validetaion

    // if (user?.email === byear?.email) {
    //   return toast.error("Action not parmited");
    // }

    //1. chack date


    if (compareAsc(new Date(), new Date(date)) === 1) {
      return toast.error("Deadline Crossed, Bidding Forbidden!");
    }

    //2. price chack

    if (price > max_price) {
      return toast.error("Offer less or atlist equal to mixmum!");
    }


    //3. chack offer daedline and bids deadline


    if (compareAsc(new Date(startDate), new Date(date)) === 1) {
      return toast.error("Probide deadline under offer deadline!");
    }



    const bidData = { jobId, price, email, comment, deadline: startDate, job_title, category, status: 'Pending', byear: byear?.email };

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/add-bid`,
        bidData
      )
      console.log(data);
      toast.success("Your bid added successfilly.")
      from.reset()
      nevigate('/my-bids')
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {

        return toast.error(err?.response?.data)
      }
      toast.error("sothing is wrong")

    }
  }

  return (
    <div className='flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto '>
      {/* Job Details */}
      <div className='flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]'>
        <div className='flex items-center justify-between'>
          {
            date && <span className='text-sm font-light text-gray-800 '>
              Deadline:{format(new Date(date), 'P')}
            </span>
          }
          <span className='px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full '>
            {category}
          </span>
        </div>

        <div>
          <h1 className='mt-2 text-3xl font-semibold text-gray-800 '>
            {job_title}
          </h1>

          <p className='mt-2 text-lg text-gray-600 '>
            {description}
          </p>
          <p className='mt-6 text-sm font-bold text-gray-600 '>
            Buyer Details:
          </p>
          <div className='flex items-center gap-5'>
            <div>
              <p className='mt-2 text-sm  text-gray-600 '>
                Name: {byear?.name}
              </p>
              <p className='mt-2 text-sm  text-gray-600 '>
                Email: {byear?.email}
              </p>
            </div>
            <div className='rounded-full object-cover overflow-hidden w-14 h-14'>
              <img
                referrerPolicy='no-referrer'
                src={byear?.photo}
                alt=''
              />
            </div>
          </div>
          <p className='mt-6 text-lg font-bold text-gray-600 '>
            Range: ${min_price} - ${max_price}
          </p>
        </div>
      </div>
      {/* Place A Bid Form */}
      <section className='p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-[350px]'>
        <h2 className='text-lg font-semibold text-gray-700 capitalize '>
          Place A Bid
        </h2>

        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2'>
            <div>
              <label className='text-gray-700 ' htmlFor='price'>
                Price
              </label>
              <input
                id='price'
                type='text'
                name='price'
                required
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='emailAddress'>
                Email Address
              </label>
              <input
                id='emailAddress'
                type='email'
                name='email'
                defaultValue={user?.email}
                disabled
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>

            <div>
              <label className='text-gray-700 ' htmlFor='comment'>
                Comment
              </label>
              <input
                id='comment'
                name='comment'
                type='text'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring'
              />
            </div>
            <div className='flex flex-col gap-2 '>
              <label className='text-gray-700'>Deadline</label>

              {/* Date Picker Input Field */}
              <DatePicker
                className='border p-2 rounded-md'
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </div>
          </div>

          <div className='flex justify-end mt-6'>
            <button
              type='submit'
              className='px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
            >
              Place Bid {bit_count}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default JobDetails
