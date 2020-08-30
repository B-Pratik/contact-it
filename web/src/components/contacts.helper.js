const fields = {
  email: undefined,
  fn: undefined,
  tel: undefined,
  adr: undefined,
  n: undefined,
};

const getProperties = (vCard, properties, i) => {
  const props = { ...fields, key: i };
  properties.forEach((prop) => {
    if (vCard.get(prop)) {
      let value = vCard.get(prop).valueOf();
      if (Array.isArray(value)) {
        value = value.map((val) => val.valueOf());
      }
      props[prop] = value;
    }
  });
  return props;
};

export const vCardMapper = (contacts = []) =>
  contacts.map((vCard, i) => getProperties(vCard, Object.keys(fields), i));

export const contactMapper = (contact, index) => {
  const props = { ...fields, key: index };
  Object.keys(contact).forEach((prop) => {
    let value = contact[prop];
    if (Array.isArray(value)) {
      value = value.map((entry) => {
        if (typeof entry === "string") {
          return entry;
        }
        const { [prop]: val } = entry;
        return val;
      });
    }
    props[prop] = value;
  });
  return props;
};
