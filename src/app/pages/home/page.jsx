import Dropdown from '@/common/Dropdown'
import { expOptions, stackOptions, tableData, techOptions } from '@/constant'
import React from 'react'

const Home = () => {
  return (
    <div className='home-main'>
      <div className="jobs-container">
        <h1>Candidates List</h1>
        <div className='dropdowns-parent'>
          <Dropdown label={"Stack"} options={stackOptions} />
          <Dropdown label={"Experience"} options={expOptions} />
          <Dropdown label={"Technologies"} options={techOptions} />
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
              {/* <td>Abdul Rehman</td>
                <td>20-1-2020</td>
                <td>Jr. React Js Developer</td>
                <td>
                  <p>Confirmed</p>
                </td>
                <td><button>Download</button></td> */}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home