import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import BidCard from "../components/BidCard";
import toast from "react-hot-toast";

const MyBids = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);


  useEffect(() => {
    fatchallData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  const fatchallData = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/bids/${user.email}`)
    setJobs(data)
  }




  // status change functionalaty 

  const handleSaatuseChange = async (id, previoustatus, status) => {
    if (previoustatus !== 'In Progress') return toast.error("Not allowed")

    try {
      const { data } = axios.patch(`${import.meta.env.VITE_API_URL}/bid-status-update/${id}`, { status })

      console.log(data)

      fatchallData()
    } catch (err) {
      console.log(err);

    }

  }

  return (
    <section className='container px-4 mx-auto my-12'>
      <div className='flex items-center gap-x-3'>
        <h2 className='text-lg font-medium text-gray-800 '>My Bids</h2>

        <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
          {jobs.length} Bid
        </span>
      </div>

      <div className='flex flex-col mt-6'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <div className='flex items-center gap-x-3'>
                        <span>Title</span>
                      </div>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <span>Deadline</span>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <button className='flex items-center gap-x-2'>
                        <span>Price</span>
                      </button>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Category
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Status
                    </th>

                    <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 '>
                  {
                    jobs.map(job => <BidCard key={job._id} job={job} handleSaatuseChange={handleSaatuseChange}></BidCard>)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MyBids
