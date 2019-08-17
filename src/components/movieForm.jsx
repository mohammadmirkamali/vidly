import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import Button from "@material-ui/core/Button";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      img: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    img: Joi.string().required(),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  handleImg = ev => {
    const img = ev.target.files[0];

    getBase64(img).then(res => {
      const newData = { ...this.state.data };
      newData.img = res;

      return this.setState({ data: newData });
    });
  };

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      img: movie.img,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    const { data } = this.state;

    return (
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "2rem",
          textAlign: "center",
          width: "30rem",
          minHeight: "25rem",
          borderRadius: "10%",
          borderStyle: "groove",
          padding: "2rem"
        }}
      >
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              id="contained-button-file"
              style={{ display: "none" }}
              variant="contained"
              color="primary"
              type="file"
              onChange={this.handleImg}
            />

            <label htmlFor="contained-button-file" style={{ padding: 30 }}>
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>

            {data.img && (
              <img
                src={data.img}
                alt="a"
                style={{ width: "12rem", height: "12rem" }}
              />
            )}
          </div>
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
