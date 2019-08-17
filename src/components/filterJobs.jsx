import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Jobs from "./jobs";
import { Link, Route } from "react-router-dom";
import ListGroupM from "./common/listGroupM";

class FilterJobs extends Component {
  state = {
    cities: ["Mashhad", "Tehran", "Tabriz"],
    categorys: ["Manager", "Developer"],
    selectedCity: [],
    selectedCategory: [],
    showOption: true
  };

  cityCallBack = names => {
    this.setState({ selectedCity: names });
  };

  categoryCallBack = names => {
    this.setState({ selectedCategory: names });
  };

  handleClick = () => {
    this.setState({ showOption: false });
  };

  render() {
    const {
      cities,
      selectedCity,
      categorys,
      selectedCategory,
      showOption
    } = this.state;

    return (
      <React.Fragment>
        {showOption && (
          <Grid container spacing={10}>
            <Grid item xs={2} style={{ paddingLeft: 180, paddingTop: 60 }}>
              <Link
                to="/filterjobs/jobs"
                className="btn btn-success"
                onClick={this.handleClick}
              >
                Find
              </Link>
            </Grid>
            <Grid item xs={2}>
              <ListGroupM
                names={cities}
                parentCallBack={this.cityCallBack}
                title="City"
              />
              <ListGroupM
                names={categorys}
                parentCallBack={this.categoryCallBack}
                title="Job"
              />
            </Grid>
          </Grid>
        )}

        <Route
          path="/filterjobs/jobs"
          render={props => (
            <Jobs {...props} city={selectedCity} category={selectedCategory} />
          )}
        />
      </React.Fragment>
    );
  }
}

export default FilterJobs;
