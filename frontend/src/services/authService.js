const API_URL = '${process.env.REACT_APP_API_URL}/auth';

// Login işlemi
const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    const data = await response.json();
    return data;  // Token, userId ve nickname'i döndürüyoruz
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
};

// Register işlemi
const register = async (nickname, email, password) => {
  try {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // E-posta doğrulama deseni

    if (!emailPattern.test(email)) {
      throw new Error('Geçersiz e-posta formatı.');
    }

    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname, email, password }),
    });

    if (!response.ok) {
      // API tarafından döndürülen hata mesajı varsa gösterelim
      const data = await response.json();
      throw new Error(data.message || 'Kayıt başarısız.');
    }

    // Başarılıysa true döndür
    return true;
  } catch (error) {
    console.error('Registration Error:', error.message);
    // Hata durumunda false döndür
    return false;
  }
};

// Kullanıcı adı alma işlemi
const getUsernameByEmail = async (email) => {
  try {
    const response = await fetch(`${API_URL}/get-username`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error retrieving username');
    }

    return data.nickname;
  } catch (error) {
    console.error("Error retrieving username:", error.message);
    return null;
  }
};

const checkToken = async (token) => {
  console.log('checkToken called with token:', token); // Token fonksiyona doğru geliyor mu?
  try {
    const response = await fetch(`${API_URL}/verify-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Token verification failed:', response.status);
      throw new Error('Token is invalid or expired');
    }

    console.log('Token verification succeeded');
    return true;
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return false;
  }
};


// Logout işlemi
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email'); // Email'i temizliyoruz
  localStorage.removeItem('nickname'); // Nickname'i de temizliyoruz
};

export default { login, register, logout, getUsernameByEmail, checkToken };
