const base = 'https://placehold.co';

const boyColors = ['6B8FAD', '5A7F9B', '7B9FB5', '4A6F85', '8BAFC4'];
const girlColors = ['D08B7B', 'C97B84', 'E5B7A9', 'B57364', 'D49A8E'];

function pickColor(name, colors) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export function getImage(name, gender) {
  if (!name) return null;
  const isGirl = (gender || '').toLowerCase().includes('girl') || (gender || '').toLowerCase().includes('female');
  const color = pickColor(name, isGirl ? girlColors : boyColors);
  return `${base}/600x400/${color}/ffffff?text=${encodeURIComponent(name)}`;
}

const images = {
  Arjun: true, Aarav: true, Vivaan: true, Aditya: true, Krishna: true, Vihaan: true,
  Reyansh: true, Dhruv: true, Kabir: true, Ishaan: true, Shaurya: true, Advait: true,
  Rohit: true, Siddharth: true, Leo: true, Noah: true, Liam: true, Ethan: true,
  Mason: true, Lucas: true, Oliver: true, Elijah: true, Bodhi: true, Chirag: true,
  Chandra: true, Varun: true, Samarth: true, Rudra: true, Shiva: true, Vishnu: true,
  Ganesh: true, Ram: true, Hanuman: true, Brahma: true, Indra: true,
  Diya: true, Ananya: true, Saanvi: true, Myra: true, Ishita: true, Riya: true,
  Aanya: true, Sara: true, Anika: true, Kiara: true, Disha: true, Nisha: true,
  Aaradhya: true, Emma: true, Meera: true, Trishika: true, Siya: true, Navya: true,
  Ira: true, Pari: true, Lakshmi: true, Saraswati: true, Parvati: true, Gauri: true,
  Annapurna: true, Durga: true, Kali: true, Sita: true,
};

export default images;
