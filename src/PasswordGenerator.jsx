import React, { useState } from 'react';

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    if (password.length >= 12) strength += 1;
    return strength;
  };

  const generatePassword = () => {
    let characters = '';
    if (useUpper) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) characters += '0123456789';
    if (useSymbols) characters += '!@#$%^&*()';

    if (characters.length === 0) {
      alert('Please select at least one character type.');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }
    setPassword(newPassword);
    const strength = calculatePasswordStrength(newPassword);
    setStrength(strength);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <div style={styles.container}>
      <h1>Random Password Generator</h1>
      <div>
        <label>
          Password Length:
          <input
            type="number"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            style={styles.input}
          />
        </label>
      </div>
      <div style={styles.checkboxContainer}>
        <label style={styles.label}>
          <input type="checkbox" checked={useUpper} onChange={() => setUseUpper(!useUpper)} />
          Uppercase Letters
        </label>
        <label style={styles.label}>
          <input type="checkbox" checked={useLower} onChange={() => setUseLower(!useLower)} />
          Lowercase Letters
        </label>
        <label style={styles.label}>
          <input type="checkbox" checked={useNumbers} onChange={() => setUseNumbers(!useNumbers)} />
          Numbers
        </label>
        <label style={styles.label}>
          <input type="checkbox" checked={useSymbols} onChange={() => setUseSymbols(!useSymbols)} />
          Symbols
        </label>
      </div>
      <button onClick={generatePassword} style={styles.button}>
        Generate Password
      </button>
      {password && (
        <div style={styles.resultContainer}>
          <h3>Generated Password:</h3>
          <p style={styles.password}>{password}</p>
          <button onClick={copyToClipboard} style={styles.button}>
            Copy to Clipboard
          </button>
          <h3>Password Strength: {strength}/5</h3>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '400px',
    margin: 'auto',
  },
  input: {
    padding: '5px',
    fontSize: '16px',
    marginLeft: '10px',
    width: '60px',
  },
  checkboxContainer: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    cursor: 'pointer',
    marginTop: '20px',
    borderRadius: '5px',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  resultContainer: {
    marginTop: '20px',
  },
  password: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#007BFF',
  },
};

export default PasswordGenerator;
