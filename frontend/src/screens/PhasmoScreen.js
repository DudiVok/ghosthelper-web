import React, { useState, useEffect } from "react";
import Ghost from "components/Phasmo";
import BootstrapTable from "react-bootstrap-table-next";
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
      setEvidences(
        data.map((d) => {
          d.clue = null;
          return d;
        })
      );
    };

    fetchGhosts();
    fetchEvidences();
  }, [setGhosts, setEvidences]);

  const filterBy = [
    "ghostDots",
    "ghostEmf",
    "ghostFinger",
    "ghostFreezing",
    "ghostOrb",
    "ghostWriting",
    "ghostBox",
  ];

  let init = {};
  let initGroups = {};
  let id = 0;

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

  const [filterGroups, setFilterGroups] = useState(initGroups);

  const [filters, setFilters] = useState(init);

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
    }
  };

  return (
    <>
      <script
        src="https://kit.fontawesome.com/26aa496276.js"
        crossorigin="anonymous"
      ></script>
      <div style={{ marginTop: 100 }}>
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
