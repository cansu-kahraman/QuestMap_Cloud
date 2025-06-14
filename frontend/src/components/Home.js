import React, { useState, useEffect } from 'react';
import { Typography, Card, Form, Input, Button, message, Modal, Checkbox } from 'antd';
import Slider from 'react-slick';
import emailjs from 'emailjs-com'; // EmailJS import edildi
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Meta } = Card;

function Home({ email }) {
  const [form] = Form.useForm(); // Ant Design formu kullanılıyor
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token value:", token); // Token'ı kontrol et
  
    if (!token || token === 'undefined') {
      navigate('/login');
    }
  }, [navigate]);
  

  const cardsData = [
    {
      title: 'Coğrafya',
      icon: '🌍',
      description: 'Coğrafya soruları hakkında bilgi edinin.',
    },
    {
      title: 'Felsefe',
      icon: '🧠',
      description: 'Felsefe soruları hakkında bilgi edinin.',
    },
    {
      title: 'Matematik',
      icon: '📐',
      description: 'Matematik soruları hakkında bilgi edinin.',
    },
    {
      title: 'Fizik',
      icon: '🔬',
      description: 'Fizik soruları hakkında bilgi edinin.',
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const onFinish = (values) => {
    setLoading(true);

    // EmailJS ile e-posta gönderimi
    emailjs.send(
      'service_1jyaxwe', // EmailJS'den aldığın Service ID
      'template_sxelfj7', // EmailJS'den aldığın Template ID
      {
        from_name: values.name,    // Formdan gelen ad değeri
        reply_to: values.email,    // Formdan gelen e-posta adresi
        message: values.message,   // Formdan gelen mesaj
      },
      'O0zuCq9ojMa2Kgg3r' // EmailJS'den aldığın User ID
    )
      .then((result) => {
        console.log(result.text);
        message.success('Öneriniz başarıyla gönderildi!');
        form.resetFields();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.text);
        message.error('Öneri gönderilirken bir hata oluştu.');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (email) {
      const dontShow = localStorage.getItem(`dontShowModal_${email}`);
      if (!dontShow) {
        setIsModalVisible(true);
      }
    }
  }, [email]);

  const handleModalOk = () => {
    if (dontShowAgain) {
      localStorage.setItem(`dontShowModal_${email}`, 'true');
    }
    setIsModalVisible(false);
  };

  const handleCheckboxChange = (e) => {
    setDontShowAgain(e.target.checked);
  };

  return (
    <div>
      <Modal
        title="Kariyer Yolculuğu"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Checkbox key="checkbox" onChange={handleCheckboxChange}>
            Bunu bir daha gösterme
          </Checkbox>,
          <Button key="submit" type="primary" onClick={handleModalOk}>
            Tamam
          </Button>,
        ]}
      >
        <p>Kariyer yolculuğunda bir adım ileri gitmek istiyorsanız Kariyer sekmesindeki kişilik testi analizini çözmeye davetlisiniz.</p>
      </Modal>

      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <Title level={5} style={{ color: 'white' }}>MERHABA ÖĞRENCİLER</Title>
        <Title level={1} style={{ color: 'white' }}>Soru Biriktirme Platformuna Hoşgeldiniz</Title>
        <Text style={{ color: 'white', fontSize: '16px' }}>
          Burada, karşılaştığınız tüm soruları paylaşabilir ve diğer kullanıcıların deneyimlerinden yararlanarak çözümler bulabilirsiniz.
        </Text>
      </div>

      <Slider {...sliderSettings}>
        {cardsData.map((card, index) => (
          <div key={index}>
            <Card
              hoverable
              style={{ textAlign: 'center', color: 'white', margin: '10px' }}
              bodyStyle={{ padding: '20px' }}
            >
              <div style={{ fontSize: '50px', marginBottom: '10px' }}>{card.icon}</div>
              <Meta title={card.title} description={card.description} style={{ color: 'white' }} />
            </Card>
          </div>
        ))}
      </Slider>

      {/* Öneriler ve İstekler Formu */}
      <div style={{ backgroundColor: 'white', padding: '20px', marginTop: '60px', marginBottom: '40px', borderRadius: '0.5%' }}>
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '20px' }}>
          <Title level={3} style={{ color: 'black' }}>Öneriler ve İstekler</Title>
          <Text style={{ color: 'black' }}>Her türlü öneri ve isteğinizi buradan iletebilirsiniz.</Text>
        </div>

        <Form
          form={form}
          name="contact"
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          <Form.Item
            name="name"
            label="Adınız"
            rules={[{ required: true, message: 'Lütfen adınızı giriniz!' }]}
          >
            <Input placeholder="Adınız" />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-posta"
            rules={[
              { required: true, message: 'Lütfen e-posta adresinizi giriniz!' },
              { type: 'email', message: 'Lütfen geçerli bir e-posta adresi giriniz!' },
            ]}
          >
            <Input placeholder="E-posta adresiniz" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Öneri/İstek"
            rules={[{ required: true, message: 'Lütfen öneri veya isteğinizi giriniz!' }]}
          >
            <Input.TextArea rows={4} placeholder="Öneri veya isteğinizi buraya yazın" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Gönder
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Home;
