import RSA from 'node-rsa';

function encrypt(value, publicKey) {
  const key = new RSA();
  key.importKey(publicKey, 'public');

  return key.encrypt(value, 'base64', 'utf8');
}

export { encrypt };