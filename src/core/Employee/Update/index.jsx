import { Button, Col, Form, Input, message, Row, Upload, Image } from 'antd';
import { UploadIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { VITE_BASE_URL_IMG } from '@/utils/constants.ts';

const index = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE5NDQ2YmQ4LTdmOTgtNDRhZC04N2JlLTdlMGNkNWNkYjc1ZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzM4NzgxMjEyLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MTAxLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcxMDEvIn0.4ehemW4p80iN7E66Eq44PzoVkUiSvBua9MhusC_pjdE';
const lang="az"
  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = async values => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'upload') {
        if (value) {
          value.forEach(file => {
            formData.append('File', file.originFileObj);
          });
        } else {
          return;
        }
      } else {
        formData.append(key, value);
      }
    });
    if (!values.upload || values.upload.length === 0) {
      formData.append('File', imageUrl);
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/Employee/Update/` + id,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      message.success('Əlavə olundu!');
      setTimeout(() => {
        navigate('/country');
      }, 1000);
    } catch (err) {
      console.error('Error posting data:', err.message || err);
    }
  };
const getData = async () => {
  try {
    // AZ verisi
    const responseAz = await fetch(
      `${import.meta.env.VITE_BASE_URL}/Employee/${id}/lang=az`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // EN verisi
    const responseEn = await fetch(
      `${import.meta.env.VITE_BASE_URL}/Employee/${id}/lang=en`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!responseAz.ok || !responseEn.ok) {
      throw new Error('Veriler alınamadı!');
    }

    const dataAz = await responseAz.json();
    const dataEn = await responseEn.json();

    // Formu doldur
    form.setFieldsValue({
      FistnameAz: dataAz.fistname,
      LastnameAz: dataAz.lastname,
      PositionAz: dataAz.position,
      FistnameEn: dataEn.fistname,
      LastnameEn: dataEn.lastname,
      PositionEn: dataEn.position,
    });

    setImageUrl(dataAz.imageUrl); // Görsel AZ'den geliyor
  } catch (err) {
    console.error('Hata:', err);
  }
};

  useEffect(() => {
    getData();
  }, []);

  return (
    <Row align={'middle'} justify={'middle'}>
      <Col span={24}>
        <Row align={'middle'} justify={'center'}>
          <Col span={24}>
            <Form onFinish={onFinish} form={form} layout="vertical">
              <Form.Item
                rules={[
                  {
                    required: true
                  }
                ]}
                label={'FistnameAz'}
                name={'FistnameAz'}
              >
                <Input placeholder="Məlumatı qeyd edin" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true
                  }
                ]}
                label={'FistnameEn'}
                name={'FistnameEn'}
              >
                <Input placeholder="Məlumatı qeyd edin" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true
                  }
                ]}
                label={'LastnameAz'}
                name={'LastnameAz'}
              >
                <Input placeholder="Məlumatı qeyd edin" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true
                  }
                ]}
                label={'LastnameEn'}
                name={'LastnameEn'}
              >
                <Input placeholder="Məlumatı qeyd edin" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true
                  }
                ]}
                label={'PositionAz'}
                name={'PositionAz'}
              >
                <Input placeholder="Məlumatı qeyd edin" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true
                  }
                ]}
                label={'PositionEn'}
                name={'PositionEn'}
              >
                <Input placeholder="Məlumatı qeyd edin" />
              </Form.Item>

              <Form.Item
                name="upload"
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  name="file"
                  action={import.meta.env.VITE_BASE_URL + 'education'}
                  beforeUpload={() => false}
                  accept=".jpeg,.png,.jpg"
                  listType="picture"
                >
                  <Button icon={<UploadIcon />}>
                    Fayl yükləmək üçün toxun
                  </Button>
                </Upload>
              </Form.Item>

              <Row justify={'end'}>
                <Col span={24} style={{ display: 'flex', gap: '20px' }}>
                  <Button htmlType="submit">Yadda saxla</Button>
                  <Link to={'/employee'}>
                    <Button>Ləğv et</Button>
                  </Link>
                </Col>
              </Row>
            </Form>
            <Row style={{ marginTop: '20px' }}>
              <Col>
                {imageUrl && (
                  <Image
                    width={100}
                    height={100}
                    src={VITE_BASE_URL_IMG + imageUrl}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default index;
