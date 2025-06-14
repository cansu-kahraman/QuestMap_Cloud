import React, { useState } from 'react';
import { Layout, Row, Col, Form, Input, Button, message } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import emailjs from 'emailjs-com'; // EmailJS import edildi

const { Content } = Layout;

function Contact() {
  const [form] = Form.useForm();  // Ant Design form kontrolü
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    // EmailJS ile e-posta gönderimi
    emailjs
      .send(
        'service_1jyaxwe', // EmailJS'den aldığınız Service ID
        'template_sxelfj7', // EmailJS'den aldığınız Template ID
        {
          from_name: values.name,    // Formdan gelen ad değeri
          reply_to: values.email,    // Formdan gelen e-posta adresi
          message: values.message,   // Formdan gelen mesaj
        },
        'O0zuCq9ojMa2Kgg3r' // EmailJS'den aldığınız User ID
      )
      .then((result) => {
        console.log(result.text);
        message.success('Mesajınız başarıyla gönderildi!');
        form.resetFields();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.text);
        message.error('Mesaj gönderilirken bir hata oluştu.');
        setLoading(false);
      });
  };

  return (
    <Content style={{ padding: '50px' }}>
      <Row gutter={[32, 32]} justify="center">
        {/* İletişim Formu */}
        <Col xs={24} md={18}>
          <h2 style={{ textAlign: 'center', color: 'white' }}>İletişim Formu</h2>
          <Form
            form={form} // Form kontrolü
            name="contact_form"
            layout="vertical"
            onFinish={onFinish}  // Form submit edildiğinde çalışacak fonksiyon
            style={{
              backgroundColor: '#fff',
              padding: '30px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="name"
                  label="Adınız"
                  rules={[{ required: true, message: 'Lütfen adınızı giriniz!' }]}
                >
                  <Input placeholder="Adınızı giriniz" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'Lütfen e-posta adresinizi giriniz!' }]}
                >
                  <Input placeholder="E-posta adresinizi giriniz" />
                </Form.Item>
                <Form.Item
                  name="message"
                  label="Mesajınız"
                  rules={[{ required: true, message: 'Lütfen mesajınızı giriniz!' }]}
                >
                  <Input.TextArea rows={4} placeholder="Mesajınızı buraya yazın" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block loading={loading}>
                    Gönder
                  </Button>
                </Form.Item>
              </Col>

              {/* Harita ve Adres Bilgileri */}
              <Col xs={24} md={12}>
                <div>
                  <h3>Ankara Ofis</h3>
                  {/* Google Maps Embed */}
                  <iframe
                    title="Ankara Office"
                    width="100%"
                    height="250"
                    frameBorder="0"
                    style={{ border: 0, borderRadius: '8px' }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.7200623953517!2d32.8029359!3d39.9015817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f2251b0e737%3A0xf8d47c171462ba1c!2sHuawei%20Turkey%20R%26D%20Center!5e0!3m2!1sen!2str!4v1616659994894!5m2!1sen!2str"
                    allowFullScreen
                  ></iframe>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <h3>İstanbul Ümraniye Ofis</h3>
                  <p>
                    Saray Mah. Ahmet Tevfik İleri Cad. Onur Ofis Park İş Merkezi Sit. A1Blok Apt. No.10 B/1 Ümraniye
                    İstanbul
                  </p>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <h3>İstanbul Maslak Ofis</h3>
                  <p>
                    Eski Büyükdere Cad. No:26 Windowist Tower. Kat 34467 Maslak, Sarıyer, İstanbul
                  </p>
                </div>

                {/* Telefon Bilgisi */}
                <div style={{ marginTop: '30px', fontSize: '16px' }}>
                  <PhoneOutlined style={{ marginRight: '10px' }} />
                  Tel: +90 312 454 88 00
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Content>
  );
}

export default Contact;
