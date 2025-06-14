import React, { useState } from 'react';
import { Button, Form, Input, Typography, Row, Col, message } from 'antd'; // Ant Design bileşenleri
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const { Title, Text } = Typography;

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    const { nickname, email, password } = values;

    const success = await authService.register(nickname, email, password);

    if (success) {
      message.success('Kayıt başarılı. Giriş yapabilirsiniz.');
      navigate('/login'); // Kayıt başarılıysa login sayfasına yönlendir
    } else {
      message.error('Kayıt başarısız. Geçersiz veya zaten kayıtlı e-posta.');
    }

    setLoading(false);
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Title level={2} style={{ textAlign: 'center' }}>Register</Title>
        <Form
          name="register_form"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="nickname"
            label="Kullanıcı Adı"
            rules={[{ required: true, message: 'Lütfen kullanıcı adınızı giriniz!' }]}
          >
            <Input placeholder="Kullanıcı Adınızı Giriniz" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Lütfen e-postanızı giriniz!' },
              { type: 'email', message: 'Geçerli bir e-posta giriniz!' },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Lütfen şifrenizi giriniz!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Kayıt Ol
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center' }}>
          <Text type="secondary">
            Zaten üye misiniz?{' '}
            <Link to="/login" style={{ color: '#1890ff' }}>Giriş Yapın</Link>
          </Text>
        </div>
      </Col>
    </Row>
  );
}

export default Register;
