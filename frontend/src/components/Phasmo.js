import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Phasmo = ( {} ) => {

  const filterBy = ["ghostDots", "ghostEmf", "ghostFinger", "ghostFreezing", "ghostOrb", "ghostWriting", "ghostBox"];

  const [ghosts, setGhosts] = useState([]);

  useEffect(() => {
    const fetchGhosts = async () => {
      const { data } = await axios.get(`/api/phasmo`);
      setGhosts(data);
    };

    fetchGhosts();
  }, [setGhosts]);


let init = {};
let initGroups = {};
let id = 0;

const unique = prop => {
  const res = [];
  ghosts.forEach(v => {
      res.push({ _id: id++, checked: false, [prop]: v[prop] });
  });
  return res;
};

filterBy.forEach(item => {
  init[item] = [];
  initGroups[item] = unique(item);
});

const [filterGroups, setFilterGroups] = useState(initGroups);

const [filters, setFilters] = useState(init);

const filterData = () => {
  let result = ghosts;
  Object.keys(filters).forEach(key => {
    if (filters[key].length !== 0)
      result = result.filter(item => filters[key].indexOf(item[key]) !== -1);
  });
  return result;
};

const clearAll = () => {

  console.log("1");

  let tmp = { ...filterGroups };
  setFilterGroups(tmp);
  setFilters(init);
  var x = document.getElementsByClassName("checkbox");
  for(let i=0; i<=x.length-1; i++) {
    x[i].checked = false;
  }
  
  console.log("Szar az egész");
} 

const handleChange = e => {
  // var divElem = document.getElementsByClassName("checkbox"); 
  let name = e.target.name;
  let filter = e.target.getAttribute("filter");
  let checked = e.target.checked;
  if (checked) {
    
    let newFilter = [...filters[filter]];
    newFilter.push(name === 'true');
    setFilters({ ...filters, [filter]: newFilter });
  } else {
    setFilters({
      ...filters,
      [filter]: filters[filter].filter(item => item !== (name === 'true'))
    });
  }

  const tmp = filterGroups[filter];
  let updateGroup = [...tmp];
  setFilterGroups({
    ...filterGroups,
    [filter]: updateGroup
  });
};
}

export default Phasmo;