import cors from 'cors';

const corsFactory = () => {
  return cors({
    origin: true, // Ensure this is correct
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', "cache-control",
      'Authorization', 'MyCustomHeader1', 'MyCustomHeader2'],
    credentials: true,
    exposedHeaders: ['token']
  })
}
 export default corsFactory;