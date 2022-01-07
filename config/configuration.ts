export default () => ({
    database: {
        url: process.env.DB_URL,
    },
    port: parseInt(process.env.PORT, 10) || 3000
  });