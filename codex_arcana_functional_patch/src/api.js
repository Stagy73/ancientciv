const API_URL = 'http://localhost:5000';

export const register = async (email, password) => {
  const res = await fetch(\`\${API_URL}/auth/register\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const login = async (email, password) => {
  const res = await fetch(\`\${API_URL}/auth/login\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const getCards = async (token) => {
  const res = await fetch(\`\${API_URL}/cards\`, {
    headers: { 'Authorization': \`Bearer \${token}\` }
  });
  return res.json();
};
