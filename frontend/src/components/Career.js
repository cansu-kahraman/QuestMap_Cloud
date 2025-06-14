import React, { useState, useEffect } from 'react';
import { Tabs, Button, Radio, message } from 'antd';

const { TabPane } = Tabs;
const API_URL = 'http://localhost:5001/auth';

// Meslek ve kişilik özellikleri verileri
const careersData = [
  { career: 'Yazılım Mühendisi', traits: [30, 40, 80, 50, 70] },
  { career: 'Grafik Tasarımcı', traits: [40, 40, 30, 40, 70] },
  { career: 'İşletmeci', traits: [70, 40, 70, 30, 40] },
  { career: 'Moda Tasarımcısı', traits: [40, 30, 20, 30, 70] },
  { career: 'Fotoğrafçı/Reklamcı', traits: [50, 30, 20, 40, 60] },
  { career: 'Yönetici', traits: [60, 40, 80, 50, 30] },
  { career: 'Hukukçu', traits: [30, 40, 70, 50, 20] },
  { career: 'Doktor', traits: [40, 50, 90, 80, 50] },
  { career: 'Hemşire', traits: [50, 60, 60, 50, 30] },
  { career: 'Fizyoterapist', traits: [40, 50, 60, 30, 40] },
  { career: 'Diş Hekimi', traits: [40, 50, 70, 30, 20] },
  { career: 'Psikolog', traits: [40, 90, 60, 60, 70] },
  { career: 'Finansal Analist', traits: [20, 30, 60, 40, 20] },
  { career: 'Pazarlama Uzmanı', traits: [60, 30, 20, 30, 50] },
  { career: 'İnsan Kaynakları Uzmanı', traits: [50, 40, 40, 30, 30] },
  { career: 'Mali Müşavir', traits: [20, 40, 60, 30, 20] },
  { career: 'Makine Mühendisi', traits: [20, 30, 60, 20, 50] },
  { career: 'Elektrik Mühendisi', traits: [20, 30, 60, 20, 40] },
  { career: 'İnşaat Mühendisi', traits: [25, 30, 60, 20, 50] },
  { career: 'Öğretmen', traits: [50, 40, 40, 30, 60] },
  { career: 'Akademisyen', traits: [20, 30, 60, 20, 70] },
  { career: 'Sanatçı', traits: [60, 30, 20, 30, 80] },
  { career: 'Yazar', traits: [30, 20, 40, 20, 60] },
  { career: 'Spor Eğitmeni', traits: [60, 40, 30, 50, 20] },
  { career: 'Polis', traits: [50, 60, 80, 70, 30] },
  { career: 'Sosyal Hizmet Uzmanı', traits: [50, 60, 40, 50, 30] },
  { career: 'Pilot', traits: [30, 40, 80, 50, 20] },
  { career: 'Bankacı', traits: [20, 30, 60, 40, 20] },
  { career: 'Mimar/İç Mimar', traits: [40, 40, 40, 20, 50] },
  { career: 'Veteriner', traits: [50, 60, 40, 20, 30] },
  { career: 'Restoran Şefi (Aşçı)', traits: [50, 30, 40, 20, 60] },
  { career: 'Din Görevlisi', traits: [30, 50, 40, 40, 20] },
];

// Sorular ve her sorunun ilişkili olduğu kişilik özelliği (traitIndex)
const questions = [
  { id: 'soru1', traitIndex: 0, question: 'Yeni insanlarla tanışmaktan keyif alırım.' },
  { id: 'soru2', traitIndex: 0, question: 'Sosyal etkinliklerde merkezde olmayı severim.' },
  { id: 'soru3', traitIndex: 0, question: 'İnsanlarla kolayca iletişim kurarım.' },
  { id: 'soru4', traitIndex: 0, question: 'Yalnız kalmak yerine sosyal ortamlarda bulunmayı tercih ederim.' },
  { id: 'soru5', traitIndex: 1, question: 'Başkalarına yardım etmek için gönüllü olurum.' },
  { id: 'soru6', traitIndex: 1, question: 'Çatışmalardan kaçınırım.' },
  { id: 'soru7', traitIndex: 1, question: 'Başkalarının ihtiyaçlarını her zaman kendi ihtiyaçlarımdan önce tutarım.' },
  { id: 'soru8', traitIndex: 2, question: 'Görevlerimi zamanında tamamlarım.' },
  { id: 'soru9', traitIndex: 2, question: 'İşlerimi planlayarak yaparım.' },
  { id: 'soru10', traitIndex: 2, question: 'Detaylara dikkat ederim.' },
  { id: 'soru11', traitIndex: 2, question: 'Sorumluluklarımı ihmal etmem.' },
  { id: 'soru12', traitIndex: 3, question: 'Stresli durumlarla başa çıkabilirim.' },
  { id: 'soru13', traitIndex: 3, question: 'Zor zamanlarda sakin kalabilirim.' },
  { id: 'soru14', traitIndex: 3, question: 'Kendimi sıkça kötü hissederim.' },
  { id: 'soru15', traitIndex: 3, question: 'Duygusal zorluklar ve dalgalanmalarla başa çıkabilirim.' },
  { id: 'soru16', traitIndex: 4, question: 'Yeni fikirleri ve kavramları keşfetmekten hoşlanırım.' },
  { id: 'soru17', traitIndex: 4, question: 'Sanatsal etkinliklere ilgi duyarım.' },
  { id: 'soru18', traitIndex: 4, question: 'Yeni deneyimlere açığım.' },
  { id: 'soru19', traitIndex: 4, question: 'Geleneksel yöntemlere bağlı kalmam, yenilikçi düşüncelere değer veririm.' },
];

function TestResult({ token }) {
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    const fetchTestResult = async () => {
      try {
        const response = await fetch(`http://localhost:5001/auth/get-test`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Error fetching test result:', response.status);
          return;
        }

        const data = await response.json();
        setTestResult(data.test); // API'den dönen veriyi set ediyoruz
      } catch (error) {
        console.error('Error fetching test result:', error.message);
      }
    };

    fetchTestResult();
  }, [token]);

  if (!testResult) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <h2>İşte cevaplarınıza göre size en uygun 3 meslek</h2>
      <p>Test Tarihi: {new Date(testResult.created_at).toLocaleDateString()}</p>
      <ul>
        {testResult.result.careers.map((career, index) => (
          <li key={index}>{career}</li>
        ))}
      </ul>
    </div>
  );
}

function Career() {
  const [activeTab, setActiveTab] = useState('1');
  const [testCompleted, setTestCompleted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [savedResult, setSavedResult] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchTestResult = async () => {
      try {
        const response = await fetch(`${API_URL}/get-test`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSavedResult(data.test);
          setTestCompleted(true);
          setActiveTab('2'); // Sayfa yenilendiğinde test sonucu varsa "Sonuç" sekmesine yönlendir
        }
      } catch (error) {
        console.error('Error fetching test result:', error.message);
      }
    };

    fetchTestResult();
  }, []);

  // Cevap seçildiğinde güncelleme
  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  // Kullanıcının cevaplarına göre en uygun meslekleri belirleme
  const calculateBestCareers = () => {
    const traitScores = [0, 0, 0, 0, 0];
    questions.forEach((q) => {
      traitScores[q.traitIndex] += answers[q.id] || 0;
    });

    const userTraitAverages = traitScores.map(score => score / (questions.length / 5));

    const careerMatches = careersData.map(career => {
      const difference = career.traits.reduce((acc, trait, index) => {
        return acc + Math.abs(trait - userTraitAverages[index]);
      }, 0);
      return { career: career.career, difference };
    });

    careerMatches.sort((a, b) => a.difference - b.difference);

    return careerMatches.slice(0, 3).map(match => match.career);
  };

  // Testi gönderdiğinde sonucu veritabanına kaydetme ve sonuç sekmesine yönlendirme
  const handleSubmitTest = async () => {
    if (Object.keys(answers).length < questions.length) {
      message.error('Lütfen tüm soruları cevaplayın!');
      return;
    }

    const result = {
      careers: calculateBestCareers(),
      date: new Date().toLocaleDateString(),
    };

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_URL}/save-test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ result }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Test sonucu kaydedilemedi');
      }

      setSavedResult(result);
      setTestCompleted(true);
      setActiveTab('2');
      message.success('Test başarıyla tamamlandı ve kaydedildi.');
    } catch (error) {
      console.error('Test sonucu kaydedilirken hata:', error.message);
      message.error('Test sonucu kaydedilirken bir hata oluştu.');
    }
  };

  return (
    <div style={{ padding: '20px', background: 'white', borderRadius: '10px', minHeight: '300px', marginTop: '50px', marginBottom:'30px' }}>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Test" key="1" disabled={testCompleted}>
          {testCompleted ? (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h3>Bu testi zaten çözdünüz. Sonuçlarınızı görmek için sonuç sekmesine geçin.</h3>
            </div>
          ) : (
            <>
              {questions.map((question) => (
                <div key={question.id} style={{ marginBottom: '20px' }}>
                  <h4>{question.question}</h4>
                  <Radio.Group
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    value={answers[question.id]}
                  >
                    {['Kesinlikle Katılmıyorum', 'Katılmıyorum', 'Kararsızım', 'Katılıyorum', 'Kesinlikle Katılıyorum'].map((answer, index) => (
                      <Radio key={index} value={index + 1}>
                        {answer}
                      </Radio>
                    ))}
                  </Radio.Group>
                </div>
              ))}

              <div style={{ marginTop: '20px' }}>
                <Button type="primary" onClick={handleSubmitTest}>
                  Testi Gönder
                </Button>
              </div>
            </>
          )}
        </TabPane>

        <TabPane tab="Sonuç" key="2">
          {testCompleted ? (
            <TestResult token={localStorage.getItem('token')} />
          ) : (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h3>Henüz test sonuçları mevcut değil. Lütfen testi tamamlayın.</h3>
            </div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Career;
