import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer, Modal, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import Home from './Home';
import Questions from './Questions';
import Career from './Career';
import Contact from './Contact';
import QuestBot from './QuestBot'; // QuestBot bileşenini ekliyoruz

const { Header, Content } = Layout;

function Template({ email, logout }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('home');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const navigate = useNavigate();

  // Ekran genişliği değişimini dinleme
  const updateMenuDisplay = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateMenuDisplay);
    return () => window.removeEventListener('resize', updateMenuDisplay);
  }, []);

  useEffect(() => {
    if (email) {
      const dontShow = localStorage.getItem(`dontShowModal_${email}`);
      if (!dontShow) {
        setIsModalVisible(true);
      }
    }

    // Sayfa yenilendiğinde localStorage'dan son seçilen sekmeyi al
    const savedSection = localStorage.getItem('selectedSection');
    if (savedSection) {
      setSelectedSection(savedSection);
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

  const handleMenuClick = (section) => {
    setSelectedSection(section);  // İçeriği değiştirmek için
    localStorage.setItem('selectedSection', section);  // Seçilen sekmeyi localStorage'a kaydet
    if (isMobile) setIsDrawerOpen(false);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'home':
        return <Home />;
      case 'questions':
        return <Questions />;
      case 'career':
        return <Career />;
      case 'contact':
        return <Contact />;
      case 'questbot': // QuestBot sekmesi
        return <QuestBot />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo.png"
            alt="QuestMap Logo"
            style={{ width: '80px', height: '80px', marginRight: '5px' }}
          />
          <h1 style={{ color: 'white', margin: 0 }}>QuestMap</h1>
        </div>

        {isMobile ? (
          <>
            <Button type="primary" icon={<MenuOutlined />} onClick={() => setIsDrawerOpen(true)} />
            <Drawer
              title="Menü"
              placement="top"
              onClose={() => setIsDrawerOpen(false)}
              open={isDrawerOpen}
            >
              <Menu mode="vertical" selectedKeys={[selectedSection]}>
                <Menu.Item key="home" onClick={() => handleMenuClick('home')}>Anasayfa</Menu.Item>
                <Menu.Item key="career" onClick={() => handleMenuClick('career')}>Kariyer</Menu.Item>
                <Menu.Item key="questions" onClick={() => handleMenuClick('questions')}>Sorular</Menu.Item>
                <Menu.Item key="contact" onClick={() => handleMenuClick('contact')}>İletişim</Menu.Item>
                <Menu.Item key="questbot" onClick={() => handleMenuClick('questbot')} >QuestBot</Menu.Item> {/* QuestBot sekmesi */}
              </Menu>
              <Button type="primary" block onClick={logout} style={{ marginTop: '10px' }}>
                Çıkış Yap
              </Button>
            </Drawer>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }} >
            <Menu theme="dark" mode="horizontal" selectedKeys={[selectedSection]} >
              <Menu.Item key="home" onClick={() => handleMenuClick('home')}>Anasayfa</Menu.Item>
              <Menu.Item key="career" onClick={() => handleMenuClick('career')}>Kariyer</Menu.Item>
              <Menu.Item key="questions" onClick={() => handleMenuClick('questions')}>Sorular</Menu.Item>
              <Menu.Item key="contact" onClick={() => handleMenuClick('contact')}>İletişim</Menu.Item>
              <Menu.Item key="questbot" onClick={() => handleMenuClick('questbot')} >QuestBot</Menu.Item> {/* QuestBot sekmesi */}
            </Menu>
            <Button type="primary" onClick={logout} style={{ marginLeft: '20px' }}>
              Çıkış Yap
            </Button>
          </div>
        )}
      </Header>

      <Content
        style={{
          padding: '0 50px',
          marginTop: '0px',
          minHeight: '100vh',
          backgroundImage: `url('/background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white',
        }}
      >
        {renderContent()}
      </Content>

      {/* Modal */}
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
    </Layout>
  );
}

export default Template;
