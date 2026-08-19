export const boyNamesData = {
  indian: [
    { name: 'Aarav', meaning: 'Peaceful, calm', origin: 'Sanskrit', popularity: 'High' },
    { name: 'Vihaan', meaning: 'Dawn, morning', origin: 'Sanskrit', popularity: 'High' },
    { name: 'Arjun', meaning: 'Bright, shining', origin: 'Sanskrit', popularity: 'High' },
    { name: 'Krishna', meaning: 'Dark, attractive', origin: 'Sanskrit', popularity: 'High' },
    { name: 'Rohit', meaning: 'Red, sun', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Siddharth', meaning: 'One who seeks enlightenment', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Advait', meaning: 'Unique, non-dual', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Dhruv', meaning: 'Pole star, firm', origin: 'Sanskrit', popularity: 'Medium' },
  ],
  god: [
    { name: 'Krishna', meaning: 'Dark, attractive', origin: 'Hindu', popularity: 'High' },
    { name: 'Shiva', meaning: 'Auspicious one', origin: 'Hindu', popularity: 'High' },
    { name: 'Vishnu', meaning: 'All-pervading', origin: 'Hindu', popularity: 'High' },
    { name: 'Ganesh', meaning: 'Lord of success', origin: 'Hindu', popularity: 'High' },
    { name: 'Ram', meaning: 'Pleasing, charming', origin: 'Hindu', popularity: 'High' },
    { name: 'Hanuman', meaning: 'One with powerful jaws', origin: 'Hindu', popularity: 'High' },
    { name: 'Brahma', meaning: 'Creator of universe', origin: 'Hindu', popularity: 'Medium' },
    { name: 'Indra', meaning: 'King of gods', origin: 'Hindu', popularity: 'Medium' },
  ],
  modern: [
    { name: 'Leo', meaning: 'Lion', origin: 'Latin', popularity: 'High' },
    { name: 'Noah', meaning: 'Rest, peace', origin: 'Hebrew', popularity: 'High' },
    { name: 'Liam', meaning: 'Strong-willed warrior', origin: 'Irish', popularity: 'High' },
    { name: 'Ethan', meaning: 'Strong, firm', origin: 'Hebrew', popularity: 'High' },
    { name: 'Mason', meaning: 'Stone worker', origin: 'English', popularity: 'High' },
    { name: 'Lucas', meaning: 'Light-giving', origin: 'Latin', popularity: 'High' },
    { name: 'Oliver', meaning: 'Olive tree', origin: 'Latin', popularity: 'High' },
    { name: 'Elijah', meaning: 'Yahweh is my God', origin: 'Hebrew', popularity: 'High' },
  ],
  zodiac: [
    { name: 'Advait', label: 'Aries: Advait', meaning: 'Unique (Aries energy)', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Bodhi', label: 'Taurus: Bodhi', meaning: 'Enlightenment (Taurus stability)', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Chirag', label: 'Gemini: Chirag', meaning: 'Light (Gemini brightness)', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Chandra', label: 'Cancer: Chandra', meaning: 'Moon (Cancer intuition)', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Leo', label: 'Leo: Leo', meaning: 'Lion (Leo strength)', origin: 'Latin', popularity: 'High' },
    { name: 'Varun', label: 'Virgo: Varun', meaning: 'Water god (Virgo purity)', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Samarth', label: 'Libra: Samarth', meaning: 'Capable (Libra balance)', origin: 'Sanskrit', popularity: 'Medium' },
    { name: 'Rudra', label: 'Scorpio: Rudra', meaning: 'Fearsome (Scorpio intensity)', origin: 'Sanskrit', popularity: 'Medium' },
  ],
};

export const getAllBoyNames = () => Object.values(boyNamesData).flat();
