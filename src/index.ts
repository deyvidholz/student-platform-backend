import app from './app';

const port = process.env.PORT ? +process.env.PORT : 3000;

app.listen(port, () => console.log(`Application running on port ${port}`));
