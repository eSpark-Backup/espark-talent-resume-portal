"use client"
import { Dropdown } from '@/app/components'
import { expOptions, stackOptions, tableData, techOptions } from '@/constant'
import React from 'react'

const Home = () => {
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
          <table>
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
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td>{item?.name}</td>
                  <td>{item?.date}</td>
                  <td>{item?.designation}</td>
                  <td>
                    <p className={`${item?.status}`}>{item?.status}</p>
                  </td>
                  <td><button>Download</button></td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home