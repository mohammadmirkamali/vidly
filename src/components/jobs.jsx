import React, { Component } from "react";
import { getJobs } from "./../services/fakeJobsService";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListGroupM from "./common/listGroupM";

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: ["Mashhad", "Tehran", "Tabriz"],
      categorys: ["Manager", "Developer"],
      selectedCity: [],
      selectedCategory: [],
      firstCity: [],
      firstCategory: [],
      jobs: []
    };
  }

  componentWillMount() {
    const { city, category } = this.props;

    this.setState({
      firstCity: city,
      selectedCity: city,
      selectedCategory: category,
      firstCategory: category,
      jobs: getJobs()
    });
  }

  cityCallBack = names => {
    this.setState({ selectedCity: names });
  };

  categoryCallBack = names => {
    this.setState({ selectedCategory: names });
  };

  render() {
    const {
      selectedCity,
      selectedCategory,
      jobs: allJobs,
      firstCity,
      firstCategory,
      cities,
      categorys
    } = this.state;

    // console.log(selectedCity);
    const mapCity = selectedCity.map(i => ({ name: i }));
    const mapCategory = selectedCategory.map(i => ({ name: i }));

    const filteredCity =
      mapCity[0] && mapCity[0].name
        ? allJobs.filter(m => mapCity.find(i => i.name === m.city.name))
        : allJobs;

    const filtered =
      mapCategory[0] && mapCategory[0].name
        ? filteredCity.filter(m =>
            mapCategory.find(i => i.name === m.category.name)
          )
        : filteredCity;

    const jobs = filtered;

    return (
      <React.Fragment>
        <Grid container spacing={10}>
          <Grid item xs={2} style={{ paddingLeft: 100, paddingTop: 60 }}>
            <ListGroupM
              names={cities}
              title="City"
              first={firstCity}
              parentCallBack={this.cityCallBack}
            />
            <ListGroupM
              names={categorys}
              first={firstCategory}
              title="Job"
              parentCallBack={this.categoryCallBack}
            />
          </Grid>
          <Grid item xs={6}>
            <List>
              {jobs.map(j => (
                <React.Fragment key={j.id}>
                  <div>
                    <Typography gutterBottom variant="body1">
                      {j.title}
                    </Typography>
                    <div>
                      <Chip label={j.city.name} />
                      <Chip label={j.category.name} />
                    </div>
                  </div>
                  <Divider variant="middle" />
                </React.Fragment>
              ))}
            </List>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Jobs;
