export default {
  type: 'object',
  properties: {
    primary_key: { type: 'string' },
    email: { type: 'string' },
  },
  required: ['primary_key'],
} as const;
