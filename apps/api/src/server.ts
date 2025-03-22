import app from "./app"

const PORT = 3333;

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/api`);
});
