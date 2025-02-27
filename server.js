import bodyParser from "body-parser";
import express from "express";
import pg from "pg";
import axios from "axios";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "News Aggregator",
    password: "LbifdfdfdLbifdmfl36",
    port: 5432,
  });

db.connect();

const API_KEY = "b404983755ee4568a84261634a9aea92";
const API_URL = "https://newsapi.org/v2/";
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

async function country_name (){
    const countries = await db.query("SELECT country_name FROM countries ORDER BY country_name ASC");
    return countries.rows;
}
const country_names = await country_name();

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(API_URL + "everything?q=page=1", {
            headers: {
                'Authorization': API_KEY
            }
        });
        res.render("index.ejs", {
            articles: response.data.articles,
            country_names: country_names
        });
    } catch (error) {
        console.error("Failed to make req. :", error.message);
    }
});

app.get("/category", async (req, res) => {
    try {
        const category = req.query.option;
        const response = await axios.get(API_URL + "top-headlines/?category=" + category, {
            headers: {
                'Authorization': API_KEY
            }
        });
        res.render("index.ejs", {
            articles: response.data.articles,
            country_names: country_names
        });
    } catch (error) {
        console.error("Failed to make req. :", error.message);
    }
});

app.get("/headlines", async (req, res) => {
    try {
        const response = await axios.get(API_URL + "top-headlines?country=us", {
            headers: {
                'Authorization': API_KEY
            }
        });
        res.render("index.ejs", {
            articles: response.data.articles,
            country_names: country_names
        });
    } catch (error) {
        console.error("Failed to make req. :", error.message);
    }
});

app.post("/search", async (req, res) => {
    try {
        const search = req.body.search;
        const response = await axios.get(API_URL + "everything?q=" + search, {
            headers: {
                'Authorization': API_KEY
            }
        });
        res.render("index.ejs", {
            articles: response.data.articles,
            country_names: country_names
        });
    } catch (error) {
        console.error("Failed to make req. :", error.message);
    }
});

app.get("/country", async (req, res) => {
    try {
        const country = req.query.option;
        let country_code = await db.query(`SELECT country_code FROM countries WHERE country_name=$1`, [country]);
        country_code = country_code.rows[0];
        const response = await axios.get(API_URL + "everything?q=" + country, {
            headers: {
                'Authorization': API_KEY
            }
        });
        res.render("index.ejs", {
            articles: response.data.articles,
            country_names: country_names
        });
    } catch (error) {
        console.error("Failed to make req. :", error.message);
    }
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));