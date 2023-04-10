import React from "react";
import axios from "axios";
import "./styles.css";

class App extends React.Component {
  state = { quote: "", quranQ: "" };

  componentDidMount() {
    this.fetchQuote();
  }

  fetchQuote = () => {
    const options = {
      method: "GET",
      url: "https://quran-com.p.rapidapi.com/verses/random",
      params: { language: "en", translations: "131" },
      headers: {
        "X-RapidAPI-Key": "{process.env.REACT_APP_T}",
        "X-RapidAPI-Host": "{process.env.REACT_APP_K}"
      }
    };

    axios
      .request(options)
      .then((res) => {
        const quran = res.data.verse;
        const quranQ = quran.translations[0].text;
        const quote = quran.verse_key;

        this.setState({ quote: quote, quranQ: quranQ });
        // console.log(quranQ, quote);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { quote, quranQ } = this.state;

    return (
      <div className="App">
        <div className="card">
          <h1 className="heading">{quranQ}</h1>
          <h2 className="Quo">Quran {quote}</h2>
          <button className="button" onClick={this.fetchQuote}>
            <span>More Quote from SKY</span>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
