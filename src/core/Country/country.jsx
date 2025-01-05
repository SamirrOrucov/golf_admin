 import { Button, Col, Row, Table , ConfigProvider, Image } from 'antd';
import { LucidePlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { VİTE_BASE_URL_IMG } from '@/utils';

const country = () => {
  const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);  
  const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE5NDQ2YmQ4LTdmOTgtNDRhZC04N2JlLTdlMGNkNWNkYjc1ZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzM4NzgxMjEyLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTAxLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcxMDEvIn0.4ehemW4p80iN7E66Eq44PzoVkUiSvBua9MhusC_pjdE';

const getData = async (page = 1, size = 10) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/Country?skip=${(page - 1) * size}&take=${size}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
     setData(data);
  } catch (error) {
    console.error('Error fetching data:', error.message || error);
  }
};
const deleteItem = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/Country/delete/${id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

     getData();  
  } catch (error) {
    console.error('Error deleting item:', error.message || error);
  }
};
const columns = [
 

  {
    title: "Image",
    dataIndex: "imageUrl",
    key: "imageUrl",
    width: 600,
    render: (all, record) => <Image src={VITE_BASE_URL_IMG+record.imageUrl}>Fayl Linki</Image>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "Name",
    width:600,
  },
  {
    title: "Operations",
    width: 200,
    render: (text, record) => (
      <Row justify={"space-around"} >
        <Button onClick={() => deleteItem(record.id)}>Delete</Button>
        <Link to={"/country/edit/" + record.id}>
          <Button color="black">Edit</Button>
        </Link>
      </Row>
    ),
  },
];
  const handlePaginationChange = (page) => {
    setCurrentPage(page);
    getData(page, pageSize);
  };

  useEffect(() => {
    getData(currentPage, pageSize);
  }, []);
  return (
    <Row
  >
   
        <Col span={24} style={{marginTop:"50px"}}>
        <Row justify={"end"}>
          <Col span={2}>
            <Link to={"/country/add"}>
              <Button defaultHoverBorderColor={"red"} className="add_button">
                <LucidePlus fontSize={18} /> Yeni
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 5 }}
              
            />
          </Col>
        </Row>
        </Col>
      
  </Row>
  )
}

export default country