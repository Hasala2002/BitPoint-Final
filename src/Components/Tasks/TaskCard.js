import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import CodeIcon from "@material-ui/icons/Code";
import BrushIcon from "@material-ui/icons/Brush";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import taskDetails from "../../Data/tasks.json";
import theme from "../../theme";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Aos from "aos";
import "aos/dist/aos.css";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    transition: "all 0.3s ease",
    width: "570px",
    minHeight: "230px",
    marginLeft: "100px",
    marginTop: "20px",
    background: "#edf3fc",
    color: "#000",
    borderRadius: "15px",
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      width: "600px",
      margin: "auto",
      marginTop: "20px",
    },
    [theme.breakpoints.down("xs")]: {
      position: "relative",
      width: "90%",
      margin: "auto",
      marginTop: "20px",
      height: "max-content",
    },
    "&:hover": {
      transform: "scale(1.03)",
      background: "#d3e2f8",
      borderRadius: "12px",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  },
  content: {
    flex: "1 0 auto",
    marginRight: "-20px",
    width: "545px",
    [theme.breakpoints.down("xs")]: {
      position: "relative",
      width: "90%",
      margin: "auto",
    },
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },

  button: {
    marginLeft: "10px",
    marginBottom: "10px",
    backgroundColor: "#2b7cff",
    color: "#fff",
    transition: "0.5s ease",
    "&:hover": {
      backgroundColor: "#236adb",
    },
  },

  cat: {
    color: "#151515",
  },

  catIcon: {
    color: "#2b7cff",
  },

  catogery: {
    float: "right",
    marginTop: "-10px",
  },
  filter: {
    background: "#fff",
    color: "#000",
    float: "right",
    marginRight: "20%",
    padding: "50px",
    borderRadius: "15px",
    width: "15%",
    position: "sticky",
    right: "0",
    top: "100px",
    [theme.breakpoints.down("md")]: {
      position: "relative",
      width: "500px",
      margin: "auto",
      marginLeft: "100px",
      marginBottom: "20px",
      float: "none",
      top: "0",
    },
    [theme.breakpoints.down("sm")]: {
      position: "relative",
      width: "500px",
      margin: "auto",
      marginBottom: "20px",
    },
    [theme.breakpoints.down("xs")]: {
      position: "relative",
      width: "65%",
      margin: "auto",
      marginBottom: "20px",
    },
  },

  filterOptions: {
    color: "#151515",
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
    },
  },
  codeIcon: {
    color: "#0363ff",
  },
  brushIcon: {
    color: "#0363ff",
  },
  exploreIcon: {
    color: "#0363ff",
  },
}));

export default function TaskCard() {
  const classes = useStyles();
  const [value, setValue] = React.useState("All");
  const [data, setData] = useState(taskDetails);

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
    let result = taskDetails;
    setData(
      result.filter(function (obj, index) {
        return obj.catogery === event.target.value;
      })
    );
    if (event.target.value === "All") {
      setData(taskDetails);
    }
  };

  return (
    <div className="eee">
      <div className={classes.filter}>
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            style={{
              color: "black",
              paddingBottom: "12px",
              fontWeight: "650",
              fontSize: "18px",
            }}
          >
            Filter Tasks
          </FormLabel>
          <RadioGroup
            className={classes.filterOptions}
            aria-label="tasks"
            name="filter"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="All"
              control={<Radio color="secondary" />}
              label="All Tasks"
            />
            <FormControlLabel
              value="Code"
              control={<Radio color="secondary" />}
              label="Coding"
            />
            <FormControlLabel
              value="Design"
              control={<Radio color="secondary" />}
              label="Design"
            />
            <FormControlLabel
              value="Explore"
              control={<Radio color="secondary" />}
              label="Explore"
            />
          </RadioGroup>
        </FormControl>
      </div>
      {data.map((tasks, index) => (
        <Card className={classes.root} color="primary" key={index}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {tasks.taskName}
                <span className={classes.catogery}>
                  <Tooltip title={tasks.catogery}>
                    <IconButton
                      aria-label={tasks.catogery}
                      className={classes.catIcon}
                    >
                      {(() => {
                        // eslint-disable-next-line
                        switch (tasks.catogery) {
                          case "Code":
                            return <CodeIcon className={classes.codeIcon} />;
                          case "Design":
                            return <BrushIcon className={classes.brushIcon} />;
                          case "Explore":
                            return (
                              <FindInPageIcon className={classes.exploreIcon} />
                            );
                        }
                      })()}
                    </IconButton>
                  </Tooltip>
                </span>
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                className={classes.cat}
              >
                {tasks.shortDescription}
              </Typography>
              <hr color="#16548a"></hr>
              <Typography variant="caption">Task ID: {tasks.id}</Typography>
            </CardContent>

            <div className={classes.controls}>
              <Button
                variant="contained"
                component={Link}
                to={`/task/${tasks.id}`}
                className={classes.button}
              >
                View Task
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
