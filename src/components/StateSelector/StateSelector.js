import React, { useState, useEffect } from "react";
import { FormControl, NativeSelect, InputLabel } from "@material-ui/core";
import styles from "./StateSelector.module.css";
import { fetchStates } from "../../api/index";

function StateSelector({ handleChangeState }) {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const retrieval = async () => {
      setStates(await fetchStates());
    };
    retrieval();
  }, []);

  // // debugging useEffect right now to check that states has been updated
  // useEffect(() => {
  //     console.log("Change in states data:", states);
  // }, [states])

  return (
    <div>
      <FormControl className={styles.formControl}>
        <InputLabel shrink>State Selector</InputLabel>
        <NativeSelect
          defaultValue="United States"
          onChange={(e) => handleChangeState(e.target.value)}
          name="state"
        >
          <option value="United States">United States</option>
          {states
            ? states.map((state, index) => (
                <option key={index} value={state.fullName}>
                  {state.fullName}
                </option>
              ))
            : "Loading..."}
        </NativeSelect>
      </FormControl>
    </div>
  );
}

export default StateSelector;
