const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  const length = cleaned.length;

  if (length <= 2) {
    return cleaned;
  } else if (length <= 6) {
    return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
  } else if (length === 9) {
    return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 5)}-${cleaned.slice(5)}`;
  } else if (length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (length === 11) { 
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7)}`;
  } else {
    return value;
  }
}

export { formatPhoneNumber };