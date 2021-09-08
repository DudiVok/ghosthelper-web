import React, { useState, useEffect } from "react";
import axios from "axios";
import Evidence from "components/Evidence";
import { Row, Col } from "react-bootstrap";

const HomeScreen = () => {
  const [ghosts, setGhosts] = useState([]);
  const [evidences, setEvidences] = useState([]);

  useEffect(() => {
    const fetchGhosts = async () => {
      const { data } = await axios.get(`/api/phasmo`);
      setGhosts(data);
    };

    const fetchEvidences = async () => {
      const { data } = await axios.get(`/api/phasmoEvidences`);
      setEvidences(data);
    };

    fetchGhosts();
    fetchEvidences();
  }, [setGhosts, setEvidences]);

  const filterBy = [
    "ghostDots",
    "ghostEmf",
    "ghostFinger",
    "ghostOrb",
    "ghostFreezing",
    "ghostWriting",
    "ghostBox",
  ];

  let init = {};
  let initGroups = {};
  let id = 0;


  const filterBy2 = [];
  evidences.forEach((item) => {
    filterBy2.push(item.evidenceName.toString());
  });


  const unique = (prop) => {
    const res = [];
    ghosts.forEach((v) => {
      res.push({ _id: id++, checked: false, [prop]: v[prop] });
    });
    return res;
  };
  
  filterBy.forEach((item) => {
    init[item] = [];
    initGroups[item] = unique(item);
  });

  console.log(init);
  console.log(initGroups);

  //  Valamim itt baszódik el, mert az init és initGroups fasza mind a 2 módon
  //  viszont a filters és filterGroups beszarik ha a lekérdezett sablont használom

  const [filterGroups, setFilterGroups] = useState(initGroups);
  const [filters, setFilters] = useState(init);

  console.log(filters);
  console.log(filterGroups);

  const filterData = () => {
    let result = ghosts;
    Object.keys(filters).forEach((key) => {
      if (filters[key].length !== 0)
        result = result.filter(
          (item) => filters[key].indexOf(item[key]) !== -1
        );
    });
    return result;
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let filter = e.target.getAttribute("filter");
    let checked = e.target.checked;
    if (checked) {
      let newFilter = [...filters[filter]];
      newFilter.push(name === "true");
      setFilters({ ...filters, [filter]: newFilter });
    } else {
      setFilters({
        ...filters,
        [filter]: filters[filter].filter((item) => item !== (name === "true")),
      });
    }

    const checkbox = document.querySelector('input[type=checkbox][filter='+filter+'][name='+(name==="true" ? "false":"true")+']');
    checkbox.hidden = checked;

    const tmp = filterGroups[filter];
    let updateGroup = [...tmp];
    setFilterGroups({
      ...filterGroups,
      [filter]: updateGroup,
    });
  };

  const clearAll = () => {
    let tmp = { ...filterGroups };
    setFilterGroups(tmp);
    setFilters(init);
    var x = document.getElementsByClassName("checkbox");
    for (let i = 0; i <= x.length - 1; i++) {
      x[i].checked = false;
      x[i].hidden = false;
    }
  };

  return (
    <>
      <script
        src="https://kit.fontawesome.com/26aa496276.js"
        crossorigin="anonymous"
      ></script>
      <div className="main">
        <button className="col-12 btn btn-dark" onClick={clearAll}>
          Clear
        </button>

        <Row>
          {evidences.map((evidence) => (
            <Col key={evidence._id} sm={12} md={6} lg={4} xl={3}>
              <Evidence
                evidence={evidence}
                clue={evidence.clue}
                click={handleChange}
              />
            </Col>
          ))}
        </Row>

        <div className="table-responsive">
          <table className="table table-bordered table-dark">
            <thead className="table-secondary">
              <tr>
                <th>Ghost Name</th>
                <th>Dots Projector</th>
                <th>EMF Level 5</th>
                <th>Fingerprint</th>
                <th>Freezing Temperatures</th>
                <th>Ghost Orb</th>
                <th>Ghost Writing</th>
                <th>Spirit Box</th>
              </tr>
            </thead>
            <tbody>
              {filterData().map((item) => (
                <tr>
                  <td>{item.ghostName}</td>
                  <td>{item.ghostDots ? <i class="fas fa-check"></i> : ""}</td>
                  <td>{item.ghostEmf ? <i class="fas fa-check"></i> : ""}</td>
                  <td>
                    {item.ghostFinger ? <i class="fas fa-check"></i> : ""}
                  </td>
                  <td>
                    {item.ghostFreezing ? <i class="fas fa-check"></i> : ""}
                  </td>
                  <td>{item.ghostOrb ? <i class="fas fa-check"></i> : ""}</td>
                  <td>
                    {item.ghostWriting ? <i class="fas fa-check"></i> : ""}
                  </td>
                  <td>{item.ghostBox ? <i class="fas fa-check"></i> : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
