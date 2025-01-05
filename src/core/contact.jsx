import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Table } from 'antd';
 const contact = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);  
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE5NDQ2YmQ4LTdmOTgtNDRhZC04N2JlLTdlMGNkNWNkYjc1ZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzM4NzgxMjEyLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTAxLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcxMDEvIn0.4ehemW4p80iN7E66Eq44PzoVkUiSvBua9MhusC_pjdE';

  const getData = async (page = 1, size = 10) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/Contact/contacts?skip=${(page - 1) * size}&take=${size}`,
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
      const sortedData = result.sort((a, b) => b.id - a.id);

       setData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error.message || error);
    }
  };
  const deleteItem = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/Contact/contact/delete/${id}`,
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
      title: 'Name',
      dataIndex: 'fullname',
      key: 'fullname',
      width: 200
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 200
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      width: 300
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      width: 500
    },
    {
      title: 'Operations',
      width: 150,
      render: (text, record) => (
        <Row justify={"space-between"}>
          <Button onClick={() => deleteItem(record.id)}>Delete</Button>
           
        </Row>
      )
    }
  ];
  const handlePaginationChange = (page) => {
    setCurrentPage(page);
    getData(page, pageSize);
  };

  useEffect(() => {
    getData(currentPage, pageSize);
  }, []);
  return (
    <Row>
      
    <Col >
    <Table
          columns={columns}
          dataSource={data}
          pagination={{
            current: currentPage,
            pageSize,
            onChange: handlePaginationChange
          }}
        />
    </Col>
    </Row>
  );
};

export default contact;
