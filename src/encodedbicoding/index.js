export const formValidatorV1 = (state, ...args) => {
  let errors = [];
  let computedErrors = [];
  let idx;
  // validate arguments;
  if (!Array.isArray(args[0])) {
    throw new Error('Arguments must be an array')
  };

  if (typeof state !== 'object' && Array.isArray(state)) {
    throw new Error('State argument must be an object')
  }

  args = args[0];
  for (let i=0; i<args.length; i++)  {
    if (typeof state[args[i].field] === 'object' && !Array.isArray(state[args[i].field])) {
      // get the keys;
      Object.keys(state[args[i].field]).forEach(key => {
        if (!state[args[i].field][key]) {
          let idx = computedErrors.findIndex((k) => k.item === args[i].field);
          if (idx === -1) {
            computedErrors.push({ item: args[i].field, errors: []})
          } else {
            computedErrors[idx].errors.push(`Missing value for key: ${key}`)
          }
        } else {
          let idx = computedErrors.findIndex((k) => k.item === state[args[i].field]);
          computedErrors.splice(0, idx);
        }
      })


    } else {
      if (!state[args[i].field]) {
        errors.push({ item: args[i].field, error: args[i].error})
      } else {
        idx = errors.findIndex((data) => data.item === args[i].field);
        errors.splice(0, idx);
      }
    }
  }

  errors = errors.concat(computedErrors);
  if (errors.length <= 0) {
    return { isErrors: false, errors: []}
  } else {
    return { isErrors: true, errors};
  }

}