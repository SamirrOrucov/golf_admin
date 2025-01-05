import { Button, Col, Row, Table , ConfigProvider, Image } from 'antd';
import { LucidePlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import {VITE_BASE_URL_IMG} from '@/utils/constants.ts';

const country = () => {
  const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);  
  const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE5NDQ2YmQ4LTdmOTgtNDRhZC04N2JlLTdlMGNkNWNkYjc1ZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzM4NzgxMjEyLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTAxLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcxMDEvIn0.4ehemW4p80iN7E66Eq44PzoVkUiSvBua9MhusC_pjdE';
const lang="az"
// const getData = async (page = 1, size = 10) => {
//   try {
//     const response = await fetch(
//       `${import.meta.env.VITE_BASE_URL}/Employee/lang=${lang}?skip=${(page - 1) * size}&take=${size}`,
//       {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     const sortedData = data.sort((a, b) => b.id - a.id);

//      setData(sortedData);
//    } catch (error) {
//     console.error('Error fetching data:', error.message || error);
//   }
// };
const getData = async () => {
    try {
      const responseAz = await fetch(`${import.meta.env.VITE_BASE_URL}/Employee/lang=az`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseEn = await fetch(`${import.meta.env.VITE_BASE_URL}/Employee/lang=en`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!responseAz.ok || !responseEn.ok) {
        throw new Error("Veri alınamadı!");
      }
  
      const dataAz = await responseAz.json();
      const dataEn = await responseEn.json();
      const combinedData = dataAz.map(itemAz => {
        const matchingEn = dataEn.find(itemEn => itemEn.id === itemAz.id);
        return {
          id: itemAz.id,
          imageUrl: itemAz.imageUrl, // Görsel tek dilde olabilir
          firstnameAz: itemAz.fistname,
          firstnameEn: matchingEn?.fistname || "", // Eğer İngilizce eşleşme yoksa boş bırak
          lastnameAz: itemAz.lastname,
          lastnameEn: matchingEn?.lastname || "",
          positionAz: itemAz.position,
          positionEn: matchingEn?.position || "",
        };
      });
  
      setData(combinedData);
  
      setData(combinedData);
      form.setFieldsValue(combinedData);
      setImageUrl(dataAz.imageUrl || dataEn.imageUrl);
    } catch (err) {
      console.error("Veri alırken hata:", err);
    }
  };
  console.log("data",data);
  
const deleteItem = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/Employee/delete/${id}`,
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
    width: 200,
    render: (all, record) => <Image width={100} height={100} src={VITE_BASE_URL_IMG+record.imageUrl}/>,
  },
  {
    title: "Firstname AZ",
    dataIndex: "firstnameAz",
    key: "firstnameAz",
    width:200,
  },
  {
    title: "Firstname EN",
    dataIndex: "firstnameEn",
    key: "firstnameEn",
    width:200,
  },
  {
    title: "Last name AZ",
    dataIndex: "lastnameAz",
    key: "lastnameAz",
    width:200,
  },
  {
    title: "Last name EN",
    dataIndex: "lastnameEn",
    key: "lastnameEn",
    width:200,
  },
  {
    title: "Position AZ",
    dataIndex: "positionAz",
    key: "positionAz",
    width:200,
  },
  {
    title: "PositionEN",
    dataIndex: "positionEn",
    key: "positionEn",
    width:200,
  },
  {
    title: "Operations",
    width: 200,
    render: (text, record) => (
      <Row justify={"space-around"} >
        <Button onClick={() => deleteItem(record.id)}>Delete</Button>
        <Link to={"/employee/edit/" + record.id}>
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
            <Link to={"/employee/add"}>
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