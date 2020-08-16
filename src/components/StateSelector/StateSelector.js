import React, { useState, useEffect } from "react"
import { FormControl, NativeSelect, InputLabel } from "@material-ui/core"
import styles from "./StateSelector.module.css"
import { fetchStates } from "../../api/index"

function StateSelector() {
    const [states, setStates] = useState([])
    const [currentState, setCurrentState] = useState('United States')

    useEffect(() => {
        const retrieval = async () => {
            setStates(await fetchStates())
        }
        retrieval()
    }, [])

    // debugging useEffect right now to check that states has been updated
    useEffect(() => {
        console.log("Change in states data:", states);
    }, [states])

    // debugging useEffect right now to check the new selected state option
    useEffect(() => {
        console.log("Current state option:", currentState);
    }, [currentState])

    return (
        <div>
            <FormControl className={styles.formControl}>
                <InputLabel shrink>
                    State Selector
                </InputLabel>
                <NativeSelect defaultValue="United States" onChange={(e) => setCurrentState(e.target.value)} name="state">
                    <option value="United States">United States</option>
                    {states.map((state, index) => (
                        <option key={index} value={state.fullName}>
                            {state.fullName}
                        </option>
                    ))}
                </NativeSelect>
            </FormControl>
        </div>
    )
}

export default StateSelector
