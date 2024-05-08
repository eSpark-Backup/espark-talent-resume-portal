"use client"
import { Dropdown } from '@/app/components'
import { utils, writeFileXLSX } from "xlsx";
import { expOptions, stackOptions, tableData, techOptions } from '@/constant'
import useFetchCandidates from '@/hooks/useFetchCandidates'
import { DateMonthYear } from '@/utility/DataConverter'
import React, { useCallback, useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { toast } from "react-toastify";
import Link from 'next/link';

const Home = () => {
  const [data, setData] = useState([])
  const [allCheck, setAllCheck] = useState(false)
  const { candidates, loading, error } = useFetchCandidates()
  const handleCheck = (obj) => {
    const temp = data.map(item => {
      if (item.id === obj.id) {
        return { ...item, checked: !item.checked }
      }
      return { ...item }
    })
    setData(temp)
  }

  const handleAllCheck = () => {
    if (allCheck) {
      setAllCheck(false)
      setData(candidates.map(item => ({ ...item, checked: false })))
    } else {
      setAllCheck(true)
      setData(candidates.map(item => ({ ...item, checked: true })))
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
    setData(candidates.map(item => ({ ...item, checked: false })))
  }, [error, candidates])

  const xportAll = useCallback(async () => {
    const columnIndexToRemove = 0;
    const selectedData = data.filter(item => item.checked)
    const finalArr = selectedData.map(item => {
      const { checked, ...rest } = item;
      return rest;
    });
    const formattedData = finalArr.map((row) => {
      const newRow = { ...row };
      delete newRow[Object.keys(newRow)[columnIndexToRemove]];
      newRow.created_at = DateMonthYear(newRow?.created_at);
      return newRow;
    });
    const ws = utils.json_to_sheet(formattedData);
    const headers = [
      "Date",
      "Name",
      "Email",
      "Phone No",
      "Designation",
      "Resume",
    ];
    headers.forEach((header, index) => {
      ws[String.fromCharCode(65 + index) + 1] = { v: header, t: "s" };
    });
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, "data.xlsx");
  });

  const xportSelected = useCallback(async (obj) => {
    const arr = [obj]
    const columnIndexToRemove = 0;
    const formattedData = arr.map((row) => {
      const newRow = { ...row };
      delete newRow[Object.keys(newRow)[columnIndexToRemove]];
      newRow.created_at = DateMonthYear(newRow?.created_at);
      newRow.resume = `localhost:3000/api?resume=${newRow?.resume}`
      return newRow;
    });
    const ws = utils.json_to_sheet(formattedData);
    const headers = [
      "Date",
      "Name",
      "Email",
      "Phone No",
      "Designation",
      "Resume",

    ];
    headers.forEach((header, index) => {
      ws[String.fromCharCode(65 + index) + 1] = { v: header, t: "s" };
    });
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFileXLSX(wb, `${obj?.full_name}.xlsx`);
  });

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
        <div className='jobs-header'>
          <h1>Candidates List</h1>
          <Link href={"/pages/post-cv"}>
            <button>Post CV</button>
          </Link>
        </div>
        <div className='dropdowns-parent'>
          <Dropdown label={"Stack"} options={stackOptions} name={"stack"} onChange={(name, value) => { console.log(name, value) }} />
          <Dropdown label={"Experience"} options={expOptions} name={"experience"} onChange={(name, value) => { console.log(name, value) }} />
          <Dropdown label={"Technologies"} options={techOptions} name={"technologies"} onChange={(name, value) => { console.log(name, value) }} />
        </div>
        <div className="table-parent">
          {data && data.length > 0 ? <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Desination</th>
                <th>Status</th>
                <th className='action-cell'>
                  <button onClick={xportAll}>Download Selected</button>
                  <input checked={allCheck} onChange={handleAllCheck} type='checkbox' />
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.full_name}</td>
                  <td>{DateMonthYear(item?.created_at)}</td>
                  <td>{item?.designation}</td>
                  <td>
                    <p className={`pending`}>pending</p>
                  </td>
                  <td className='action-cell'>
                    <button onClick={() => xportSelected(item)}>Download</button>
                    <input checked={item?.checked} onChange={() => handleCheck(item)} type='checkbox' />
                  </td>
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