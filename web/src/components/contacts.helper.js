const fields = {
  email: undefined,
  fn: undefined,
  tel: undefined,
  adr: undefined,
  n: undefined,
};

const getProperties = (vCard, properties) => {
  const props = { ...fields, highestSpan: 1 };
  properties.forEach((prop) => {
    if (vCard.get(prop)) {
      let value = vCard.get(prop).valueOf();
      if (Array.isArray(value)) {
        value = value.map((val) => val.valueOf());
        if (value.length > props.highestSpan) {
          props.highestSpan = value.length;
        }
      }
      props[prop] = value;
    }
  });
  return props;
};

const vCardMapper = (vCard) => getProperties(vCard, Object.keys(fields));

// const generateSpan = ({ highestSpan, ...rest }) => {
//   const entries = [];
//   // for (let i = 1; i <= highestSpan; i++) {
//   //   const toPush = {};
//   //   for (const key in rest) {
//   //     if (rest.hasOwnProperty(key)) {
//   //       const value = Array.isArray(rest[key]) ? rest[key][i - 1] : rest[key];
//   //       const valueLength = Array.isArray(rest[key]) ? rest[key].length : 1;
//   //       const factor = Math.floor(highestSpan / valueLength);
//   //       const rowSpan = highestSpan - i * factor >= 0 ? factor : 0;
//   //       toPush[key] = { value, rowSpan };
//   //     }
//   //   }
//   //   entries.push(toPush);
//   // }
//   // for (let i = 0; i < highestSpan; i++) {
//   const toPush = {};
//   for (const key in rest) {
//     if (rest.hasOwnProperty(key)) {
//       const value = rest[key];
//       const rowSpan = 1; // highestSpan;
//       toPush[key] = { value, rowSpan };
//     }
//     // }
//     entries.push(toPush);
//   }
//   return entries;
// };

export const contactsMapper = (contacts = []) => {
  //const mappedContactsWithSpan = [];
  const mappedContacts = contacts.map(vCardMapper);
  // mappedContacts.forEach((mappedContact) => {
  //   mappedContactsWithSpan.push(...generateSpan(mappedContact));
  // });
  return mappedContacts;
};
