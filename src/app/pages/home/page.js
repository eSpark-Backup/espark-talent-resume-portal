"use client"
import { Dropdown } from '@/app/components'
import { expOptions, stackOptions, tableData, techOptions } from '@/constant'
import useFetchCandidates from '@/hooks/useFetchCandidates'
import { DateMonthYear } from '@/utility/DataConverter'
import React, { useEffect } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { toast } from "react-toastify";

const Home = () => {
  const { candidates, loading, error } = useFetchCandidates()

  useEffect(() => {
    if (error) {
      toast.error(error)
    }

  }, [error])

  if (loading) {
    return (
      <div className='home-main'>
        <div className='load-conatiner'>
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#0f0f0f"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </div>
    )
  }
  return (
    <div className='home-main'>
      <div className="jobs-container">
        <h1>Candidates List</h1>
        <div className='dropdowns-parent'>
          <Dropdown label={"Stack"} options={stackOptions} name={"stack"} onChange={(name, value) => { console.log(name, value) }} />
          <Dropdown label={"Experience"} options={expOptions} name={"experience"} onChange={(name, value) => { console.log(name, value) }} />
          <Dropdown label={"Technologies"} options={techOptions} name={"technologies"} onChange={(name, value) => { console.log(name, value) }} />
        </div>
        <div className="table-parent">
          {candidates && candidates.length > 0 ? <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Desination</th>
                <th>Status</th>
                <th>
                  <button>Download All</button>
                </th>
              </tr>
            </thead>
            <tbody>
              {candidates?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.full_name}</td>
                  <td>{DateMonthYear(item?.created_at)}</td>
                  <td>{item?.designation}</td>
                  <td>
                    <p className={`pending`}>pending</p>
                  </td>
                  <td><button>Download</button></td>
                </tr>
              ))}

            </tbody>
          </table> :
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>No Applicants Found</h1>}
        </div>
      </div>
    </div>
  )
}

export default Home