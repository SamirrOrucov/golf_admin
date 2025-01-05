import {
    Button,
    Col,
     Form,
    Input,
    message,
    Row,
    Upload,
  } from "antd";
import { UploadIcon } from "lucide-react";
  import React from "react";
   import { Link, useNavigate } from "react-router";
   const index = () => {
    const navigate = useNavigate();
    const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE5NDQ2YmQ4LTdmOTgtNDRhZC04N2JlLTdlMGNkNWNkYjc1ZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzM4NzgxMjEyLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTAxLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcxMDEvIn0.4ehemW4p80iN7E66Eq44PzoVkUiSvBua9MhusC_pjdE';
  
    const normFile = (e) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };
    const onFinish = async (values) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (key === "upload") {
            if (value) {
              value.forEach((file) => {
                formData.append("File", file.originFileObj);
              });
            } else {
              return;
            }
          } else {
            formData.append(key, value);
          }
        });
      
        try {
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/Country/create`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`, // Add token if needed
            },
            body: formData,
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          // If the request was successful
          message.success("Əlavə olundu!");
          setTimeout(() => {
            navigate("/country");
          }, 1000);
        } catch (err) {
          console.error('Error posting data:', err.message || err);
        }
      };
      
    return (
 
        <Row align={"middle"} justify={"middle"}>
          <Col span={24} >
            <Row align={"middle"} justify={"center"}>
              <Col span={24}>
                <Form onFinish={onFinish} layout="vertical">
                  <Form.Item
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    label={"Başlıq"}
                    name={"Name"}
                  >
                    <Input placeholder="Başlığı qeyd edin" />
                  </Form.Item>
  
                  <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Upload
                      name="file"
                      action={import.meta.env.VITE_BASE_URL + "education"}
                      beforeUpload={() => false}
                      accept=".jpeg,.png,.jpg"
                      listType="picture"
                    >
                      <Button icon={<UploadIcon />}>
                        Fayl yükləmək üçün toxun
                      </Button>
                    </Upload>
                  </Form.Item>
  
                  <Row justify={"end"}>
                    <Col span={24} style={{display:"flex",gap:"20px"}}>
                      <Button htmlType="submit">Yadda saxla</Button>
                      <Link to={"/country"}>
                        <Button>Ləğv et</Button>
                      </Link>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
     );
  };
  
  export default index;
  